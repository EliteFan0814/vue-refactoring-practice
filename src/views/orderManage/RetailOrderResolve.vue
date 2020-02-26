<template>
  <div>
    <el-dialog :title="`订单号：${item.order_sn} 调解处理`" width="35%" :visible.sync="dialogFormVisible" :close-on-click-modal="false" center @close="closeDialog(false)">
      <el-form :model="form" ref="form" :rules="rules" label-position="left">
        <el-form-item label="纠纷金额：" prop="money" label-width="100px">
          <el-input v-model="form.money" placeholder="请输入纠纷金额" @input="transToNumberStr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog(false)">取 消</el-button>
        <el-button type="primary" @click="submitResolve">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      dialogFormVisible: true,
      form: {
        order_id: '',
        money: ''
      },
      rules: {
        money: [{ required: true, message: '请输入纠纷金额', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.form.order_id = this.item.order_id
  },
  methods: {
    // 关闭窗口
    closeDialog(flag) {
      if (flag) {
        this.$emit('close', true)
      } else {
        this.$emit('close')
      }
    },
    // 提交更改
    submitResolve() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        this.$http
          .post('/manage/order/handle', this.form)
          .then(res => {
            if (res.code) {
              this.closeDialog(true)
            }
          })
          .catch(err => {})
      })
    },
    // 转换为数字
    transToNumberStr(val) {
      this.form.money = val
        .replace(/[^0-9.]/g, '')
        .replace('.', '#*')
        .replace(/\./g, '')
        .replace('#*', '.')
    }
  }
}
</script>

<style lang="scss">
</style>