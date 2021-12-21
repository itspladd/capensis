import api from './api'

export function add(username, rawPassword) {
  return api.post(`/api/users`, { username, rawPassword })
}