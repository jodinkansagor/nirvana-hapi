require('dotenv').config();

// const request = require('supertest');
const server = require('../src/server');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Nirvana = require('../lib/models/Nirvana');

describe('server routes', () => {
  beforeAll(() => {
    connect();
  });

  // beforeEach(() => {
  //   return mongoose.connection.dropDatabase();
  // });

  afterAll(() => {
    return mongoose.connection.close();
  });

  test('should add a show successfully', async function() {
    const options = {
      method: 'POST',
      url: '/',
      payload: JSON.stringify({ venue: 'The Middle East', city: 'Cambridge', state: 'MA' })
    };
    const data = await server.inject(options);
    expect(data.statusCode).toBe(200);
    expect(data.result).toBe('Show added successfully');
  });


});
