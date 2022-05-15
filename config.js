module.exports = {
  // The PORT of the application
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    SECRET: process.env.JWT_SECRET || "SECRET",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || "3307",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASS || "usbw",
    database: process.env.MYSQL_DB || "store",
  },
};
