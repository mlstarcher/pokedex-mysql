// TODO: Establish connection to mysql database
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sunday!13",
  database: "pokedex"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const models = {
  getAll: (callback) => {
    let mysqlStr = 'SELECT * FROM pokemon inner join types on pokemon.typeNum = types.id inner join images on pokemon.imageNum = images.id';
    connection.query(mysqlStr, (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, data)
      }
    })
  },
  getTypes: (callback) => {
    let mysqlStr = 'SELECT * FROM types';
    connection.query(mysqlStr, (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, data)
      }
    })
  },
  updateName: (id, name, callback) => {
    let mysqlStr = `UPDATE pokemon SET name = "${name}" WHERE pokemon.id = ${id}`;
    connection.query(mysqlStr, (err, data) => {
      if (err) {
        console.log('query error: ', err)
        callback(err)
      } else {
        callback(null, data)
      }
    })
  },
  delete: (id, callback) => {
    console.log('id at query time is: ', id)
    let mysqlStr = `DELETE pokemon, images FROM pokemon INNER JOIN images ON pokemon.imageNum = images.id WHERE pokemon.id = ${id}`;
    connection.query(mysqlStr, (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, data)
      }
    })
  },
}

module.exports = models;