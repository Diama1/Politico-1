import Request from 'request';
import server from '../../index.js';
import debuger from 'debug';

const debug = debuger('debug');

describe('Political Office endpoint', () => {
  const error_data = {
    name: 'OPO',
  };

  const data1 = {
    type: 'legislative',
    name: 'Governor',
  };

  const data2 = {
    type: 'federal',
    name: 'NAME2',
  };
  const data3 = {
    type: 'federal',
    name: 'NAME3',
  };


  describe('for creating an office', () => {
    const URL = 'http://localhost:3000/api/v1/offices/';
    it('should return a status code of 400 and error_message when validation failed', (done) => {
      Request.post(URL, { json: true, body: error_data }, (err, res, body) => {
        expect(res.statusCode).toBe(400);
        done();
      });
    });

    it('should retun a status code of 201 when a new office was created', (done) => {
      Request.post(URL, { json: true, body: data1 }, (err, res, body) => {
        debug(body);
        expect(res.statusCode).toBe(201);
        expect(typeof(body.data)).toBe('object');
        expect(body.data.name).toMatch(data1.name);

        done();
      });
    });
  });

  describe('for getting all offices', () => {
    const URL = 'http://localhost:3000/api/v1/offices/';
    it('should return a status of 200 when request succeded', (done) => {
      Request.get(URL, (err, res, body) => {
        expect(res.statusCode).toEqual(200);
        body = JSON.parse(body);
        expect(Array.isArray(body.data)).toBe(true);
        done();
      });
    });
  });

  describe('for Getting one office', () => {
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/offices/', { json: true, body: data1 }, (err, res, body) => {
        done();
      });
    });

    it('should return a not found when passed a wrong id', (done) => {
      const URL = 'http://localhost:3000/api/v1/offices/50';
      Request.get(URL, (err, res, body) => {
        expect(res.statusCode).toEqual(404);
        done();
      });
    });

    it('should return a specific office when passed an existant id', (done) => {
      const URL = 'http://localhost:3000/api/v1/offices/1';
      Request.get(URL, (err, res, body) => {
        body = JSON.parse(body);
        expect(res.statusCode).toBe(200);
        expect(typeof(body.data)).toBe('object');
        done();
      });
    });
  });

  describe('for updating a specific office', () => {
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/offices/', { json: true, body: data1 }, (err, res, body) => {
        done();
      });
    });

    it('should return a not found when passed a wrong id', (done) => {
      const URL = 'http://localhost:3000/api/v1/offices/50';
      Request.patch(URL, { json: true, body: data1 }, (err, res, body) => {
        expect(res.statusCode).toEqual(404);
        done();
      });
    });


    it('should return the updated office when passed an existing id and validation succeded ', (done) => {
      const URL = 'http://localhost:3000/api/v1/offices/1';
      Request.get(URL, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
        Request.patch(URL+'/name', { json: true, body: data2 }, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(typeof(body.data)).toBe('object');
          expect(body.data.name).toEqual(data2.name);
        });
        done();
      });
    });
  });

  describe('for deleting a specific office', () => {
    const URL = 'http://localhost:3000/api/v1/offices/';
    let id = 0;
    beforeAll((done) => {
      Request.post(URL, { json: true, body: data3 }, (err, res, body) => {
        id = body.data.id;
        done();
      });
    });


    it('should return a status code of 204 when the delete was succesful', (done) => {
      Request.delete(URL + id, (err, res, body) => {
        expect(res.statusCode).toBe(204);
        done();
        Request.get(URL + id, (err, res, body) => {
          expect(res.statusCode).toBe(404);
          done();
        });
      });
    });
  });
});
