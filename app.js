const Hapi = require('hapi');
const config = require('./config');

const { host, port } = config;

const server = Hapi.server({
  host,
  port
});

const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`)
}

init();
