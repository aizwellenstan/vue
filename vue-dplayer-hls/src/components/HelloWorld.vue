<template>
 <div class="hello">
    <d-player ref="player" @play="play" :video="video" :contextmenu="contextmenu"></d-player>
  </div>
</template>

<script>
import VueDPlayer from './VueDPlayerHls';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      video: {
          url: 'http://127.0.0.1:8080/stream/192-168-1-200-user-admin-password-channel-2-stream-0-sdp/index.m3u8',
          type: 'hls'
        },
        autoplay: true,
        player: null,
        contextmenu: [
            {
                text: 'GitHub',
                link: 'https://github.com/MoePlayer/vue-dplayer'
            }
        ]
    }
  },
  components: {
    'd-player': VueDPlayer
  },
  methods: {
    play() {
        console.log('play callback')
      }
  },
  mounted() {
    this.player = this.$refs.player.dp;
   
    // console.log(this.player);
    // var hls = new Hls();
    // hls.loadSource('https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/chunklist_w630020335.m3u8');
    // hls.attachMedia(this.player);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
