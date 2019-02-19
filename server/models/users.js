import moment from 'moment';
import db from '../db/runner';
import Authentication from '../helpers/authentication';
import query from '../db/queries';

const User = {
  async create(body) {
    let response = {};
    const hashPassword = Authentication.hashPassword(body.password);

    const createQuery = query.signup;
    const values = [
      body.firstname,
      body.lastname,
      body.othername,
      body.email,
      hashPassword,
      body.phoneNumber,
      body.passportUrl,
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Authentication.generateToken(rows[0].id);
      response = {
        status: true,
        row: rows[0],
        token,
      };
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        response = {
          status: false,
          message: 'User with that EMAIL already exist',
        };
      }
      response = {
        status: false,
        message: error,
      };
    }
    return response;
  },

  async login(body) {
    const text = query.login;
    try {
      const { rows } = await db.query(text, [body.email]);
      if (!rows[0] || !Authentication.comparePassword(rows[0].password, body.password)) {
        return {
          status: false,
          message: 'The credentials you provided is incorrect',
        };
      }
      const token = Authentication.generateToken(rows[0].id);
      return {
        status: true,
        row: rows[0],
        token,
      };
    } catch (error) {
      return {
        status: false,
        message: error,
      };
    }
  },

};

export default User;
