import axios from 'axios'

const IP="http://127.0.0.1:5000"
axios.defaults.baseURL = IP
export const IMG_UPDATE=IP+"/goods/goods_img_upload"//图片上传接口
export const IMG_DOWLOAD=IP+"/upload/imgs/goods_img/" //图片下载接口

// 商铺图片上传接-口
export const IMG_SHOP_UPDATE=IP+"/shop/upload"//图片上传接口

// 商铺图片下载接口
export const IMG_SHOP_DOWLOAD=IP+"/upload/shop/" //图片下载接口

// export function login(account,password) {
//     return axios.post('/users/checkLogin', { account, password }).then((res) => {
//         console.log(res)
//     })
// }
// ------------------------------------账号管理(11个)---------------------------------------------//

// 登录接口
export const checkLogin = (account, password) => axios.post('/users/checkLogin', { account, password })
//  验证token是否过期接口
// token：令牌码
export const checktoken = (token) => axios.get('/users/checktoken', { params: { token } })
//  添加账号
export const add = (account, password, userGroup) => axios.post('/users/add', { account, password, userGroup })
// 获取账户列表
export const list = (currentPage, pageSize) => axios.get('/users/list', { params: { currentPage, pageSize } })
// 删除
export const del = (id) => axios.get('/users/del', { params: { id } })
// 批量删除
export const batchdel = (ids) => axios.get('/users/batchdel', { params: { ids } })
// 检查旧密码是否正确
export const checkoldpwd = (oldPwd, id) => axios.get('/users/checkoldpwd', { params: { oldPwd, id } })
// 修改密码
export const editpwd = (newPwd, id) => axios.post('/users/editpwd', { newPwd, id })
// 获取账号信息  
export const accountinfo = (id) => axios.get('/users/accountinfo', { params: { id } })
// 修改账户信息
export const edit = (id, account, userGroup) => axios.post('/users/edit', { id, account, userGroup })


// ------------------------------------商品管理(11个)---------------------------------------------//
// 获取分类列表
// currentPage当前页码
// pageSize 每页条数li
export const catelist = (currentPage, pageSize) => axios.get('/goods/catelist', { params: { currentPage, pageSize } })

// 删除分类
// id:id
export const delcate = (id) => axios.get('/goods/delcate', { params: { id } })

// 添加分类
export const addcate = (cateName, state) => axios.post('/goods/addcate', { cateName, state })

// 修改分类
export const editcate=(id,cateName,state)=>axios.post('/goods/editcate',{id,cateName,state})

// 查询所有分类名称
export const categories = () => axios.get('/goods/categories', { params: { } })

// 添加商品
export const itemadd=(name,category,price,imgUrl,goodsDesc)=>axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc})

//获取商品列表
export const itemlist = (currentPage,pageSize) => axios.get('/goods/list', { params: { currentPage,pageSize} })

// 删除商品
export const itemdel = (id) => axios.get('/goods/del', { params: { id} })

// 商品修改
export const itemedit=(params)=>axios.post('/goods/edit',params)


// -----------------------------------订单管理---------------------------------------------//
// 获取订单列表
export const orderlist = (params) => axios.get('/order/list', { params: params })

// 获取订单详情
export const orderdetail = (id) => axios.get('/order/detail', { params: {id} })

// 修改订单信息
export const ordereidt=(params)=>axios.post('/order/edit',params)
// -----------------------------------报表管理---------------------------------------------//
// 首页报表接口
export const totaldata = () => axios.get('/order/totaldata', { params: {} })

// 订单报表接口
export const ordertotal = (date) => axios.get('/order/ordertotal', { params: {date} })

// -----------------------------------店铺管理---------------------------------------------//
export const shopinfo = () => axios.get('/shop/info', { params: {}})

// 店铺修改
export const shopedit=(params)=>axios.post('/shop/edit',params)


