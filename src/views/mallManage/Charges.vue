<template>
  <div>
    <el-card>
      <div slot="header" :class="$style.header" class="my-header">
        <div :class="$style.search">
          <span>搜索：</span>
          <el-input v-model="keyword" placeholder="请输入收费名称" clearable @change="filterData" />
        </div>
        <div :class="$style.search">
          <el-select v-model="orderState" placeholder="请选择收费分类" @change="filterData" clearable>
            <el-option v-for="item in orderStateList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <!-- <div>
          <el-date-picker v-model="selectDate" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="filterData">
          </el-date-picker>
        </div> -->
        <el-button @click="filterData" type="primary">
          搜索
          <i class="el-icon-search"></i>
        </el-button>
        <div class="btn-right">
          <el-button @click="editCharge(false)" type="primary">
            添加
          </el-button>
        </div>
      </div>
      <el-table :data="orderList">

        <!-- <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="联系人：">
                <span>{{ props.row.linkman }}</span>
              </el-form-item>
              <el-form-item label="联系电话：">
                <span>{{ props.row.contact }}</span>
              </el-form-item>
              <el-form-item label="收货地址：">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="快递公司：">
                <span>{{ props.row.express || '暂无信息' }}</span>
              </el-form-item>
              <el-form-item label="快递单号：">
                <span>{{ props.row.express_number || '暂无信息' }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column> -->
        <!-- <el-table-column align="center" min-width="100" label="产品图片">
          <template slot-scope="{row}"><img src="@/assets/logo.png" alt="" class="good-img"></template>
        </el-table-column> -->
        <el-table-column label="收费名称" align="center">
          <template slot-scope="{row}">{{row.orderfee}}</template>
        </el-table-column>
        <el-table-column label="收费价格" align="center">
          <template slot-scope="{row}">{{row.orderfee}}</template>
        </el-table-column>
        <el-table-column label="收费分类" align="center">
          <template slot-scope="{row}">{{row.orderfee}}</template>
        </el-table-column>
        <!-- <el-table-column label="创建时间" align="center">
          <template slot-scope="{row}">{{row.create_time}}</template>
        </el-table-column> -->
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button size="mini" type="success" @click="editCharge(row)">查看 | 编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <ChargeEdit v-if="showEdit" :item="item" @close="closeDialog"></ChargeEdit>
      <BasePagination :max="maxPage" :totalCount="totalCount" :now.sync="nowPage"></BasePagination>
    </el-card>
  </div>
</template>

<script>
import MemberInfo from '@/components/MemberInfo'
import BasePagination from '@/components/BasePagination'
import ChargeEdit from './ChargesEdit'
export default {
  components: {
    MemberInfo,
    BasePagination,
    ChargeEdit
  },
  created() {
    this.orderState = this.$route.query.queryName
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
      type: '',
      dates: [],
      orderList: [],
      maxPage: 1,
      nowPage: 1,
      pageSize: 10,
      totalCount: 0,
      item: {},
      showEdit: false
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
    // 关闭快递窗口
    closeDialog(flag) {
      if (flag) {
        this.filterData()
      }
      this.showEdit = false
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
            member: this.memberKeyword,
            state: this.orderState,
            starttime: this.startTime,
            endtime: this.endTime
          }
        })
        .then(res => {
          this.orderList = res.data.lists
          this.maxPage = res.data.page_total
          this.totalCount = res.data.total
          this.orderStateList = res.data.state_screen
          this.payWayList = res.data.payment_screen
        })
    },
    filterData() {
      this.nowPage === 1 ? this.getData() : (this.nowPage = 1)
    },
    deliverGood(data) {
      this.item = data
      this.showEdit = true
    },
    editCharge(data) {
      this.item = data
      this.showEdit = true
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
      width: 160px;
    }
  }

  [space] {
    flex-grow: 1;
  }
}
</style>
<style lang="scss" scoped>
.my-header {
  position: relative;
  .btn-right {
    position: absolute;
    right: 20px;
  }
}
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
.good-img {
  width: 80px;
  height: 80px;
}
</style>