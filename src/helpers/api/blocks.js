import axios from 'axios'

export function get() {
  return axios.get('/api/blocks/week')
}

export function getWeek(date) {
  return axios.get(`/api/blocks/week?date=${date.toISOString()}`)
}

export function add(block) {
  return axios.post(`/api/blocks`, block)
}

export function edit(block) {
  return axios.patch(`/api/blocks/${block.id}`, block)
}

export function remove(id) {
  return axios.delete(`/api/blocks/${id}`)
}