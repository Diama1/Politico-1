
const query = {
  createPartiesTable: `CREATE TABLE IF NOT EXISTS parties(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL UNIQUE,
    hqAddress VARCHAR(128) NOT NULL,
    created_date TIMESTAMP,
    modified_date TIMESTAMP
  )`,

  dropPartiesTable: 'DROP TABLE IF EXISTS parties',

};

export default query;
