const navList = {
  state: {
    list: [{
        title: '首页',
        index: '/',
        icon: require('@/assets/-svg/home.svg'),
      },
      // 商品详情
      {
        title: '产品管理',
        index: '/mallManage',
        icon: require('@/assets/-svg/business.svg'),
        children: [
          {
            title: '产品轮播',
            index: '/mallManage/GoodCarousel',
          },
          {
            title: '产品列表',
            index: '/mallManage/GoodsManage',
          },
          {
            title: '价目列表',
            index: '/mallManage/PriceList',
          },
          // {
          //   title: '服务流程',
          //   index: '/mallManage/ServiceProcess',
          // },
          // {
          //   title: '收费标准',
          //   index: '/mallManage/Charges',
          // },
          // {
          //   title: '常见问题',
          //   index: '/mallManage/CommonProblem',
          // }
        ]
      },
      // 会员管理
      {
        title: '会员管理',
        index: '/member/MemberList',
        icon: require('@/assets/-svg/member.svg'),
      },
      // 订单管理
      {
        title: '订单管理',
        index: '/orderManage',
        icon: require('@/assets/-svg/order.svg'),
        children: [{
            title: '订单列表',
            index: '/orderManage/RetailOrder',
          },
          {
            title: '派单',
            index: '/orderManage/Dispatch',
          }
        ]
      },
      // 师傅会员管理
      {
        title: '师傅管理',
        index: '/masterMember',
        icon: require('@/assets/-svg/member.svg'),
        children: [{
            title: '师傅列表',
            index: '/masterMember/MemberList'
          },
          {
            title: '会员活动',
            index: '/masterMember/MemberActivities'
          },
          {
            title: '提现管理',
            index: '/masterMember/MasterWithdraw'
          },
          {
            title: '认证审核',
            index: '/masterMember/Authenticate'
          }
        ]
      },
      // 财务数据
      // {
      //   title: '财务数据',
      //   index: '/withdrawData',
      //   icon: require('@/assets/-svg/withdraw.svg'),
      //   children: [{
      //       title: '提现管理',
      //       index: '/withdrawData/WithdrawData'
      //     },
      //     {
      //       title: '会员充值记录',
      //       index: '/withdrawData/MemberRecharge'
      //     },
      //     {
      //       title: '师傅充值记录',
      //       index: '/withdrawData/MasterRecharge'
      //     },
      //     {
      //       title: 'VIP购买记录',
      //       index: '/withdrawData/VipBuy'
      //     },
      //     {
      //       title: '订单结算记录',
      //       index: '/withdrawData/OrderSettlement'
      //     },
      //   ]
      // },
      // 文章管理
      {
        title: '文章管理',
        index: '/article',
        icon: require('@/assets/-svg/article.svg'),
        children: [{
            title: '平台公告',
            index: '/article/OtherArticle',
          },
          {
            title: '单页文章',
            index: '/article/UserAgreement',
          },
        ]
      },
      // 系统参数
      {
        title: '系统设置',
        index: '/systemSetting/OtherSetting',
        icon: require('@/assets/-svg/system.svg'),
      },
      // 升级申请 
      // {
      //   title: '升级申请',
      //   index: '/upList/UpMemberList',
      //   icon: require('@/assets/-svg/update.svg'),
      // },
    ]
  }
}

export default navList