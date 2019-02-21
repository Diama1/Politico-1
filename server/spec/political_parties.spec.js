// const partyData = require('../data/political_parties.js');
import server from '../../index';
import debuger from 'debug';
import Request from 'request';
import db from '../db/runner';

const debug = debuger('debug');
let token;
let option;

describe('Political party endpoint', () => {
  beforeAll((done) => {
    const user = {
      firstname: "hadad",
      lastname: "mel",
      othername: "mel",
      email: "hadad@gmail.com",
      password: "hadad",
      phoneNumber: "0785363535",
      passportUrl: "http://localhost:3000/api/v1/auth/signup"
    };

    
    Request.post('http://localhost:3000/api/v1/auth/signup', { json: true, body: user }, async (err, res, body) => {
      token = body.data[0].token;
        option = {
        headers: {
          'user-token': token,
        }
      };
      const query = 'UPDATE users SET isadmin = true where id = $1';
      try {
        await db.query(query, [body.data[0].user.id]);
      } catch (error) {
        debug(error);
      }
      done();
    });
  });

  const error_data = {
    name: 'OPO',
  };

  const data1 = {
    name: 'OPOL',
    hqAddress: 'KK 23 Ave',
    logoUrl: 'http://localhost:3000/img/1',
  };
  const data2 = {
    name: 'NAME2',
    hqAddress: 'KK 23 Ave',
    logoUrl: 'http://localhost:3000/img/1',
  };
  const data3 = {
    name: 'NAME3',
    hqAddress: 'KK 23 Ave',
    logoUrl: 'http://localhost:3000/img/1',
  };
  const data4 = {
    name: 'NAME4',
    hqAddress: 'KK 23 Ave',
    logoUrl: 'http://localhost:3000/img/1',
  };
  const data5 = {
    name: 'NAME5',
    hqAddress: 'KK 23 Ave',
    logoUrl: 'http://localhost:3000/img/1',
  };


  describe('for Creating a party', () => {
    const URL = 'http://localhost:3000/api/v1/parties/';
    it('should return a status code of 400 and error_message when validation failed', (done) => {
      Request.post(URL, { headers: {'user-token': token,}, json: true, body: error_data }, (err, res, body) => {
        expect(res.statusCode).toBe(400);
        done();
      });
    });

    it('should retun a status code of 201 when a new party was created', (done) => {
      Request.post(URL, { headers: {'user-token': token,}, json: true, body: data1 }, (err, res, body) => {
        expect(res.statusCode).toBe(201);
        expect(typeof(body.data)).toBe('object');
        expect(body.data.name).toMatch(data1.name);
        done();
      });
    });
  });


  describe('for Getting all parties', () => {
    const URL = 'http://localhost:3000/api/v1/parties/';
    it('should return a status of 200 when request succeded', (done) => {
      Request.get(URL, option, (err, res, body) => {
        expect(res.statusCode).toEqual(200);
        body = JSON.parse(body);
        expect(Array.isArray(body.data)).toBe(true);
        done();
      });
    });
  });


  describe('for Getting one party', () => {
    let id;
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/parties/', { headers: {'user-token': token,}, json: true, body: data3 }, (err, res, body) => {
        id = body.data.id;
        done();
      });
    });

    it('should return a not found when passed a wrong id', (done) => {
      const URL = 'http://localhost:3000/api/v1/parties/500';
      Request.get(URL, option, (err, res, body) => {
        expect(res.statusCode).toEqual(404);
        done();
      });
    });

    it('should return a specific party when passed an existant id', (done) => {
      const URL = 'http://localhost:3000/api/v1/parties/'+id;
      Request.get(URL, option, (err, res, body) => {
        body = JSON.parse(body);
        expect(res.statusCode).toBe(200);
        expect(typeof(body.data)).toBe('object');
        done();
      });
    });
  });


  describe('for updating a specific party', () => {
    let id;
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/parties/', { headers: {'user-token': token,}, json: true, body: data4 }, (err, res, body) => {
        id = body.data.id
        done();
      });
    });

    it('should return a not found when passed a wrong id', (done) => {
      const URL = 'http://localhost:3000/api/v1/parties/50';
      Request.patch(URL, { headers: {'user-token': token,}, json: true, body: data1 }, (err, res, body) => {
        expect(res.statusCode).toEqual(404);
        done();
      });
    });


    it('should return the updated party when passed an existing id and validation succeded', (done) => {
      const URL = 'http://localhost:3000/api/v1/parties/'+id;
      Request.get(URL, option, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
        Request.patch(URL+'/name', { headers: {'user-token': token,}, json: true, body: data2 }, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(typeof(body.data)).toBe('object');
          expect(body.data.name).toEqual(data2.name);
        });
        done();
      });
    });
  });


  describe('for deleting a specific party', () => {
    let id;
    const URL = 'http://localhost:3000/api/v1/parties/';
    beforeAll((done) => {
      Request.post(URL, { headers: {'user-token': token,}, json: true, body: data5 }, (err, res, body) => {
        id = body.data.id;
        done();
      });
    });


    // it('should return a specific party', (done) => {
    //   const URL = "http://localhost:3000/api/v1/parties/";
    // 	Request.get(URL,(err,res,body) => {
    // 		console.log(URL+id);
    // 		console.log(body);

    //     body = JSON.parse(body);
    // 		expect(res.statusCode).toBe(200);

    // 		done();
    // 	});
    // 	console.log("##done");

    // });

    it('should return a status code of 204 when the delete was succesful', (done) => {
      Request.delete(URL + id, option, (err, res, body) => {
        expect(res.statusCode).toBe(204);
        done();
        Request.get(URL + id, option,  (err, res, body) => {
          expect(res.statusCode).toBe(404);  
          done();
        });
      });
    });
  });
});
