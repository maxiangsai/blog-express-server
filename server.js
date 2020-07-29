const Koa = require('koa');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const schema = require('./graphql/schema');
const initDB = require('./database');
require('dotenv').config();

const app = new Koa();
initDB();

app.use(mount('/api', graphqlHTTP({
  schema,
  graphiql: true
})));

app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});

app.on('error', err => {
  console.error('server error', err);
});
