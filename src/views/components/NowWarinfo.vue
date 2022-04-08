<template>
  <div class="now_war">
    <div class="title" @click.self="show = !show">当前场景信息</div>
    <div class="target_box" v-show="show">
    
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'nowWar',
  data(){
      return {
          show: true,
      }
  },
  mounted(){
  },
  methods:{
  }
}
</script>
<style lang="less" scoped>
.now_war {
    width: 700px;
    min-height: 30px;
    position: absolute;
    top: 10px;
    left: 700px;
    border-radius: 8px;
    overflow: hidden;

    .title {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: rgb(168, 168, 168);
        font-weight: 600;
        cursor: pointer;
    }

    .target_box {
      width: 100%;
      height: 300px;
      background-color: pink;
    }
}
</style>
