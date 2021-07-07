import * as Mongoose from 'mongoose';
import { DB_URI } from '../lib/authentication.js';

let database: Mongoose.Connection;

const connect = () => {
    if (database) {
        return;
    }

    Mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    database = Mongoose.connection;
}

const disconnect = () => {
    if (!database) {
        return;
    }

    database = Mongoose.connection;
}

export { connect, disconnect };


