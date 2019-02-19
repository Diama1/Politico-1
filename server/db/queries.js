
const query = {
  createPartiesTable: `CREATE TABLE IF NOT EXISTS parties(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL UNIQUE,
    hqAddress VARCHAR(128) NOT NULL,
    created_date TIMESTAMP,
    modified_date TIMESTAMP
  )`,

  createUsersTable: `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(128) NOT NULL ,
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

  signup: `INSERT INTO
  users(firstname, lastname, othername, email, password, phoneNumber, passportUrl, created_date, modified_date)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
  returning *
  `,

  login: 'SELECT * FROM users WHERE email = $1',

};

export default query;
