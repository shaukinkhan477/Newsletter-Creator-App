// graphql/index.js
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');
const resolvers = require('./resolvers');

module.exports = async function applyGraphQL(app) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,

    // enable introspection & Playground
    introspection: true,
    playground: true,

    context: ({ req }) => {
      // 1) If this is an introspection request, skip auth entirely
      const opName = req.body?.operationName;
      if (opName === 'IntrospectionQuery') {
        return {};
      }

      // 2) Otherwise, enforce our Bearer‑JWT check
      const auth = req.headers.authorization || '';
      if (!auth.startsWith('Bearer ')) {
        throw new AuthenticationError('You must be logged in');
      }

      const token = auth.slice(7);
      let payload;
      try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
      } catch {
        throw new AuthenticationError('Invalid or expired token');
      }

      // 3) attach userId to context for your resolvers
      return { userId: payload.userId };
    },
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
    // disable Apollo’s own CORS layer since you already do `app.use(cors())`
    cors: false,
  });
};
