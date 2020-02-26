<template>
  <div>
    <el-card>
      <div slot="header" :class="$style.header">
        <div :class="$style.search">
          <span>搜索：</span>
          <el-input v-model="keyword" placeholder="请输入昵称或账号" clearable @change="filterData" />
        </div>
        <div>
          <el-select v-model="updateState" placeholder="请选择审核状态" @change="filterData" clearable>
            <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value" />
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
      </div>
      <el-table :data="authList">

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="申请时间：">
                <span>{{ props.row.create_time }}</span>
              </el-form-item>
              <el-form-item label="审核时间：">
                <span>{{ props.row.check_time }}</span>
              </el-form-item>
              <el-form-item label="驳回原因：">
                <span>{{ props.row.remark || '暂无信息' }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="center" label="师傅账号">
          <template slot-scope="{row}"> {{row.worker_info.account}}</template>
        </el-table-column>
        <el-table-column label="身份证正面" align="center">
          <template slot-scope="{row}">
            <el-image class="auth-pic" :src="row.card_just_str" :preview-src-list="row.card_just_str | picArray">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="身份证背面" align="center">
          <template slot-scope="{row}">
            <el-image class="auth-pic" :src="row.card_back_str" :preview-src-list="row.card_back_str | picArray">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="从业资格证" align="center">
          <template slot-scope="{row}">
            <el-image class="auth-pic" :src="row.congye_str" :preview-src-list="row.congye_str | picArray">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="开锁资格证" align="center">
          <template slot-scope="{row}">
            <el-image class="auth-pic" :src="row.kaisuo_str" :preview-src-list="row.kaisuo_str | picArray">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="自拍照" align="center">
          <template slot-scope="{row}">
            <el-image class="self-pic" :src="row.selfie_str" :preview-src-list="row.selfie_str | picArray">
            </el-image>
          </template>
        </el-table-column>
        <!-- <el-table-column label="审核状态" align="center">
          <template slot-scope="{row}">{{row.status_str}}</template>
        </el-table-column> -->
        <el-table-column label="审核状态" width="160px" align="center">
          <template slot-scope="{row}">
            <el-button size="mini" v-if="row.status === 2" type="info" disabled>已驳回</el-button>
            <el-button size="mini" v-else-if="row.status === 1" type="success" disabled>已通过</el-button>
            <template v-else>
              <el-button @click="open(row, 'Y')" size="mini" type="primary">同意</el-button>
              <el-button @click="open(row, 'N')" size="mini" type="danger">驳回</el-button>
            </template>
          </template>
        </el-table-column>
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
    this.updateState = this.$route.query.queryName
    this.getData()
  },
  data() {
    return {
      url:
        'http://5b0988e595225.cdn.sohucs.com/images/20171103/ac2da7fba0d447ff8565b81694b4da5d.jpeg',
      selectDate: ['', ''],
      keyword: '',
      memberName: '',
      status_screen: [],
      status: '',
      withdrawTypeList: [],
      withdrawType: '',
      updateState: '',
      stateList: [],
      type: '',
      dates: [],
      authList: [],
      maxPage: 1,
      nowPage: 1,
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
  filters: {
    picArray(picUrl) {
      let arr = []
      arr.push(picUrl)
      return arr
    }
  },
  watch: {
    nowPage() {
      this.getData()
    }
  },
  methods: {
    getData() {
      if (this.selectDate === null) {
        this.selectDate = []
      }
      this.$http
        .get('/manage/auh_apply/lists', {
          params: {
            page: this.nowPage,
            rows: this.pageSize,
            worker: this.keyword,
            state: this.updateState
            // starttime: this.startTime,
            // endtime: this.endTime
          }
        })
        .then(res => {
          this.authList = res.data.lists
          this.maxPage = res.data.page_total
          // this.withdrawTypeList = res.data.type_screen
          this.stateList = res.data.state_screen
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
          '确定同意账户：' + data.worker_info.account + ' 通过审核？',
          '审核',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success',
            center: true
          }
        )
          .then(res => {
            this.$http
              .post('/manage/auh_apply/agree', {
                id: data.worker_id
              })
              .then(res => {
                if (res.code) {
                  // this.$message({
                  //   message: '已同意升级请求',
                  //   type: 'success'
                  // })
                  this.filterData()
                }
              })
          })
          .catch(() => {
            this.$message('已取消！')
          })
      } else {
        this.$prompt(
          '请输入驳回账户：' + data.worker_info.account + ' 的原因',
          '驳回 ',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
            center: true,
            inputPattern: /\S/,
            inputErrorMessage: '请输入驳回原因'
          }
        )
          .then(({ value }) => {
            this.$http
              .post('/manage/auh_apply/deny', {
                id: data.worker_id,
                remark: value
              })
              .then(res => {
                if (res.code) {
                  // this.$message({
                  //   message: '已驳回升级请求',
                  //   type: 'success'
                  // })
                  this.filterData()
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
<style lang="scss" scoped>
.auth-pic {
  width: 80px;
  height: 50px;
}
.self-pic {
  width: 60px;
  height: 80px;
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
</style>