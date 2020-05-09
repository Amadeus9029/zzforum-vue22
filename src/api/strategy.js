import request from '@/utils/request'

//获取
export function getStrategy(data) {
    return request({
        url: '/api/system/zz_strategy/strategy/'+data.id,
        method: 'post',
        data
    })
}
//修改
export function putStrategy(data) {
    return request({
        url: '/api/system/zz_strategy/strategy',
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