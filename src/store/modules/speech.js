import {speech} from "@/api/speech"
const state={

}
const mutations={

}
const actions={
  speechAction({state,commit},data){
    return new Promise((resolve, reject) => {
      speech(data).then((response) => {
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



