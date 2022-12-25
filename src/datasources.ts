// Use our automatically generated Book and AddBookMutationResponse types
// for type safety in our data source class.
import { AddBookMutaionResponse, Book } from "./__generated__/resolvers-types";

export class BooksDataSource {
  books: { title?: string; author?: string }[] = [
    {
      title: "The Awakening",
      author: "Kate Chopin",
    },
    {
      title: "City of Glass",
      author: "Paul Auster",
    },
  ];

  getBooks(): Book[] {
    // simulating fetching a list of books
    return this.books;
  }

  // We are using a static data set for this small example, but normally
  // this Mutation would *mutate* our underlying data using a database
  // or a REST API.
  async addBook(book: Book): Promise<AddBookMutaionResponse> {
    this.books.push(book);
    console.log(this.books);

    return {
      code: "200",
      success: true,
      message: "New book added!",
      book: this.books[this.books.length - 1],
    };
  }
}
