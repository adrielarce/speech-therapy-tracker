import axios from 'axios'
import { API } from "aws-amplify";

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertMovie = payload => api.post(`/movie`, payload)
export const getAllMovies = () => api.get(`/movies`)
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getMovieById = id => api.get(`/movie/${id}`)


export const createClient = (content) => API.post("stt", "/client", {body: content});
export const listClients = () => API.get("stt", "/clients");
export const createProgram = (content) => API.post("stt", "/program", {body: content});
export const listPrograms = (client) => API.get("stt", `/programs/${client}`);
export const addGoal = (content) => API.put("stt", "/goal", {body: content});
export const updateGoal = (id, content) => API.put("stt", `/goal${id}`, {body: content});
export const listGoals = (id) => API.get("stt", `/goals/${id}`);


const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    createClient,
    listClients,
    createProgram,
    listPrograms,
    addGoal,
    updateGoal,
    listGoals,
}

export default apis