import partyData from '../models/politicalParties';


const PoliticalParty = {

  create(req, res) {
    const politicalParty = partyData.create(req.body);
    if (!politicalParty.status) {
      return res.status(400).json({
        status: 400,
        message: politicalParty.message,
      });
    }
    return res.status(201).json({
      status: 201,
      data: politicalParty.data,
    });
  },

  getAll(req, res) {
    const politicalParties = partyData.getAll();
    return res.status(200).json({
      status: 200,
      data: politicalParties,
    });
  },

  getOne(request, res) {
    const politicalParty = partyData.getOne(request.params.id);
    if (!politicalParty) {
      return res.status(404).json({
        status: 404,
        message: 'Party not found',
      });
    }

    return res.status(200).json({
      status: 200,
      data: politicalParty,
    });
  },

  update(req, res) {
    const politicalParty = partyData.getOne(req.params.id);
    if (!politicalParty) {
      return res.status(404).json({
        status: 404,
        message: 'Party not found',
      });
    }
    const updatedParty = partyData.update(req.params.id, req.body);
    if (!updatedParty.status) {
      return res.status(400).json({
        status: 400,
        message: updatedParty.message,
      });
    }
    return res.status(200).json({
      status: 200,
      data: updatedParty.data,
    });
  },

  delete(req, res) {
    const politicalParty = partyData.getOne(req.params.id);
    if (!politicalParty) {
      return res.status(404).json({
        status: 404,
        message: 'Party not found',
      });
    }

    partyData.delete(req.params.id);
    return res.status(204).json({
      status: 204,
      message: 'party deleted',
    });
  },

};

export default PoliticalParty;
