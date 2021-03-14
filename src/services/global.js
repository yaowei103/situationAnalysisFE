import { request } from '@utils';
export function logout() {
  return request('/logout', {
    method: 'GET',
  });
}
export function getSysInfo(payload) {
  // return request('/getSysInfo', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     ...payload,
  //   }),
  // });
  return Promise.resolve({
    data: {
      userInfo: {
        userName: "David"
      },
    },
    status: 0
  });
}
export function getMessage(payload) {
  return request('/getMessage', {
    method: 'POST',
    body: JSON.stringify({
      ...payload,
    }),
  });
}

export function getObjectOptions() {
  return request('/objectOptions', {
    method: 'GET'
  });
}

export function getIndicatorOptions() {
  return request('/indicatorOptions', {
    method: 'GET'
  });
}

export function getLevelOptions() {
  return request('/levelOptions', {
    method: 'GET'
  });
}