import { request } from '@utils';

export function fetchIndex({ page, searchParam }) {
  return request(`/api/objList?_page=${page}&_limit=${10}&_searchParam=${searchParam}`, {
    method: 'GET',
  });
}
export function removeIndex(id) {
  return request(`/api/users/${id}`, {
    method: 'POST',
  });
}
// export function patch(id, values) {
//   return request(`/api/users/${id}`, {
//     method: 'PATCH',
//     body: JSON.stringify(values),
//   });
// }
export function createIndex(values) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
