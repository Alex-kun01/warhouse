<template>
  <div class="home">
    <MainScene />
    <!-- <DateTime /> -->
    <Loding v-if="show" />
  </div>
</template>

<script>
import MainScene from './scene/MainScene.vue'
import DateTime from './components/DateTime.vue'
import Loding from '../views/components/Loding.vue'

export default {
  name: 'Home',
  components: {
    MainScene,
    DateTime,
    Loding
  },
  mounted() {
    this.$bus.$off('openLoading');
    this.$bus.$on('openLoading', (bool) => {
      this.show = bool;
    })
  },
  data(){
    return {
      show: false,
    }
  }
}
</script>
