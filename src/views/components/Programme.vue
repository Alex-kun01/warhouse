<template>
  <div class="programme" v-if="$store.state.programmeList">
    <div class="title" @click.self="show = !show">方案</div>
    <div class="content_p" v-show="show">
      <div class="item" v-for="(item, index) in $store.state.programmeList" :key="index" @click="createProgrammeItem(item)">{{item.warInfo.name}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'programme',
  data(){
      return {
          show: true,
          list: []
      }
  },
  mounted(){
  },
  methods:{
    // 根据方案渲染仓库、物体
    createProgrammeItem(item) {
      this.$store.commit('setLoading', true);
      $scene.removeWarhouse();
      const { warInfo, thingInfo } = item;
      setTimeout(() => {
        $scene.createWarhouse('测试仓库',warInfo.length, warInfo.width, warInfo.height);
      }, 1000);
      setTimeout(() => {
        thingInfo.forEach(item => {
          $scene.createBox(item.name,+item.length, +item.width, +item.height, +item.posX, +item.posY, +item.posZ );
        });
        this.$store.commit('setLoading', false);
      }, 2000);
    }
  }
}
</script>
<style lang="less" scoped>
.programme {
    width: 150px;
    min-height: 30px;
    border-radius: 8px 8px 0 0;
    margin-right: 10px;
    position: fixed;
    top: 350px;
    right: 0;
    overflow: hidden;
    pointer-events: all;

    .title {
        width: 100%;
        height: 24px;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        background: rgb(168, 168, 168);
        font-weight: 600;
        cursor: pointer;
    }

    .content_p {
      width: 100%;
      height: 200px;
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      box-sizing: border-box;
      padding: 10px 0 0 10px;
      overflow-y: auto;

      &::-webkit-scrollbar{
        width: 6px;
        height: 6px;
      }
      &::-webkit-scrollbar-track{
        background: rgb(232, 231, 231);
        border-radius: 2px;
      }
      &::-webkit-scrollbar-thumb{
        background: #bfbfbf;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb:hover{
        background: #bfbfbf;
      }
      &::-webkit-scrollbar-corner{
        background: #999;
      }

      .item {
        width: 126px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        letter-spacing: 4px;
        background: #008c8c;
        margin-bottom: 5px;
        cursor: pointer;
        border-radius: 4px;
        color: #fff;

        &:hover {
          background-color: #02aaaa;
        }
      }
    }

}
</style>
