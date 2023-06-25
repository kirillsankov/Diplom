import React, {useEffect} from 'react';

export default class Calculations {

    static validateField(str) {
        let clearStr = str.replace(/\s/g, "");
        if (clearStr === '') {
            return false;
        }

        // Проверяем, что строка состоит только из цифр и одной точки или может начинаться с знака минуса
        if (!/^[-+]?\d*\.?\d+$/.test(clearStr)) {
            return false;
        }

        return true;
    }

    static async getResultTask8(program, a,aRange, b, bRange, c) {
        function  addNumberToProgram(i, program) {
            let newProgramm = program.replace('a', a)
                .replace('aRange', aRange)
                .replace('b', b)
                .replace('bRAnge', bRange)
                .replace('simulationTime', c * 60)
                .replace('I', i);
            return newProgramm;
        }

        function extractValue(regex, input) {
            const match = input.match(regex);

            if (match && match.length > 1) {
                return (match[1]);
            }
            return null;
        }

        async function sendResponse(program) {
            let response = fetch("https://gpss-server.herokuapp.com", {
                method: 'POST',
                body: program,
            })
            let rez = await response;
            let json = await rez.json();
            if(json.status === 'simulation-error') {
                return null;
            }
            let report = json.report;

            const avgUtilization = extractValue(avgUtilizationRegex, report);
            const avgContent = extractValue(avgContentRegex, report);
            const avgTimePerTrans = extractValue(avgTimePerTransRegex, report).split(":")[1];

            return  {
                utilization: parseFloat(avgUtilization) / 100,
                content: parseFloat(avgContent),
                timePerTrans: parseFloat(avgTimePerTrans),
            }

        }

        const avgUtilizationRegex = /Avg\. utilization: (\d+\.\d+)%/;
        const avgContentRegex = /Average content: (\d+\.\d+)/;
        const avgTimePerTransRegex = /Avg\. time\/Trans\.: (\d+\.\d+(?=\n|$))/g;

        let newProgramm;

        let i = 1;
        let li = 1 / a * b;
        let resultNumber = li / i

        newProgramm = addNumberToProgram(i++, program);
        let work = await sendResponse(newProgramm);
        console.log(work);
        console.log(resultNumber);

        while(resultNumber >= 1) {
            resultNumber = li / i;
            newProgramm = addNumberToProgram(i++, program);


            work = await sendResponse(newProgramm);
            console.log(work);
            console.log(resultNumber);
        }

        return --i;
    }


     static async getResult(program, a,aRange, b, bRange, c, cRange, d, dRange, e, parseNumberFn) {
        function  addNumberToProgram6(program) {
            let newProgramm = program.replace('a', a)
                .replace('aRange', aRange)
                .replace('b', b)
                .replace('bRAnge', bRange)
                .replace('simulationTime', c * 60);
            return newProgramm;
         }
         function  addNumberToProgram7(program) {
             let newProgramm = program.replace('a', a)
                 .replace('aRange', aRange)
                 .replace('b', b)
                 .replace('bRAnge', bRange)
                 .replace('c', c)
                 .replace('cRAnge', cRange)
                 .replace('d', d)
                 .replace('dRAnge', dRange)
                 .replace('simulationTime', e * 60);
             return newProgramm;
         }

        const avgUtilizationRegex = /Avg\. utilization: (\d+\.\d+)%/;
        const avgContentRegex = /Average content: (\d+\.\d+)/;
         const avgTimePerTransRegex = /Avg\. time\/Trans\.: (\d+\.\d+(?=\n|$))/g;

         let newProgramm;

         if(parseNumberFn === 6) {
             newProgramm = addNumberToProgram6(program);
         } else if(parseNumberFn === 7) {
             newProgramm = addNumberToProgram7(program);
         }

         function extractValue(regex, input) {
             const match = input.match(regex);

             if (match && match.length > 1) {
                 return (match[1]);
             }
             return null;
         }


        let response = fetch("https://gpss-server.herokuapp.com", {
            method: 'POST',
            body: newProgramm,
        })
         let rez = await response;
        let json = await rez.json();
        if(json.status === 'simulation-error') {
            return null;
        }
        let report = json.report;

        const avgUtilization = extractValue(avgUtilizationRegex, report);
        const avgContent = extractValue(avgContentRegex, report);
        const avgTimePerTrans = extractValue(avgTimePerTransRegex, report).split(":")[1];


         return {
             utilization: parseFloat(avgUtilization) / 100,
             content: parseFloat(avgContent),
             timePerTrans: parseFloat(avgTimePerTrans),
         }
    }
}