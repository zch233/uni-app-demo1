import request from '../request'

export function login (data) {
  return request('/minilogin', data)
}

export function logout (data) {
  return request('/logout', data)
}

export function updateUserInfo (data) {
  return request('/collect/user_edit', data)
}

export function getOrderList (data) {
  return request('/collect/get_order', data)
}
