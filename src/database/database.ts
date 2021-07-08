import * as Mongoose from 'mongoose';

let database: Mongoose.Connection;

const connect = () => {
    if (database) {
        return;
    }

    if (process.env.DB_URI === undefined) {
        console.log('No DB URI environment variable provided. Program will now exit.');
        process.exit(0);
    }

    Mongoose.connect(process.env.DB_URI, {
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


