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
            <div class="sf_title">仓库</div>
        <div class="option">
            <div class="fang warer">
                <div class="item" v-for="(thing, ix) in warList" :key="ix">
                    <span>{{thing.name}}</span>
                    <i @click="deleteWar(thing)" class="el-icon-close"></i>
                </div>
            </div>
        </div>
        <div class="sf_title">物体</div>
        <div class="option">
            <div class="fang thing">
                <div class="item" v-for="(thing, ix) in thingList" :key="ix">
                    <span>{{thing.name}}</span>
                    <i @click="deleteThing(thing)" class="el-icon-close"></i>
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
          warList: [],
          //物体列表
          thingList: [],
      }
  },
  mounted(){
      this.$off('addList');
      this.$on('addList', (type, item) => {
        if (type === 'war') this.warList.push(item);
        if (type === 'thing') this.thingList.push(item);
      })
      this.sfThingUpdata();
      this.sfWarUpdata();
  }, 
  watch: {
      '$store.state.sfWarList': 'sfWarUpdata',
      '$store.state.sfThingList': 'sfThingUpdata'
  },
  methods:{
      openloading() {
          this.$bus.$emit('openLoading', true);
          setTimeout(() => {
              this.$bus.$emit('openLoading', false);
          }, 1000)
      },
      deleteWar(item) {
          const newList = this.warList.filter(option => option.id !== item.id);
          this.warList = newList;
          this.$store.commit('setSfWarList', newList);
      },
      deleteThing(item) {
          const newList = this.thingList.filter(option => option.id !== item.id);
          this.thingList = newList;
          this.$store.commit('setSfThingList', newList);
      },
      // 计算
      async calculate() {
        const { sfWarList, sfThingList } = this.$store.state;
        if (sfThingList.length === 0) return this.$message({ type: 'warning', message: '请选择物体！' });
        if (sfWarList.length === 0) return this.$message({ type: 'warning', message: '请选择仓库！' });
        this.$store.commit('setLoading', true);
        $scene.removeWarhouse();
        const res = await axios.get('/mock/fangan.json');
        if (res.data.code === 200) {
          const data = res.data.data.thingInfo;
          const { length, width, height } = res.data.data.warInfo;
          setTimeout(() => {
            $scene.createWarhouse('测试仓库',length, width, height);
            this.show = false;
            setTimeout(() => {
              data.forEach(item => {
                $scene.createBox(item.name,+item.length, +item.width, +item.height, +item.posX, +item.posY, +item.posZ );
              });
              this.$store.commit('setLoading', false);
            }, 1000)
          }, 1000);
          
        }
      },
      sfThingUpdata() {
          this.thingList = this.$store.state.sfThingList;
      },
      sfWarUpdata() {
         this.warList = this.$store.state.sfWarList; 
      }
  }
}
</script>
<style lang="less" scoped>
.warlist {
    width: 290px;
    min-height: 30px;
    border-radius: 8px;
    margin-right: 10px;
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

        .sf_title {
            margin-bottom: 5px;
            font-weight: 600;
        }

        .option {
            width: 100%;
            height: 100px;
            background: antiquewhite;
            overflow: hidden;
            margin-bottom: 10px;
            box-sizing: border-box;
            padding-top: 6px;

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
                align-content: flex-start;
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
                    width: 116px;
                    background: #fff;
                    border-radius: 4px;
                    padding: 2px 2px 2px 6px;
                    margin: 0 10px 5px 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;

                    i {
                        font-weight: 600;

                        &:hover {
                            color: red;
                        }
                    }

                    span {
                        &:nth-of-type(1) {
                            width: 80px;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                    }
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
