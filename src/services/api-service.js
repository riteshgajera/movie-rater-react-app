import {BACKEND_API_URL} from '../config/app.config';
export class API {
    
    static loginUser(data) {
        return fetch(`${BACKEND_API_URL}/auth/`, {
            method: 'POST',
            headers: {   
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( data )
        })
    }

    static signupUser(data) {
        return fetch(`${BACKEND_API_URL}/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( data )
        })
    }

    static loadMovies(token) {
        return fetch(`${BACKEND_API_URL}/api/movies/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
    }

    static getMovieDetails(token, id) {
        return fetch(`${BACKEND_API_URL}/api/movies/${id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
    }

    static saveMovie(token, data) {
        console.log('While creating new movie - Token',token)
        return fetch(`${BACKEND_API_URL}/api/movies/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(data)
        })
    }

    static updateMovie(token, id, data) {
        return fetch(`${BACKEND_API_URL}/api/movies/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(data)
        })
    }

    static deleteMovie(token, id) {
        return fetch(`${BACKEND_API_URL}/api/movies/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
    }

    static rateMovie(token, id, data) {
        return fetch(`${BACKEND_API_URL}/api/movies/${id}/rate_movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(data)
            })
    }
}