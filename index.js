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








module.exports = server;