'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _policalParties = require('./server/controllers/policalParties');

var _policalParties2 = _interopRequireDefault(_policalParties);

var _politicalOffices = require('./server/controllers/politicalOffices');

var _politicalOffices2 = _interopRequireDefault(_politicalOffices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();


app.use(_express2.default.json());

app.get('/', function (req, res) {
	res.status(200).send('Welcome to POLITICO');
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Listening on port 3000...');
});

// political party routes
app.post('/api/v1/parties', _policalParties2.default.create);
app.get('/api/v1/parties', _policalParties2.default.getAll);
app.get('/api/v1/parties/:id', _policalParties2.default.getOne);
app.put('/api/v1/parties/:id', _policalParties2.default.update);
app.delete('/api/v1/parties/:id', _policalParties2.default.delete);

// political offices routes
app.post('/api/v1/offices', _politicalOffices2.default.create);
app.get('/api/v1/offices', _politicalOffices2.default.getAll);
app.get('/api/v1/offices/:id', _politicalOffices2.default.getOne);
app.put('/api/v1/offices/:id', _politicalOffices2.default.update);
app.delete('/api/v1/offices/:id', _politicalOffices2.default.delete);

module.exports = app;