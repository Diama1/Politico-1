import Joi from 'joi';

const validate = {

  create(req, res, next) {
    const schema = {
      name: Joi.string().trim().required(),
      type: Joi.string().trim().valid([
        'federal',
        'legislative',
        'state',
        'local government',
      ]).required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json({
        status: 400,
        message: result.error.details[0].message,
      });
    }
    return next();
  },

  edit(req, res, next) {
    const schema = {
      name: Joi.string().trim(),
      type: Joi.string().trim().valid([
        'federal',
        'legislative',
        'state',
        'local government',
      ]),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json({
        status: 400,
        message: result.error.details[0].message,
      });
    }
    return next();
  },
};

export default validate;
