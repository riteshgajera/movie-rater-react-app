import React, {useState, useEffect} from 'react';
import { API } from '../services/api-service';
import * as ReactBootstrap from 'react-bootstrap';

function Auth(props) {

    const token = localStorage.getItem('token');

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ isLoginView, setIsLoginView ] = useState(true);

    useEffect(()=>{
        if(token) window.location.href = '/movies';
    },[token])

    const login = event => {
        if(isLoginView) {
            API.loginUser({username, password})
                .then( resp => resp.json())
                .then( resp => {
                    console.log(resp.token);
                    localStorage.setItem('token', resp.token)
                    window.location.href = "/movies";
                })
                .catch( error => console.log(error))
        } else {
            API.signupUser({username, password, confirmPassword})
                .then( resp => resp.json())
                .then( resp => {
                    setIsLoginView(true);
                })
                .catch( error => console.log(error))
        }
    }
    const toggleView = () => {
        setIsLoginView(!isLoginView);
    }

    let passwordInput;
    let isDisabled = false;
    if (!isLoginView) {
        isDisabled = username.length === 0 || password.length === 0 || confirmPassword.length === 0;
        passwordInput = <ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Control 
                    type="password" 
                    name="password2" 
                    value={confirmPassword} 
                    placeholder="Confirm Password"
                    onChange={evt => setConfirmPassword(evt.target.value)} />
        </ReactBootstrap.Form.Group>
    } else {
        isDisabled = username.length === 0 || password.length === 0;
    }
    return (
        <div className="login-container">
        <h1>
            { isLoginView ? 'Login' : 'Sign Up'}
        </h1>
        <ReactBootstrap.Form>
            <ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Control 
                    type="text" 
                    name="username" 
                    value={username} 
                    placeholder="Username"
                    onChange={evt => setUsername(evt.target.value)} />
            </ReactBootstrap.Form.Group>

            <ReactBootstrap.Form.Group>
                <ReactBootstrap.Form.Control 
                    type="password" 
                    name={ isLoginView ? 'password' : 'password1'} 
                    value={password} 
                    placeholder="Password"
                    onChange={evt => setPassword(evt.target.value)} />
            </ReactBootstrap.Form.Group>
            {passwordInput}
            <ReactBootstrap.Button onClick={login} disabled={isDisabled}>
                { isLoginView ? 'LogIn' : 'Sign Up'}
            </ReactBootstrap.Button>
        </ReactBootstrap.Form>
        <span onClick={toggleView} className="p-text">
            { isLoginView ? "Don't have an account? Sign up" : 'Do you already have an account? LogIn here!'}
        </span>
    </div>
    )
}

export default Auth;