<template>
  <div>
    <el-card>
      <div slot="header" class="header">
        <!-- <div class="search">
          <span>搜索：</span>
          <el-input v-model="keyword" placeholder="请输入昵称或账号" clearable @change="filterData" />
        </div> -->
        <el-button @click="editSetting" type="primary">
          添加配置
        </el-button>
        <!-- <el-button @click="editSetting" type="primary">
          修改配置
        </el-button> -->
      </div>
      <!-- <div class="body">
        <div v-for="item in tableData" class="block">

          <div class="itemC">
            <div class="setText">
              配置ID：{{item.id}}
            </div>
            <div class="setText">
              <span class="demonstration">{{item.name}}：</span>
              <span class="itemExplain">({{item.remark}})</span>
            </div>
            <el-input style="float: left;" v-model="item.value" placeholder="请配置详细信息" readonly></el-input>
            <div class="right-btn">
              <el-button type="primary" @click="editSetting(item)">查看 | 修改</el-button>
            </div>
          </div>
        </div>
      </div> -->
      <el-table :data="tableData">
        <el-table-column label="配置ID" align="center" width="150">
          <template slot-scope="{row}">{{row.id}}</template>
        </el-table-column>
        <el-table-column label="配置名" align="center" min-width="200">
          <template slot-scope="{row}">
            <div class="setText">
              <span class="demonstration">{{row.name}}：</span><br />
              <span class="itemExplain">({{row.remark}})</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="配置值" align="center" min-width="200">
          <template slot-scope="{row}">{{row.value}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="editSetting(row)">查看 | 修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <BasePagination :max="maxPage" :totalCount="totalCount" :now.sync="nowPage"></BasePagination>
      <EditSetting v-if="showEditSetting" :item="item" @close="closeDialog"></EditSetting>
    </el-card>
  </div>
</template>

<script>
import BasePagination from '@/components/BasePagination'

import EditSetting from './EditSetting'
export default {
  components: {
    BasePagination,
    EditSetting
  },
  data() {
    return {
      tableData: [],
      nowPage: 1,
      pageSize: 10,
      maxPage: 0,
      totalCount: 0,
      item: [],
      showEditSetting: false
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
    // 关闭弹出窗
    closeDialog(flag) {
      if (flag) {
        this.getData()
      }
      this.showEditSetting = false
    },
    // 修改或添加配置
    editSetting(item) {
      if (item.id) {
        this.item = item
      } else {
        this.item = {}
      }
      this.showEditSetting = true
    },
    getData() {
      this.$http
        .get('/manage/param/lists', {
          params: {
            page: this.nowPage,
            rows: this.pageSize
          }
        })
        .then(res => {
          this.tableData = res.data.list
          this.totalCount = res.data.total
          this.maxPage = res.data.page_total
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  width: 700px;
  padding: 10px;
  border-bottom: 1px solid #f5f5f5;
  .itemC {
    display: flex;
    justify-content: center;
    align-items: center;
    // border: 1px solid red;
    .setText {
      display: flex;
      flex-direction: column;
      margin-right: 10px;
      // border: 1px solid green;
      width: 50%;
      .demonstration {
        font-size: 14px;
      }
      .itemExplain {
        font-size: 12px;
      }
    }
    .right-btn {
      margin-left: 10px;
    }
  }
}
.slid {
  float: right;
  width: 80%;
}
.end {
  margin-top: 20px;
  text-align: right;
  width: 700px;
}
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