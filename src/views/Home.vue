<template>
  <div class="home">
    <div class="cardBody">
      <div v-for="(item, index) in cardList" :key="index">
        <div>{{ item.title }}</div>
        <div @click="push(item.path,item.status,item.nowDate)" class="route">{{ item.number }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      // num: 0,
      dataMsg: []
    }
  },
  created() {
    this.getData()
  },
  computed: {
    nowDate(){
      return new Date().toISOString().substring(0, 10)
    },
    cardList() {
      return [
        { path: '/member/MemberList', ...this.dataMsg.member_num }, // 会员人数
        { path: '/', ...this.dataMsg.member_day_num }, // 今日新增会员数
        { path: '/masterMember/MemberList', ...this.dataMsg.worker_num }, // 师傅数
        { path: '/orderManage/RetailOrder', ...this.dataMsg.order_num, status: 5 }, // 订单数
        { path: '/orderManage/RetailOrder', ...this.dataMsg.order_day_num, status: 5, nowDate:this.nowDate }, // 今日订单数
        { path: '/', ...this.dataMsg.worker_money_finish } ,// 师傅余额总量
        { path: '/masterMember/MasterWithdraw', ...this.dataMsg.cash_num, status: 2 } ,// 待处理提现数
        { path: '/', ...this.dataMsg.money_num } ,// 今日总充值
        { path: '/', ...this.dataMsg.member_money_num } ,// 今日会员充值
        { path: '/', ...this.dataMsg.worker_money_num } ,// 今日师傅充值
        { path: '/masterMember/Authenticate', ...this.dataMsg.worker_apply_num, status: 1 } // 师傅待审核认证数
      ]
    }
  },
  methods: {
    getData() {
      this.$http.get('/manage/user/cencos').then(res => {
        this.dataMsg = res.data
      })
    },

    push(path, name, date) {
      this.$router.push({
        path: path,
        query: {
          queryName: name,
          queryDate:date
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.num {
  color: red;
  display: inline-block;
  margin: 0 10px;
}
.cardBody {
  > div {
    display: inline-block;
    width: 19%;
    margin: 20px 3%;
    height: 200px;
    border-radius: 12px;
    margin-bottom: 15px;
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.1);
    background: white;

    > div {
      &:first-child {
        font-size: 16px;
        padding: 10px 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      &:last-child {
        text-align: center;
        padding: 40px 0;
        font-size: 40px;
        &:hover {
          cursor: pointer;
        }
      }
    }

    > img {
      width: 100px;
      height: 100px;
      top: 50%;
      right: 8%;
      transform: translateY(-50%);
    }
  }

  > div[space] {
    height: 0;
    margin: 0;
  }
}
.home {
  background: white;
  padding: 25px;
  border-radius: 8px;
}
</style>

