import mysql from 'mysql2/promise';

const conn = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: parseInt(process.env.MYSQL_PORT),
    database: process.env.MYSQL_DATABASE,
    ssl: process.env.NODE_ENV === 'production' ? true : false,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default conn;
