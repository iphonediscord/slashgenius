import mongoose from 'mongoose';

let database: mongoose.Connection;

const connect = () => {
    if (database) {
        return;
    }

    if (process.env.DB_URI === undefined) {
        console.log('No DB URI environment variable provided. Program will now exit.');
        process.exit(0);
    }

    mongoose.connect(process.env.DB_URI, {
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


