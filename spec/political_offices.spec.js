const Request = require('request');


describe('Political party', () => {
  let error_data = {
    name: 'OPO'
  };

  let data1 = {
    type: 'legislative',
    name: 'Governor'
  };

  let data2 = {
    type: 'federal',
    name: 'NAME2',
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

  describe('Get all offices', () => {
		const URL = 'http://localhost:3000/api/v1/offices/';
		it('should return all offices', (done) => {
			Request.get(URL,(err,res,body) => {
				expect(res.statusCode).toEqual(200);
				done();
			});
		});
  });

  describe('Get one party', () => {
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/offices/', {json: true, body: data1}, (err,res,body) => {
        done();
      });
    });
		
		it('should return a not found', (done) => {
      const URL = 'http://localhost:3000/api/v1/offices/50';
			Request.get(URL,(err,res,body) => {
        expect(res.statusCode).toEqual(404);
				done();
			});
    });

		it('should return a specific office', (done) => {
      const URL = "http://localhost:3000/api/v1/offices/1";
			Request.get(URL,(err,res,body) => {
        body = JSON.parse(body);
        expect(res.statusCode).toBe(200);
				done();
			});
    });
    

  });
  
  describe("edit a specific office", () => {
		beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/offices/', {json: true, body: data1}, (err,res,body) => {
        done();
      });
    });
		
		it('should return a not found', (done) => {
      const URL = 'http://localhost:3000/api/v1/offices/50';
			Request.put(URL, {json: true, body: data1}, (err,res,body) => {
				expect(res.statusCode).toEqual(404);
				done();
			});
		});
		

		it('should return updated office', (done) => {
      const URL = "http://localhost:3000/api/v1/offices/1";
			Request.get(URL,(err,res,body) => {
				expect(res.statusCode).toBe(200);
				done();
        Request.put(URL, {json: true, body: data2}, (err,res,body) =>{
					expect(res.statusCode).toBe(200);
					expect(body.data.name).toEqual(data2.name);
				});
				done();
			});
    });
	});
  

});