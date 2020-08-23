import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './pages/Login'
Vue.use(VueRouter);


const router =  new VueRouter({
    routes:[
        {
            // 登录
            path: '/',
            name: 'login',
            component: Login
        },
        {
            // 首页
            path: '/index',
            name: 'index',
            component: ()=> import('./pages/Index'),
            // 二级页面
            children:[
                {
                    // 二级页面首页
                    path:'/index/home',
                    name:'home',
                    component: ()=> import('./pages/index/Home'),
                    meta:{bread:["首页"]}
                },
                // ------------------------------------订单管理---------------------------------------------//
                {
                    // 订单管理
                    path:'/index/ordermanage',
                    name:'ordermanage',
                    component: ()=> import('./pages/index/OrderManage'),
                    meta:{bread:["订单管理"]}
                },
                // ------------------------------------商品管理---------------------------------------------//
                {
                    // 商品列表
                    path:'/index/prosList',
                    name:'prosList',
                    component: ()=> import('./pages/index/item/ProsList'),
                    meta:{bread:["商品管理","商品列表"]}
                },
                //商品添加
                {
                    path:'/index/prosAdd',
                    name:'prosAdd',
                    component: ()=> import('./pages/index/item/ProsAdd'),
                    meta:{bread:["商品管理","商品添加"]}
                },
                // 商品分类
                {
                    path:'/index/prosType',
                    name:'prosType',
                    component: ()=> import('./pages/index/item/ProsType'),
                    meta:{bread:["商品管理","商品分类"]}
                },
                // ------------------------------------店铺管理---------------------------------------------//
                // 店铺管理
                {
                    path:'/index/storemanage',
                    name:'storemanage',
                    component: ()=> import('./pages/index/StoreManage'),
                    meta:{bread:["店铺管理"]}
                },
                // ------------------------------------账号管理---------------------------------------------//
                // 账户列表
                {
                    path:'/index/userlist',
                    name:'userlist',
                    component: ()=> import('./pages/index/user/UserList'),
                    meta:{bread:["账号管理","账户列表"]}
                },
                // 添加账户
                {
                    path:'/index/adduser',
                    name:'adduser',
                    component: ()=> import('./pages/index/user/AddUser'),
                    meta:{bread:["账号管理","添加账号"]}

                },
                 // 修改密码
                 {
                    path:'/index/updatepwd',
                    name:'updatepwd',
                    component: ()=> import('./pages/index/user/UpdatePwd'),
                    meta:{bread:["账号管理","修改密码"]}
                },
                // ------------------------------------销售统计---------------------------------------------//
                 // 订单统计
                 {
                    path:'/index/orderstat',
                    name:'orderstat',
                    component: ()=> import('./pages/index/stat/OrderStat'),
                    meta:{bread:["销售统计","订单统计"]}
                    
                },
                // 商品统计
                 {
                    path:'/index/prosstat',
                    name:'prosstat',
                    component: ()=> import('./pages/index/stat/ProsStat'),
                    meta:{bread:["销售","商品统计"]}

                },
                // 个人中心
                {
                    path:'/index/personal',
                    name:'personal',
                    component: ()=> import('./pages/index/Personal'),
                },
            ]
        },
    ]
})
// 路由拦截
router.beforeEach((to,from,next)=>{

    // to,去哪里
    // from从哪里来
    // next 进行下一步
    if(to.path!='/'){//不是去的登录，判断是不是token验证有效期
        if(localStorage.token){//有值的话
            next()
        }else{//没有值，去登录
                next('/')
        }

    }else{
        next()
        // 去的登录，进行下一步
    }
})
export default router
