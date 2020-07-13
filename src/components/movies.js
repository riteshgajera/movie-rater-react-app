import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { API } from '../services/api-service';
import {Table, Button} from 'react-bootstrap';

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
            <Table responsive>
            <thead>
            <tr>
                <th>#</th>
                <th>Movie Title</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            { props.movies.map( movie => {
                console.log(movie, movie.id, movie.title);
                
                return (
                        <tr key={movie.id}>
                            <td>{movie.id}</td>
                            <td onClick={movieClicked(movie)}>{movie.title}</td>
                            <td>
                                <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie)}/>
                                <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(movie)}/>
                            </td>
                        </tr>
                        
                   )
            })}
            </tbody>
            </Table>
            <Button variant="contained" onClick={newMovie}>Add new</Button>
        </div>
    )
}
export default Movies;