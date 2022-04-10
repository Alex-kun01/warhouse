<template>
  <div class="warlist">
    <div class="content" v-show="show">
        <el-dropdown>
          <el-button type="primary" size="medium">
            admin<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="createWarClcik">创建仓库</el-dropdown-item>
            <el-dropdown-item @click.native="cteateThingClick">创建物体</el-dropdown-item>
            <el-dropdown-item @click.native="clearScene">清空场景</el-dropdown-item>
            <el-dropdown-item @click.native="printScene">打印场景</el-dropdown-item>
            <el-dropdown-item  @click.native="loginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script>

export default {
  name: 'warlist',
  data(){
      return {
        show: true
      }
  },
  methods:{
    createWarClcik(){
      window.$scene.removeWarhouse();
      this.$bus.$emit('controlWarDialog', true);
    },
    cteateThingClick() {
      this.$bus.$emit('controlThingDialog', true);
      if (window.$scene.warBoxs.length !== 0) return; 
      window.$scene.removeWarhouse();
    },
    clearScene() {
      window.$scene.removeWarhouse();
    },
    loginOut(){
      window.$scene.removeWarhouse();
      this.$router.replace('/')
    },
    printScene() {
      $scene.cancasDownLoad();
    }
  }
}
</script>
<style lang="less" scoped>
.warlist {
    width: 118px;
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    pointer-events: all;

    .title {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: rgb(168, 168, 168);
        font-weight: 600;
        cursor: pointer;
    }

    .content {
      width: 100%;
    }
    
}
</style>
