import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true // важно для cookie
})

export default api