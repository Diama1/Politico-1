import Request from 'request';
import server from '../../index.js';
import debuger from 'debug';
import db from '../db/runner';


describe('Users endpoints', () => {
  const user = {
    firstname: "melliom",
    lastname: "mel",
    othername: "mel",
    email: "melliomuser@gmail.com",
    password: "hadad",
    phoneNumber: "0785363535",
    passportUrl: "http://localhost:3000/api/v1/auth/signup"
  };
  const user1 = {
    firstname: "melliom",
    lastname: "mel",
    othername: "mel",
    password: "hadad",
    phoneNumber: "0785363535",
    passportUrl: "http://localhost:3000/api/v1/auth/signup"
  };


  

  describe('for signing up ', () => {
    it('should return a 400 when siggning with wrong parameters', (done) => {
      Request.post('http://localhost:3000/api/v1/auth/signup', { json: true, body: user1 }, (err, res, body) => {
      expect(res.statusCode).toBe(400);
      done();
    });
    });

    it('should return a 200 on success', (done) => {
      Request.post('http://localhost:3000/api/v1/auth/signup', { json: true, body: user }, (err, res, body) => {
      expect(res.statusCode).toBe(200);
      done();
    });
    });
    
  })
});