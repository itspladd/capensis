import axios from 'axios'

export function get() {
  return axios.get('/api/projects')
}

export function add(project) {
  return axios.post(`/api/projects`, { project })
}

export function edit(project) {
  return axios.patch(`/api/projects/${project.id}`, { project })
}