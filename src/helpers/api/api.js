import axios from 'axios'

// All API functions invoke this handler.
// Error handling and response extraction should happen here.
function apiResponseHandler(config) {
  return axios(config)
    .then(res => res.data)
}

function get(url, data) {
  return apiResponseHandler({ method: 'get', url, data })
}

function post(url, data) {
  return apiResponseHandler({ method: 'post', url, data })
}

function patch(url, data) {
  return apiResponseHandler({ method: 'patch', url, data })
}

function del(url, data) {
  return apiResponseHandler({ method: 'delete', url, data })
}

const api = {
  get,
  post,
  patch,
  del
}

export default api;