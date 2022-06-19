import {HttpMethod, Route} from './Route';

export class RouteType {
    method: HttpMethod;
    pattern: string;
    route: Route;

    constructor(method: HttpMethod, pattern: string, route: Route) {
        this.method = method;
        this.pattern = pattern;
        this.route = route;
    }

    public buildParams(url: string) {
        let patternSubPaths = this.pattern.split('/');
        let urlSubPaths = url.split('/');

        let params = {};

        patternSubPaths.forEach((subPath, index) => {
            if (subPath.startsWith(':')) {
                // @ts-ignore
                params[subPath.replace(':', '')] = urlSubPaths[index];
            }
        });

        return params;
    }
}