// Contents of database.js

import knex from "knex";

export const knexInstance = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "MySqlRootP@ssw0rd",
    database: process.env.DB_NAME || "hyf_node_week2",
  },
});
