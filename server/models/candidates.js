import db from '../db/runner';
// import Authentication from '../helpers/authentication';
import queries from '../db/queries';


const candidates = {

  async register(params) {
    const query = queries.register;
    const check = await this.chechCandidates(params[0], params[2]);
    if (!check.status) {
      return {
        status: false,
        message: check.message,
      };
    }
    try {
      const { rows } = await db.query(query, params);
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

  async chechCandidates(office, user) {
    const query = queries.checkCandidate;
    const values = [
      office,
      user,
    ];
    try {
      const res = await db.query(query, values);
      if (res.rowCount > 0) {
        return {
          status: false,
          message: 'Candidate already exists',
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
};

export default candidates;
