import db from "mysql2/promise";
import config from "../../config";

const pool = db.createPool({
  host: config.db.host,
  user: config.username,
  password: config.password,
  database: config.database,
  waitForConnections: true,
  connectionLimit: 5,
});

export default { getConn: () => pool.getConnection() };
