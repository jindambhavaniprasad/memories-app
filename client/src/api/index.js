import axios from 'axios'
import { backendURL } from '../constants/actionTypes';

const API = axios.create({ baseURL: backendURL })

API.interceptors.request.use((req) => {
    console.log(localStorage.getItem('profile'));
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

const postsUrl = '/posts';

export const fetchPosts = () => API.get(postsUrl);

export const createPost = (newPost) => API.post(postsUrl, newPost)

export const updatePost = (id, updatedPost) => API.patch(`${postsUrl}/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`${postsUrl}/${id}`);

export const likePost = (id) => API.patch(`${postsUrl}/${id}/likePost`);

const authUrl = '/users';

export const signIn = (formData) => API.post(`${authUrl}/signin`, formData);

export const signUp = (formData) => API.post(`${authUrl}/signup`, formData);

