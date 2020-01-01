const Hapi = require('hapi');
require('dotenv').config();
const Mongoose = require('mongoose');
const Nirvana = require('../lib/models/Nirvana');

require('../lib/utils/connect')();

//create server
const server = new Hapi.Server({
  host: 'localhost',
  port: 8888
});

//routes
server.route({
  method: 'POST',
  path: '/',
  handler: async (request, h) => {

    try {
      const nirvana = new Nirvana(request.payload);
      const result = await nirvana.save();
      return h.response(result);
    } catch (error) {
      return h.response(error).code(500);
    }
  }
});

server.route({
  method: 'GET',
  path: '/nirvana',
  handler: async (request, h) => {
    try {
      const nirvana = await Nirvana.find().exec();
      return h.response(nirvana);
    } catch (error) {
      return h.response(error).code(500);
    }
  }
});

// server.route({
//   method: 'GET',
//   path: 'nirvana/{id}',
//   handler: async (request, h) => {
//     try {
//       const nirvana = await Nirvana.findById(request.params.id).exec();
//       return h.response(nirvana);
//     } catch (error) {
//       return h.response(error).code(500);
//     }
//   }
// });

// server.route({
//   method: 'PATCH',
//   path: 'nirvana/{id}',
//   handler: async (request, h) => {
//     try {
//       const result = new Nirvana.findByIdAndUpdate(request.params.id, request.payload, { new: true });
//       return h.response(result);
//     } catch (error) {
//       return h.response(error).code(500);
//     }
//   }
// });

// server.route({
//   method: 'DELETE',
//   path: '/nirvana/{id}',
//   handler: async (request, h) => {
//     try {
//       var result = await Nirvana.findByIdAndDelete(request.params.id);
//       return h.response(result);
//     } catch (error) {
//       return h.response(error).code(500);
//     }
//   }
// });

//define start function
const launch = async () => {
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



