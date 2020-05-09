import request from '@/utils/request'

//获取
export function getCommentStrategy(data) {
    return request({
        url: '/api/system/zz_comment_strategy/comment_strategy/'+data.id,
        method: 'post',
        data
    })
}
export function addCommentStrategy(data) {
    return request({
        url: '/api/system/zz_comment_strategy/add_comment_strategy',
        method: 'post',
        data
    })
}