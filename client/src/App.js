import React, { useState,useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./Movies/UpdateForm";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const[movies, setMovies] = useState([]);

  useEffect(()=> {
    
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  },[setMovies])




  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" render={props=> <MovieList movies={movies} {...props}/> } />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} movies={movies} setMovies={setMovies} />;
        }}
      />
      <Route path="/update-movie/:id" render={props => { return <UpdateForm movies={movies} setMovies={setMovies} {...props}/>}}/>
      
    </>
  );
};

export default App;
