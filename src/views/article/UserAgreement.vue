<template>
  <div>
    <el-card>
      <!-- <div slot="header" :class="$style.header">
        <div :class="$style.search">
          <el-button @click="add()" class="add" type="primary">
            添加
          </el-button>
        </div>
      </div> -->
      <el-table :data="tableData">
        <!-- <el-table-column label="平台类型" align="center" min-width="200">
          <template slot-scope="{row}">{{row.id}}</template>
        </el-table-column> -->
        <el-table-column label="标题" align="center" min-width="200">
          <template slot-scope="{row}">{{row.title}}</template>
        </el-table-column>
        <el-table-column label="排序权重" align="center" min-width="200">
          <template slot-scope="{row}">{{row.sort}}</template>
        </el-table-column>
        <el-table-column label="更新时间" align="center" min-width="200">
          <template slot-scope="{row}">{{row.update_time}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="edite(row)">查看 | 修改</el-button>
            <!-- <el-button type="danger" size="mini" @click="del(row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <EditProblem v-if="isDialogShow" :item="item" :catelist="false" :dialogVisible="isDialogShow" @close="closeDia"></EditProblem>
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
      type: 1,
      tableData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$http
        .get('/manage/article/one', {
          params: {
            page: this.nowPage,
            rows: this.pageSize
          }
        })
        .then(res => {
          this.tableData = res.data.lists
          this.maxPage = res.data.page_total
          this.totalCount = res.data.total
        })
    },
    // add() {
    //   this.item = {}
    //   this.isDialogShow = true
    // },
    edite(data) {
      this.item = data
      this.isDialogShow = true
    },
    // del(data) {
    //   this.$confirm('是否删除该文章?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       this.$http
    //         .post('/api/Article/Delete', {
    //           id: data.id
    //         })
    //         .then(res => {
    //           if (res.success) {
    //             this.$message({
    //               message: '删除成功',
    //               type: 'success'
    //             })
    //             this.getData()
    //           }
    //         })
    //     })
    //     .catch(() => {
    //       this.$message('已取消删除！')
    //     })
    // },
    closeDia(value) {
      this.isDialogShow = false
      if (value) this.getData()
    }
    // addOne(name, cate, textarea) {
    //   this.tableData.push({ index, name, cate, textarea })
    //   index++
    // }
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
      margin-right: 20px;
    }
  }
}
</style>