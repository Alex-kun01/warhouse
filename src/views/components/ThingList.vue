<template>
  <div class="warlist">
    <div class="title" @click.self="show = !show">物体列表</div>
    <div class="list_box" v-show="show">
        <div class="item" v-for="(item,index) in warList" :key="index">
            <p>{{item.name}}</p>
            <p>123</p>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'warlist',
  data(){
      return {
          show: true,
          warList: []
      }
  },
  mounted(){
      this.getData();
  },
  methods:{
      openloading() {
          this.$bus.$emit('openLoading', true);
          setTimeout(() => {
              this.$bus.$emit('openLoading', false);
          }, 1000)
      },
      async getData() {
        const res = await axios.get('/mock/thingList.json');
        if (res.data.code === 200) {
            this.warList = res.data.data;
        }
      }
  }
}
</script>
<style lang="less" scoped>
.warlist {
    width: 200px;
    min-height: 30px;
    border-radius: 8px;
    margin-right: 10px;
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

    .list_box {
        height: 300px;
        overflow-y: auto;
        .item {
            width: 100%;
            height: 30px;
            line-height: 30px;
            background: rgb(255, 255, 255);
            cursor: pointer;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 10px;
            
            &:nth-of-type(odd) {
                background: rgb(238, 238, 238);
            }

            &:hover {
                background: rgb(248, 246, 175);
                font-weight: 600;
                border-radius: 4px;
            }

            p {
                margin: 0;
                padding: 0;

                &:nth-of-type(1) {
                    width: 120px;
                }
                &:nth-of-type(2) {
                    width: 70px;
                }
            }
        }
    }
}
</style>
