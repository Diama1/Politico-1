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
  pool.query(queryText)
    .then(() => {
      // pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createUsersTable = async () => {
  const queryText = query.createUsersTable;
  pool.query(queryText)
    .then(async () => {
      // pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createOfficesTable = async () => {
  const queryText = query.createOfficesTable;
  pool.query(queryText)
    .then(async () => {
      // pool.end();
    })
    .catch((err) => {
      console.log(err);
      // pool.end();
    });
};

const createCandidatesTable = async () => {
  const queryText = query.createCandidatesTable;
  pool.query(queryText)
    .then(async () => {
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      // pool.end();
    });
};

const dropAllTables = async () => {
  const queryText = query.dropAllTables;
  pool.query(queryText)
    .then(async () => {
      console.log('All tables droped');
      // pool.end();
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


pool.on('remove', () => {
  // console.log('client removed');
  process.exit(0);
});
