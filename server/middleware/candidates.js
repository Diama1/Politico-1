import Joi from 'joi';

const validate = {
  register(req, res, next) {
    const schema = {
      candidate: Joi.number().required(),
      party: Joi.number().required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json({
        status: 400,
        message: result.error.details[0].message.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    return next();
  },
};

export default validate;
