<template>
  <div>
    <div class="el-card login-card text-primary fs-xl is-always-shadow">
      <div class="el-card__header">歷史警報</div>
      <div class="el-card__body">
        <!-- <div v-for="(alert, index) in alerts" :key="index">
          <span style="color:black;">
            Id: {{ alert.alarmListInfo.Id }}&nbsp;|
            name: {{ alert.alarmListInfo.name }}&nbsp;|
            time: {{ alert.alarmListInfo.startTime }}&nbsp;|
            cam: {{ alert.alarmListInfo.camera }}&nbsp;|
          </span>
        </div> -->
        <button @click="queryAlert()">全部</button>
        <button @click="lastday(1)">過去1天</button>
        <button @click="lastday(7)">過去7天</button>
        <button @click="lastday(30)">過去1個月</button>
        <table border="1" style="color:black;">
          <thead>
            <tr>
              <th>觸發時間</th>
              <th>觸發攝影機</th>
              <th>id</th>
              <th>人物名稱</th>
              <th>是否解除警報</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(alert, index) in alerts" :key="index">
              <th>{{ time[index] }}</th>
              <th>{{ alert.alarmListInfo.camera }}</th>
              <th>{{ alert.alarmListInfo.Id }}</th>
              <th>{{ alert.alarmListInfo.name }}</th>
              <th>{{ alert.alarmListInfo.status ? "否":"是" }}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../../api.js'
// const QUERY_URL = 'http://192.168.1.77:7777/account/search/'
// const QUERY_URL = 'http://192.168.1.214:7543/alarm/alarmListquery/?is_End=1&sortObject=startTime&ordering=1'
const QUERY_URL = api + '/alarm/alarmListquery/?&sortObject=startTime&ordering=1'

export default {
  data() {
    return {
      alerts: []
    }
  },
  computed: {
    // corrections start
    time: function() {
      return this.alerts.map(function(alert) {
        var sec = alert.alarmListInfo.startTime
        var date = new Date(sec * 1000)
        // var timestr = date.toLocaleTimeString()
        return date
      })
    }
    // corrections end
  },
  created() {
    this.queryAlert()
    // this.timer = setInterval(this.queryAlert, 1000)
  },
  methods: {
    queryAlert() {
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
          this.alerts = Object(json.data)
          console.log(json.data)
        })
    },
    toTimestamp(strDate) {
      var datum = Date.parse(strDate)
      return datum / 1000
    },
    lastday(day) {
      var date = new Date()
      var last = new Date(date.getTime() - (day * 24 * 60 * 60 * 1000))
      var lastTimestamp = this.toTimestamp(last)
      var nowTimestamp = this.toTimestamp(date)

      var queryLastUrl = QUERY_URL + '&from=' + lastTimestamp + '&to=' + nowTimestamp
      fetch(queryLastUrl, {
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
          this.alerts = Object(json.data)
          console.log(json.data)
        })

      console.log('-----------------------------------------------------')
      console.log(lastTimestamp)
      console.log(nowTimestamp)
    }

  }
}
</script>
