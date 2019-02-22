import partyData from '../models/politicalParties';


const PoliticalParty = {

  create(req, res) {
    const politicalParty = partyData.create(req.body);
    politicalParty.then((party) => {
      if (!party.status) {
        return res.status(party.code).json({
          status: party.code,
          error: party.message,
        });
      }
      return res.status(201).json({
        status: 201,
        data: party.data,
      });
    });
  },

  async getAll(req, res) {
    const politicalParties = await partyData.getAll(req.body);
    if (!politicalParties.status) {
      return res.status(400).json({
        status: 400,
        error: politicalParties.message,
      });
    }
    console.log(politicalParties);
    return res.status(200).json({
      status: 200,
      data: politicalParties.data,
    });
    // politicalParties.then((parties) => {
    //   if (!parties.status) {
    //     return res.status(400).json({
    //       status: 400,
    //       error: parties.message,
    //     });
    //   }
    //   return res.status(200).json({
    //     status: 200,
    //     data: parties.data,
    //   });
    // });
  },

  getOne(req, res) {
    const politicalParty = partyData.getOne(req.params.id);
    politicalParty.then((party) => {
      if (!party.status) {
        return res.status(404).json({
          status: 404,
          error: party.message,
        });
      }
      return res.status(200).json({
        status: 200,
        data: party.data,
      });
    });
  },

  update(req, res) {
    const updatedParty = partyData.update(req.params.id, req.body);
    updatedParty.then((party) => {
      if (!party.status) {
        return res.status(404).json({
          status: 404,
          error: party.message,
        });
      }
      return res.status(200).json({
        status: 200,
        data: party.data,
      });
    });
  },

  delete(req, res) {
    const party = partyData.delete(req.params.id);
    party.then((result) => {
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

};

export default PoliticalParty;
