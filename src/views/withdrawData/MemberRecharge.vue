<template>
  <div>
    <el-card>
      <div slot="header" :class="$style.header">
        <div :class="$style.search">
          <span>搜索：</span>
          <el-input v-model="keyword" placeholder="请输入昵称或账号" clearable @change="filterData" />
        </div>
        <div>
          <el-select v-model="withdrawType" placeholder="请选择充值类型" @change="filterData" clearable>
            <el-option v-for="item in withdrawTypeList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div>
          <el-select v-model="withdrawState" placeholder="请选择充值状态" @change="filterData" clearable>
            <el-option v-for="item in withdrawStateList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <el-button @click="filterData" type="primary">
          搜索
          <i class="el-icon-search"></i>
        </el-button>
      </div>
      <el-table :data="withdrawList">

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="充值账号(卡号)：">
                <span>{{ props.row.account }}</span>
              </el-form-item>
              <el-form-item label="账号类型：">
                <span>{{ props.row.type_str }}</span>
              </el-form-item>
              <el-form-item label="驳回原因：">
                <span>{{ props.row.remark || '暂无' }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="会员信息">
          <template slot-scope="{row}">
            <MemberInfo :avatar="row.member_info.thumb" :name="row.member_info.nickname" :phone="row.member_info.account"></MemberInfo>
          </template>
        </el-table-column>
        <el-table-column label="充值金额" align="center">
          <template slot-scope="{row}">{{row.apply_amount}}</template>
        </el-table-column>

        <el-table-column label="手续费" align="center">
          <template slot-scope="{row}">{{row.taxfee}}</template>
        </el-table-column>

        <el-table-column label="实际金额" align="center">
          <template slot-scope="{row}">{{row.real_amount}}</template>
        </el-table-column>

        <el-table-column label="充值方式" align="center">
          <template slot-scope="{row}">{{row.type_str}}</template>
        </el-table-column>

        <el-table-column label="充值状态" align="center">
          <template slot-scope="{row}">{{row.status_str}}</template>
        </el-table-column>

        <el-table-column label="申请时间" min-width="110" align="center">
          <template slot-scope="{row}">{{row.create_time}}</template>
        </el-table-column>
        <!-- <el-table-column label="提现操作" width="160px" align="center">
          <template slot-scope="{row}">
            <el-button size="mini" v-if="row.status === 2" type="info" disabled>已驳回</el-button>
            <el-button size="mini" v-else-if="row.status === 3" type="success" disabled>已提现</el-button>
            <template v-else>
              <el-button @click="open(row, 'Y')" size="mini" type="primary">同意</el-button>
              <el-button @click="open(row, 'N')" size="mini" type="danger">驳回</el-button>
            </template>
          </template>
        </el-table-column> -->
      </el-table>
      <BasePagination :max="maxPage" :totalCount="totalCount" :now.sync="nowPage"></BasePagination>
    </el-card>
  </div>
</template>

<script>
import MemberInfo from '@/components/MemberInfo'
import BasePagination from '@/components/BasePagination'
export default {
  components: {
    MemberInfo,
    BasePagination
  },
  created() {
    this.withdrawState = this.$route.query.queryName
    this.getData()
  },
  data() {
    return {
      keyword: '',
      memberName: '',
      status_screen: [],
      status: '',
      withdrawTypeList: [],
      withdrawType: '',
      withdrawState: '',
      withdrawStateList: [],
      type: '',
      dates: [],
      withdrawList: [],
      maxPage: 1,
      nowPage: 1,
      pageSize: 10,
      totalCount: 0
    }
  },
  watch: {
    nowPage() {
      this.getData()
    }
  },
  methods: {
    getData() {
      this.$http
        .get('/manage/cash/lists', {
          params: {
            page: this.nowPage,
            rows: this.pageSize,
            member: this.keyword,
            type: this.withdrawType,
            state: this.withdrawState
          }
        })
        .then(res => {
          this.withdrawList = res.data.lists
          this.maxPage = res.data.page_total
          this.withdrawTypeList = res.data.type_screen
          this.withdrawStateList = res.data.state_screen
          this.totalCount = res.data.total
        })
    },
    filterData() {
      // this.getData()
      this.nowPage === 1 ? this.getData() : (this.nowPage = 1)
    },
    open(data, state) {
      if (state === 'Y') {
        this.$confirm(
          '确定同意账户：' + data.member_info.account + ' 的充值请求吗？',
          '充值',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success',
            center: true
          }
        )
          .then(res => {
            this.$http
              .post('/manage/cash/agree', {
                id: data.id
              })
              .then(res => {
                if (res.code) {
                  // this.$message({
                  //   message: '已同意提现请求',
                  //   type: 'success'
                  // })
                  this.getData()
                }
              })
          })
          .catch(() => {
            this.$message('已取消！')
          })
      } else {
        this.$prompt('请输入驳回账户： ' + data.member_info.account + ' 充值的原因！', '驳回 ', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
          center: true,
          inputPattern: /\S/,
          inputErrorMessage: '请输入驳回原因'
        })
          .then(({ value }) => {
            this.$http
              .post('/manage/cash/deny', {
                id: data.id,
                remark: value
              })
              .then(res => {
                if (res.code) {
                  // this.$message({
                  //   message: '已驳回提现请求',
                  //   type: 'success'
                  // })
                  this.getData()
                }
              })
              .catch(err => {})
          })
          .catch(() => {
            this.$message('已取消！')
          })
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
</style>