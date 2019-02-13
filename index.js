import express from 'express';
const app = express();
import PoliticalParty from  './server/controllers/policalParties';
import PoliticalOffice from './server/controllers/politicalOffices';

app.use(express.json());

app.get('/', (req, res) => {
	res.status(200).send('Welcome to POLITICO');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('Listening on port ${port}...');
});



// political party routes
app.post('/api/v1/parties', PoliticalParty.create);
app.get('/api/v1/parties', PoliticalParty.getAll);
app.get('/api/v1/parties/:id', PoliticalParty.getOne);
app.put('/api/v1/parties/:id', PoliticalParty.update);
app.delete('/api/v1/parties/:id', PoliticalParty.delete);


// political offices routes
app.post('/api/v1/offices', PoliticalOffice.create);
app.get('/api/v1/offices', PoliticalOffice.getAll);
app.get('/api/v1/offices/:id', PoliticalOffice.getOne);
app.put('/api/v1/offices/:id', PoliticalOffice.update);
app.delete('/api/v1/offices/:id', PoliticalOffice.delete);




export default app;
