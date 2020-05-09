import router from "@/router/routers"
import store from '@/store'
import { getToken } from '@/utils/auth' // getToken from cookie
import NProgress from 'nprogress'
import {buildMenus} from '@/api/menu'
import {filterAsyncRouter} from "@/store/modules/permission"
import {Message} from "element-ui"
import 'nprogress/nprogress.css'
NProgress.configure({
    easing: 'ease',  // 动画方式
    speed: 500,  // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
})
const whiteList = ['/login']// no redirect whitelist
//当路由进入前
router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) { //如果未匹配到路由
        from.name ? next({ name:from.name }) : next('/404'); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    }
    if (to.meta.title) {
        document.title = to.meta.title
    }
    NProgress.start()
    if (getToken()) {
        // 已登录且要跳转的页面是登录页
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            //用户刷新页面，state数据删除，重新设置state数据
            if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
                store.dispatch('user/getInfoAction').then(res => { // 拉取user_info
                    // 动态路由，拉取用户可访问视图
                    loadAsyncViews(next,to)
                }).catch((err) => {
                    store.dispatch('user/logoutAction').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                })
                // 登录时未拉取 菜单，在此处拉取
            }  else {
                next()
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next() // 否则全部重定向到登录页
            NProgress.done()
        }
    }
});

export const loadAsyncViews = (next, to) => {
    //加载用户menu数据
    buildMenus().then(res => {
        //加载组件，生成动态路由表
        const asyncRouter = filterAsyncRouter(res.data)
        //在动态路由表最后添加通配路由，可以保证路由的匹配，否则动态路由无法正常使用
        asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
        store.dispatch('GenerateRoutes', asyncRouter).then(() => { // Vuex存储路由
            router.addRoutes(asyncRouter) // 动态添加可访问路由表
            next({ ...to, replace: true })
        })
    }).catch(err=>{
        console.log(err)
    })
}

//当路由进入后：关闭进度条
router.afterEach(() => {
    // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()
})
