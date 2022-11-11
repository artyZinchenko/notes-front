import axios from 'axios'
const baseUrl = 'https://web-production-7680.up.railway.app/api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}
export default { login }
