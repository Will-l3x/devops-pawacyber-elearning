const sqlite3 = require("sqlite3");

let db = new sqlite3.Database("./db/dev.sqlite3", (err) => {
  if (err) {
    console.log("Error connecting to database...\n", err);
  } else {
    console.log("SQLite3 connection opened successfully...");
    console.log("***");
    /* Put code to create table(s) here */
    // createTable();
  }
});

//Get all [table_name]
async function getAll(table_name) {
  db.run();
}
//Get one [unique id + table_name]
async function getOne(table_name, id) {
  db.run();
}

module.exports = {
  db: db,
  getAll: getAll,
  getOne: getOne,
};
