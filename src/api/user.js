import request from '../request'

export async function login (data) {
  return await request('/minilogin', data)
}

export async function logout (data) {
  return await request('/logout', data)
}

export async function updateUserInfo (data) {
  return await request('/collect/user_edit', data)
}

export async function getOrderList (data) {
  return await request('/collect/get_order', data)
}
