import axios from "axios";

export const CustomAxiosPost = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  withCredentials: true,
});

export const CustomAxiosGet = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  withCredentials: true,
});
