import Joi from 'joi';
import debuger from 'debug';

debuger('debug');

const validate = {

  create(req, res, next) {
    const schema = {
      name: Joi.string().trim().required(),
      hqAddress: Joi.string().trim().required(),
      logoUrl: Joi.string().trim().required(),
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
      hqAddress: Joi.string().trim(),
      logoUrl: Joi.string().trim(),
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
