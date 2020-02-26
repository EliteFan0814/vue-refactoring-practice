<template>
  <div class="edit-goods">
    <el-dialog title="编辑收费标准" :visible.sync="dialogFormVisible" :center="true" :close-on-click-modal="false" width="50%" @close="closeEdit(false)">
      <el-form :model="form" ref="form" :rules="rules" label-width="80px">
        <el-form-item label="收费名称" prop="name">
          <el-input v-model="form.name"  placeholder="请输入收费名称"></el-input>
        </el-form-item>
        <el-form-item label="收费分类" prop="goodClass">
          <el-select v-model="form.goodClass" placeholder="请选择收费分类">
            <el-option label="一" value="shanghai"></el-option>
            <el-option label="二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收费价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入收费价格" @input="transToNumberStr"></el-input>
        </el-form-item>
        <!-- <el-form-item label="收费图片" prop="picture">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :http-request="uploadSectionFile" list-type="picture-card">
            <img v-if="form.picture" :src="form.picture" class="good-img">
            <i v-else class="el-icon-plus"></i>
          </el-upload>
        </el-form-item> -->
        <!-- <el-form-item label="收费详情" prop="content">
          <Editor :content="form.content" :height1="400" @changed="(value)=>{form.content=value}"></Editor>
        </el-form-item> -->
      </el-form>
      <div slot="footer">
        <el-button @click="closeEdit(false)">取 消</el-button>
        <el-button type="primary" @click="closeEdit(true)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Editor from '@/components/RichText'

export default {
  components: {
    Editor
  },
  props: ['item'],
  data() {
    return {
      dialogFormVisible: true,
      form: {
        name: '',
        goodClass: '',
        picture: '',
        content: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入收费金额',
            trigger: 'blur'
          }
        ],
        goodClass: [
          {
            required: true,
            message: '请输入收费金额',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: '请输入收费价格',
            trigger: 'blur'
          }
        ],
        picture: [
          {
            required: true,
            message: '请上传收费图片',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入收费详情',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {},
  methods: {
    // 关闭窗口
    closeEdit(flag) {
      if (flag) {
        this.$refs.form.validate(valid => {
          if (!valid) return
        })
      }
      this.dialogFormVisible = false
      this.$emit('close', flag)
    },
    // 上传图片
    uploadSectionFile(param) {
      var fileObj = param.file
      var form = new FormData()
      form.append('file', fileObj)
      this.$http.post('/manage/image/upload', form).then(res => {
        if (res.code) {
          this.goodInfo.thumb = res.data.fileurl
          this.goodInfo.picurl = res.data.fileurl_str
        }
      })
    },
    // 转换为数字
    transToNumberStr(val) {
      this.form.price = val
        .replace(/[^0-9.]/g, '')
        .replace('.', '#*')
        .replace(/\./g, '')
        .replace('#*', '.')
    }
  }
}
</script>

<style lang="scss">
.el-select {
  width: 100%;
}
.good-img {
  width: 148px;
  height: 148px;
  cursor: pointer;
}
</style>