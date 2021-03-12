import { request } from '@utils';

export function fetchObj({ page, searchParam }) {
  return request(`/api/arrangeList?_page=${page}&_limit=${10}&_searchParam=${searchParam}`, {
    method: 'GET',
  });
}
export function removeObj(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}
// export function patch(id, values) {
//   return request(`/api/users/${id}`, {
//     method: 'PATCH',
//     body: JSON.stringify(values),
//   });
// }
export function createObj(values) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
