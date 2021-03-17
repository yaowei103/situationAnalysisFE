import { request } from '@utils';

export function fetchIndex({ page, keyWord }) {
  return request(`/indicators?pageNum=${page}&pageSize=${10}${keyWord ? `&keyWord=${keyWord}` : ''}`, {
    method: 'GET',
  });
}
export function removeIndex(id) {
  return request(`/indicator?id=${id}`, {
    method: 'Delete',
  });
}
// export function patch(id, values) {
//   return request(`/ api / users / ${ id }`, {
//     method: 'PATCH',
//     body: JSON.stringify(values),
//   });
// }
export function createIndex(values) {
  return request('/indicator', {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  });
}
