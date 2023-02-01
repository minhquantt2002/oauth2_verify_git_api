const connection = require('../db')

exports.checkUser = (username, callback) => {
    connection.query(
        `select * from user where username = '${username}'`,
        (err, rows, fields) => {
            if (err) throw err;
            return callback(rows[0]);
        }
    );
};

exports.checkPassword = (username, callback) => {
    connection.query(
        `select password from user where username = '${username}'`,
        (err, rows, fields) => {
            if (err) throw err;
            return callback(rows[0].password);
        }
    );
};

exports.insertUser = (user, callback) => {
    connection.query(
        `insert into user (username, password) values ('${user.username}', '${user.password}')`,
        (err, result, fields) => {
            if (err) throw err;
            return callback(result);
        }
    );
};