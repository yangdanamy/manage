<template>
  <div id="Aside">
    <el-col :span="24">
      <h4>速达外卖商家中心</h4>
      <el-menu
        :default-active="active"
        class="el-menu-vertical-demo"
        background-color="#9198e5"
        text-color="#fff"
        active-text-color="#e66465"
        style="border:0"
        router
        unique-opened
      >
        <div v-for="(item,index) in powerarr" :key="index">
          <!-- 循环遍历  判断是否有children  2选一下面的结构循环 -->
          <el-menu-item v-if="!item.children" :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
          <el-submenu v-else :index="item.url">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <!-- 儿子循环 chilren里面的内容,记住不要搞混 -->
              <el-menu-item
                v-for="(child,index) in item.children"
                :key="index"
                :index="child.url"
              >{{child.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          url: "/index/home",
          icon: "el-icon-s-home",
          title: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/index/ordermanage",
          icon: "el-icon-s-order",
          title: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "/index/prosList",
          icon: "el-icon-goods",
          title: "商品管理",
          children: [
            { url: "/index/prosList", title: "商品列表" },
            { url: "/index/prosAdd", title: "商品添加" },
            { url: "/index/prosType", title: "商品分类" },
          ],
          roles: ["super", "normal"],
        },
        {
          url: "/index/storemanage",
          icon: "el-icon-s-shop",
          title: "店铺管理",
          roles: ["super"],
        },
        {
          url: "/index/userlist",
          icon: "el-icon-user",
          title: "账号管理",
          children: [
            { url: "/index/userlist", title: "账户列表" },
            { url: "/index/adduser", title: "添加账号" },
            { url: "/index/updatepwd", title: "修改密码" },
          ],
          roles: ["super"],
        },
        {
          url: "/index/stat",
          icon: "el-icon-s-marketing",
          title: "销售统计",
          children: [
            { url: "/index/prosstat", title: "商品统计" },
            { url: "/index/orderstat", title: "订单统计" },
          ],
          roles: ["super"],
        },
      ],
      active:""
    };
  },
  computed: {
    powerarr() {
      let newarr = this.list.filter((item) => {
        //过滤信息  循环数组   得到新数组
        return item.roles.includes(localStorage.role); //循环出来的对象是否包含存的  包含的话,新数组
      });
      return newarr;
    },
  },
  created(){
    this.active=this.$route.path
  }
};
</script>

<style lang="less" scoped>
#Aside {
  width: 100%;
  height: 100%;
  h4 {
    color: #fff;
    background: #9198e5;
    padding: 10px 0;
    text-align: center;
    font-weight: normal;
  }
  i{
    color: #fff;
  }
}
</style>