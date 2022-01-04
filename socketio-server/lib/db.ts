const { Client } = require('pg');
const client = new Client();
require('dotenv').config();
async function connect() {
  if(!client.connection) {
    try {
      await client.connect();
    } catch(err) {
      console.error(err);
      process.exit(1);
    }
  }
  return client;
}
async function disconnect() {
  await client.end();
}
export default { connect, disconnect };
