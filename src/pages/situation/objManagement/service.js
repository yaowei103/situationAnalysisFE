import { request } from '@utils';

export function fetchObj({ page, keyWord }) {
  return request(`/objects?_page=${page}&_limit=${10}${keyWord ? `&keyWord=${keyWord}` : ''}`, {
    method: 'GET',
  });
}
export function removeObj(id) {
  return request(`/object/${id}`, {
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
  return request('/object', {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  });
}
