<template>
  <div>
    <div class="el-card login-card text-primary fs-xl is-always-shadow">
      <div class="el-card__header">查詢帳戶</div>
      <div class="el-card__body">
        <label>查詢</label>
        <input v-model="search" type="text" placeholder="輸入關鍵字">
        <div>
          <table v-for="(val, key, index) in filteredList" :key="index" border="1" style="color:black;" width="242px">
            <tr><td width="92px">使用者名稱</td><td>{{ key }} </td></tr>
            <tr><td width="92px">Email</td><td>{{ val.Email }}</td></tr>
            <tr><td width="92px">姓</td><td>{{ val["First Name"] }}</td></tr>
            <tr><td width="92px">名</td><td>{{ val["Last Name"] }}</td></tr>
            <tr><td width="92px">已啟用</td><td>{{ val["is active"] }}</td></tr>
            <tr>
              <td>權限</td>
              <!-- <td v-if=(val["is staff"]+ val["is superuser"])===2>最高管理者 </td> -->
              <!-- <td v-else-if="val["is staff"]+ val["is superuser"]==1">管理者
              <td v-else>員工</td>   -->
              <td>{{ permission(val) }}</td>

            </tr>
            <br>
          </table>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../../../api.js'
const QUERY_URL = api + '/account/search/'
export default {
  data() {
    return {
      search: '',
      userslist: ''
    }
  },
  computed: {
    filteredList() {
      return Object.keys(this.userslist)
        .filter(key => (key).toLowerCase().indexOf(this.search.toLowerCase()) !== -1)
        .reduce((obj, key) => {
          obj[key] = this.userslist[key]
          return obj
        }, {})
      // return Object.entries(this.userslist).map(([key, value]) => ({key, value}))
      //         .filter((data) =>
      //         JSON.stringify(data).toLowerCase().indexOf(this.search.toLowerCase()) !== -1);
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
      })
  },
  methods: {
    permission: function(val) {
      if (val['is staff'] + val['is superuser'] === 2) {
        return '最高管理者'
      } else if (val['is staff'] + val['is superuser'] === 1) {
        return '管理者'
      } else {
        return '員工'
      }
    },
    searchData() {
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
          console.log(json.data)
        })
    }
  }
}
</script>
