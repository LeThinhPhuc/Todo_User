import axios from 'axios';

const authService = {
    logIn : (user)=> axios.create({
        baseURL: 'http://localhost:4000',
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/x-www-form-urlencoded, text/plain",
        },
    }).post('/v1/auth/login', user),

    register : (user) => axios.create({
        baseURL: 'http://localhost:4000',
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/x-www-form-urlencoded, text/plain",
        },
    }).post('/v1/auth/register', user),

    logOut : (user) => axios.create({
        baseURL: 'http://localhost:4000',
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/x-www-form-urlencoded, text/plain",
        },
    }).post('/v1/auth/logout', user)
}

export default authService;