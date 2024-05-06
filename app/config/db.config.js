module.exports = {
  HOST: "130.211.198.88",
  USER: "postgres",
  PASSWORD: "123",
  DB: "myinstance",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
