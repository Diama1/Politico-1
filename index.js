const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.status(200).send('Welcome to POLITICO');
});

const server = app.listen(3000, function(){
	console.log('Listening on port 3000...');
});


const PoliticalParty = require('./polical_parties');

app.post('/api/v1/parties', PoliticalParty.create);
app.get('/api/v1/parties', PoliticalParty.getAll);
app.get('/api/v1/parties/:id', PoliticalParty.getOne);
app.put('/api/v1/parties/:id', PoliticalParty.update);
app.delete('/api/v1/parties/:id', PoliticalParty.delete);








module.exports = server;