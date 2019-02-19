import { Pool } from 'pg';
import dotenv from 'dotenv';
import query from './queries';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


pool.on('connect', () => {
});


const Initialize = {

  createPartiesTable: () => {
    const queryText = query.createPartiesTable;
    pool.query(queryText)
      .then(() => {
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  },

  createUsersTable: () => {
    const queryText = query.createUsersTable;
    pool.query(queryText)
      .then(() => {
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  },

  initialize() {
    this.createPartiesTable();
    this.createUsersTable();
    console.log('connected to the db');
  },

};

pool.on('remove', () => {
  // console.log('client removed');
  process.exit(0);
});


export default Initialize;
