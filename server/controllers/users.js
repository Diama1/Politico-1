import userModel from '../models/users';

const User = {
  create(req, res) {
    const newUser = userModel.create(req.body);
    newUser.then((user) => {
      if (!user.status) {
        return res.status(user.code).json({
          status: user.code,
          error: user.message,
        });
      }
      return res.status(200).json({
        status: 200,
        data: [{
          token: user.token,
          user: user.row,
        }],
      });
    });
  },

  login(req, res) {
    const loginUser = userModel.login(req.body);
    loginUser.then((user) => {
      if (!user.status) {
        return res.status(404).json({
          status: 404,
          error: user.message,
        });
      }
      return res.status(200).json({
        status: 200,
        data: [{
          token: user.token,
          user: user.row,
        }],
      });
    });
  },

  async vote(req, res) {
    const vote = await userModel.vote(req.body);
    if (!vote.status) {
      return res.status(409).json({
        status: 409,
        error: vote.message,
      });
    }
    return res.status(200).json({
      status: 200,
      data: [{
        office: vote.data.office,
        candidate: vote.data.candidate,
        voter: vote.data.createdby,
      }],
    });
  },

  async makeAdmin(req, res) {
    const newAdmin = await userModel.makeAdmin(req.params.id);
    if (!newAdmin.status) {
      return res.status(400).json({
        status: 400,
        error: newAdmin.message,
      });
    }
    return res.status(200).json({
      status: 200,
      data: newAdmin.data,
    });
  },

};

export default User;
