import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/Layout'
import Login from '@/views/Login'
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [{
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/',
      component: Layout,
      children: [
        //首页
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/Home'),
          meta: {
            title: '统计'
          },
          // alias: '/'
        },

        // 商品详情
        {
          path: '/mallManage/GoodCarousel',
          name: 'GoodCarousel',
          component: () => import('@/views/mallManage/GoodCarousel'),
          meta: {
            title: '产品轮播'
          }
        },
        {
          path: '/mallManage/GoodsManage',
          name: 'GoodsManage',
          component: () => import('@/views/mallManage/GoodsManage'),
          meta: {
            title: '产品列表'
          }
        },
        {
          path: '/mallManage/PriceList',
          name: 'PriceList',
          component: () => import('@/views/mallManage/PriceList'),
          meta: {
            title: '价目列表'
          }
        },
        {
          path: '/mallManage/ServiceProcess',
          name: 'ServiceProcess',
          component: () => import('@/views/mallManage/ServiceProcess'),
          meta: {
            title: '服务流程'
          }
        },
        {
          path: '/mallManage/Charges',
          name: 'Charges',
          component: () => import('@/views/mallManage/Charges'),
          meta: {
            title: '收费标准'
          }
        },
        {
          path: '/mallManage/CommonProblem',
          name: 'CommonProblem',
          component: () => import('@/views/mallManage/CommonProblem'),
          meta: {
            title: '常见问题'
          }
        },
        //会员管理
        {
          path: '/member/MemberList',
          name: 'MemberList',
          component: () => import('@/views/member/MemberList'),
          meta: {
            title: '会员管理'
          }
        },
        // 订单管理
        {
          path: '/orderManage/RetailOrder',
          name: 'RetailOrder',
          component: () => import('@/views/orderManage/RetailOrder'),
          meta: {
            title: '订单管理'
          }
        },
        {
          path: '/orderManage/Dispatch',
          name: 'Dispatch',
          component: () => import('@/views/orderManage/Dispatch'),
          meta: {
            title: '派单'
          }
        },
        // 师傅会员管理
        {
          path: '/masterMember/MemberList',
          name: 'masterMemberList',
          component: () => import('@/views/masterMember/masterMemberList'),
          meta: {
            title: '师傅列表'
          }
        },
        {
          path: '/masterMember/MemberActivities',
          name: 'MemberActivities',
          component: () => import('@/views/masterMember/MemberActivities'),
          meta: {
            title: '会员活动'
          }
        },
        {
          path: '/masterMember/MasterWithdraw',
          name: 'MasterWithdraw',
          component: () => import('@/views/masterMember/MasterWithdraw'),
          meta: {
            title: '提现管理'
          }
        },
        {
          path: '/masterMember/Authenticate',
          name: 'Authenticate',
          component: () => import('@/views/masterMember/Authenticate'),
          meta: {
            title: '认证审核'
          }
        },
        // 财务数据
        {
          path: '/withdrawData/WithdrawData',
          name: 'WithdrawData',
          component: () => import('@/views/withdrawData/WithdrawData'),
          meta: {
            title: '提现管理'
          }
        },
        {
          path: '/withdrawData/MemberRecharge',
          name: 'MemberRecharge',
          component: () => import('@/views/withdrawData/MemberRecharge'),
          meta: {
            title: '会员充值记录'
          }
        },
        {
          path: '/withdrawData/MasterRecharge',
          name: 'MasterRecharge',
          component: () => import('@/views/withdrawData/MasterRecharge'),
          meta: {
            title: '师傅充值记录'
          }
        },
        {
          path: '/withdrawData/VipBuy',
          name: 'VipBuy',
          component: () => import('@/views/withdrawData/VipBuy'),
          meta: {
            title: 'VIP购买记录'
          }
        },
        {
          path: '/withdrawData/OrderSettlement',
          name: 'OrderSettlement',
          component: () => import('@/views/withdrawData/OrderSettlement'),
          meta: {
            title: '订单结算记录'
          }
        },
        // 文章管理
        {
          path: '/article/OtherArticle',
          name: 'OtherArticle',
          component: () => import('@/views/article/OtherArticle'),
          meta: {
            title: '平台公告'
          }
        },
        {
          path: '/article/UserAgreement',
          name: 'UserAgreement',
          component: () => import('@/views/article/UserAgreement'),
          meta: {
            title: '单页文章'
          }
        },
        // 系统参数设置
        {
          path: '/systemSetting/OtherSetting',
          name: 'OtherSetting',
          component: () => import('@/views/systemSetting/OtherSetting'),
          meta: {
            title: '系统设置'
          }
        },
        // 升级申请
        {
          path: '/upList/UpMemberList',
          name: 'UpList',
          component: () => import('@/views/upList/UpMemberList'),
          meta: {
            title: '升级申请'
          }
        },
        //系统用户管理        
        // {
        //   path: '/systemUser/systemUserManage',
        //   name: 'systemUserManage',
        //   component: () => import('@/views/systemUser/systemUserManage'),
        //   meta: {
        //     title: '系统用户管理'
        //   }
        // },

        //网站信息配置
        // {
        //   path: '/system/system',
        //   name: 'system',
        //   component: () => import('@/views/system/system'),
        //   meta: { title: '网站信息配置' }
        // }
      ]
    }
  ]
})