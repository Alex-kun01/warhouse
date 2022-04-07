<template>
  <div class="home">
    <MainScene />
    <DateTime />
  </div>
</template>

<script>
import MainScene from './scene/MainScene.vue'
import DateTime from './components/DateTime.vue'

export default {
  name: 'Home',
  components: {
    MainScene,
    DateTime
  }
}
</script>
