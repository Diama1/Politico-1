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

  getOne(request,res) {
    const politicalOffice = officeData.getOne(request.params.id);
    if (!politicalOffice) {
      return res.status(404).json({
        status: 404,
        message: "Office not found"
      });
    } 

    return res.status(200).json({
      status: 200,
      data: politicalOffice
    });
  },
  
  update(req,res) {
		const politicalOffice = officeData.getOne(req.params.id);
		if (!politicalOffice) {
      return res.status(404).json({
        status: 404,
        message: "office not found"
      });
		} 
		
		const updatedOffice = officeData.update(req.params.id, req.body);
		return res.status(200).json({
      status: 200,
      data: updatedOffice
    });
  },
  
  delete(req, res) {
		const politicalOffice = officeData.getOne(req.params.id);
		if (!politicalOffice) {
      return res.status(404).json({
        status: 404,
        message: "office not found"
      });
		} 

		officeData.delete(req.params.id);
		return res.status(204).json({
      status: 204,
      message: "office deleted"
    });
	}



};

module.exports = PoliticalOffice;