import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:4200",
    withCredentials: true, 
});

export default instance;
