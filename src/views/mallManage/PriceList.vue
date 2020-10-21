<template>
  <div>
    <el-card>
      <!-- <div slot="header" :class="$style.header" class="my-header">
        <el-button @click="editGood(false)" type="primary">
          添加产品
        </el-button>
      </div> -->
      <el-table :data="priceList">
        <el-table-column label="产品名称" align="center">
          <template slot-scope="{row}">{{row.name}}</template>
        </el-table-column>
        <el-table-column label="产品价格" align="center">
          <template slot-scope="{row}">{{row.price}}</template>
        </el-table-column>
        <el-table-column label="排序权重" align="center">
          <template slot-scope="{row}">{{row.sort}}</template>
        </el-table-column>
        <el-table-column label="分类" align="center">
          <template slot-scope="{row}">{{row.cate_str}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button size="mini" type="success" @click="editGood(row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteGood(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <PriceListEdit v-if="showEdit" :item="item" @close="closeDialog"></PriceListEdit>
      <BasePagination :max="maxPage" :totalCount="totalCount" :now.sync="nowPage"></BasePagination>
    </el-card>
  </div>
</template>

<script>
import BasePagination from '@/components/BasePagination'
import PriceListEdit from './PriceListEdit'
export default {
  components: {
    BasePagination,
    PriceListEdit
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
      priceList: [],
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
    // 获取列表
    getData() {
      // if (this.selectDate === null) {
      //   this.selectDate = []
      // }
      this.$http
        .get('/manage/price_detail/lists', {
          params: { page: this.nowPage, rows: this.pageSize }
        })
        .then(res => {
          this.priceList = res.data.lists
          this.maxPage = res.data.page_total
          this.totalCount = res.data.total
        })
    },
    filterData() {
      this.nowPage === 1 ? this.getData() : (this.nowPage = 1)
    },
    deliverGood(data) {
      this.item = data
      this.showEdit = true
    },
    editGood(data) {
      this.item = data
      this.showEdit = true
    },
    deleteGood(data) {
      this.$confirm('确定删除该产品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(res => {
          this.$http
            .post('/manage/price_detail/del', { id: data.id })
            .then(res => {
              this.getData()
            })
            .catch(err => { })
        })
        .catch(err => { })
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