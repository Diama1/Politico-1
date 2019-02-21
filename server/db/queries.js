const query = {
  createPartiesTable: `CREATE TABLE IF NOT EXISTS parties(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL UNIQUE,
    hqAddress VARCHAR(128) NOT NULL,
    logoUrl VARCHAR(128) NOT NULL,
    created_date TIMESTAMP,
    modified_date TIMESTAMP
  )`,

  createUsersTable: `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL ,
    othername VARCHAR(128) ,
    email VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    phoneNumber VARCHAR(128) ,
    passportUrl VARCHAR(128) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    created_date TIMESTAMP,
    modified_date TIMESTAMP
  )`,
  createCandidatesTable: `CREATE TABLE IF NOT EXISTS candidates(
    id SERIAL PRIMARY KEY,
    office INTEGER ,
    party INTEGER ,
    user_id INTEGER ,
    FOREIGN KEY (office) REFERENCES offices (id) ON DELETE NO ACTION,
    FOREIGN KEY (party) REFERENCES parties (id) ON DELETE NO ACTION,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE NO ACTION
  )`,

  createVotesTable: `CREATE TABLE IF NOT EXISTS votes(
    id SERIAL PRIMARY KEY,
    cretatedOn VARCHAR(128),
    createdBy INTEGER ,
    office INTEGER ,
    candidate INTEGER ,
    FOREIGN KEY (createdBy) REFERENCES users (id) ON DELETE NO ACTION,
    FOREIGN KEY (office) REFERENCES offices (id) ON DELETE NO ACTION,
    FOREIGN KEY (candidate) REFERENCES candidates (id) ON DELETE NO ACTION
  )`,

  createOfficesTable: `CREATE TABLE IF NOT EXISTS offices(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL UNIQUE,
    type VARCHAR(128) NOT NULL,
    created_date TIMESTAMP,
    modified_date TIMESTAMP
  )`,

  signup: `INSERT INTO
  users(firstname, lastname, othername, email, password, phoneNumber, passportUrl, created_date, modified_date)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
  returning *
  `,

  login: 'SELECT * FROM users WHERE email = $1',

  // office's queries
  createOffice: `INSERT INTO 
  offices(name, type, created_date, modified_date) 
  VALUES($1, $2, $3, $4)
  returning *
  `,

  getAllOffices: 'SELECT * FROM offices',

  getOneOffices: 'SELECT * from offices where id = $1',

  updateOffice: 'UPDATE offices SET name = $1, type = $2, modified_date = $3 where id = $4 returning *',

  deleteOffice: 'DELETE from offices where id = $1',

  // parties queries
  createParty: `INSERT INTO 
  parties(name, hqaddress, logourl, created_date, modified_date) 
  VALUES($1, $2, $3, $4, $5)
  returning *
  `,
  getAllParties: 'SELECT * FROM parties',

  getOneParties: 'SELECT * from parties where id = $1',

  updateParty: 'UPDATE parties SET name = $1, hqAddress = $2, logoUrl = $3,  modified_date = $4 where id = $5 returning *',

  deleteParty: 'DELETE from parties where id = $1',

  dropAllTables: 'DROP TABLE IF EXISTS offices, parties, users CASCADE',

  register: 'INSERT INTO candidates(office, party, user_id) VALUES($1, $2, $3) returning *',

  vote: 'INSERT INTO votes(cretatedon, createdby, office, candidate) VALUES($1, $2, $3, $4) returning *',

  checkCandidate: 'SELECT * FROM candidates where office = $1 AND user_id = $2',

  checkVote: 'SELECT * FROM votes where office = $1 AND createdby = $2',

  getResultOfElection: 'SELECT  office ,candidate, CAST(COUNT(*)AS Int) AS result FROM votes where office = $1 GROUP BY candidate, office',

  makeAdmin: 'UPDATE users SET isadmin = true where id = $1 returning *',

};

export default query;
