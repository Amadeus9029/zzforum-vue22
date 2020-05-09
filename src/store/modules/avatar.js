import {addOrUpdateAvatar} from "@/api/avatar"
const state={

}
const mutations={

}
const actions={
  addOrUpdateAvatarAction({state,commit},data){
    return new Promise((resolve, reject) => {
      addOrUpdateAvatar(data).then((response) => {
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



