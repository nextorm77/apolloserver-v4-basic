import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
// js파일 컴파일시 로컬 모듈은 확장자(.js) 필수
import { BooksDataSource } from "./datasources.js";
// js파일 컴파일시 로컬 모듈은 확장자(.js) 필수
import resolvers from "./resolvers.js";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

/* 
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
 */

export interface MyContext {
  dataSources: {
    booksAPI: BooksDataSource;
  };
}

/* 
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: Number.parseInt(process.env.PORT) || 4000 },
});
 */

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => {
    return {
      dataSources: {
        booksAPI: new BooksDataSource(),
      },
    };
  },
  listen: { port: Number.parseInt(process.env.PORT) || 4000 },
});

console.log(`🚀  Server reday at: ${url}`);
