const express = require("express"); //Creates the express server
const app = express(); //Create an app through express server
const mysql = require("mysql"); //Access mysql via the installed driver
const bodyParser = require("body-parser");
const cors = require("cors");

//DB configuration
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "crud_database",
});

app.use(cors()); //configuring and applying the CORS (Cross-Origin Resource Sharing) middleware in the application
app.use(express.json()); // middleware tells the Express application to parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); //parse incoming request bodies in a middleware (this use extended mode to parse url encoded data)

//GET request to get all the data from the table
app.get("/api/get", (req, res) => {
  const sqlSelect = `SELECT * FROM tbl_movie_reviews`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

//DELETE request to delete a record
app.delete("/api/delete/:movieName", (req, res) => {
  const name = req.params.movieName;
  const sqlDelete = `DELETE FROM tbl_movie_reviews where movieName = ?`;
  db.query(sqlDelete, name, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

//UPDATE request to update a record
app.put("/api/update", (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;
  console.log(name);
  console.log(review);
  const sqlUpdate = `UPDATE tbl_movie_reviews SET movieReview = ? WHERE  movieName = ?`;
  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

//POST request to insert movie reviews
app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert = `INSERT INTO tbl_movie_reviews (movieName, movieReview) VALUES (?, ?)`;
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result);
  });
});

//Creates the initial route of the app (sample to understand)
//req: require, res: response
// app.get("/", (req, res) => {
//   const sqlInsert = `INSERT INTO tbl_movie_reviews (movieName, movieReview) VALUES ('inception', 'good movie');`;
//   db.query(sqlInsert, (err, result) => {
//     res.send("Movie reviewed");
//   });
// });


//defining the port to run the app
app.listen(3001, () => {
  console.log("running on port 3001");
});
