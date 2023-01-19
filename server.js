const express = require("express");
const app = express();
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
const bodyParserForm = bodyParser.urlencoded();
app.get("/", (req, res) => {
  res.render("home", { variable: "hi" });
});

// app.get(
//   "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css",
//   function (req, res) {
//     res.sendFile(
//       __dirname + "node_modules/bootstrap/dist/css/bootstrap.min.css"
//     );
//   }
// );
app.get("/style.css", function (req, res) {
  res.sendFile(__dirname +"/style.css");
});

let books = [

];

//Display all books
app.get("/home", function (req, res) {
  let fbooks = books;
  if (req.query.q) {
    fbooks = books.filter((books) => books.BookName.indexOf(req.query.q) > -1);
  }

  res.render("home.ejs", { data: fbooks });
});

//Add books
app.get("/", function (req, res) {
  res.render("home.ejs");
});
app.post("/", bodyParserForm, function (req, res) {
  books.push(req.body);
  //   saveDataToFile();
  res.render("home.ejs", { data: books });
});

//Delete books
app.post("/delete", function (req, res) {
  let bookIndex = books.findIndex(
    (books) => books.BookName == req.query.BookName
  );
  books.splice(bookIndex, 1);
  // saveDataToFile();
  res.render("home.ejs", { data: books });
});

//Update books
app.get("/updatebook", function (req, res) {
  let book = books.find(book => book.BookName == req.query.BookName);
  res.render("updatebook.ejs", { book });
});
app.post("/updatebook", bodyParserForm, function (req, res) {
  let book = books.find(book => book.BookName == req.body.BookName);
  book.BookName = req.body.BookName;
  book.BookAuthor = req.body.BookAuthor;
  // saveDataToFile();
  res.render("redirect.ejs");
  });
app.listen(8080);
