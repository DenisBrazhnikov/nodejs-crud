import {Request} from '../../server/Server.request';
import {ServerResponse as Response} from 'http';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type Route<T = void> = (req: Request, res: Response) => T;
