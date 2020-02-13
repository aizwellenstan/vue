<template>
  <section>
    <h1>登入</h1>
    <div v-if="loggingIn" />
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <form v-if="!loggingIn" @submit.prevent="login()">
      <div class="form-group">
        <label for="username">使用者名稱</label>
        <input
          id="username"
          v-model="user.username"
          type="text"
          class="form-control"
          aria-describedby="usernameHelp"
          placeholder="輸入使用者名稱"
          required
        >
      </div>
      <div class="form-group">
        <label for="password">密碼</label>
        <input
          id="password"
          v-model="user.password"
          type="password"
          class="form-control"
          aria-describedby="passwordHelp"
          placeholder="輸入密碼"
          required
        >
      </div>
      <button type="submit" class="btn btn-primary">登入</button>
      <router-link to="/register">
        <button class="btn-white" type="submit">註冊</button>
      </router-link>
    </form>
  </section>
</template>

<script>
import api from '../../../api.js'
import Joi from 'joi'
const LOGIN_URL = api + '/login'
const schema = Joi.object().keys({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30)
    .required(),
  password: Joi.string().trim().min(8).required()
})
export default {
  data: () => ({
    errorMessage: '',
    loggingIn: false,
    user: {
      username: '',
      password: ''
    },
    user1: {
      username: '',
      password: ''
    }
  }),
  methods: {
    login() {
      this.errorMessage = ''
      // if (this.validUser()) {
      this.loggingIn = true
      // const body = {
      //   username: this.user.username,
      //   password: this.user.password
      // }
      fetch(LOGIN_URL, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          'Username': this.user.username,
          'Password': this.user.password
        })
      }).then(
        response =>
          response.json().then(data => ({
            data: data,
            status: response.status
          }))
      )
        .then(res => {
          console.log(res.status, res.data.token)
          if (res.status === 401) {
            this.loggingIn = false
            this.errorMessage = 'login failed'
          } else {
            console.log(res)
            if (res.data.AccountInfo.token) {
              localStorage.setItem('token', res.data.AccountInfo.token)
              localStorage.setItem('CompanyId', res.data.AccountInfo.CompanyId)
              localStorage.setItem('ProductId', res.data.AccountInfo.ProductId)
              localStorage.setItem('ProjectId', res.data.AccountInfo.ProjectId)
            } else {
              localStorage.setItem('token', '')
            }
            this.user1.username = 'admin'
            this.user1.password = '11111'
            this.$store.dispatch('user/login', this.user1)
            this.$store.state.signedIn = true
            // .then(() => {
            // localStorage.setItem('token', this.token)
            // this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            this.$router.push({ path: this.redirect })
            this.loading = false
            // })
            // .catch(() => {
            //   this.loading = false
            // })
            // localStorage.token = result.token;
            setTimeout(() => {
              this.loggingIn = false
              this.$router.push('/')
            }, 1000)
          }
        })

      // .then(() => {

      // }).catch((error) => {
      //   setTimeout(() => {
      //     this.loggingIn = false
      //     this.errorMessage = error.message
      //   }, 1000)
      // })
    },
    validUser() {
      const result = Joi.validate(this.user, schema)
      if (result.error === null) {
        return true
      }
      if (result.error.message.includes('username')) {
        this.errorMessage = 'Username is invalid. 😭'
        console.log(result.error.message)
      } else {
        this.errorMessage = 'Password is invalid. 🙈'
      }
      return false
    }
  }
}
</script>

<style>
</style>
