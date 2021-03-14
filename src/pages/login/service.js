import { request } from '@utils';

export function login(payload) {
  const { username, password } = payload;
  return request(`/user/login?username=${username}&password=${password}`, {
    method: 'POST',
    // data: {
    //   ...payload,
    // },
    headers: {
      'Content-Type': 'x-www-form-urlencoded',
      'Accept': 'application/json',
    }
  });
}