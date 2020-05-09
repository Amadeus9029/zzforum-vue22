import {getCommentStrategy,addCommentStrategy} from "@/api/commentStrategy"
const state={

}
const mutations={

}
const actions={
    getCommentStrategyAction({state,commit},data){
        return new Promise((resolve, reject) => {
            getCommentStrategy(data).then((response) => {
                const data = response.data
                resolve(response)
            }).catch((err) => {
                console.log(err)
                reject(err)
            })
        })
    },
    addCommentStrategyAction({state,commit},data){
        return new Promise((resolve, reject) => {
            addCommentStrategy(data).then((response) => {
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



