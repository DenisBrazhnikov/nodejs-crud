import {createServer} from 'http';
import {createBatch} from '../routes';
import {Request} from './Server.request';
import {Controller} from './Server.controller';
import {join} from 'path';
import {config} from 'dotenv';

export const Server = () => {
    const http = createServer((req: Request, res) => {
        res.setHeader('Content-Type', 'application/json');

        let body = '';

        req.on('data', (chunk) => (body += chunk));
        req.on('end', () => {
            try {
                req.body = body ? JSON.parse(body) : {};

                let result = Controller(createBatch())(req, res);

                res.end(JSON.stringify(result));
            } catch (error) {
                res.statusCode = res.statusCode || 501;
                res.end(JSON.stringify(res.statusMessage));
            }
        });
        req.on('error', (error) => {
            res.end(JSON.stringify({message: error.message}));
        })
    });

    const file = process.env.NODE_ENV === 'prod' ? '.env' : '.env.dev';
    const env = config({path: join(__dirname, "../..", file)});
    const port = env.parsed?.PORT || 8089;

    http.listen(port, () => console.log(`Listening on port ${port}`));
};
