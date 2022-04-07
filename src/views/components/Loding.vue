<template>
  <div class="warlist">
    <div class="text">Loading...</div>
    <div class="content"></div>
  </div>
</template>

<script>

export default {
  name: 'warlist',
  data(){
      return {

      }
  },
  methods:{

  }
}
</script>
<style lang="less" scoped>
.warlist {
    width: 100%;
    min-height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

    .content {
        width: 900px;
        height: 900px;
        background-image: url('../../assets/loading_middle_wheel.png');
        background-size: 100%;
        animation: 20s identifier infinite;

    }

    .text {
        color: #fff;
        font-size: 18px;
        line-height: 900px;
        text-align: center;
        position: absolute;
        top: 95px;
        left: 15px;
        right: 0;
        bottom: 0;
        margin: auto;
    }
    @keyframes identifier {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
}
</style>
