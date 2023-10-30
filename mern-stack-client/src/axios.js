import axios from "axios";

const instance = axios.create({
    baseURL: "https://ecommerce-kknr.onrender.com",
    withCredentials: true, 
});

export default instance;
