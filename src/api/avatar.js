import request from '@/utils/request'

export function addOrUpdateAvatar(data) {
  return request({
    url:"/api/system/zz_user_avatar/avatar",
    method:"post",
    data
  })
}
