import axios from 'axios'

export function checkCookie() {
  return axios.post(`/api/auth`)
}

export function login(username, rawPassword) {
  return axios.post(`/api/auth/login`, { username, rawPassword })
}

export function logout() {
  return axios.post(`/api/auth/logout`);
}