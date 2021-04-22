import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:3000/user',
})

export const createUser = payload => api.post(``, payload)
export const getUser = id => api.get(`/${id}`)
export const updateUser = (id, payload) => api.put(`/${id}`, payload)
export const deleteUserById = id => api.delete(`/${id}`)

const apis = {
    createUser ,
    getUser,
    updateUser,
    deleteUserById,
}

export default apis