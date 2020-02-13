<template>
  <div>
    <div class="el-card login-card text-primary fs-xl is-always-shadow">
      <div class="el-card__header">註冊</div>
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <form v-if="!signingUp" @submit.prevent="signup">
        <div class="form-group">
          <div class="el-form-item">
            <label class="el-form-item__label">使用者名稱</label>
            <div class="el-form-item__content">
              <div class="el-input">
                <input
                  id="username"
                  v-model="user.username"
                  type="text"
                  class="el-input__inner"
                  aria-describedby="usernameHelp"
                  placeholder="輸入使用者名稱"
                  required
                >
              </div>
            </div>
          </div>
          <h5 id="usernameHelp" class="form-text text-muted">
            使用者名稱需大於兩個字小於30個字<br>
            只可包含英文字母及數字。
          </h5>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <span class="tag">密碼</span><br><br>
            <input
              id="password"
              v-model="user.password"
              type="password"
              class="textbox"
              aria-describedby="passwordHelp"
              placeholder="輸入密碼"
              required
            >
            <h5 id="passwordHelp" class="form-text text-muted">
              密碼需大於8個字<br>
              密碼須包含1個大寫字1個小寫字及1個數字。
            </h5>
          </div>
          <div class="form-group col-md-6">
            <span class="tag">確認密碼</span><br><br>
            <input
              id="confirmPassword"
              v-model="user.confirmPassword"
              type="password"
              class="textbox"
              aria-describedby="confirmPasswordHelp"
              placeholder="確認密碼"
              required
            >
          </div>

          <div class="form-group col-md-6">
            <span class="tag">姓</span><br><br>
            <input
              id="lastName"
              v-model="user.lastName"
              type="text"
              class="textbox"
              aria-describedby="lastNameHelp"
              placeholder="輸入姓"
              required
            >
          </div>

          <div class="form-group col-md-6">
            <span class="tag">名</span><br><br>
            <input
              id="firstName"
              v-model="user.firstName"
              type="text"
              class="textbox"
              aria-describedby="firstNameHelp"
              placeholder="輸入名"
              required
            >
          </div>

          <div class="form-group col-md-6">
            <span class="tag">Email</span><br><br>
            <input
              id="email"
              v-model="user.email"
              type="text"
              class="textbox"
              aria-describedby="emailHelp"
              placeholder="Email"
              required
            >
          </div>
        </div>
        <div />
        <div v-if="privacy" width="100%" style="color:black;">
          <h1>隱私權政策</h1>
          為了讓您能夠安心的使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列內容：<br>
          <br>
          一、隱私權保護政策的適用範圍<br>
          隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。<br>
          <br>
          二、個人資料的蒐集、處理及利用方式<br>
          當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能性質，請您提供必要的個人資料，並在該特定目的範圍內處理及利用您的個人資料；非經您書面同意，本網站不會將個人資料用於其他用途。<br>
          本網站在您使用服務信箱、問卷調查等互動性功能時，會保留您所提供的姓名、電子郵件地址、聯絡方式及使用時間等。<br>
          於一般瀏覽時，伺服器會自行記錄相關行徑，包括您使用連線設備的IP位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，做為我們增進網站服務的參考依據，此記錄為內部應用，決不對外公佈。<br>
          為提供精確的服務，我們會將收集的問卷調查內容進行統計與分析，分析結果之統計數據或說明文字呈現，除供內部研究外，我們會視需要公佈統計數據及說明文字，但不涉及特定個人之資料。<br>
          三、資料之保護<br>
          如因業務需要有必要委託其他單位提供服務時，本網站會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。<br>
          四、網站對外的相關連結<br>
          本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站。但該連結網站不適用本網站的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。<br>
          <br>
          五、與第三人共用個人資料之政策<br>
          本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。<br>
          <br>
          前項但書之情形包括不限於：<br>
          <br>
          經由您書面同意。<br>
          法律明文規定。<br>
          為免除您生命、身體、自由或財產上之危險。<br>
          與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，且資料經過提供者處理或蒐集者依其揭露方式無從識別特定之當事人。<br>
          當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時，經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。<br>
          有利於您的權益。<br>
          本網站委託廠商協助蒐集、處理或利用您的個人資料時，將對委外廠商或個人善盡監督管理之責。<br>
          <br>
          六、Cookie之使用<br>
          為了提供您最佳的服務，本網站會在您的電腦中放置並取用我們的Cookie，若您不願接受Cookie的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕Cookie的寫入，但可能會導致網站某些功能無法正常執行 。<br>
        </div>
        <br>
        <input v-model="isChecked" type="checkbox"><span style="color:black">我同意NADI</span>
        <!-- <router-link to="/termsofuse" class="lightblue">Terms of Use</router-link> and -->
        <a @click="privacy = !privacy">隱私權政策</a>
        <br>
        <!-- <input type="checkbox">
        I understand that by checking this box, I am agreeing to recive<br>
        &nbsp;&nbsp;&nbsp;&nbsp;promotional materials from NADI -->
        <div style="padding-top: 21px">
          <button type="submit" class="btn-cyan">新增帳號</button>
          <router-link to="/login">
            <button class="btn-white" type="submit">已有帳號?登入</button>
          </router-link>
        </div>
      </form>
    </div>
  <!-- <div>
    <div class="el-card login-card text-primary fs-xl is-always-shadow">
      <div class="el-card__header">Create Account</div>
      <div class="el-card__body">
        <form class="el-form">
          <div class="el-form-item">
             <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
              </div>
          </div>

          <div class="el-form-item">
            <label class="el-form-item__label">ユーザー名</label>
            <div class="el-form-item__content">
              <div class="el-input">
                <input
                  id="username"
                  v-model="user.username"
                  type="text"
                  class="el-input__inner"
                  aria-describedby="usernameHelp"
                  placeholder="Enter a username"
                  required
                >
              </div>
            </div>
          </div>

          <div class="el-form-item">
            <label class="el-form-item__label">パスワード</label>
            <div class="el-form-item__content">
              <div class="el-input">
                <input
                  id="password"
                  v-model="user.password"
                  type="password"
                  class="el-input__inner"
                  aria-describedby="passwordHelp"
                  placeholder="Password"
                  required
                  autocomplete="off"
                >
              </div>
            </div>
          </div>

          <div class="el-form-item">
            <label class="el-form-item__label">Confirmパスワード</label>
            <div class="el-form-item__content">
              <div class="el-input">
                <input
                  id="confirmPassword"
                  v-model="user.confirmPassword"
                  type="password"
                  class="el-input__inner"
                  aria-describedby="confirmPasswordHelp"
                  placeholder="Password"
                  required
                >
              </div>
            </div>
          </div>

          <div class="el-form-item">
            <label class="el-form-item__label">Last Name</label>
            <div class="el-form-item__content">
              <div class="el-input">
                <input type="password" autocomplete="off" class="el-input__inner">
              </div>
            </div>
          </div>

          <div class="el-form-item">
            <label class="el-form-item__label">First Name</label>
            <div class="el-form-item__content">
              <div class="el-input">
                <input type="password" autocomplete="off" class="el-input__inner">
              </div>
            </div>
          </div>

          <div class="el-form-item">
            <label class="el-form-item__label">Permission</label>
            <el-select filterable placeholder="Select">
              <el-option>1</el-option>
              <el-option>2</el-option>
              <el-option>3</el-option>
            </el-select>
          </div>

          <div class="el-form-item">
            <label class="el-form-item__label">Email</label>
            <div class="el-form-item__content">
              <div class="el-input">
                <input type="password" autocomplete="off" class="el-input__inner">
              </div>
            </div>
          </div>

          <div class="el-form-item">
            <div class="el-form-item__content">
              <div class="d-flex jc-between">
                <el-button type="submit">Submit</el-button>
                &nbsp;&nbsp;
                <a href="/login">ログイン</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div> -->
  </div>
