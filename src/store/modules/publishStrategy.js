import {getPublishStrategy,getPublishedStrategy,getDetailPublishStrategyById,addPublishStrategy} from "@/api/publishStrategy"
const state={
    publishedStrategy:{}
}
const mutations={
    SET_PUBLISHED_STRATEGY: (state, strategy) => {
        state.publishedStrategy = strategy
    },
}
const actions={
    getPublishStrategyAction({state,commit},data){
        return new Promise((resolve, reject) => {
            getPublishStrategy(data).then((response) => {
                const data = response.data
                resolve(response)
            }).catch((err) => {
                console.log(err)
                reject(err)
            })
        })
    },
    //详情页攻略
    getDetailPublishStrategyAction({state,commit},data){
        return new Promise((resolve, reject) => {
            getDetailPublishStrategyById(data).then((response) => {
                const data = response.data
                resolve(response)
            }).catch((err) => {
                console.log(err)
                reject(err)
            })
        })
    },
    getPublishedStrategyAction({state,commit},data){
        return new Promise((resolve, reject) => {
            getPublishedStrategy(data).then((response) => {
                const data = response.data
                commit("SET_PUBLISHED_STRATEGY",data)
                resolve(response)
            }).catch((err) => {
                console.log(err)
                reject(err)
            })
        })
    },
    addPublishStrategyAction({state,commit},data){
        return new Promise((resolve, reject) => {
            addPublishStrategy(data).then((response) => {
                const data = response.data
                resolve(response)
            }).catch((err) => {
                console.log(err)
                reject(err)
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}



