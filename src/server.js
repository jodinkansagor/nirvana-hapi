const Hapi = require('hapi');
require('dotenv').config();
const Mongoose = require('mongoose');

require('../lib/utils/connect')();

//create server
const server = new Hapi.Server({
  host: 'localhost',
  port: 8888
});

//routes
server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'I am the home route';
  }
});

//define start function
const launch = async() => {
  try {
    await server.start();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${server.info.uri}`);
};


//start server
launch();