</template>

<script>
import api from '../../../api.js'
// import Joi from 'joi'
// const REGISTER_URL = 'http://192.168.1.77:7777/account/register/'
const REGISTER_URL = api + '/account/register/'
// const schema = Joi.object().keys({

//   username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30)
//     .required(),
//   password: Joi.string().regex(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(^[a-zA-Z0-9@\$=!:.#%]+$)/).trim().min(8).required(),
//   confirmPassword: Joi.string().regex(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(^[a-zA-Z0-9@\$=!:.#%]+$)/).trim().min(8).required()
// })
export default {
  data: () => ({
    privacy: false,
    signingUp: false,
    errorMessage: '',
    user: {
      username: '',
      password: '',
      confirmPassword: '',
      lastName: '',
      firstName: '',
      email: '',
      su: '',
      sf: '',
      permission: ''
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
  methods: {
    signup() {
      // Permission
      // if(this.user.permission=="H") {
      //   this.user.su = 1
      //   this.user.sf = 1
      // } else if (this.user.permission=="N") {
      //   this.user.su = 0
      //   this.user.sf = 1
      // } else {
      //   this.user.su = 0
      //   this.user.sf = 0
      // }

      this.errorMessage = ''

      // const body = {
      //   username: this.user.username,
      //   password: this.user.password
      // }
      this.signingUp = true
      fetch(REGISTER_URL, {
        method: 'post',
        headers: {
          'US': this.user.username,
          'PS': this.user.password,
          'LN': this.user.lastName,
          'FN': this.user.firstName,
          'EMAIL': this.user.email,
          'SU': '0',
          'SF': '0'
        }
      }).then((response) => {
        if (response.ok) {
          return response.json()
        }
        return response.json().then((error) => {
          throw new Error(error.message)
        })
      }).then((result) => {
        localStorage.token = result.token
        setTimeout(() => {
          this.signingUp = false
          this.$router.push('/login')
        }, 1000)
      }).catch((error) => {
        setTimeout(() => {
          this.signingUp = false
          this.errorMessage = error.message
        }, 1000)
      })
    }
    // valid() {
    //   if (this.isChecked === false) {
    //     this.errorMessage = 'Please agree Terms of Use and Privacy Policy. 🙈';
    //     return false;
    //   }
    //   if (this.user.password !== this.user.confirmPassword) {
    //     this.errorMessage = 'Passwords must match. 🙈';
    //     return false;
    //   }
    //   const result = Joi.validate(this.user, schema);
    //   if (result.error === null) {
    //     return true;
    //   }
    //   if (result.error.message.includes('username')) {
    //     this.errorMessage = 'Username is invalid. 😭';
    //   } else if(result.error.message.includes('password')) {
    //     this.errorMessage = 'Password is invalid. 🙈';
    //   } else {
    //     console.log(result.error.message)
    //   }
    //   return false;
    // },
  }
}
</script>

<style lang="scss" scoped>
.privacy-hide{
  display: none
}

.privacy-active{
  display: inline-block
}

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
