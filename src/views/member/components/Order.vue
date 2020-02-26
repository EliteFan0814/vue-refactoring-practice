<template>
  <el-dialog :visible.sync="isDialog" :close-on-click-modal="false" @close="close" :title="'账户：'+form.account + ' 的订单'" width="65%" :center="true">

    <div :class="$style.header">
      <div :class="$style.search">
        <span>搜索：</span>
        <el-date-picker v-model="selectDate" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="filterData">
        </el-date-picker>
      </div>
      <div class="selectcontainer">
        <el-button @click="filterData" type="primary">
          搜索
          <i class="el-icon-search"></i>
        </el-button>
      </div>
    </div>

    <el-tabs v-model="activeName" @tab-click="getTable">
      <el-tab-pane v-for="(item,index) in classlist" :key="index" :label="`${item.label}记录`" :name="item.value">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="amount" align="center" label="订单金额">
          </el-table-column>
          <el-table-column prop="create_time" align="center" label="创建时间">
          </el-table-column>
          <el-table-column prop="remark" align="center" label="订单说明">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <BasePagination :max="maxPage" :totalCount="totalCount" :now.sync="nowPage"></BasePagination>
  </el-dialog>
</template>

<script>
import BasePagination from '@/components/BasePagination'
export default {
  components: {
    BasePagination
  },
  watch: {
    nowPage() {
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  props: ['form', 'classlist'],
  data() {
    return {
      selectDate: ['', ''],
      billClass: 'cz',
      activeName: 'cz',
      tableData: [],
      tableUrl: '/manage/bill/lists',
      chargeWay: '',
      chargeWayText: 'sesameWay',
      wayType: [],
      memberId: '',
      isDialog: true,
      nowPage: 1,
      maxPage: 1,
      pageSize: 10,
      totalCount: 0
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
  methods: {
    getTable(tab) {
      this.billClass = tab.name
      this.filterData()

      // if (tab.name === 'first') {
      //   this.billClass = 'cz'
      //   this.filterData()
      // } else if (tab.name === 'second') {
      //   this.billClass = 'fy'
      //   this.filterData()
      // } else {
      //   this.billClass = 'kc'
      //   this.filterData()
      // }
    },

    getData() {
      if (this.selectDate === null) {
        this.selectDate = []
      }
      this.tableData = []
      this.$http
        .get(this.tableUrl, {
          params: {
            page: this.nowPage,
            rows: this.pageSize,
            member_id: this.form.member_id,
            class: this.billClass,
            starttime: this.startTime,
            endtime: this.endTime
          }
        })
        .then(res => {
          this.tableData = res.data.lists
          this.maxPage = res.data.page_total
          this.totalCount = res.data.total
        })
    },
    filterData() {
      this.nowPage === 1 ? this.getData() : (this.nowPage = 1)
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" module >
.header {
  display: flex;
  align-items: center;

  > div {
    flex-grow: 0;
    flex-shrink: 0;

    &:not(:last-child) {
      margin-right: 20px;
    }

    > span {
      margin-right: 5px;
    }
  }

  .search {
    display: flex;
    align-items: center;

    > div {
      width: 400px;
    }
  }

  [space] {
    flex-grow: 1;
  }
}
</style>
<style>
.inp {
  border: none;
  height: 30px;
}
</style>



