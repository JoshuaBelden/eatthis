import axios from 'axios'

export const setRequestDefaults = (url: string) => {
  axios.defaults.baseURL = url
  axios.defaults.headers.post['Content-Type'] = 'application/json'
}

export const setAuthHeader = (token: string) => {
  axios.defaults.headers.common['x-auth-token'] = token
}

export const getAuthToken = async (email: string, password: string) => {
  const response = await axios.post('auth', {
    email,
    password,
  })
  return response.data.token
}

export const getUser = async () => {
  const response = await axios.get('auth')
  return response.data
}
