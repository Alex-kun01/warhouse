<template>
  <div class="warlist">
    <div class="content" v-show="show">
        <el-dropdown>
          <el-button type="primary" size="medium">
            更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="createWarClcik">创建仓库</el-dropdown-item>
            <el-dropdown-item @click.native="cteateThingClick">创建物体</el-dropdown-item>
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
          show: true,
          warList: []
      }
  },
  mounted(){
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
    loginOut(){
      window.$scene.removeWarhouse();
      this.$router.replace('/')
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

    .content {
      width: 100%;
    }
    
}
</style>
