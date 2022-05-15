const mysql = require("mysql");
const config = require("../config");
const error = require("../utils/error-trhow");

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  port: config.mysql.port,
};

let connection;

async function handleCon() {
  connection = mysql.createConnection(dbconfig);

  await connection.connect((err) => {
    if (err) {
      console.error("[db err]", err);
      setTimeout(handleCon, 2000);
    } else {
      console.log("Connected to database!");
    }
  });

  connection.on("error", (err) => {
    console.log("Database error: " + err);

    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleCon();
    } else {
      throw err;
    }
  });
}

handleCon();

async function list(tabla) {
  const query = `SELECT * FROM ${tabla}`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

async function get_data(tabla, id) {
  const query = `SELECT * FROM ${tabla} WHERE id = ${id}`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, data) => {
      if (err) reject(err);

      if (data.length === 0) {
        const e = new Error("user not found");
        reject(e);
      }

      resolve(data);
    });
  });
}

async function upsert(tabla, data) {

  return insert(tabla, data);
}

async function insert(tabla, data) {
  const query = `INSERT INTO ${tabla} SET ?`;

  return new Promise((resolve, reject) => {
    connection.query(query, data, (err, result) => {
      if (err) reject(err);

      console.log("INSERT: ");
      console.log(result);

      resolve(result);
    });
  });
}

async function update(tabla, data) {
  const query = `UPDATE ${tabla} SET ? WHERE id = ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, [data, data.id], (err, result) => {
      if (err) reject(err);
      console.log("UPDATE");
      console.log(result);

      resolve(result);
    });
  });
}

async function query(tabla, data) {
  const query = `SELECT*FROM ${tabla} WHERE ?`;

  return await new Promise((resolve, reject) => {
    connection.query(query, data, (err, result) => {
      if (err) reject(err);

      resolve(result[0]);
    });
  });
}

module.exports = {
  list,
  get_data,
  upsert,
  query,
  insert,
  update
};
