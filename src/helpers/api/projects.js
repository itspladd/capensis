import api from './api'

export function get() {
  return api.get('/api/projects')
}

export function add(project) {
  return api.post(`/api/projects`, { project })
}

export function edit(project) {
  return api.patch(`/api/projects/${project.id}`, { project })
}