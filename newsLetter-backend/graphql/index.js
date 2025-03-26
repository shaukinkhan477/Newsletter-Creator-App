const fs = require('fs');
const path = require('path');

// Read the GraphQL schema from the schema.graphql file
const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');

// Import resolvers
const resolvers = require('./resolvers');

// Export both the type definitions and resolvers
module.exports = { typeDefs, resolvers };
