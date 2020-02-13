<template>
  <div class="app-container">
    Create HotData
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <button @click="handleSubmit">Submit</button>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import api from '../../../../../api.js'
const CompanyId = localStorage.getItem('CompanyId')
const ProductId = localStorage.getItem('ProductId')
const ProjectId = localStorage.getItem('ProjectId')
const REGISTER_URL = api + `/${CompanyId}/${ProductId}/${ProjectId}/hotdata`

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    },
    handleSubmit1() {
      console.log(this.tableData)
    },
    handleSubmit() {
      this.errorMessage = ''
      this.successMessage = ''
      this.signingUp = true
      for (var i = 0; i < this.tableData.length; i++) {
        fetch(REGISTER_URL, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(
            this.tableData[i]
          )
        })
          .then(res => res.json())
          .then(parsedResponse => {
            console.log(parsedResponse)
            this.successMessage = parsedResponse.message
          })
          .then((result) => {
            setTimeout(() => {
              this.signingUp = false
            }, 1000)
          })
          // .catch((error) => {
          //   setTimeout(() => {
          //     this.signingUp = false
          //   // this.errorMessage = error.message
          //   }, 1000)
          // })
      }
      this.tableData = ''
      this.tableHeader = ''
    }
  }
}
</script>
