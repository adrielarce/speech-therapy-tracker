import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/sessions/api',
})

export const createSession = payload => api.post(`/sessions`, payload)
export const getAllSessions = () => api.get(`/sessions`)
export const updateSessionById = (id, payload) => api.put(`/sessions/${id}`, payload)
export const deleteSessionById = id => api.delete(`/sessions/${id}`)
export const getSessionById = id => api.get(`/sessions/${id}`)

const apis = {
    createSession,
    getAllSessions,
    updateSessionById,
    deleteSessionById,
    getSessionById,
}

export default apis