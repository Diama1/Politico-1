import candidateData from '../models/candidates';

const Candidate = {

  async register(req, res) {
    const params = [req.params.id, req.body.party, req.body.candidate];
    const registration = await candidateData.register(params);
    if (!registration.status) {
      return res.status(400).json({
        status: 400,
        error: registration.message,
      });
    }
    return res.status(200).json({
      status: 200,
      data: [{
        office: registration.data.office,
        candidate: registration.data.user_id,
      }],
    });
  },
};

export default Candidate;
