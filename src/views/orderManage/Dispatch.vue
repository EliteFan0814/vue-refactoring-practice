<template>
  <div class="dispatch">
    <el-card>
      <div slot="header">
        <div class="slogan">派 单</div>
      </div>
      <div class="dispatch-wrapper">
        <el-form :model="formData" :rules="rules" ref="formData" size="small" label-width="100px">
          <el-form-item label="绑定手机：" prop="phone">
            <el-input v-model="formData.phone" clearable placeholder="请输入手机号" class="input-hold"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="formData.password" clearable type="password" placeholder="请输入密码" class="input-hold"></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="linkman">
            <el-input v-model="formData.linkman" clearable placeholder="请填写联系人" class="input-hold"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="contact">
            <el-input v-model="formData.contact" clearable placeholder="请输入手机号" class="input-hold"></el-input>
          </el-form-item>
          <el-form-item label="选择服务：" prop="price_id">
            <el-select v-model="formData.price_id" clearable placeholder="请选择服务类型" class="input-hold">
              <el-option v-for="(item,index) in priceList" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务地址：" prop="address">
            <el-input v-model="formData.address" readonly placeholder="请在地图上选择派单地址" class="input-hold"></el-input>
          </el-form-item>
          <el-form-item label="地图选址：">
            <BaseMap @getAddress="readAddress"></BaseMap>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address_detail">
            <el-input v-model="formData.address_detail" clearable placeholder="例如花园小区5号楼2单元202" class="input-hold"></el-input>
          </el-form-item>
          <el-form-item label="选择师傅：" prop="worker_id">
            <el-select class="input-hold" v-model="formData.worker_id" clearable placeholder="请选择一位师傅" filterable remote :remote-method="remoteMethod" :loading="loading">
              <el-option v-for="item in masterList" :key="item.value" :label="item.realname" :value="item.worker_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div class="bottom-btn">
              <el-button type="primary" @click="submitForm">派单</el-button>
              <el-button @click="resetForm">取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import BaseMap from '@/components/BaseMap'
export default {
  components: {
    BaseMap
  },
  inject:['reload'],
  props: {},
  data() {
    return {
      loading: false,
      priceList: [],
      formData: {
        phone: '',
        password: '',
        linkman: '',
        contact: '',
        address: '',
        address_detail: '',
        add_lon: '',
        add_lat: '',
        price_id: '',
        worker_id: ''
      },
      masterList: [],
      rules: {
        phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        linkman: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        contact: [
          { required: true, message: '请输入联系人电话', trigger: 'blur' }
        ],
        address: [{ required: true, message: '请在地图上选择派单地址', trigger: 'blur' }],
        address_detail: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        price_id: [
          { required: true, message: '请选择服务类型', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getPriceList()
  },
  methods: {
    // 获取价格服务列表
    getPriceList() {
      this.$http.get('/manage/price_detail/lists').then(res => {
        this.priceList = res.data.lists
      })
    },
    // 获取地址 address
    readAddress(address,lng,lat) {
      this.formData.address = address
      this.formData.add_lon = lng
      this.formData.add_lat = lat
    },
    // 远程获取师傅列表
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        this.$http
          .get('/manage/worker/lists?page=1&rows=1000&check=2&vip=2&open=2&state=2', {
            params: { keywords: query }
          })
          .then(res => {
            this.loading = false
            this.masterList = res.data.lists
          })
      } else {
        this.masterList = []
      }
    },
    // 提交派单
    submitForm(){
      this.$refs.formData.validate(valid=>{
        if(!valid) return
        this.$http.post('/manage/order/paidan',this.formData).then(res=>{
          this.reload()
        })
      })
    },
    // 取消订单
    resetForm(){
      this.$refs.formData.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.slogan {
  // border: 1px solid red;
  text-align: center;
  font-size: 20px;
}
.dispatch-wrapper {
  // border: 1px solid red;
  margin: 0 auto;
  width: 70%;
}
.input-hold {
  width: 100%;
}
</style>