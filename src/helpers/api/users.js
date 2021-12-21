import axios from 'axios'

export function add(username, rawPassword) {
  return axios.post(`/api/users`, { username, rawPassword })
}