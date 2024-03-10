import "./App.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieReviewList(response.data);
      console.log(response.data);
    });
  }, []);

  //action on button onclick
  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

    //whenever a new movie review is added automatically rendering that new movie to the list without browser refresh
    setMovieReviewList([
      ...movieReviewList,
      {
        movieName: movieName,
        movieReview: review,
      },
    ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put(`http://localhost:3001/api/update`, {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
          style={{ marginBottom: "20px" }}
        />
        <label>Review:</label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
          style={{ marginBottom: "20px" }}
        />
        <button onClick={submitReview} style={{ marginBottom: "40px" }}>
          Submit
        </button>

        {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h4>{val.movieName}</h4>
              <p> {val.movieReview}</p>
              <button
                style={{ marginRight: "10px" }}
                onClick={() => {
                  deleteReview(val.movieName);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="inputUpdate"
                style={{ marginRight: "10px" }}
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateReview(val.movieName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
