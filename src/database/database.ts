import mongoose from 'mongoose';
import { DB_URI } from '../lib/authentication.js';

let database: mongoose.Connection;

const connect = () => {
    if (database) {
        return;
    }

    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    database = mongoose.connection;
}

const disconnect = () => {
    if (!database) {
        return;
    }

    database = mongoose.connection;
}

export { connect, disconnect };


