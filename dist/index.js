import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { BooksDataSource } from "./datasources.js";
import resolvers from "./resolvers.js";
const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });
/*
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: Number.parseInt(process.env.PORT) || 4000 },
});
 */
const server = new ApolloServer({
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
