import {ServerResponse} from 'http';
import {Request} from './Server.request';
import {HttpMethod} from '../helpers/routes/Route';
import {RouteBatch} from '../helpers/routes/RouteBatch';

export const Controller =
    (routesBatch: RouteBatch) => (req: Request, res: ServerResponse) => {
        const method = req.method as HttpMethod;

        const controller = routesBatch.find(method, req.url || '');

        if (!controller) {
            res.statusMessage = 'No route found';

            throw new Error('No route found');
        }

        req.params = controller.buildParams(req.url || '');

        return controller.route(req, res);
    };