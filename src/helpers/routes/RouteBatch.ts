import {HttpMethod, Route} from './Route';
import {RouteType} from './RouteType';

const urlMatchesPattern = (pattern: string, url: string): boolean => {
    let patternSubPaths = pattern.split('/');
    let urlSubPaths = url.split('/');

    if (patternSubPaths.length !== urlSubPaths.length) {
        return false;
    }

    return patternSubPaths.every(
        (subPath, index) => subPath === urlSubPaths[index] || subPath.startsWith(':')
    );
};

export class RouteBatch {
    routes: Array<RouteType> = [];

    public get(pattern: string, route: Route) {
        this.routes.push(new RouteType('GET', pattern, route));
    }

    public post(pattern: string, route: Route) {
        this.routes.push(new RouteType('POST', pattern, route));
    }

    public put(pattern: string, route: Route) {
        this.routes.push(new RouteType('PUT', pattern, route));
    }

    public delete(pattern: string, route: Route) {
        this.routes.push(new RouteType('DELETE', pattern, route));
    }

    public find(method: HttpMethod, url: string): RouteType | undefined {
        return this.routes.find((route: RouteType) =>
            urlMatchesPattern(route.pattern, url) && method === route.method
        );
    }
}