const express = require("express");
const router = express.Router();
const store = require("../store/library");
const { v4: uuid } = require("uuid");
const fileMulter = require("../middleware/file");

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

router.post(
  "/",
  fileMulter.fields([
    {
      name: "bookFile",
      maxCount: 1,
    },
    {
      name: "bookCover",
      maxCount: 1,
    },
  ]),
  (req, res) => {
    const { library } = store;

    const newBookData = {
      id: uuid(),
      title: req.body.bookTitle,
      description: req.body.bookDescription,
      authors: req.body.bookAuthors,
      favorite: "",
      fileCover: req.files.bookCover[0].filename,
      fileName: "",
      fileBook: req.files.bookFile[0].filename,
    };

    const newBook = new Book(newBookData);
    library.push(newBook);

    res.redirect("/");
  }
);

router.get("/:id", (req, res) => {
  const { library } = store;
  const { id } = req.params;
  const index = library.findIndex((el) => el.id === id);

  if (index !== -1) {
    const book = library[index];
    res.render("book", {
      book: book,
    });
  } else {
    res.render("404", {
      errorMessage: "Книга не найдена",
    });
  }
});

router.get("/update/:id", (req, res) => {
  const { library } = store;
  const { id } = req.params;
  const index = library.findIndex((el) => el.id === id);

  if (index !== -1) {
    const book = library[index];
    res.render("update", {
      book: book,
    });
  } else {
    res.render("404", {
      errorMessage: "Книга не найдена",
    });
  }
});

router.get("/:id/download", (req, res) => {
  const { library } = store;
  const { id } = req.params;
  const index = library.findIndex((el) => el.id === id);

  if (index !== -1) {
    const filePath = __dirname + "/../public/books/" + library[index].fileBook;
    res.download(filePath, function (err) {
      if (err) console.log(err);
    });
  } else {
    res.status(404);
    res.json("404 | book not found");
  }
});

router.post(
  "/update",
  fileMulter.fields([
    {
      name: "bookFile",
      maxCount: 1,
    },
    {
      name: "bookCover",
      maxCount: 1,
    },
  ]),
  (req, res) => {
    const { library } = store;
    const id = req.body.bookId;
    const index = library.findIndex((el) => el.id === id);

    if (index !== -1) {
      library[index] = {
        ...library[index],
        title: req.body.bookTitle,
        description: req.body.bookDescription,
        authors: req.body.bookAuthors,
        fileCover:
          req.files.bookCover && req.files.bookCover[0].filename
            ? req.files.bookCover[0].filename
            : library[index].fileCover,
        fileName:
          req.files.bookFile && req.files.bookFile[0].filename
            ? req.files.bookFile[0].filename
            : library[index].fileName,
      };

      res.redirect("/");
    } else {
      res.render("404", {
        errorMessage: "Книга не найдена",
      });
    }
  }
);

router.get("/delete/:id", (req, res) => {
  const { library } = store;
  const { id } = req.params;
  const index = library.findIndex((el) => el.id === id);

  if (index !== -1) {
    library.splice(index, 1);
    res.redirect("/");
  } else {
    res.render("404", {
      errorMessage: "Книга не найдена",
    });
  }
});

module.exports = router;
