const { v4: uuid } = require("uuid");

class Book {
  constructor(bookData) {
    this.id = bookData.id;
    this.title = bookData.title;
    this.description = bookData.description;
    this.authors = bookData.authors;
    this.favorite = bookData.favorite;
    this.fileCover = bookData.fileCover;
    this.fileName = bookData.fileName;
    this.fileBook = bookData.fileBook;
  }
}

const store = {
  library: [],
};

const getDefaultBooks = (bookCount = 3) => {
  let counter = 0;
  while (counter <= bookCount) {
    const book = {
      id: uuid(),
      title: `Book ${counter}`,
      description: `Description ${counter}`,
      authors: `Author ${counter}`,
      favorite: "",
      fileCover: `sample.png`,
      fileName: `book_${counter}`,
      fileBook: `sample.pdf`,
    };
    store.library.push(new Book(book));
    counter++;
  }
};

getDefaultBooks();

module.exports = store;
