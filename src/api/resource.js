import request from '@/utils/request';
//获取
export function getResource() {
  return request({
    url: '/api/system/zz_resource/resource',
    method: 'get',
  })
}
//重新获取
export function refreshResource(data){
  return request({
    url: '/api/system/zz_resource/refreshResource/'+data.id,
    method: 'post',
    data
  })
}
//修改
export function putResource(data) {
  return request({
    url: '/api/system/zz_resource/resource',
    method: 'put',
    data
  })
}
//删除
export function deleteResource(data) {
  return request({
    url: '/api/system/zz_resource/resource',
    method: 'delete',
    data
  })
}
//添加
export function addResource(data) {
  return request({
    url: '/api/system/zz_resource/resource',
    method: 'post',
    data
  })
}
//最近编辑
export function getRecentEditedResource(data) {
  return request({
    url: '/api/system/zz_resource/recentEditedResource',
    method: 'get',
    data
  })
}
