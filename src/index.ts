import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: Number.parseInt(process.env.PORT) || 4000 },
});

console.log(`🚀  Server reday at: ${url}`);
