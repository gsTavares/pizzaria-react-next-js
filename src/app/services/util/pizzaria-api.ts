import axios from "axios";

const pizzaria_api = axios.create({
    baseURL: 'http://localhost:3333'
});

export { pizzaria_api };