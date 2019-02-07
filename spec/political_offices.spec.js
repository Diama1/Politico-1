const Request = require('request');


describe('Political party', () => {
  let error_data = {
    name: 'OPO',
  };

  let data1 = {
    type: 'legislative',
    name: 'Governor',
    
  };
  
  

	describe('Create office', () => {
		const URL = 'http://localhost:3000/api/v1/offices/';
		it('should return a status code of 404 and error_message on error', (done) => {
			Request.post(URL, {json: true, body: error_data}, (err,res,body) => {
				expect(res.statusCode).toBe(404);
				expect(body.error).toMatch('All fields are required');
				done();
			});
		});

		it('should retun a status code of 200 and data created', (done) => {
			Request.post(URL, {json: true, body: data1}, (err,res,body) => {
				expect(res.statusCode).toBe(200);
				expect(body.data.name).toMatch(data1.name);
				done();
			});
		});
  });
  

});