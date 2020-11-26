import axios from 'axios'
import handler from './handler'

function createResource() {
  const instance = axios.create({
    baseURL: process.env.baseUrl,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = 'Bearer ' + token
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  instance.interceptors.response.use((response) => {
    return Promise.resolve(response.data)
  }, (error) => {
    return Promise.reject(error.response.data)
  })

  return instance
}

export default createResource()

const web = createResource()
web.interceptors.request.use((config) => {
  config.baseURL = process.env.MIX_DASHBOARD_ROUTE_PREFIX
  return config
})

export { web }