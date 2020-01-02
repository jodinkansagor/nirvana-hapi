require('dotenv').config();
require('hapi');

// const request = require('supertest');
const server = require('../src/server');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');


describe('server routes', () => {
  beforeAll((done) => {
    connect();
    server.on('start', () => {
      done();
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  afterAll((done) => {
    server.on('stop', () => {
      done();
    });
    server.stop();
  });



  test('should add a show successfully', async function() {
    const options = {
      method: 'POST',
      url: '/',
      payload: JSON.stringify({ venue: 'Porch of Garden House', city: 'Wolf Creek', state: 'OR' })
    };
    const data = await server.inject(options);
    expect(data.statusCode).toBe(200);
    expect(data.result).toBe('Show added successfully');
  });


});
