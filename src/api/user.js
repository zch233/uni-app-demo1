import request from '../request'

export async function login (data) {
  return await request('/minilogin', data)
}
