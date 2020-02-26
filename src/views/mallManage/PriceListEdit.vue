<template>
  <div class="edit-goods">
    <el-dialog :title="item.id?'编辑产品':'添加产品'" :visible.sync="dialogFormVisible" :center="true" :close-on-click-modal="false" width="50%" @close="closeEdit(false)">
      <el-form :model="form" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="产品名称：" prop="name" clearable>
          <el-input v-model="form.name" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="产品价格：" prop="price" clearable>
          <el-input v-model="form.price" placeholder="请输入产品价格" @input="transToNumberStr($event,'price')"></el-input>
        </el-form-item>
        <el-form-item label="排序权重：" prop="sort" clearable>
          <el-input v-model="form.sort" placeholder="请输入产品权重" @input="transToNumberStr($event,'sort')"></el-input>
        </el-form-item>
        <!-- <el-form-item label="跳转到：" prop="amount">
          <el-select v-model="form.amount" filterable remote clearable placeholder="请输入文章关键词" :remote-method="remoteMethod" :loading="loading">
            <el-option v-for="item in keywordList" :key="item.id" :label="item.title" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="活动片：" prop="thumb">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :http-request="uploadSectionFile" list-type="picture-card">
            <img v-if="form.thumb" :src="form.thumb" class="good-img">
            <i v-else class="el-icon-plus"></i>
          </el-upload>
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
      loading: false,
      keywordList: [],
      form: {
        id: '',
        name: '',
        price: '',
        sort: ''
      },
      rules: {
        name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
        price: [{ required: true, message: '请输入产品价格', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入产品权重', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.item.id) {
      this.form = { ...this.form, ...this.item }
    }
  },
  methods: {
    // 关闭窗口
    closeEdit(flag) {
      if (flag) {
        this.$refs.form.validate(valid => {
          if (!valid) return
          if (this.item.id) {
            this.$http
              .post('/manage/price_detail/edit', this.form)
              .then(res => {
                this.dialogFormVisible = false
                this.$emit('close', flag)
              })
              .catch(err => {})
          } else {
            // this.$http
            //   .post('/manage/product/add', this.form)
            //   .then(res => {
            //     this.dialogFormVisible = false
            //     this.$emit('close', flag)
            //   })
            //   .catch(err => {})
          }
        })
      } else {
        this.dialogFormVisible = false
        this.$emit('close', flag)
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

<style lang="scss">
.el-select {
  width: 100%;
}
.good-img {
  width: 145px;
  height: 145px;
  cursor: pointer;
}
</style>