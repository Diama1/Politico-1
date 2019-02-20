import moment from 'moment';
import db from '../db/runner';
import queries from '../db/queries';


const politicalParty = {
  async create(body) {
    const createQuery = queries.createParty;
    console.log(body.type);
    const values = [
      body.name,
      body.hqAddress,
      body.logoUrl,
      moment(new Date()),
      moment(new Date()),
    ];
    console.log(body);

    try {
      const { rows } = await db.query(createQuery, values);
      return {
        status: true,
        data: rows[0],
      };
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return {
          status: false,
          message: 'Party with that name already exist',
        };
      }
      return {
        status: false,
        message: error,
      };
    }
  },


  async getAll() {
    const query = queries.getAllParties;
    try {
      const { rows } = await db.query(query);
      return {
        status: true,
        data: rows,
      };
    } catch (error) {
      return {
        status: false,
        message: error,
      };
    }
  },

  async getOne(id) {
    const query = queries.getOneParties;
    const values = [
      id,
    ];
    try {
      const { rows } = await db.query(query, values);
      if (!rows[0]) {
        return {
          status: false,
          message: 'Party not found',
        };
      }
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

  async update(id, body) {
    const party = this.getOne(id);
    const query = queries.updateParty;
    const updatedParty = party.then(async (result) => {
      if (!result.status) {
        return {
          status: false,
          message: result.message,
        };
      }
      const values = [
        body.name || result.data.name,
        body.hqAddress || result.data.hqaddress,
        body.logoUrl || result.data.logourl,
        moment(new Date()),
        id,
      ];
      try {
        const { rows } = await db.query(query, values);
        return {
          status: true,
          data: rows[0],
        };
      } catch (error) {
        if (error.routine === '_bt_check_unique') {
          return {
            status: false,
            message: 'A party with that name already exist',
          };
        }
        return {
          status: false,
          message: error,
        };
      }
    });
    return updatedParty;
  },

  async delete(id) {
    const query = queries.deleteParty;
    try {
      const res = await db.query(query, [id]);
      if (res.rowCount !== 1) {
        return {
          status: false,
          message: 'Party not found',
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


export default politicalParty;
