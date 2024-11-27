const request = require('supertest');
const app = require('../index.js');

describe('Testing app', () => {
  it('response from GET / should be 200', done => {
    request(app).get('/').expect(200).expect('Ok').end(done);
  });

  it('response from GET /users/4 should be 200 {name: "User"}', done => {
    request(app).get('/users/4').expect(200).expect({ name: 'User' }).end(done);
  });
});
