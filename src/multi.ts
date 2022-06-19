import cluster from 'cluster';
import {cpus} from 'os';
import {pid} from 'process';
import {Server} from './server';

const createWorker = () => {
    const worker = cluster.fork();

    worker.on('online', () => {
        console.log(`${worker.process.pid} is online`);
    });
    worker.on('exit', () => {
        console.log(`${worker.process.pid} has died`);
    });
}

const startCluster = () => {
    if (cluster.isPrimary) {
        cpus().forEach(() => {
            createWorker()
        })
    } else {
        Server();

        console.log(`${pid} running`);
    }
};

startCluster();