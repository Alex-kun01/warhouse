<template>
  <div class="warlist">
    <div class="text">加载中</div>
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
    background: rgba(0, 0, 0, 0.8);
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
        width: 100px;
        height: 100px;
        line-height: 100px;
        color: #fff;
        font-size: 18px;
        text-align: center;
        position: absolute;
        top: calc(50% - 50px);
        left: calc(50% - 50px);
        opacity: 0.2;
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
