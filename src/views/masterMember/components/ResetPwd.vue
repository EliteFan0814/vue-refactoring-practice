<template>
  <div>
    <el-dialog @close="close" title="重置密码" :visible.sync="isDialog" :close-on-click-modal="false" width="500px" class="btnbox">
      <el-form :model="form" ref="form" :rules="rules" label-position="right" label-width="100px">
        <el-form-item label="输入新密码" prop="newPwd">
          <el-input class="inp" v-model="form.newPwd" type="password" placeholder="请输入新的登录密码"></el-input>
        </el-form-item>
      </el-form>

      <el-button slot="footer" type @click="close">取消</el-button>
      <el-button slot="footer" type="primary" @click="resultPassword">确 定</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['item'],
  created() {},
  data() {
    return {
      // activeName: 'first',
      isDialog: true,
      // newPwdPass: false,
      // newPayPwdPass: false,
      form: {
        newPwd: ''
      },
      rules: {
        newPwd: [
          {
            required: true,
            min: 6,
            max: 16,
            message: '长度在 6 到 16 个字符',
            trigger: 'blur'
          }
          // { required: false, message: '请输入新的登陆密码', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    resultPassword() {
      // 登录密码校验和重置
      this.$refs.form.validate(valid => {
        if (!valid) return
        if (this.form.newPwd) {
          this.$http
            .post('/manage/worker/resetPwd', {
              id: this.item.worker_id,
              password: this.form.newPwd
            })
            .then(res => {
              if (res.code) {
                // this.$message({
                //   message: '恭喜你，重置登陆密码成功',
                //   type: 'success'
                // })
                this.close()
              }
            })
            .catch(err => {})
        }
      })
    }
  }
}
</script>
<style scoped>
.inp {
  width: 95%;
}
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

