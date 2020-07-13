import React, { useState } from 'react';
import {API} from "../services/api-service";
import * as ReactBootstrap from 'react-bootstrap';

function MovieForm(props) {
    const [ title, setTitle ] = useState(props.movie.title)
    const [ description, setDescription ] = useState(props.movie.description)

    const cancelClicked = () => {
        props.cancelForm();
    }
    const saveClicked = () => {
        API.saveMovie(props.token, {title, description})
            .then(resp => resp.json())
            .then(res => props.newMovie(res))
            .catch( error => console.log(error))
    }
    const updateClicked = () => {
        API.updateMovie(props.token, props.movie.id, {title, description})
            .then( resp => resp.json())
            .then( res => props.editedMovie(res))
            .catch( error => console.log(error))
    }

    const isDisabled = title.length === 0 || description.length === 0;

    return (
        <React.Fragment>
            <ReactBootstrap.Form>
            <ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Label>Title</ReactBootstrap.Form.Label>
            <ReactBootstrap.Form.Control type="text" placeholder="Enter movie title" name="title" value={title}
                onChange={evt => setTitle(evt.target.value)} />
            </ReactBootstrap.Form.Group>
            
            <ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Label>Description</ReactBootstrap.Form.Label>
            <ReactBootstrap.Form.Control as="textarea" rows="3" 
                onChange={evt => setDescription(evt.target.value)} value={description} />
            </ReactBootstrap.Form.Group>

            <ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.File id="image" label="Movie Picture" />
            </ReactBootstrap.Form.Group>
            { props.movie.id ?
                <ReactBootstrap.Button disabled={isDisabled} onClick={updateClicked}>Update</ReactBootstrap.Button> :
                <ReactBootstrap.Button disabled={isDisabled} onClick={saveClicked}>Save</ReactBootstrap.Button> }
            &nbsp;
            <ReactBootstrap.Button variant="contained" onClick={cancelClicked}>Cancel</ReactBootstrap.Button>
            </ReactBootstrap.Form>
        </React.Fragment>
    )
}

export default MovieForm;