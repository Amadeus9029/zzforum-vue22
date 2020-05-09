import {getStrategy,putStrategy} from "@/api/strategy"
const state={

}
const mutations={

}
const actions={
    getStrategyAction({state,commit},data){
        return new Promise((resolve, reject) => {
            getStrategy(data).then((response) => {
                const data = response.data
                resolve(response)
            }).catch((err) => {
                console.log(err)
                reject(err)
            })
        })
    },
    putStrategyAction({state,commit},data){
        return new Promise((resolve, reject) => {
            putStrategy(data).then((response) => {
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



