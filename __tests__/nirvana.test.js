require('dotenv').config();

const request = require('supertest');
const server = require('../src/server');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Nirvana = require('../lib/models/Nirvana');

describe('server routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let nirvana;
  let date;
  beforeEach(async () => {
    nirvana = await Nirvana.create({
      venue: 'City Gardens',
      city: 'Trenton',
      state: 'New Jersey',
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new nirvana', () => {
    return request(server)
      .post('/api/v1/hapinirvana')
      .send({
        venue: 'City Gardens',
        city: 'Trenton',
        state: 'New Jersey'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          venue: 'City Gardens',
          city: 'Trenton',
          state: 'New Jersey',
          __v: 0
        });
      });
  });

  it('gets a nirvana show by Id', () => {
    return request(server)
      .get(`/api/v1/hapinirvana/${nirvana.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: nirvana.id,
          venue: 'City Gardens',
          city: 'Trenton',
          state: 'New Jersey',
          __v: 0
        });
      });
  });

  it('gets all nirvana shows', () => {
    return request(server)
      .get('/api/v1/hapinirvana')
      .then(res => {
        expect(res.body).toEqual([{
          _id: nirvana.id,
          venue: 'City Gardens',
          city: 'Trenton',
          state: 'New Jersey',
          __v: 0
        }]);
      });
  });

  it('updates a nirvana show', () => {
    return request(server)
      .patch(`/api/v1/hapinirvana/${nirvana.id}`)
      .send({ recorded: 'false' })
      .then(res => {
        expect(res.body).toEqual({
          _id: nirvana.id,
          venue: 'City Gardens',
          city: 'Trenton',
          state: 'New Jersey',
        });
      });
  });

  it('deletes a nirvana concert', () => {
    return request(server)
      .delete(`/api/v1/hapinirvana/${nirvana.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: nirvana.id,
          venue: 'City Gardens',
          city: 'Trenton',
          state: 'New Jersey',
          __v: 0
        });
      });
  });
});