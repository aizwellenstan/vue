<template>
  <div>
    <div class="el-card login-card text-primary fs-xl is-always-shadow">
      <div class="el-card__header">Query ColdData</div>
      <div class="el-card__body">
        <!-- <label>查詢</label> -->
        <!-- <input v-model="search" type="text" placeholder="輸入關鍵字"> -->
        <div>
          <table v-for="(val, key, index) in filteredList" :key="index" border="1" style="color:black;" width="242px">
            <tr><td width="92px">PerentId</td><td>{{ val.ObjectData.ParentId }} </td></tr>
            <tr><td width="92px">ObjectId</td><td>{{ val.ObjectData.ObjectId }} </td></tr>
            <tr><td width="92px">ChartURL</td><td>{{ val.ObjectData.ChartURL }} </td></tr>
            <br>
          </table>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../../../api.js'
const CompanyId = localStorage.getItem('CompanyId')
const ProductId = localStorage.getItem('ProductId')
const ProjectId = localStorage.getItem('ProjectId')
const QUERY_URL = api + `/${CompanyId}/${ProductId}/${ProjectId}/colddata`
export default {
  data() {
    return {
      search: '',
      colddataList: ''
    }
  },
  computed: {
    filteredList() {
      return Object.keys(this.colddataList)
        .filter(key => (key).toLowerCase().indexOf(this.search.toLowerCase()) !== -1)
        .reduce((obj, key) => {
          obj[key] = this.colddataList[key]
          return obj
        }, {})
      // return Object.entries(this.colddataList).map(([key, value]) => ({key, value}))
      //         .filter((data) =>
      //         JSON.stringify(data).toLowerCase().indexOf(this.search.toLowerCase()) !== -1);
    }
  },
  mounted() {
    fetch(QUERY_URL, {
      method: 'get',
      headers: {
        'Token': localStorage.getItem('token')
      }
    })
      .then(
        response =>
          response.json().then(data => ({
            data: data
          }))
      )
      .then(json => {
        this.colddataList = Object(json.data)
      })
  },
  methods: {
    searchData() {
      fetch(QUERY_URL, {
        method: 'get',
        headers: {
          'Token': localStorage.getItem('token')
        }
      })
        .then(
          response =>
            response.json().then(data => ({
              data: data
            }))
        )
        .then(json => {
          this.colddataList = Object(json.data)
          console.log(json.data)
        })
    }
  }
}
</script>
