import { request } from '@utils';

export function fetch({ page, keyWord }) {
  return request(`/levels?_page=${page}&_limit=${10}${keyWord ? `&keyWord=${keyWord}` : ''}`, {
    method: 'GET',
  });
}

export function updateLevel(values) {
  return request('/level', {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  });
}
// export function remove(id) {
//   return request(`/api/users/${id}`, {
//     method: 'DELETE',
//   });
// }
// export function patch(id, values) {
//   return request(`/api/users/${id}`, {
//     method: 'PATCH',
//     body: JSON.stringify(values),
//   });
// }
// export function create(values) {
//   return request('/api/users', {
//     method: 'POST',
//     body: JSON.stringify(values),
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     }
//   });
// }
