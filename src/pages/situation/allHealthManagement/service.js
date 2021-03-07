import { request } from '@utils';

export function fetch() {
  return request(`/api/allHealthList`, {
    method: 'GET',
  });
}
export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}
export function patch(id, values) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}
export function create(values) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
