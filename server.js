const Koa = require('koa');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const schema = require('./graphql/schema');
const initDB = require('./database');
const config = require('./config');

const app = new Koa();
initDB();

app.use(mount('/api', graphqlHTTP({
  schema,
  graphiql: true
})))

app.listen(config.port, () => {
  console.log(`Server started on ${config.port}`);
});


app.on('error', err => {
  log.error('server error', err);
})
