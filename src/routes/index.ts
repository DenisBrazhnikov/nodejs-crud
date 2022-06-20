import {all, find, create, update, destroy} from '../controllers/UserController';
import {RouteBatch} from '../helpers/routes/RouteBatch';

export const createBatch = (): RouteBatch => {
    let batch = new RouteBatch();

    batch.get('/api/users/:id', find);
    batch.get('/api/users', all);
    batch.post('/api/users', create);
    batch.put('/api/users/:id', update);
    batch.delete('/api/users/:id', destroy);

    return batch;
};