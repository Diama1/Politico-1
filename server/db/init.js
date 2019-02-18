import { Pool } from 'pg';
import dotenv from 'dotenv';
import query from './queries';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


pool.on('connect', () => {
  console.log('connected to the db');
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

  initialize() {
    this.createPartiesTable();
  },

};


export default Initialize;
