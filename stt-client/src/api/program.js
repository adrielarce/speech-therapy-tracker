import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:3000/program',
})

export const insertGoal = payload => api.post(``, payload)
export const getAllGoals = () => api.get(``)
export const updateGoalById = (id, payload) => api.put(`/${id}`, payload)
export const deleteGoalById = id => api.delete(`/${id}`)
export const getGoalById = id => api.get(`/${id}`)

const apis = {
    insertGoal,
    getAllGoals,
    updateGoalById,
    deleteGoalById,
    getGoalById,
}

export default apis