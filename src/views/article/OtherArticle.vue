<template>
  <div>
    <el-card>
      <div slot="header" :class="$style.header">
        <div :class="$style.search">
          <span>搜索：</span>
          <el-input v-model="keywords" placeholder="请输入标题" clearable @change="filterData" />
        </div>
        <div>
          <el-select v-model="cate" placeholder="请选择平台类型" @change="filterData" clearable>
            <el-option v-for="item in cateList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <el-button @click="filterData" type="primary">
          搜索
          <i class="el-icon-search"></i>
        </el-button>
        <div :class="$style.rightfloat">
          <el-button @click="edit(false)" class="add" type="primary">
            添加
          </el-button>
        </div>
      </div>
      <el-table :data="tableData">
        <el-table-column label="标题" align="center" min-width="200">
          <template slot-scope="{row}">{{row.title}}</template>
        </el-table-column>
        <el-table-column label="平台类型" align="center" min-width="200">
          <template slot-scope="{row}">{{row.cate_str}}</template>
        </el-table-column>
        <el-table-column label="排序权重" align="center" min-width="200">
          <template slot-scope="{row}">{{row.sort}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" min-width="200">
          <template slot-scope="{row}">{{row.create_time}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="edit(row)">查看 | 修改</el-button>
            <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <EditProblem v-if="isDialogShow" :item="item" :catelist="cateList" :dialogVisible="isDialogShow" @close="closeDia"></EditProblem>
    <BasePagination :max="maxPage" :totalCount="totalCount" :now.sync="nowPage"></BasePagination>
  </div>
</template>

<script>
import EditProblem from './components/EditProblem'
import BasePagination from '@/components/BasePagination'
export default {
  components: {
    EditProblem,
    BasePagination
  },
  data() {
    return {
      item: {},
      isDialogShow: false,
      index: 3,
      nowPage: 1,
      pageSize: 10,
      maxPage: 1,
      totalCount: 0,
      tableData: [],
      cate: '',
      cateList: [],
      keywords: ''
    }
  },
  watch: {
    nowPage() {
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$http
        .get('/manage/article/lists', {
          params: {
            page: this.nowPage,
            rows: this.pageSize,
            cate: this.cate,
            keywords: this.keywords
          }
        })
        .then(res => {
          this.tableData = res.data.lists
          this.maxPage = res.data.page_total
          this.totalCount = res.data.total
          this.cateList = res.data.cate_screen
        })
    },
    filterData() {
      this.nowPage === 1 ? this.getData() : (this.nowPage = 1)
    },
    // add() {
    //   this.item = {}
    //   this.isDialogShow = true
    // },
    edit(data) {
      this.item = data
      this.isDialogShow = true
    },
    del(data) {
      this.$confirm('是否删除该文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .post('/manage/article/del', {
              id: data.id
            })
            .then(res => {
              if (res.code) {
                // this.$message({
                //   message: '删除成功',
                //   type: 'success'
                // })
                this.getData()
              }
            })
        })
        .catch(() => {
          this.$message('已取消删除！')
        })
    },
    closeDia(value) {
      this.isDialogShow = false
      if (value) this.getData()
    }
  }
}
</script>

<style lang="scss" module>
.header {
  position: relative;
  display: flex;
  align-items: center;

  > div {
    flex-grow: 0;
    flex-shrink: 0;

    &:not(:last-child) {
      margin-right: 20px;
    }
  }
  .search {
    display: flex;
    align-items: center;

    > div {
      width: 200px;
    }
  }
  .rightfloat {
    position: absolute;
    right: 20px;
  }
}
</style>