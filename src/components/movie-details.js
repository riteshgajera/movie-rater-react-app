import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { API } from '../services/api-service';
import * as ReactBootstrap from 'react-bootstrap';
import {Card} from 'react-bootstrap';

function MovieDetails(props){

    const [highlighted, setHighlighted] = useState(-1)

    const highlightRate = high => evt => {
        setHighlighted(high);
    }
    const rateClicked = stars => evt => {
        API.rateMovie(props.token, props.movie.id, {stars: stars + 1})
            .then( resp => resp.json())
            .then( res => getDetails())
            .catch( error => console.log(error))
    }
    const getDetails = () => {
        API.getMovieDetails(props.token, props.movie.id)
            .then( resp => resp.json())
            .then( res => props.updateMovie(res))
            .catch( error => console.log(error))
    }

    return (
        <React.Fragment>
            { props.movie ? (
                
                <div>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={props.movie.image} alt={props.movie.title} width="285px" height="160px" />
                        <Card.Body>
                        <Card.Title>{props.movie.title}</Card.Title>
                        <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 0 ? 'static-star': ''}/>
                        <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 1 ? 'static-star': ''}/>
                        <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 2 ? 'static-star': ''}/>
                        <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 3 ? 'static-star': ''}/>
                        <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 4 ? 'static-star': ''}/>
                        <span>({props.movie.num_of_ratings})</span> 
                        <Card.Text>
                            {props.movie.description}
                        </Card.Text>
                        </Card.Body>
                    </Card>

                    <div className="rate-container">
                        <h2>Rate it !!!</h2>
                        { [...Array(5)].map( (e, i) => {
                            return <FontAwesomeIcon  key={i} icon={faStar} className={highlighted > i - 1 ? 'star-rating': ''}
                                onMouseEnter={highlightRate(i)} onMouseLeave={highlightRate(-1)} onClick={rateClicked(i)}/>
                        })}
                    </div>
                </div>
            ) : null }
        </React.Fragment>
    )
}

export default MovieDetails;