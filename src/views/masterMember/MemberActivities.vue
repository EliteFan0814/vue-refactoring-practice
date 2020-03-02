<template>
  <div>
    <el-card>
      <div slot="header" :class="$style.header" class="my-header">
        <el-button @click="editActive(false)" type="primary">
          添加活动
        </el-button>
      </div>
      <el-table :data="activeList">
        <el-table-column label="月/个" align="center">
          <template slot-scope="{row}">{{row.number}}</template>
        </el-table-column>
        <el-table-column label="活动价格" align="center">
          <template slot-scope="{row}">{{row.amount}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button size="mini" type="success" @click="editActive(row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteGood(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <EditActive v-if="showEdit" :item="item" @close="closeDialog"></EditActive>
      <!-- <BasePagination :max="maxPage" :totalCount="totalCount" :now.sync="nowPage"></BasePagination> -->
    </el-card>
  </div>
</template>

<script>
// import BasePagination from '@/components/BasePagination'
import EditActive from './components/EditActive'
export default {
  components: {
    EditActive
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
      activeList: [],
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
      this.$http.get('/manage/vip_activity/lists').then(res => {
        this.activeList = res.data.lists
      })
    },
    filterData() {
      this.nowPage === 1 ? this.getData() : (this.nowPage = 1)
    },
    deliverGood(data) {
      this.item = data
      this.showEdit = true
    },
    editActive(data) {
      this.item = data
      console.log('item', this.item)
      this.showEdit = true
    },
    deleteGood(data) {
      this.$confirm('确定删除该活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        this.$http
          .post('/manage/vip_activity/del', { id: data.id })
          .then(res => {
            this.getData()
          })
          .catch(err => {})
      })
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