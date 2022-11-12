import axios from 'axios'
const baseUrl = 'https://notes-app-backend-4ksr.onrender.com/api/users'

const createUser = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { createUser }
