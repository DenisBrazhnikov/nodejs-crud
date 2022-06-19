import * as User from '../models/User/User';
import {UserType} from '../models/User/User.type';
import {Route} from '../helpers/routes/Route';

export const all: Route = () => {
    return User.all();
}

export const find: Route<UserType | null> = (req, res) => {
    let user = User.find(req.params.id);

    if (!user) {
        res.statusCode = 404;
        res.statusMessage = 'User not found';

        throw new Error();
    }

    return user;
}

export const create: Route<UserType> = (req, res) => {
    let user = User.create(req.body as UserType);

    res.statusCode = 200;

    return user;
}

export const update: Route<UserType | null> = (req, res) => {
    let user = User.update(req.params.id, req.body as UserType);

    if (!user) {
        res.statusCode = 404;
        res.statusMessage = 'User not found';

        throw new Error();
    }

    res.statusCode = 200;

    return user;
}

export const destroy: Route = (req, res) => {
    User.destroy(req.params.id);

    res.statusCode = 204;
}