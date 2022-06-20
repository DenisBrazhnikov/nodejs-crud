import {IncomingMessage} from 'http';

export interface Request extends IncomingMessage {
    params?: any;
    body?: any;
}