import api from './api'

export function get() {
  return api.get(`/api/reports/week`)
}

export function getWeek(date) {
  return api.get(`/api/reports/week?date=${date.toISOString()}`)
}