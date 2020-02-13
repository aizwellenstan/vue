<template>
  <div>
    <div class="el-card login-card text-primary fs-xl is-always-shadow">
      <div class="el-card__header">Update HotData</div>
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="alert alert-success" role="alert">
        {{ successMessage }}
      </div>
      <form v-if="!signingUp" @submit.prevent="signup">
        <div class="form-group">
          <div class="el-form-item">
            <label class="el-form-item__label">ObjectId</label>
            <div class="el-form-item__content">
              <div class="el-input">
                <input
                  id="username"
                  v-model="hotdata.ObjectId"
                  type="text"
                  class="el-input__inner"
                  aria-describedby=""
                  placeholder=""
                >
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="el-form-item">
            <label class="el-form-item__label">Value</label>
            <div class="el-form-item__content">
              <div class="el-input">
                <input
                  id="username"
                  v-model="hotdata.Value"
                  type="text"
                  class="el-input__inner"
                  aria-describedby=""
                  placeholder=""
                >
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="el-form-item">
            <label class="el-form-item__label">Language</label>
            <div class="el-form-item__content">
              <div class="el-input">
                <input
                  id="username"
                  v-model="hotdata.Language"
                  type="text"
                  class="el-input__inner"
                  aria-describedby=""
                  placeholder=""
                >
              </div>
            </div>
          </div>
        </div>
        <div style="padding-top: 21px">
          <button type="submit" class="btn-cyan">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../../../../../api.js'
// import Joi from 'joi'

const CompanyId = localStorage.getItem('CompanyId')
const ProductId = localStorage.getItem('ProductId')
const ProjectId = localStorage.getItem('ProjectId')
const QUERY_URL = api + `/${CompanyId}/${ProductId}/${ProjectId}/hotdata/`

// const schema = Joi.object().keys({
//   username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(),
//   password: Joi.string().regex(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(^[a-zA-Z0-9@\$=!:.#%]+$)/).trim().min(8).required(),
//   confirmPassword: Joi.string().regex(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(^[a-zA-Z0-9@\$=!:.#%]+$)/).trim().min(8).required()
// })
export default {
  data: () => ({
    signingUp: false,
    errorMessage: '',
    successMessage: '',
    hotdata: '',
    user: {
      username: '',
      password: '',
      confirmPassword: '',
      lastName: '',
      firstName: '',
      email: '',
      su: '',
      sf: '',
      permission: '',
      ac: '',
      avalible: ''
    },
    isChecked: true
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = ''
      },
      deep: true
    }
  },
  created() {
    this.id = this.$route.params.id
  },
  mounted() {
    fetch(QUERY_URL + this.id, {
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
        this.hotdata = Object(json.data[0])
        console.log(Object(json.data))
      })
  },
  methods: {
    signup() {
      this.errorMessage = ''
      this.signingUp = true
      // const UPDATE_URL = 'http://192.168.1.77:7777/account/edit/'+this.id+'/'
      const UPDATE_URL = QUERY_URL + this.id
      console.log(UPDATE_URL)
      fetch(UPDATE_URL, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify(
          this.hotdata
        )
      }).then((response) => {
        if (response.ok) {
          return response.json()
        }
        return response.json().then((error) => {
          throw new Error(error.message)
        })
      }).then((result) => {
        setTimeout(() => {
          this.signingUp = false
          this.successMessage = 'success'
          this.$router.push('/admin/hotdata/update')
        }, 1000)
      }).catch((error) => {
        setTimeout(() => {
          this.signingUp = false
          this.errorMessage = error.message
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 63px;
  height: 32px;
  margin-left: 76px;
  margin-top: 20px;
}
.navbar {
  height: 72px;
  overflow: hidden;
  position: relative;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  z-index: 1001;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;
        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.form {
  margin-top:72px;
  padding-top:68px;
  padding-left:377px;
  padding-bottom: 0;
  height: calc(100%-72px)
}
.lightblue {
  color: #32d4d7
}
.tag {
  font-size: 16px;
  color: #666
}
.title {
  font-size: 28px
}
.btn-cyan {
  background-color: #32d4d7;
  color: #fff;
  width: 176px;
  height: 40px
}
.btn-white {
  background-color: #fff;
  color: #32d4d7;
  width: 223px;
  height: 40px
}
.textbox{
  -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 400px;
}
.alert{
  position: relative;
  padding: .75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: .25rem;
  width: 571px
}
.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
</style>
