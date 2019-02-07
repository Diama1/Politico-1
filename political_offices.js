const officeData = require('./data/political_offices');


const PoliticalOffice = {

	create(req, res) {
		if (!req.body.type || !req.body.name) {
			return res.status(404).json({
				status: 404,
				error: 'All fields are required' 
			});
		}
		const politicalOffice = officeData.create(req.body);
		return res.status(200).json({
			status: 200,
			data: politicalOffice
		});
  },
  
  getAll(req,res) {
		const politicalOffices = officeData.getAll();
		return res.status(200).json({
			status: 200,
			data: politicalOffices
		});
  },



};

module.exports = PoliticalOffice;