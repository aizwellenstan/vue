<template>
  <div>
    <div class="el-card login-card text-primary fs-xl is-always-shadow">
      <div class="el-card__header">Update ColdData</div>
      <div class="el-card__body">
        <!-- {{this.colddataList}} -->
        <table border="1" style="color:black;">
          <tr><th>ParentId</th><th>ObjectId</th><th>Edit</th></tr>
          <tr v-for="(val, key, index) in colddataList" :key="index">
            <td>{{ val.ObjectData.ParentId }}</td>
            <td>{{ val.ObjectData.ObjectId }} </td>
            <td>
              <router-link :to="{ name: 'EditColddata', params: { id : val.ObjectData.id }}">
                <button
                  type="danger"
                  size="small"
                >Edit
                </button>
              </router-link>
            </td>
          </tr>
        </table>
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
      colddataList: []
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
        console.log(this.colddataList)
      })
  }
}
</script>
