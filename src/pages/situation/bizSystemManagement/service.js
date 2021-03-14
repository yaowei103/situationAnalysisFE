import { request } from '@utils';

export function fetchBizSysList({ page, keyWord }) {
  return request(`/businesses?_page=${page}&_limit=${10}${keyWord ? `&keyWord=${keyWord}` : ''}`, {
    method: 'GET',
  });
}
export function removeBizSys(id) {
  return request(`/business?id=${id}`, {
    method: 'DELETE',
  });
}
export function updateBiz(values) {
  return request('/business', {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  });
}
// export function patch(id, values) {
//   return request(`/businesses${id}`, {
//     method: 'PATCH',
//     body: JSON.stringify(values),
//   });
// }
export function createBiz(values) {
  return request('/business', {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  });
}
