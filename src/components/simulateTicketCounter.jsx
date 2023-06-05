import React, { useState } from 'react';
import { Simulation, Resource, utils } from 'simjs';

function TicketCounterSimulation({ arrivalInterval, arrivalIntervalPlus, serviceTime, serviceTimePlus, simulationHours }) {
    const [utilization, setUtilization] = useState(0);
    const [waitingTime, setWaitingTime] = useState(0);
    const [queueLength, setQueueLength] = useState(0);

    const simulateTicketCounter = () => {
        const env = new Simulation();

        const ticketCounter = new Resource(env, 1);

        function* passengerArrival() {
            while (true) {
                yield env.timeout(utils.randomUniform(arrivalInterval - arrivalIntervalPlus, arrivalInterval + arrivalIntervalPlus));
                yield env.process(processPassenger());
            }
        }

        function* processPassenger() {
            const request = ticketCounter.request();
            yield request;
            yield env.timeout(utils.randomUniform(serviceTime - serviceTimePlus, serviceTime + serviceTimePlus));
            ticketCounter.release(request);
        }

        env.process(passengerArrival());
        env.run(simulationHours * 60);

        const totalPassengers = ticketCounter.used + ticketCounter.queue.length;
        const utilization = ticketCounter.used / (simulationHours * 60);
        const waitingTime = ticketCounter.queue.reduce((sum, passenger) => sum + passenger.waitTime, 0) / ticketCounter.queue.length;
        const queueLength = ticketCounter.queue.length / simulationHours;

        setUtilization(utilization);
        setWaitingTime(waitingTime);
        setQueueLength(queueLength);
    };

    return (
        <div>
            <button onClick={simulateTicketCounter}>Start Simulation</button>
            <p>Utilization: {utilization}</p>
            <p>Average Waiting Time: {waitingTime}</p>
            <p>Average Queue Length: {queueLength}</p>
        </div>
    );
}

export default TicketCounterSimulation;
