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

  async vote(body) {
    const queryTxt = query.vote;
    const check = await this.checkVote(body.office, body.createdBy);
    if (!check.status) {
      return {
        status: false,
        message: check.message,
      };
    }
    const params = [
      moment(new Date()),
      body.createdBy,
      body.office,
      body.candidate,
    ];
    try {
      const { rows } = await db.query(queryTxt, params);
      return {
        status: true,
        data: rows[0],
      };
    } catch (error) {
      return {
        status: false,
        message: error,
      };
    }
  },

  async checkVote(office, user) {
    const queryTxt = query.checkVote;
    const values = [
      office,
      user,
    ];
    try {
      const res = await db.query(queryTxt, values);
      if (res.rowCount > 0) {
        return {
          status: false,
          message: 'You have already voted for this office',
        };
      }
      return {
        status: true,
      };
    } catch (error) {
      return {
        status: false,
        message: error,
      };
    }
  },

  async makeAdmin(user) {
    const queryTxt = query.makeAdmin;
    try {
      const res = await db.query(queryTxt, [user]);
      return {
        status: true,
        data: res.rows[0],
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
