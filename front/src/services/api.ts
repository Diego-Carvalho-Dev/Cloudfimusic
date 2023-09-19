import axios from "axios";

const api = axios.create({
  baseURL: "https://cloudfimusicdb.onrender.com",
  timeout: 20000
});

export default api;
