import {randomUUID} from 'crypto';

export class UserType {
    id?: string;
    username: string;
    age: number;
    hobbies: Array<string>;

    constructor(user: UserType) {
        this.id = randomUUID();
        this.username = user.username;
        this.age = user.age;
        this.hobbies = user.hobbies;
    }
}