const Sequelize = require("sequelize");
//Models
const models = require("./models.js");

// For production, what ever db we end up using...
/*const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: // 'mysql' | 'mariadb' | 'postgres' | 'mssql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}); */
//Everyone will be able to run sqlite for dev for now...
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/db.sqlite",
  logging: false,
});
//Connect to db...
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
//Pass the current instance of sequelize to models and sync
models
  .getInstance(sequelize)
  .then(() => {
    //Create tables if they don't already exist...
    sequelize.sync();
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = {
  sqlz: sequelize,
};
