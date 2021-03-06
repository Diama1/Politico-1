import Joi from 'joi';
import jwt from 'jsonwebtoken';
import db from '../db/runner';

const verifyToken = async (token, requireAdmin) => {
  if (!token) {
    return {
      status: false,
      code: 404,
      message: 'Token is not provided',
    };
  }
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    const text = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await db.query(text, [decoded.userId]);
    if (!rows[0]) {
      return {
        status: false,
        code: 401,
        message: 'The token you provided is invalid',
      };
    }
    if (requireAdmin) {
      if (!rows[0].isadmin) {
        return {
          status: false,
          code: 403,
          message: 'Not allowed, admin only',
        };
      }
    }
    return {
      status: true,
      data: rows[0],
    };
  } catch (error) {
    return {
      status: false,
      code: 401,
      message: 'The token you provided is invalid',
    };
  }
};

const authenticate = async (req, res, next, requireAdmin) => {
  const token = req.headers['user-token'];
  const verifiedToken = await verifyToken(token, requireAdmin);
  if (!verifiedToken.status) {
    return res.status(verifiedToken.code).json({
      status: verifiedToken.code,
      error: verifiedToken.message,
    });
  }
  req.user = { id: verifiedToken.data.id };
  return next();
};

const validate = {

  create(req, res, next) {
    const schema = {
      firstname: Joi.string().trim().required(),
      lastname: Joi.string().trim().required(),
      othername: Joi.string().trim().required(),
      email: Joi.string().trim().required().email(),
      password: Joi.string().trim().required(),
      phoneNumber: Joi.string().trim().required(),
      passportUrl: Joi.string().trim().required(),
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

  login(req, res, next) {
    const schema = {
      email: Joi.string().trim().required().email(),
      password: Joi.string().trim().required(),
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

  async vote(req, res, next) {
    const schema = {
      // createdBy: Joi.number().required(),
      office: Joi.number().required(),
      candidate: Joi.number().required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json({
        status: 400,
        message: result.error.details[0].message.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    return authenticate(req, res, next);
  },
  async petition(req, res, next) {
    const schema = {
      office: Joi.number().required(),
      body: Joi.string().trim().required(),
      evidence: Joi.array().required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json({
        status: 400,
        message: result.error.details[0].message.replace(/[^a-zA-Z ]/g, ''),
      });
    }
    return authenticate(req, res, next);
  },
};

export default validate;
