"use strict";
const initialiseEnv = () => {
    require('dotenv').config();
};
module.exports = {
    initialiseEnv,
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
};
