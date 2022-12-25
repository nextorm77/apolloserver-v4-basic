import { Resolvers } from "./__generated__/resolvers-types";

// Use the generated 'Resolvers' type to type cheack our resolvers!
const resolvers: Resolvers = {
  Query: {
    // Our third argument (`contextValue`) has a type here, so we
    // can check the properties within our resolver's shared context value.
    books: async (_, __, contextValue) => {
      return await contextValue.dataSources.booksAPI.getBooks();
    },
  },
  Mutation: {
    // Below, we mock adding a new book. Our data set is static for this
    // example, so we won't actually modify our data.
    addBook: async (_, { title, author }, { dataSources }) => {
      return await dataSources.booksAPI.addBook({ title, author });
    },
  },
};

export default resolvers;
