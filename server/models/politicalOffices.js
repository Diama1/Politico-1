import moment from 'moment';
import db from '../db/runner';
// import Authentication from '../helpers/authentication';
import queries from '../db/queries';


const PoliticalOffice = {

  async create(body) {
    const createQuery = queries.createOffice;
    const values = [
      body.name,
      body.type,
      moment(new Date()),
      moment(new Date()),
    ];

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
          message: 'Office with that name already exist',
        };
      }
      return {
        status: false,
        message: error,
      };
    }
  },

  async getAll() {
    const query = queries.getAllOffices;

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
    const query = queries.getOneOffices;
    const values = [
      id,
    ];
    try {
      const { rows } = await db.query(query, values);
      if (!rows[0]) {
        return {
          status: false,
          message: 'Office not found',
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
    const office = this.getOne(id);
    const query = queries.updateOffice;
    const updatedOffice = office.then(async (result) => {
      if (!result.status) {
        return {
          status: false,
          message: result.message,
        };
      }
      const values = [
        body.name || result.data.name,
        body.type || result.data.type,
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
            message: 'Office with that name already exist',
          };
        }
        return {
          status: false,
          message: error,
        };
      }
    });
    return updatedOffice;
  },

  async delete(id) {
    const query = queries.deleteOffice;
    try {
      const res = await db.query(query, [id]);
      if (res.rowCount !== 1) {
        return {
          status: false,
          message: 'Office not found',
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

  async resultOfElection(office) {
    const query = queries.getResultOfElection;
    try {
      const result = await db.query(query, [office]);
      if (result.rowCount < 1) {
        return {
          status: false,
          message: 'There are no votes for this office yet',
        };
      }
      return {
        status: true,
        data: result.rows,
      };
    } catch (error) {
      return {
        status: false,
        message: error,
      };
    }
  },

  findName(name) {
    return this.politicalOffices.find(office => office.name === name);
  },
};


export default PoliticalOffice;
