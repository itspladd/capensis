import api from 'api'

export function get() {
  return api.get('/api/blocks/week')
}

export function getWeek(date) {
  return api.get(`/api/blocks/week?date=${date.toISOString()}`)
}

export function add(block) {
  return api.post(`/api/blocks`, block)
}

export function edit(block) {
  return api.patch(`/api/blocks/${block.id}`, block)
}

export function remove(id) {
  return api.delete(`/api/blocks/${id}`)
}