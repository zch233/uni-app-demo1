import request from '../request'

export function getGoodList (data) {
  return request('/collect/get_goods', data)
}

export function createOrder (data) {
  return request('/collect/add_order', data)
}

export function payNow (data) {
  return request('/collect/pay', data)
}

export function getBanner (data) {
  return request('/collect/image_info', data)
}

