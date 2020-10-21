<template>
  <div>
    <el-card>
      <div slot="header" :class="$style.header">
        <div :class="$style.search">
          <span>搜索：</span>
          <el-input v-model="keyword" placeholder="输入订单号" size="small" clearable @change="filterData" />
        </div>
        <!-- <div :class="$style.search">
          <el-select v-model="orderState" placeholder="订单方式" size="small" @change="filterData" clearable>
            <el-option v-for="item in orderStateList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div> -->
        <div :class="$style.search">
          <el-select v-model="type" placeholder="订单类型" size="small" @change="filterData" clearable>
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div :class="$style.search">
          <el-select v-model="orderState" placeholder="订单状态" size="small" @change="filterData" clearable>
            <el-option v-for="item in orderStateList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div :class="$style.search">
          <el-select v-model="payWay" placeholder="支付方式" size="small" @change="filterData" clearable>
            <el-option v-for="item in payWayList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div :class="$style.search">
          <el-select v-model="refund" placeholder="纠纷处理" size="small" @change="filterData" clearable>
            <el-option v-for="item in refundList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <!-- <div :class="$style.search">
          <el-select v-model="payWay" placeholder="请选择支付方式" @change="filterData" clearable>
            <el-option v-for="item in payWayList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div> -->
        <div>
          <el-date-picker :class="$style.datesearch" v-model="selectDate" type="daterange" size="small"
            value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
            @change="filterData">
          </el-date-picker>
        </div>
        <el-button @click="filterData" type="primary" size="small">
          搜索
          <i class="el-icon-search"></i>
        </el-button>
      </div>
      <el-table :data="orderList">

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="联系人：">
                <span>{{ props.row.linkman }}</span>
              </el-form-item>
              <el-form-item label="联系电话：">
                <span>{{ props.row.contact }}</span>
              </el-form-item>
              <el-form-item label="派单地址：">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="会员账号：">
                <span>{{ props.row.member_info?props.row.member_info.account:'暂无信息' }}</span>
              </el-form-item>
              <el-form-item label="师傅账号：">
                <span>{{ props.row.worker_info?props.row.worker_info.account:'暂无信息' }}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{ props.row.create_time }}</span>
              </el-form-item>
              <el-form-item label="订单类型：">
                <span>{{ props.row.price_info.name }}</span>
              </el-form-item>
              <el-form-item label="订单价格：">
                <span>{{ props.row.price_info.price }}</span>
              </el-form-item>
              <!-- <el-form-item label="快递公司：">
                <span>{{ props.row.express || '暂无信息' }}</span>
              </el-form-item>
              <el-form-item label="订单日志：">
                <span>{{ props.row.express_number || '暂无信息' }}</span>
              </el-form-item> -->
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单号" align="center" min-width="100">
          <template slot-scope="{row}">{{row.order_sn}}</template>
        </el-table-column>
        <!-- <el-table-column label="会员账号" align="center" min-width="120" >
          <template slot-scope="{row}"> {{row.member_info.account}}</template>
        </el-table-column> -->
        <el-table-column label="订单金额" align="center">
          <template slot-scope="{row}">{{row.orderfee}}</template>
        </el-table-column>
        <el-table-column label="结算金额" align="center">
          <template slot-scope="{row}">{{row.settle_money}}</template>
        </el-table-column>
        <el-table-column label="退款金额" align="center">
          <template slot-scope="{row}">{{row.refund_money}}</template>
        </el-table-column>
        <el-table-column label="订单类型" align="center">
          <template slot-scope="{row}">{{row.type_str}}</template>
        </el-table-column>
        <el-table-column label="订单状态" align="center">
          <template slot-scope="{row}">{{row.status_str}}</template>
        </el-table-column>
        <el-table-column label="支付方式" align="center">
          <template slot-scope="{row}">{{row.payment_str || '暂无信息'}}</template>
        </el-table-column>
        <!-- <el-table-column label="退款状态" align="center">
          <template slot-scope="{row}">{{row.refund_str || '暂无信息'}}</template>
        </el-table-column> -->
        <el-table-column label="订单操作" align="center">
          <template slot-scope="{row}" v-if="row.status === 5">
            <div>
              <el-button size="mini" v-if="row.refund !== 22&&row.refund!==23?true:false" type="warning"
                @click="setProblem(row)">设置纠纷</el-button>
              <el-button size="mini" v-if="row.refund === 22" type="primary" @click="resolveProblem(row)">处理纠纷
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <RetailOrderResolve v-if="showDeliver" :item="item" @close="closeDialog"></RetailOrderResolve>
      <BasePagination :max="maxPage" :totalCount="totalCount" :now.sync="nowPage"></BasePagination>
    </el-card>
  </div>
</template>

<script>
import MemberInfo from '@/components/MemberInfo'
import BasePagination from '@/components/BasePagination'
import RetailOrderResolve from './RetailOrderResolve'
export default {
  components: {
    MemberInfo,
    BasePagination,
    RetailOrderResolve
  },
  created() {
    if (this.$route.query.queryName) {
      console.log('this.$route.query', this.$route.query)
      let query = this.$route.query
      this.orderState = query.queryName
      if (query.queryDate) {
        this.selectDate[0] = query.queryDate
        this.selectDate[1] = query.queryDate
      }
    }
    this.getData()
  },
  data() {
    return {
      selectDate: ['', ''],
      keyword: '',
      memberKeyword: '',
      memberName: '',
      status_screen: [],
      status: '',
      withdrawTypeList: [],
      withdrawType: '',
      orderStateList: [],
      orderState: '',
      payWay: '',
      payWayList: [],
      refund: '',
      refundList: [],
      type: '',
      typeList: [],
      dates: [],
      orderList: [],
      maxPage: 1,
      nowPage: 1,
      pageSize: 10,
      totalCount: 0,
      item: {},
      showDeliver: false
    }
  },
  computed: {
    startTime() {
      return this.selectDate[0]
    },
    endTime() {
      return this.selectDate[1]
    }
  },
  watch: {
    nowPage() {
      this.getData()
    }
  },
  methods: {
    // 设置纠纷
    setProblem(data) {
      this.$confirm('确认将此单设置为纠纷?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .post('/manage/order/dispute', { order_id: data.order_id })
            .then(res => {
              this.getData()
            })
        })
        .catch(() => { })
    },
    // 关闭快递窗口
    closeDialog(flag) {
      if (flag) {
        this.filterData()
      }
      this.showDeliver = false
    },
    getData() {
      if (this.selectDate === null) {
        this.selectDate = []
      }
      this.$http
        .get('/manage/order/lists', {
          params: {
            page: this.nowPage,
            rows: this.pageSize,
            keywords: this.keyword,
            // member: this.memberKeyword,
            type: this.type,
            state: this.orderState,
            payment: this.payWay,
            refund: this.refund,
            starttime: this.startTime,
            endtime: this.endTime
          }
        })
        .then(res => {
          this.orderList = res.data.lists
          this.maxPage = res.data.page_total
          this.totalCount = res.data.total
          this.typeList = res.data.type_screen
          this.payWayList = res.data.payment_screen
          this.orderStateList = res.data.status_screen
          this.refundList = res.data.refund_screen
        })
    },
    filterData() {
      this.nowPage === 1 ? this.getData() : (this.nowPage = 1)
    },
    resolveProblem(data) {
      this.item = data
      this.showDeliver = true
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
      width: 115px;
    }
  }
  .datesearch {
    width: 230px;
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
</style>