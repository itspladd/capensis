import api from './api'

export function check() {
  return api.post(`/api/auth`)
}

export function login(username, rawPassword) {
  return api.post(`/api/auth/login`, { username, rawPassword })
}

export function logout() {
  return api.post(`/api/auth/logout`);
}