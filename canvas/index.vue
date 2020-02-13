<template>
  <div>
      <canvas id="canvas" ref="sketchpad" width="500" height="500" style="border:1px solid #d3d3d3;"  v-on:click="line"></canvas>
    <button id="fillbtn" @click = "fill" style = "font-size:25px;">fill</button>
  </div>
</template>

<script>
var app = new Vue({
  el: '#canvas',
  data: {
    name: 'Vue.js',
    Y: 0,
    X: 0,
    lastx:-1,
    lasty:-1
  },
  methods: {
    line: function (event) {
      var e = event || window.event;
        var x = e.clientX;
        var y = e.clientY;
      var c=document.getElementById("canvas");
      var ctx=c.getContext("2d");
      ctx.beginPath(); 
      if (this.lastx < 0){
        this.X = x;
        this.Y = y;
        ctx.moveTo(x,y);
      }
      else{
        ctx.moveTo(this.lastx, this.lasty);
        ctx.lineTo(x,y);
        ctx.stroke();
      }
      this.lastx = x;
      this.lasty = y;
    },
  }
})
var btn = new Vue({
  el: '#fillbtn',
  data:{
    
  },
  methods:{
  	fill: function(){
      var c=document.getElementById("canvas");
      var ctx=c.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(app.lastx, app.lasty);
      ctx.lineTo(app.X,app.Y);
      ctx.stroke();
      
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
