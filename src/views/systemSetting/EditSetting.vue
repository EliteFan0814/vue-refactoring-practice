<template>
  <div>
    <el-dialog :title="item.name?'修改配置':'添加新配置'" width="40%" :visible.sync="dialogFormVisible" :close-on-click-modal="false" center @close="closeDialog(false)">
      <el-form :model="form" ref="form" :rules="rules" label-position="left">
        <el-form-item v-if="!item.name" label="配置ID：" prop="id" label-width="100px">
          <el-input v-model="form.id" placeholder="请勿输入重复ID"></el-input>
        </el-form-item>
        <el-form-item label="配置名：" prop="name" label-width="100px">
          <el-input v-model="form.name" placeholder="请输入配置名"></el-input>
        </el-form-item>
        <el-form-item label="配置说明：" prop="remark" label-width="100px">
          <el-input placeholder="请输入配置说明" v-model="form.remark">
          </el-input>
        </el-form-item>
        <el-form-item label="配置值：" prop="value" label-width="100px">
          <el-input v-model="form.value" placeholder="请输入配置值"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog(false)">取 消</el-button>
        <el-button type="primary" @click="submitSetting">确 定</el-button>
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
        id: '',
        name: '',
        value: '',
        remark: ''
      },
      rules: {
        id: [{ required: true, message: '请输入配置ID', trigger: 'blur' }],
        name: [{ required: true, message: '请输入配置名称', trigger: 'blur' }],
        value: [{ required: true, message: '请输入配置值', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入配置说明', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.item.name) {
      this.form = JSON.parse(JSON.stringify(this.item))
    }
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
    submitSetting() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        let url = '/manage/param/edit'
        if (!this.item.name) {
          url = '/manage/param/add'
        }
        this.$http
          .post(url, this.form)
          .then(res => {
            if (res.code) {
              this.closeDialog(true)
            }
          })
          .catch(err => {})
      })
    }
  }
}
</script>

<style lang="scss">
</style>