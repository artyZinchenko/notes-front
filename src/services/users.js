import axios from 'axios'
const baseUrl =
  'https://notes-app-backend-ds8dm82uc-artyzinchenko.vercel.app/api/users'

const createUser = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { createUser }
