<template>
  <div>
    <el-dialog @close="close(false)" title="充值" :visible.sync="isDialog" :close-on-click-modal="false" width="500px" class="btnbox">
      <el-form :model="form" ref="form" :rules="rules" label-position="right" label-width="100px">
        <el-form-item label="充值金额：" prop="chargeMoney">
          <el-input v-model="form.chargeMoney" @input="transToNumberStr" placeholder="请输入充值金额"></el-input>
        </el-form-item>
        <el-form-item label="充值备注：" prop="chargeRemark">
          <el-input v-model="form.chargeRemark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>

      <el-button slot="footer" type @click="close(false)">取消</el-button>
      <el-button slot="footer" type="primary" @click="chargeSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['item'],
  created() {},
  data() {
    return {
      isDialog: true,
      form: {
        chargeMoney: '',
        chargeRemark:''
      },
      rules: {
        chargeMoney: [
          {
            required: true,
            message: '请输入充值金额',
            trigger: 'blur'
          }
        ],
        chargeRemark:[{
            required: true,
            message: '请输入备注',
            trigger: 'blur'
          }]
      }
    }
  },
  methods: {
    close(flag) {
      if (flag) {
        this.$emit('close', true)
      }
      this.$emit('close')
    },
    // 转换为数字
    transToNumberStr(val) {
      this.form.chargeMoney = val
        .replace(/[^0-9.]/g, '')
        .replace('.', '#*')
        .replace(/\./g, '')
        .replace('#*', '.')
    },
    // 充值提交
    chargeSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        this.$http
          .post('/manage/worker/pay', {
            id: this.item.worker_id,
            amount: this.form.chargeMoney,
            remark:this.form.chargeRemark
          })
          .then(res => {
            if (res.code) {
              this.close(true)
            }
          })
          .catch(err => {})
      })
    }
  }
}
</script>
<style scoped>
/* .inp {
  width: 95%;
} */
.btnbox {
  text-align: center;
}
.btn {
  display: inline-block;
  width: 70%;
}
.btn.pay {
  position: relative;
  margin-left: -3px;
}
.btn:nth-of-type(2) {
  margin-top: 10px;
}
</style>

