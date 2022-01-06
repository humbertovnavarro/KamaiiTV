import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();
class Database extends Client {

}
const db = new Database();
export default db;
