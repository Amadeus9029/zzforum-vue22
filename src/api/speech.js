import request from '@/utils/request'

export function speech(data) {
  return request({
    url:"/api/speech",
    method:"post",
    data
  })
}
