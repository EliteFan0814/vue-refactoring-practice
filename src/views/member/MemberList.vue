<template>
  <el-card>
    <div slot="header" :class="$style.header">
      <div :class="$style.search">
        <span>搜索：</span>
        <el-input v-model="keywords" placeholder="请输入昵称或账号" clearable @change="filterData" />
      </div>
      <!-- <div>
        <el-select v-model="level" placeholder="请选择会员等级" @change="filterData" clearable>
          <el-option v-for="item in levelList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div> -->
      <div>
        <el-select v-model="state" placeholder="请选择会员状态" @change="filterData" clearable>
          <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value+1" />
        </el-select>
      </div>
      <el-button @click="filterData" type="primary">
        搜索
        <i class="el-icon-search"></i>
      </el-button>
    </div>
    <el-table :data="memberList">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" label-width="100px" inline class="demo-table-expand">
            <!-- <el-form-item label="推荐人：">
              <span>{{ props.row.parent_name || '暂无信息' }}</span>
            </el-form-item> -->
            <el-form-item label="注册时间：">
              <span>{{ props.row.create_time }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员信息">
        <template slot-scope="{row}">
          <MemberInfo :avatar="row.picurl" :name="row.nickname" :phone="row.account"></MemberInfo>
        </template>
      </el-table-column>
      <!-- <el-table-column label="推广码" align="center">
        <template slot-scope="{row}">{{row.level>0?row.spread_code: '暂无推广码'}}</template>
      </el-table-column>
      <el-table-column label="推广二维码" align="center" min-width="120">
        <template slot-scope="{row}">
          <img v-if="row.level>0&&row.qrcode_str.length>0" :src="row.qrcode_str" class="qr-img">
          <span v-else>暂无二维码</span>
        </template>
      </el-table-column>
      <el-table-column label="推荐人" align="center">
        <template slot-scope="{row}">{{row.parent_name || '暂无信息'}}</template>
      </el-table-column>
      <el-table-column label="会员等级" align="center">
        <template slot-scope="{row}">{{row.level_str}}</template>
      </el-table-column> -->
      <el-table-column label="余额" align="center">
        <template slot-scope="{row}">{{row.amount}}</template>
      </el-table-column>
      <el-table-column label="联系电话" align="center">
        <template slot-scope="{row}">{{row.phone}}</template>
      </el-table-column>
      <el-table-column label="会员状态" align="center">
        <template slot-scope="{row}">
          <el-button size="mini" v-if="row.status === 1" type="primary" @click="changeState(row)">{{row.status_str}}</el-button>
          <el-button size="mini" v-if="row.status === 0" type="danger" @click="changeState(row)">{{row.status_str}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="会员操作" min-width="200" align="center">
        <template slot-scope="{row}">
          <!-- <el-button v-if="row.level<2" size="mini" type="primary" @click="updateLevel(row)">升级</el-button> -->
          <el-button size="mini" type="success" @click="charge(row)">充值</el-button>
          <el-button size="mini" type="info" @click="billList(row)">账单</el-button>
          <!-- <el-button size="mini" type="primary" @click="orderList(row)">订单</el-button> -->
          <el-button size="mini" type="warning" @click="resetPwd(row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <ResetPwd :item="item" v-if="showResetPwd" @close="showResetPwd = false"></ResetPwd>
    <Charge :item="item" v-if="showCharge" @close="closeDialog"></Charge>
    <Bill :form="item" v-if="showBill" @close="showBill = false"></Bill>
    <Order :form="item" :classlist="classList" v-if="showOrder" @close="showOrder = false"></Order>
    <BasePagination :max="maxPage" :totalCount="totalCount" :now.sync="page"></BasePagination>
  </el-card>
  </div>
</template>

<script>
import MemberInfo from '@/components/MemberInfo'
import BasePagination from '@/components/BasePagination'
import Bill from './components/Bill'
import Order from './components/Order'
import ResetPwd from './components/ResetPwd'
import Charge from './components/Charge'

export default {
  components: {
    MemberInfo,
    BasePagination,
    Bill,
    Order,
    ResetPwd,
    Charge
  },

  data() {
    return {
      levelList: [],
      stateList: [],
      classList: [],
      memberList: [],
      rows: 10,
      keywords: '',
      level: '',
      state: '',
      memberName: '',
      page: 1,
      maxPage: 1,
      totalCount: 0,
      showResetPwd: false,
      showCharge:false,
      showBill: false,
      showOrder: false,
      item: {},

      status_screen: [],
      status: '',
      outOrderWay: [],
      type: '',
      dates: []
    }
  },
  watch: {
    page() {
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$http
        .get('/manage/member/lists', {
          params: {
            page: this.page,
            rows: this.rows,
            keywords: this.keywords,
            state: this.state
          }
        })
        .then(res => {
          this.totalCount = res.data.total
          this.memberList = res.data.lists
          this.maxPage = res.data.page_total
          this.stateList = res.data.state_screen
        })
    },
    filterData() {
      this.page === 1 ? this.getData() : (this.page = 1)
    },
    // 改变状态
    changeState(data) {
      let nextState = data.status ? '锁定' : '解锁'
      this.$confirm(
        '确定' + nextState + '账户：' + data.account + ' 的账号？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.$http
            .post('/manage/member/switchState', {
              id: data.member_id
            })
            .then(res => {
              if (res.code) {
                this.getData()
              }
            })
            .catch(err => {})
        })
        .catch(err => {})
    },
    // 充值
    // charge(data) {
    //   this.$prompt('请输入充值金额 ', '向账户 ' + data.account + ' 进行充值', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //     center: true,
    //     // inputPattern: /^(\-|\+)?\d+(\.\d+)?$/,
    //     inputPattern: /^(\-|\+)?\d+\.?(\d+)?$/,
    //     inputErrorMessage: '请输入正确的金额'
    //   })
    //     .then(({ value }) => {
    //       this.$http
    //         .post('/manage/member/chgMoney', {
    //           id: data.member_id,
    //           amount: value
    //         })
    //         .then(res => {
    //           if (res.code) {
    //             // this.$message({
    //             //   message: '充值成功',
    //             //   type: 'success'
    //             // })
    //             this.getData()
    //           }
    //         })
    //         .catch(err => {})
    //     })
    //     .catch(() => {
    //       this.$message('已取消！')
    //     })
    // },
    // 升级会员
    updateLevel(data) {
      this.$confirm('确定将账户：' + data.account + ' 进行升级？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .post('/manage/member/chgLevel', {
              id: data.member_id,
              level: data.level + 1
            })
            .then(res => {
              if (res.code) {
                this.getData()
              }
            })
            .catch(err => {})
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 账单显示
    billList(data) {
      this.item = data
      this.showBill = true
    },
    // 订单显示
    orderList(data) {
      this.item = data
      this.showOrder = true
    },
    // 重置密码
    resetPwd(data) {
      this.item = data
      this.showResetPwd = true
    },
    // 打开充值界面
    charge(data){
      this.item = data
      this.showCharge = true
    },
    // 关闭弹窗
    closeDialog(flag){
      this.showResetPwd = false
      this.showCharge = false
      if(flag){
        this.getData()
      }
    }
  }
}
</script>


<style lang="scss" module>
.header {
  display: flex;
  align-items: center;

  > div {
    flex-grow: 0;
    flex-shrink: 0;

    &:not(:last-child) {
      margin-right: 10px;
    }

    > span {
      margin-right: 5px;
    }
  }

  .search {
    display: flex;
    align-items: center;

    > div {
      width: 200px;
    }
  }

  [space] {
    flex-grow: 1;
  }
}
</style>
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 900px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.qr-img {
  width: 100px;
  height: 100px;
}
</style>