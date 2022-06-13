import axios from "axios";
import React from "react";

const instance = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: "Client-ID H4oRaODzx-C2WvBad5qLTWEAe8yLnSBTbD4cC2-SqXw",
  },
});
export default instance;
