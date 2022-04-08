<template>
  <div class="mainScene">
    <div id="scene_main"></div>
    <WarList />
    <ThingList />
    <FangAn />
    <Control />
    <NowWarinfo />
  </div>
</template>
<script>
import Scene from '@/utils/scene.js';
import WarList from '../components/WarList.vue';
import ThingList from '../components/ThingList.vue';
import FangAn from '../components/FangAn.vue';
import Control from '../components/Control.vue';
import NowWarinfo from '../components/NowWarinfo.vue';

export default {
  name: 'mainScene',
  components: { 
    FangAn,
    Control,
    WarList,
    ThingList,
    NowWarinfo,
  },
  data: () => {
      return {
        scene: null,
      }
  },
  mounted(){
      this.$nextTick(() => {
        const instance = document.getElementById('scene_main');
        this.scene = new Scene(instance);
        window.$scene = this.scene;
      })
  },
}
</script>

<style lang="less" scoped>
.mainScene {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .button {
        width: 200px;
        height: 150px;
        background: #ffff;
        position: absolute;
        top: 20px;
        left: 30px;
        box-sizing: border-box;
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        &.two {
          height: 230px;
          left: 300px;
        }

        .input_box {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          input {
            margin-bottom: 10px;
          }
         }

        button {
            margin-right: 10px;
        }
    }

    #scene_main {
        width: 100%;
        height: 100%;

        canvas {
          width: 100%;
          height: 100%;
        }
    }
}
</style>
