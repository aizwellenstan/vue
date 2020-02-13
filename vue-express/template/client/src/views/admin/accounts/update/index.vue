<template>
  <div>
    <div class="el-card login-card text-primary fs-xl is-always-shadow">
      <div class="el-card__header">修改帳戶</div>
      <div class="el-card__body">
        <table border="1" style="color:black;">
          <tr><th>使用者名稱</th><th>操作</th></tr>
          <tr v-for="(val, key, index) in userslist" :key="index">
            <td v-if="val['is active']">{{ key }} </td>
            <td v-if="val['is active']">
              <router-link :to="{ name: 'EditUser', params: { id : key }}">
                <button
                  type="danger"
                  size="small"
                >修改
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
// const QUERY_URL = 'http://192.168.1.77:7777/account/search/'
const QUERY_URL = api + '/account/search/'
export default {
  data() {
    return {
      search: '',
      userslist: []
    }
  },
  mounted() {
    fetch(QUERY_URL, {
      method: 'post',
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
        this.userslist = Object(json.data)
        console.log(this.userslist)
      })
  }
}
</script>
