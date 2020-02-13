<template>
  <div>
    <div class="row">
      <div class="col-md-12 select-outline">
        <span style="color: red">即時警報</span>
        <br>
        <select
          class="list-group-item list-group-item-danger"
          style="height: 55.5px;"
        >
          <option
            v-for="(alert, index) in alerts"
            :key="index"
            class="list-group-item list-group-item-danger"
            width="100%"
          >

            觸發時間: {{ time[index] }}&nbsp;|
            觸發攝影機: {{ alert.alarmListInfo.camera }}&nbsp;|
            id: {{ alert.alarmListInfo.Id }}&nbsp;|
            人物名稱: {{ alert.alarmListInfo.name }}&nbsp;|
            是否解除警報: {{ alert.alarmListInfo.status ? "否":"是" }}

          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../../api'
// const QUERY_URL = 'http://192.168.1.214:7543/alarm/alarmListquery/?is_End=0&sortObject=startTime&ordering=1'
const QUERY_URL = api + '/alarm/alarmListquery/?is_End=0&sortObject=startTime&ordering=1'

export default {
  name: 'Alert',
  data() {
    return {
      alerts: [],
      timer: ''
    }
  },
  computed: {
    // corrections start
    time: function() {
      return this.alerts.map(function(alert) {
        var sec = alert.alarmListInfo.startTime
        var date = new Date(sec * 1000)
        var timestr = date.toLocaleTimeString()
        return timestr
      })
    }
    // corrections end
  },
  created() {
    this.queryAlert()
    this.timer = setInterval(this.queryAlert, 1000)
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
    }
  }
}
</script>

<style scoped>
select, input { width: 100%; padding: 1%; border: 1px solid #dbdbdb; }
</style>
