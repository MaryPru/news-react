import axios from 'axios';

export const fetchPosts = async (limit: number, skip: number) => {
    const response = await axios.get(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
    return response.data;
};