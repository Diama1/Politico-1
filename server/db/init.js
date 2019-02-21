import { Pool } from 'pg';
import dotenv from 'dotenv';
import query from './queries';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


pool.on('connect', () => {
});


const createPartiesTable = async () => {
  const queryText = query.createPartiesTable;
  await pool.query(queryText)
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createUsersTable = async () => {
  const queryText = query.createUsersTable;
  await pool.query(queryText)
    .then(async () => {
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createOfficesTable = async () => {
  const queryText = query.createOfficesTable;
  await pool.query(queryText)
    .then(async () => {
    })
    .catch((err) => {
      console.log(err);
    });
};

const createCandidatesTable = async () => {
  const queryText = query.createCandidatesTable;
  await pool.query(queryText)
    .then(async () => {
    })
    .catch((err) => {
      console.log(err);
    });
};


const dropAllTables = async () => {
  const queryText = query.dropAllTables;
  await pool.query(queryText)
    .then(async () => {
      console.log('All tables droped');
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


(async () => {
  await dropAllTables();
  await createOfficesTable();
  await createPartiesTable();
  await createUsersTable();
  await createCandidatesTable();
  pool.end();
  console.log('Table offices, parties, users, candidates created');
})().catch((err) => {
  console.log(err);
});
