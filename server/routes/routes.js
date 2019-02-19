import express from 'express';
import db from '../db/init';
import Users from '../controllers/users';
import PoliticalParties from '../controllers/policalParties';
import PoliticalOffices from '../controllers/politicalOffices';
import validateUsers from '../middleware/users';
import validateParties from '../helpers/partiesValidate';
import validateOffices from '../helpers/officesValidate';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to POLITICO',
  });
  const databaseInit = db.initialize();
  console.log(databaseInit);
});

// uses routes
router.post('/api/v1/auth/signup', validateUsers.create, Users.create);
router.post('/api/v1/auth/login', validateUsers.login, Users.login);

// political party routes
router.post('/api/v1/parties', validateParties.create, PoliticalParties.create);
router.get('/api/v1/parties', PoliticalParties.getAll);
router.get('/api/v1/parties/:id', PoliticalParties.getOne);
router.patch('/api/v1/parties/:id/name', validateParties.edit, PoliticalParties.update);
router.delete('/api/v1/parties/:id', PoliticalParties.delete);


// political offices routes
router.post('/api/v1/offices', validateOffices.create, PoliticalOffices.create);
router.get('/api/v1/offices', PoliticalOffices.getAll);
router.get('/api/v1/offices/:id', PoliticalOffices.getOne);
router.patch('/api/v1/offices/:id/name', validateOffices.edit, PoliticalOffices.update);
router.delete('/api/v1/offices/:id', PoliticalOffices.delete);

// all routes not found
router.get('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Route not found',
  });
});
router.post('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Route not found',
  });
});
router.patch('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Route not found',
  });
});
router.delete('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Route not found',
  });
});

export default router;
