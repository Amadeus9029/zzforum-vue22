import request from '@/utils/request'

//获取
export function getPublishStrategy(data) {
    return request({
        url: '/api/system/zz_publish_strategy/publish_strategy/page',
        method: 'post',
        data
    })
}
//有问题API
export function getPublishedStrategy() {
    return request({
        url: '/api/system/zz_publish_strategy/publish_strategy/problem',
        method: 'get'
    })
}
export function getPublishedStrategyById(data) {
    return request({
        url: '/api/system/zz_publish_strategy/publish_strategy_by_user/'+data.id + '/' + data.currentPage,
        method: 'post',
        data
    })
}
export function getPublishStrategyById(data) {
    return request({
        url: '/api/system/zz_publish_strategy/publish_strategy/'+data.id,
        method: 'post',
        data
    })
}
//获取详情页攻略
export function getDetailPublishStrategyById(data) {
    return request({
        url: '/api/system/zz_publish_strategy/detail_publish_strategy/'+data.id,
        method: 'post',
        data
    })
}
//添加
export function addPublishStrategy(data) {
    return request({
        url: '/api/system/zz_publish_strategy/publish_strategy',
        method: 'post',
        data
    })
}
//修改
export function putStrategy(data) {
    return request({
        url: '/api/system/zz_publish_strategy/publish_strategy',
        method: 'put',
        data
    })
}