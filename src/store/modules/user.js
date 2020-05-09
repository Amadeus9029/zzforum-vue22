import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, register,getInfo } from '@/api/user'
import {Message} from "element-ui"
const state = {
  token: getToken(),
  user: {},
  roles: [],
  loadMenus:false,
  userUrlMap:{
    "user":"用户中心",
    "message":"基本信息",
    "follows":"关注",
    "fans":"粉丝"
  }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_LOAD_MENUS: (state, loadMenus) => {
    state.loadMenus = loadMenus
  }
}
const actions = {
  loginAction({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then((response) => {
        const {token,user} = response.data
        commit('SET_TOKEN', token)
        setToken(token)
        setUserInfo(user,commit)
        commit('SET_LOAD_MENUS', true)
        resolve(response)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  logoutAction({ state, commit }) {
    return new Promise((resolve) => {
      if (state.token) {
        removeToken(state.token)
        commit("SET_USER",{})
        commit("SET_TOKEN","")
        resolve()
      }
    })
  },
  registerAction({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password }).then((response) => {
        const data = response.data
        if(data==="注册失败"){
          Message.error("注册失败")
          reject(response)
        }else{
          const {token,user} = data
          commit('SET_TOKEN', token)
          setToken(token)
          setUserInfo(user,commit)
          commit('SET_LOAD_MENUS', true)
          resolve(response)
        }
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  // 获取用户信息
  getInfoAction({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        const data = res.data
        setUserInfo(data, commit)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateLoadMenusAction({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_LOAD_MENUS', false)
    })
  }
}
export const setUserInfo = (res, commit) => {
  // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
  if (res.authorities.length === 0) {
    commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
  } else {
    commit('SET_ROLES', res.authorities)
  }
  commit('SET_USER', res)
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
