import axios from 'axios';
export const axiosInstance = axios.create({
    baseURL: 'https://strive-school-students-blog.herokuapp.com/api',
});