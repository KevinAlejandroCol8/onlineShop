const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_onlyshop"
});



/*const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_onlyshop"
});
*/

module.exports = db;
