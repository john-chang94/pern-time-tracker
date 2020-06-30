const { Pool } = require('pg');
require('dotenv').config();

const DEV_CONFIG = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
};

const pool = new Pool(DEV_CONFIG);

module.exports = pool;