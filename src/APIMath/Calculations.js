

export default class Calculations {


    static test() {

        function getRandomNumber(min, max) {
// Вычисляем случайное число в диапазоне [min, max]
            const randomNumber = Math.random() * (max - min + 1) + min;

// Округляем число до ближайшего целого
            return Math.floor(randomNumber);
        }

        let a = 17;
        let b = 16;
        let c = 3;

        const simulationTime = c * 60; // Время моделирования в минутах (3 часа)
        const arrivalIntervalMin = a - 7 ; // Минимальный интервал прихода пациентов в минутах
        const arrivalIntervalMax = a + 7 ; // Максимальный интервал прихода пациентов в минутах
        const consultationTimeMin = b - 4 ; // Минимальное время приема в минутах
        const consultationTimeMax = b + 4 ; // Максимальное время приема в минутах

        let utilizationRatioRez = 0;
        let averageWaitTimeRez = 0;
        let countRun = 10000;
        for(let i = 0; i < countRun; i++) {
            let currentTime = 0;
            let queue = 0;
            let queueArr = [];
            let personTime = [];
            let personCount = 0;

            let count = 0;

            let isBusy = true;
            while (currentTime < simulationTime) {
                count++;

                let person = getRandomNumber(arrivalIntervalMin, arrivalIntervalMax); // интервал прихода транзакта

                currentTime += person; // текущее время + интервал транзакта

                let time = getRandomNumber(consultationTimeMin, consultationTimeMax); // время  обслуживания текущего транзакта

                personTime.push({
                    timeExit: currentTime + time,
                    timeInput: currentTime,
                    person,
                    time,
                }); // добавляется транзакт в массив, который обрабатывается в будущем

                /*debugger;*/


                if(personTime[0].timeExit <= currentTime) {
                    isBusy = true;
                    if(personTime[1].isQueu) queue--;
                    count--;
                    personTime[0].queoExit = currentTime;
                    personTime.shift();
                    personTime[0].timeExit = currentTime + time;
                }

                if(personTime.length > 1) {
                    queue++;
                    personTime[personTime.length - 1].isQueu = true;
                    personTime[personTime.length - 1].queoInput = currentTime;
                    queueArr.push(Object.assign({}, personTime[personTime.length - 1])) ;
                    isBusy = false;
                }


                /*if(personTime.length) { // текущее количество транзактов проверяется , если не ноль то идем дальше
                    if(personTime[0] <= currentTime) { // проверятеся пора ли выйти первому транзакту из очереди если да, то
                        if(queue){ //  если очередь не равна нулю, то вычитаем единицу из очереди
                            queue--;
                            arrTime[count] = currentTime - arrTime[count];
                            count++;
                        } else { // если равнна 0, когда транзакт выходит, то значит транзакт прошел обслуживание с 0 очередью
                            succesPerson++;
                        }
                        personTime.shift(); // транзакт удаляеся из обслужваемы

                    } else { //  если транзакту не пора выходить, то увеличиваем очередь
                        queue++;
                        arrTime[count] = currentTime;
                    }
                }*/






                if(currentTime < simulationTime ) personCount++;
                if(personTime[personTime.length - 1] > currentTime)  personCount--;
            }
            averageWaitTimeRez += queueArr.length;
            utilizationRatioRez += personCount;
            /*console.log(queueArr);
            console.log(personCount);*/
        }
        console.log(averageWaitTimeRez / countRun);
        console.log(utilizationRatioRez / countRun);
        /*console.log((averageWaitTimeRez / countRun).toFixed(3));*/

    }
}