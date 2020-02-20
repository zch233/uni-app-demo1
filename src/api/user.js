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

export function getCouponList (data) {
  return request('/collect/get_coupon', data)
}

export function getUserInfo (data) {
  return request('/collect/user_info', data)
}

export function cancelOrder (data) {
  return request('/collect/del_order', data)
}

export function confirmOrder (data) {
  return request('/collect/receive_order', data)
}

export function getQRCode (data) {
  return request('/collect/get_unlimited', data)
}

export function globalInfo (data) {
  return request('/collect/global_info', data)
}

export function payVip (data) {
  return request('/collect/develop_pay', data)
}
