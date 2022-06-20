import {UserType} from './User.type';

let users: Array<UserType> = [];

export const all = (): Array<UserType> => {
    return users;
}

export const create = (user: UserType): UserType => {
    user = new UserType(user);
    users.push(user);

    return user;
}

export const find = (uuid: string): UserType | null => {
    const user = all().find((user) => user.id === uuid);

    return user || null;
}

export const destroy = (uuid: string): void => {
    users = all().filter((user) => {
        return user.id !== uuid;
    });
}

export const update = (uuid: string, user: UserType): UserType | null => {
    const index = all().findIndex((user) => user.id === uuid);

    return index >= 0 ? all()[index] = {...all()[index], ...user} : null;
}