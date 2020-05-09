import {getResource,addResource,putResource,deleteResource,getRecentEditedResource,refreshResource} from "@/api/resource"
const state={
  resource:[],
  currentResource:[],
  currentResourcePath:"我的文档",
  sourceArray:[],
  recentEditedResource:[]
}
const mutations={
  SET_RESOURCE: (state, resource) => {
    state.resource = resource
  },
  SET_CURRENT_RESOURCE: (state,resource) => {
    if(!resource){  //新建文件夹后，children为Undefined,点击文件夹会报错，所以设置为空数组
      resource = []
    }
    state.currentResource = resource
  },
  SET_RECENT_EDITED_RESOURCE: (state,resource) => {
    state.recentEditedResource = resource
  },
  DEL_CURRENT_RESOURCE: (state,id) => {
    state.currentResource.splice(state.currentResource.findIndex(item=>item.id===id),1)
  },
  SET_EACH_RECENT_EDITED_RESOURCE_MEMBER: (state,data) => {
    state.recentEditedResource && state.recentEditedResource.forEach(item=>{item[data.member]=data.value})
  },
  SET_SOME_RECENT_EDITED_RESOURCE_MEMBER: (state,data) => {
    state.recentEditedResource[data.index][data.member] = data.value
  },
  SET_EACH_CURRENT_RESOURCE_MEMBER: (state,data) => {
    state.currentResource && state.currentResource.forEach(item=>{item[data.member]=data.value})
  },
  SET_SOME_CURRENT_RESOURCE_MEMBER: (state,data) => {
    state.currentResource[data.index][data.member] = data.value
  },
  SET_SOURCE_ARRAY: (state, source) => {
    state.sourceArray = source
  },
  SET_CURRENT_RESOURCE_PATH: (state,path) => {
    state.currentResourcePath = path
  },
  ADD_SOURCE_ARRAY: (state, source) => {
    state.sourceArray.push(source)
  },
  ADD_CURRENT_RESOURCE: (state, resource) => {
    if(state.currentResource instanceof Array){
      state.currentResource.push(resource)
    }else{
      state.currentResource = []
      state.currentResource.push(resource)
    }
  }
}
const actions={
  getResourceAction({state,commit}){
    return new Promise((resolve, reject) => {
      getResource().then((response) => {
        const data = response.data
        if(data.length!==0){
          commit('SET_RESOURCE', data)
          commit('SET_CURRENT_RESOURCE', data)
          commit('SET_CURRENT_RESOURCE_PATH', data[0].path)
          if(state.sourceArray.length===0){
            commit('ADD_SOURCE_ARRAY', data)
          }
        }
        resolve(response)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  //点击导航栏重新刷新
  refreshResourceAction({state,commit},data){
    return new Promise((resolve,reject)=>{
      refreshResource(data).then(response=>{
        resolve(response)
      }).catch(err=>{
        console.log(err)
        reject(err)
      })
    })
  },
  getRecentEditedResourceAction({state,commit}){
    return new Promise((resolve,reject)=>{
      getRecentEditedResource().then(response=>{
        const data = response.data
        commit("SET_RECENT_EDITED_RESOURCE",data)
      }).catch(err=>{
        console.log(err)
        reject(err)
      })
    })
  },
  addResourceAction({state,commit},data){
    return new Promise((resolve, reject) => {
      addResource(data).then((response) => {
        commit('ADD_CURRENT_RESOURCE', response.data)
        resolve(response)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  updateResourceAction({state,commit},data){
    return new Promise((resolve, reject) => {
      putResource(data).then((response) => {
        resolve(response)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  deleteResourceAction({state,commit},data){
    return new Promise((resolve, reject) => {
      deleteResource(data).then((response) => {
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



