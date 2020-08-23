<template>
  <div id="storemanage">
    <p id="title">
      <span>店铺管理</span>
      <el-button type="primary" size="small" @click="edit">{{disabled==true?"编辑":"保存"}}</el-button>
    </p>
    <el-form :label-position="labelPosition" label-width="80px" :disabled="disabled">
      <el-form-item label="店铺名称">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="店铺公告">
        <el-input type="textarea" v-model="bulletin" :rows="6"></el-input>
      </el-form-item>
      <el-form-item label="店铺头像">
        <el-upload
          class="avatar-uploader"
          :action="IMG_SHOP_UPDATE"
          :show-file-list="false"
          :on-success="avatarimgssuccess"
        >
          <img
            v-if="avatar"
            :src="IMG_SHOP_DOWLOAD+avatar"
            class="avatar"
            style="width:150px;height:150px"
          />
        </el-upload>
      </el-form-item>
      <el-form-item label="店铺图片">
        <el-upload
          :action="IMG_SHOP_UPDATE"
          list-type="picture-card"
          :file-list="fileList"
          :on-success="shopimgsupdate"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
      <el-form-item label="配送费">
        <el-input v-model="deliveryPrice"></el-input>
      </el-form-item>
      <el-form-item label="起送价格">
        <el-input v-model="minPrice"></el-input>
      </el-form-item>
      <el-form-item label="配送时间">
        <el-input v-model="deliveryTime"></el-input>
      </el-form-item>
      <el-form-item label="配送描述">
        <el-input v-model="description"></el-input>
      </el-form-item>
       <el-form-item label="店铺评分">
        <el-rate v-model="score" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
      </el-form-item>
      <!-- <el-form-item label="店铺评分">
        <el-input v-model="score"></el-input>
      </el-form-item> -->
      <el-form-item label="销量">
        <el-input v-model="sellCount"></el-input>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="supports">
          <el-checkbox label="单人精彩套餐"></el-checkbox>
          <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
          <el-checkbox label="线下主题活动"></el-checkbox>
          <el-checkbox label="单纯品牌曝光"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="营业时间" style="width:100%">
        <el-time-picker
          is-range
          v-model="date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  IMG_SHOP_DOWLOAD,
  IMG_SHOP_UPDATE,
  shopinfo,
  shopedit,
} from "@/api/api";
import { getuserlist } from "@/utils/utils";
export default {
  data() {
    return {
      labelPosition: "right",
      dialogImageUrl: "",
      dialogVisible: false,
      ruleForm: {},
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      fileList: [],
      IMG_DOWLOAD: "",
      IMG_SHOP_UPDATE: "",
      disabled: true,
      // 数据内容
      avatar: "",
      bulletin: "",
      date: [],
      deliveryPrice: 0,
      deliveryTime: 0,
      description: "",
      minPrice: 0,
      name: "",
      pics: [],
      score: 0,
      sellCount: 0,
      supports: [],
    };
  },
  created() {
    this.IMG_SHOP_DOWLOAD = IMG_SHOP_DOWLOAD;
    this.IMG_SHOP_UPDATE = IMG_SHOP_UPDATE;
    shopinfo().then((res) => {
      for (const key in res.data.data) {
        this[key] = res.data.data[key]; //注意不要写成this.key
      } //一一对应
      this.fileList = this.pics.map((item) => {
        return {
          name: item,
          url: IMG_SHOP_DOWLOAD + item,
        }; //店铺图片
        // this.supports.push
        // console.log(this.date);
      });
    });
  },
  methods: {
    // 店铺头像
    avatarimgssuccess(res) {
      if (res.code == 0) {
        this.avatar = res.imgUrl;
        this.$message({
          message: res.msg,
          type: "success",
        });
      }
    },
    // 店铺图片
    shopimgsupdate(res) {
      if (res.code == 0) {
        //
        this.pics.push(res.imgUrl);
        this.$message({
          message: res.msg,
          type: "success",
        });
      }
      console.log(this.pics);
    },
    edit() {
      // console.log(this.supports);
      if (this.disabled == true) {
        this.disabled = false;
      } else {
        this.params = {
          id: localStorage.id,
          name: this.name,
          bulletin: this.bulletin,
          avatar: this.avatar,
          deliveryPrice: this.deliveryPrice,
          deliveryTime: this.deliveryTime,
          description: this.description,
          score: this.score,
          sellCount: this.sellCount,
          supports: JSON.stringify(this.supports),
          date: JSON.stringify([
            getuserlist(this.date[0]),
            getuserlist(this.date[1]),
          ]),
          pics: JSON.stringify(this.pics),
        };
        shopedit(this.params).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            this.disabled = true;
          }
        });
      }
    },
    // 移除
    handleRemove(fileList) {
      this.pics.splice(this.pics.indexOf(fileList.name), 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
#storemanage {
  background: #fff;
  padding-bottom: 40px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  #title {
    padding: 0 20px;
    line-height: 50px;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 20px;
    .el-button {
      float: right;
      margin-top: 9px;
    }
  }
  .el-form {
    padding-left: 20px;
    .el-form-item {
      width: 40%;
    }
  }
}
</style>
