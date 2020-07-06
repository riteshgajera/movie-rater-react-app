import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { API } from '../services/api-service';

function Movies(props) {
    const token = localStorage.getItem('token');
    const movieClicked = movie => evt => {
        props.movieClicked(movie);
    };
    const editClicked = movie => {
        props.editClicked(movie);
    }
    const removeClicked = movie => {
        API.deleteMovie(token, movie.id)
            .then( resp => props.movieDeleted(movie))
            .catch( error => console.log(error))
    };
    const newMovie = () => {
        props.newMovie();
    };
    
    return (
        <div>
            { props.movies.map( movie => {
                console.log(movie, movie.id, movie.title);
                return (
                    <div key={movie.id} className="movie-item">
                        <h3 onClick={movieClicked(movie)}>
                            {movie.title}
                        </h3>
                        <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie)}/>
                        <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(movie)}/>
                    </div>
                )
            })}
            <button onClick={newMovie}>Add new</button>
        </div>
    )
}
export default Movies;