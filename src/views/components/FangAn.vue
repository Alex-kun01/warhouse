<template>
  <div class="warlist">
    <div class="title" @click.self="show = !show">算法方案</div>
    <div class="concrol" v-show="show">
        <div class="select_box">
            <div class="select"
            :class="{ active: fanganIndex === index }"
            @click="fanganIndex = index"
            v-for="(item,index) in ['仓库 >> 物体', '物体 >> 仓库']" :key="index">{{item}}</div>
        </div>
            <div>仓库</div>
        <div class="option">
            <div class="fang warer">
                <div class="item" v-for="(thing, ix) in warList" :key="ix">
                    <span>{{thing.name}}</span>
                </div>
            </div>
        </div>
        <div>物体</div>
        <div class="option">
            <div class="fang thing">
                <div class="item" v-for="(thing, ix) in thingList" :key="ix">
                    <span>{{thing.name}}</span>
                </div>
            </div>
        </div>
        <div class="btn_box">
            <div class="btn" @click="calculate">计算</div>
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
          show: false,
          // 方案激活
          fanganIndex: 0,
          //仓库列表
          warList: [
              {
                  name: "物体A"
              },
              {
                  name: "物体A"
              },
              {
                  name: "物体A"
              }
          ],
          //物体列表
          thingList: [
              {
                  name: "物体A"
              },
              {
                  name: "物体A"
              },
              {
                  name: "物体A"
              },
              {
                  name: "物体A"
              },
              {
                  name: "物体A"
              },
              {
                  name: "物体A"
              },
              {
                  name: "物体A"
              },
              {
                  name: "物体A"
              },
              {
                  name: "物体A"
              }
          ],
      }
  },
  mounted(){
      this.$off('addList');
      this.$on('addList', (type, item) => {
        if (type === 'war') this.warList.push(item);
        if (type === 'thing') this.thingList.push(item);
      })
  }, 
  methods:{
      openloading() {
          this.$bus.$emit('openLoading', true);
          setTimeout(() => {
              this.$bus.$emit('openLoading', false);
          }, 1000)
      },
      // 计算
      async calculate() {
        const res = await axios.get('/mock/fangan.json');
        if (res.data.code === 200) {
        const data = res.data.data;
        console.log('jzk res', data);
        $scene.createWarhouse('测试仓库',60, 60, 10);
        this.show = false;
        setTimeout(() => {
          data.forEach(item => {
            $scene.createBox(item.name,+item.length, +item.width, +item.height, +item.posX, +item.posY, +item.posZ );
          });
        }, 1500)
        }
      }
  }
}
</script>
<style lang="less" scoped>
.warlist {
    width: 240px;
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

    .concrol {
        width: 100%;
        background: #fff;

        .select_box {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-bottom: 5px;

            .select {
                padding: 2px 10px;
                border-radius: 8px;
                background: rgb(218, 218, 218);
                cursor: pointer;

                &.active {
                    background: #409EFF;
                    color: #fff;
                }
            }
        }

        .option {
            width: 100%;
            height: 100px;
            background: rgb(247, 255, 170);
            overflow: hidden;
            margin-bottom: 10px;

            .fang {
                width: 100%;
                height: 100px;
                text-align: left;
                box-sizing: border-box;
                padding-left: 10px;
                position: relative;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-content: center;
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
                    width: 85px;
                    background: #EEE;
                    border-radius: 4px;
                    padding: 2px 4px;
                    margin-right: 10px;
                    margin-bottom: 10px;
                }
            }
        }

        .btn_box {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            
            .btn {
                width: 80px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                background: #409EFF;
                color: #fff;
                border-radius: 8px;
                cursor: pointer;

                &:hover {
                    opacity: 0.8;
                }
            }
        }
    }
}
</style>
