import axios from "axios";
import React from "react";

const instance = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: import.meta.env.VITE_API_KEY,
  },
});
export default instance;
