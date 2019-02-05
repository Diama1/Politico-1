const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('Welcome to POLITICO');
});

app.listen(3000, function(){
	console.log('Listening on port 3000');
});



const calculus = (a,b) => {
	return a  + b;
};

module.exports = calculus;





