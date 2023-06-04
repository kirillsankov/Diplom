export class Calculations {
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    averageTimeQueue(a, aPlus, b, bPlus, c) {
        // Генератор случайных чисел в диапазоне [min, max]

// Время прихода каждого пациента
        let arrivalTimes = [];
        for (let i = 0; i < 180; i++) {
            let arrivalTime = i + this.randomInt(a - aPlus, a + aPlus); // интервалы приходов пациентов 17±7 минут
            arrivalTimes.push(arrivalTime);
        }
// Время ожидания каждого пациента в очереди
        let waitingTimes = [];
// Время начала работы врача
        let currentTime = 0;

        while (currentTime < c * 60) {
            if (arrivalTimes.length === 0) {
                break;
            }

            let nextArrivalTime = arrivalTimes[0];
            let nextEndTime = currentTime + this.randomInt(b - bPlus, b + bPlus); // время приема 16±4 минут

            if (nextArrivalTime > currentTime) {
                currentTime = nextArrivalTime;
            } else {
                waitingTimes.push(currentTime - nextArrivalTime);
                currentTime = nextEndTime;
                arrivalTimes.shift();
            }
        }
        let averageWaitingTime = waitingTimes.reduce((a, b) => a + b, 0) / waitingTimes.length;
        return averageWaitingTime; // время ожидания в минутах
    }

    payloadRatio(a, aPlus, b, bPlus, c) {

// Время работы клиники в минутах
        const clinicWorkingTime = 3 * c;

// Инициализируем начальные значения
        let patientsServed = 0;
        let totalServiceTime = 0;
        let currentTime = 0;
        let queue = [];

// Функция для добавления пациента в очередь
        function addPatientToQueue() {
            const arrivalTime = currentTime;
            const serviceTime = this.randomInt(b - bPlus, b + bPlus); // Время обслуживания от 16±4 (12) до 16±4 (20) минут
            queue.push({arrivalTime, serviceTime});
        }

// Промоделируем работу клиники в течение 3 часов
        while (currentTime < clinicWorkingTime) {
            // Добавляем пациента в очередь, если его время прихода наступило
            if (this.randomInt(a - aPlus, a + aPlus) < currentTime) { // Интервалы приходов от 17±7 (10) до 17±7 (24) минут
                addPatientToQueue();
            }

            // Обслуживаем пациента, если врач свободен и в очереди есть пациенты
            if (queue.length > 0 && queue[0].arrivalTime + queue[0].serviceTime <= currentTime) {
                const patient = queue.shift();
                patientsServed++;
                totalServiceTime += currentTime - patient.arrivalTime;
            }

            currentTime++;
        }

// Рассчитываем коэффициент полезной загрузки
        const clinicUtilization = totalServiceTime / (patientsServed * b); // 16 - среднее время приема пациента в минутах

        return clinicUtilization;
    }

    leghtQueue(a, aPlus, b, bPlus, c) {
        // Интервалы прихода пациентов
        const arrivalInterval = {
            min: a - aPlus, // Минимальный интервал в минутах
            max: a + aPlus // Максимальный интервал в минутах
        };

// Время приема пациента
        const serviceTime = {
            min: b - bPlus, // Минимальное время в минутах
            max: b + bPlus // Максимальное время в минутах
        };

// Время работы врача в минутах
        const workTime = c * 60; // 3 часа

        let queue = []; // очередь
        let currentTime = 0; // текущее время
        let totalQueueLength = 0; // общая длина очереди
        let numOfCustomers = 0; // количество пациентов


// Генерируем время прихода первого пациента
        let nextArrivalTime = this.randomInt(arrivalInterval.min, arrivalInterval.max);

// Промоделируем работу врача в течение заданного времени
        while (currentTime < workTime) {
            // Если пришел новый пациент
            if (nextArrivalTime <= currentTime) {
                // Генерируем время приема пациента
                const serviceDuration =  this.randomInt(serviceTime.min, serviceTime.max);

                // Добавляем пациента в очередь
                queue.push({
                    arrivalTime: nextArrivalTime,
                    serviceDuration: serviceDuration
                });

                // Генерируем время прихода следующего пациента
                nextArrivalTime +=  this.randomInt(arrivalInterval.min, arrivalInterval.max);
            }

            // Если в очереди есть пациенты, обслуживаем первого
            if (queue.length > 0) {
                const customer = queue[0];

                // Если пациент уже был обслужен
                if (currentTime >= customer.arrivalTime + customer.serviceDuration) {
                    // Удаляем пациента из очереди
                    queue.shift();

                    // Увеличиваем счетчик обслуженных пациентов
                    numOfCustomers++;
                }
            }

            // Увеличиваем время на 1 минуту
            currentTime++;

            // Увеличиваем общую длину очереди
            totalQueueLength += queue.length;
        }

// Рассчитываем среднюю длину очереди
        const averageQueueLength = totalQueueLength / workTime;

        console.log("Средняя длина очереди:", averageQueueLength.toFixed(2));

    }
}