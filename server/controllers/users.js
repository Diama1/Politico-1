import userModel from '../models/users';

const User = {
  create(req, res) {
    const newUser = userModel.create(req.body);
    newUser.then((user) => {
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

};

export default User;
