<template>
  <div class="carousel">
    <el-dialog :title="item.id?'编辑轮播':'添加轮播'" :visible.sync="dialogFormVisible" label-width="100px" center width="40%" @close="closeDialog(false)">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="轮播图片：" prop="picurl">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :http-request="uploadSectionFile" list-type="picture-card">
            <img v-if="form.picurl" :src="form.picurl" class="good-img">
            <i v-else class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="跳转文章：" prop="jump_id">
          <el-select class="one-line" v-model="form.jump_id" filterable remote placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
            <el-option v-for="item in articleList" :key="item.id" :label="item.title" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序权重：" prop="sort">
          <el-input class="one-line" v-model="form.sort" placeholder="请输入排序权重" @input="transToNumberStr($event,'sort')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog(false)">取 消</el-button>
        <el-button type="primary" @click="closeDialog(true)">确 定</el-button>
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
      loading: false,
      form: {
        id: '',
        sort: '',
        thumb: '',
        picurl: '',
        jump_id: ''
      },
      articleList: [],
      rules: {
        sort: [{ required: true, message: '请输入排序权重', trigger: 'blur' }],
        jump_id: [
          { required: true, message: '请选择跳转文章', trigger: 'blur' }
        ],
        picurl: [{ required: true, message: '请上传轮播图片', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.item.id) {
      this.form = { ...this.form, ...this.item }
      let obj = {}
      obj.id = this.item.jump_id
      obj.title = this.item.jump_name
      this.articleList.push(obj)
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog(flag) {
      if (flag) {
        this.$refs.form.validate(valid => {
          if (!valid) return
          if (this.item.id) {
            this.$http.post('/manage/slider/edit', this.form).then(res => {
              this.dialogFormVisible = false
              this.$emit('close', true)
            })
          } else {
            this.$http.post('/manage/slider/add', this.form).then(res => {
              this.dialogFormVisible = false
              this.$emit('close', true)
            })
          }
        })
      } else {
        this.dialogFormVisible = false
        this.$emit('close', false)
      }
    },
    // 图片上传
    uploadSectionFile(param) {
      let fileObj = param.file
      let form = new FormData()
      form.append('file', fileObj)
      this.$http.post('/manage/Image/upload', form).then(res => {
        this.form.thumb = res.data.fileurl
        this.form.picurl = res.data.fileurl_str
      })
    },
    // 远程获取
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        this.$http
          .get('/manage/article/lists', {
            params: { page: 1, rows: 100, cate: 1, keywords: query }
          })
          .then(({ data: { lists } }) => {
            this.loading = false
            this.articleList = lists
          })
      }
    },
    // 转换为数字
    transToNumberStr(val, str) {
      this.form[str] = val
        .replace(/[^0-9.]/g, '')
        .replace('.', '#*')
        .replace(/\./g, '')
        .replace('#*', '.')
    }
  }
}
</script>

<style lang="scss" scoped>
.good-img {
  width: 145px;
  height: 145px;
}
.one-line {
  width: 80%;
}
</style>