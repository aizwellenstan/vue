<template>
  <div>
    <div class="el-card login-card text-primary fs-xl is-always-shadow">
      <div class="el-card__header">刪除帳戶</div>
      <div class="el-card__body">
        <table border="1" style="color:black;">
          <tr><th>使用者名稱</th><th>操作</th></tr>
          <tr v-for="(val, key, index) in userslist" :key="index">
            <td v-if="val['is active']">{{ key }} </td>
            <td v-if="val['is active']"><button :id="key" type="danger" size="small" @click="confirm(key)">刪除</button></td>
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
  },
  methods: {
    confirm(id) {
      var okdelete = false
      console.log('remove' + id)
      if (confirm(`Are You Sure To Delete "${id}"`)) {
        okdelete = true
      } else {
        console.log('やめろぉぉぉぉぉ!')
      }
      if (okdelete) {
        const token = localStorage.getItem('token')
        // var DELETE_URL = `http://192.168.1.77:7777/account/delete/${id}/`
        var DELETE_URL = api + `/account/delete/${id}/`
        fetch(DELETE_URL, {
          method: 'post',
          headers: {
            'Token': token
          }
        })
        console.log('シネネネネネネネねね')
      }
    }
  }
}
</script>

<style>
.gray {
  color: #BEBEBE
}
</style>
