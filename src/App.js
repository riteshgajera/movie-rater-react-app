import React, {useState, useEffect } from 'react';
import './App.css';
import Movies from './components/movies';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { useFetch } from './hooks/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'

function App(props) {
  const token = localStorage.getItem('token');
  const [ moviesAPI, loadingMovies, errorMovies] = useFetch("loadMovies");
  const [ movies, setMovies ] = useState();
  const [ selectedMovie, setSelectedMovie ] = useState(null)
  const [ editedMovie, setEditedMovie ] = useState(null)

  useEffect(()=>{
    if(!token){
      window.location.href = '/';
    }
  },[token])

  useEffect(()=>{
    setMovies(moviesAPI)
  },[moviesAPI])

  const logoutClicked = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  }
  const movieDeleted = selMovie => {
    const newMovies = movies.filter( movie => movie.id !== selMovie.id);
    setMovies(newMovies);
    setSelectedMovie(null);
  }
  const editClicked = selMovie => {
    setEditedMovie(selMovie);
  }
  const newMovie = () => {
    setEditedMovie({title: '', description: ''});
  }
  const cancelForm = () => {
    setEditedMovie(null);
  }
  const addMovie = movie => {
    setMovies([...movies, movie]);
  }

  if(loadingMovies) return <h1>Loading...</h1>
  if(errorMovies) return <h1>Error loading movies</h1>
  if (movies) {
    return (
      <div className="App">
          <h1>
            <FontAwesomeIcon icon={faFilm}/>
            <span className="app-title">Movie Rater</span>
            <button className="btn-logout" onClick={logoutClicked}>Logout</button>
          </h1>
          <div className="layout">
            <Movies movies={movies} movieClicked={loadMovie} token={token}
              movieDeleted={movieDeleted} editClicked={editClicked} newMovie={newMovie}/>
            <div>
              { !editedMovie ?
                <MovieDetails movie={selectedMovie} updateMovie={loadMovie}  token={token}/>
               : <MovieForm movie={editedMovie} cancelForm={cancelForm}
               newMovie={addMovie} editedMovie={loadMovie} token={token}/> }
            </div>
            
          </div>
      </div>
    );
  } else {
    return null;
  }
    
}
export default App;