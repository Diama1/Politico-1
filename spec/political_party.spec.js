const Request = require('request');
const partyData = require('../polical_parties'); 

describe("Political party", () => {
  

  describe('Create party', () => {
    const URL = 'http://localhost:3000/api/v1/parties/';
     let error_data = {
      name: "OPO",
     };

     let data1 = {
      name: "OPO",
      hqAddress: "KK 23 Ave",
      logoUrl: "http://localhost:3000/img/1"
    }
    

    it("should return a status code of 404 and error_message on error", (done) => {
      Request.post(URL, {json: true, body: error_data}, (err,res,body) => {
        expect(res.statusCode).toBe(404);
        expect(body.error).toMatch("All fields are required");
        done();
      });
    });

    it("should retun a status code of 200 and data created", (done) => {
      Request.post(URL, {json: true, body: data1}, (err,res,body) => {
        expect(res.statusCode).toBe(200);
        expect(body.data.name).toMatch(data1.name);
        done();
      });
    });
  });

  describe('Get all parties', () => {
    const URL = 'http://localhost:3000/api/v1/parties/';
    it('should return all parties', (done) => {
      Request.get(URL,(err,res,body) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
    });
  })
});