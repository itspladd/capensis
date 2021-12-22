import api from './api'

export function get() {
  return api.get('/api/sessions/week')
}

export function getWeek(date) {
  return api.get(`/api/sessions/week?date=${date.toISOString()}`)
}

export function getActive() {
  return api.get('/api/sessions/current')
}

export function add(project_id) {
  return api.post(`/api/sessions`, { project_id })
}

export function stop(id) {
  return api.patch(`/api/sessions`, { id })
}

export function edit(session) {
  return api.patch(`/api/sessions/${session.id}`, session)
}

export function del(id) {
  return api.del(`/api/sessions/${id}`)
}