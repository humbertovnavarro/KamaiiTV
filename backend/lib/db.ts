import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const URL = process.env.DATABASE_URL;
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export { URL };
export default db;
