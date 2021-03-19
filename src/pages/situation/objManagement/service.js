import { request } from '@utils';

export function fetchObj({ page, keyWord }) {
  return request(`/objects?pageNum=${page}&pageSize=${10}${keyWord ? `&keyWord=${keyWord}` : ''}`, {
    method: 'GET',
  });
}
export function removeObj(id) {
  return request(`/object?id=${id}`, {
    method: 'DELETE',
  });
}

export function updateObj(values) {
  return request(`/object`, {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
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
