import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://emilian-kasemi-blog.herokuapp.com/api/",
});
