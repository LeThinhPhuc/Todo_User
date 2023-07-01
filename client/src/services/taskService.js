import axios from "axios";
// import http from "http";
const Endpoint="http://localhost:4000"
const taskService = {
    getAll: () => axios.create({
        baseURL: 'http://localhost:4000',
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          Accept: "application/x-www-form-urlencoded, text/plain",
        },
      }).get('/task'),
      

    getById: (id)=> axios.create({
        baseURL: 'http://localhost:4000/',
        timeout: 5000,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
            Accept: "application/x-www-form-urlencoded, text/plain",
        }
    }).get(`/task/${id}`),

    postTask: (task)=> axios.create({
        baseURL: 'http://localhost:4000/',
        timeout: 5000,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
            Accept: "application/x-www-form-urlencoded, text/plain",
        }
    }).post(`/task`, task),

    UpdateById: (id,user) => axios.create({
        baseURL: 'http://localhost:4000/',
        timeout: 5000,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
            Accept: "application/x-www-form-urlencoded, text/plain",
        }
    }).put(`/task/${id}`,user),

    DeleteById: (id) => axios.create({
        baseURL: 'http://localhost:4000/',
        timeout: 5000,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
            Accept: "application/x-www-form-urlencoded, text/plain",
        }
    }).delete(`/task/${id}`),

}

export default taskService;