import express from 'express';
import PoliticalParty from '../controllers/policalParties';
import PoliticalOffice from '../controllers/politicalOffices';

const router = express.Router();


// political party routes
router.post('/api/v1/parties', PoliticalParty.create);
router.get('/api/v1/parties', PoliticalParty.getAll);
router.get('/api/v1/parties/:id', PoliticalParty.getOne);
router.patch('/api/v1/parties/:id', PoliticalParty.update);
router.delete('/api/v1/parties/:id', PoliticalParty.delete);


// political offices routes
router.post('/api/v1/offices', PoliticalOffice.create);
router.get('/api/v1/offices', PoliticalOffice.getAll);
router.get('/api/v1/offices/:id', PoliticalOffice.getOne);
router.patch('/api/v1/offices/:id', PoliticalOffice.update);
router.delete('/api/v1/offices/:id', PoliticalOffice.delete);

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
