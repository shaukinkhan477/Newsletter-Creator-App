// graphql/index.js
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const env = require('../config/env');

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');
const resolvers = require('./resolvers');

module.exports = async function applyGraphQL(app) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,

    introspection: env.enableGraphqlIntrospection,
    playground: !env.isProduction,

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
        payload = jwt.verify(token, env.jwtSecret);
      } catch {
        throw new AuthenticationError('Invalid or expired token');
      }

      // 3) attach userId to context for your resolvers
      return { userId: payload.userId || payload.id };
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
