import request from '../request'

export async function getGoodList (data) {
  return await request('/collect/get_goods', data)
}

export async function createOrder (data) {
  return await request('/collect/add_order', data)
}
