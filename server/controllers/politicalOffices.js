import officeData from '../models/politicalOffices';


const PoliticalOffice = {

  create(req, res) {
    const politicalOffice = officeData.create(req.body);
    politicalOffice.then((office) => {
      if (!office.status) {
        return res.status(office.code).json({
          status: office.code,
          error: office.message,
        });
      }
      return res.status(201).json({
        status: 201,
        data: office.data,
      });
    });
  },

  getAll(req, res) {
    const politicalOffices = officeData.getAll(req.body);
    politicalOffices.then((offices) => {
      if (!offices.status) {
        return res.status(400).json({
          status: 400,
          error: offices.message,
        });
      }
      return res.status(200).json({
        status: 200,
        data: offices.data,
      });
    });
  },

  getOne(req, res) {
    const politicalOffice = officeData.getOne(req.params.id);
    politicalOffice.then((office) => {
      if (!office.status) {
        return res.status(404).json({
          status: 404,
          error: office.message,
        });
      }
      return res.status(200).json({
        status: 200,
        data: office.data,
      });
    });
  },

  update(req, res) {
    const updatedOffice = officeData.update(req.params.id, req.body);
    console.log(updatedOffice);
    updatedOffice.then((office) => {
      if (!office.status) {
        return res.status(409).json({
          status: 409,
          error: office.message,
        });
      }
      return res.status(200).json({
        status: 200,
        data: office.data,
      });
    });
  },

  delete(req, res) {
    const office = officeData.delete(req.params.id);
    office.then((result) => {
      if (!result.status) {
        return res.status(404).json({
          status: 404,
          error: result.message,
        });
      }
      return res.status(204).send({
      });
    });
  },

  async getResultOfElection(req, res) {
    const result = await officeData.resultOfElection(req.params.id);
    if (!result.status) {
      return res.status(404).json({
        status: 404,
        error: result.message,
      });
    }
    return res.status(200).json({
      status: 200,
      data: result.data,
    });
  },


};

export default PoliticalOffice;
