import express from 'express';
import Users from '../controllers/users';
import PoliticalParties from '../controllers/policalParties';
import PoliticalOffices from '../controllers/politicalOffices';
import Candidates from '../controllers/candidates';
import validateUsers from '../middleware/users';
import validateParties from '../helpers/partiesValidate';
import validateOffices from '../helpers/officesValidate';
import validateCandidates from '../middleware/candidates';


const router = express.Router();

router.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Welcome to POLITICO',
  });
});

// users routes
router.post('/api/v1/auth/signup', validateUsers.create, Users.create);
router.post('/api/v1/auth/login', validateUsers.login, Users.login);

// political party routes
router.post('/api/v1/parties', validateParties.create, PoliticalParties.create);
router.get('/api/v1/parties', validateParties.getAll, PoliticalParties.getAll);
router.get('/api/v1/parties/:id', validateParties.getOne, PoliticalParties.getOne);
router.patch('/api/v1/parties/:id/name', validateParties.edit, PoliticalParties.update);
router.delete('/api/v1/parties/:id', validateParties.delete, PoliticalParties.delete);


// political offices routes
router.post('/api/v1/offices', validateOffices.create, PoliticalOffices.create);
router.get('/api/v1/offices', validateOffices.getAll, PoliticalOffices.getAll);
router.get('/api/v1/offices/:id', validateOffices.getOne, PoliticalOffices.getOne);
router.patch('/api/v1/offices/:id/name', validateOffices.edit, PoliticalOffices.update);
router.delete('/api/v1/offices/:id', validateOffices.delete, PoliticalOffices.delete);


// Candidates
router.post('/api/v1/office/:id/register', validateCandidates.register, Candidates.register);

// vote
router.post('/api/v1/votes', validateUsers.vote, Users.vote);

// result of election
router.post('/api/v1/office/:id/result', PoliticalOffices.getResultOfElection);

// make admin
router.post('/api/v1/admin/:id', Users.makeAdmin);

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
