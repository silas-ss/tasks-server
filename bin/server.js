const app = require('../src/app');

const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { mergeSchemas } = require('graphql-tools');
const { ApolloEngine } = require('apollo-engine');
const cors = require('cors');

const schemasMerged = require('../src/schema/schemasMerge');

app.use(cors());

app.use('/graphql', bodyParser.json(), graphqlExpress({ 
  schema: schemasMerged,
  tracing: true,
  cacheControl: true
}));

const engine = new ApolloEngine({
  apiKey: 'service:silas-ss-1884:mFUeBSZcMRnRcxBBLDvTlQ'
});

engine.listen({
  port: process.env.SERVICE_PORT,
  expressApp: app
});