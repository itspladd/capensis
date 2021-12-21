import axios from 'axios'

export function get() {
  return axios.get('/api/sessions/week')
}

export function getWeek(date) {
  return axios.get(`/api/sessions/week?date=${date.toISOString()}`)
}

export function getActive() {
  return axios.get('/api/sessions/current')
}

export function add(project_id) {
  return axios.post(`/api/sessions`, { project_id })
}

export function stop(id) {
  return axios.patch(`/api/sessions`, { id })
}

export function edit(session) {
  return axios.patch(`/api/sessions/${session.id}`, session)
}

export function remove(id) {
  return axios.delete(`/api/sessions/${id}`)
}