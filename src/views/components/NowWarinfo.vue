<template>
  <div class="now_war" v-show="isShow">
    <div class="title" @click.self="show = !show">当前场景信息</div>
    <div class="target_box" v-show="show">
      <div class="war_box">
        <div class="title_x">仓库信息</div>
        <div class="war_item" v-show="warInfo.name">仓库名：{{warInfo.name}}</div>
        <div class="war_item" v-show="warInfo.length">仓库长：{{warInfo.length}}</div>
        <div class="war_item" v-show="warInfo.height">仓库宽：{{warInfo.height}}</div>
        <div class="war_item" v-show="warInfo.with">仓库高：{{warInfo.with}}</div>
      </div>
      <div class="thing_box">
        <div class="title_x">物体信息</div>
        <div class="titles">
          <span>颜色</span>
          <span>名称</span>
          <span>长</span>
          <span>宽</span>
          <span>高</span>
          <span>X轴</span>
          <span>Y轴</span>
          <span>Z轴</span>
          <span>删除</span>
        </div>
        <div class="list_box">
          <div :class="{thing_item: 1, active: item.id === $store.state.activeId}" v-for="(item, index) in things" :key="index"
            @click="choseItem(item)"
          >
            <span id="color" :style="{background: item.color}"></span>
            <span>{{item.name}}</span>
            <span>{{item.length}}</span>
            <span>{{item.width}}</span>
            <span>{{item.height}}</span>
            <span>{{item.posX}}</span>
            <span>{{item.posY}}</span>
            <span>{{item.posZ}}</span>
            <span><i @click="deleteThing(item)" class="el-icon-delete"></i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'nowWar',
  data(){
      return {
          show: true,
          warInfo: {
            with: '',
            height: '',
            length: '',
            name: ''
          },
          things: [],
          warShow: false,
          thingShow: false
      }
  },
  computed: {
    isShow() {
      return this.warShow || this.thingShow;
    }
  },
  watch: {
    '$store.state.things': 'thingUpdata',
    '$store.state.warInfo': 'warUpdata',
  },
  mounted(){
    this.thingUpdata();
    this.warUpdata();
    if (this.$store.state.warInfo.name) this.warShow = true;
    if (this.$store.state.things.length !== 0) this.warShow = true;
  },
  methods:{
    thingUpdata() {
      this.things = this.$store.state.things;
      if (this.$store.state.things.length !== 0) this.thingShow = true;
      else this.thingShow = false;
    },
    warUpdata() {
      this.warInfo = this.$store.state.warInfo;
      if (this.$store.state.warInfo.name) this.warShow = true;
      else this.warShow = false;
    },
    choseItem(item) {
      this.$store.commit('setActiveId', item.id);
      $scene.getIdThingOutline(item.id);
    },
    deleteThing(item) {
      $scene.deleteBox(item.id)
    }
  }
}
</script>
<style lang="less" scoped>
#color {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}
.now_war {
    width: 670px;
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

    .target_box {
      width: 100%;
      background-color: #fff;
      display: flex;

      .war_box {
        width: 200px;
        height: 180px;
        color: #000;
        border-right: 2px solid #fff;

        .title_x {
          width: 100%;
          height: 50px;
          line-height: 50px;
          color: #000;
          font-weight: 600;
          background-color: antiquewhite;
        }

        .war_item {
          width: 100%;
          height: 24px;
          line-height: 24px;
          text-align: left;
          box-sizing: border-box;
          padding-left: 5px;

          &:hover{
            background-color: #aaffff;
          }
        }
      }

      .thing_box {
        width: 500px;
        max-height: 350px;

        .titles {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding: 0 0 0 5px;
          background: #bfbfbf;
          margin-right: 6px;
          font-weight: 600;

          span {
            flex: 1;
            text-align: left;
            &:nth-of-type(2) {
              flex: 3;
              padding-left: 4px;
            }
          }
        }

        .title_x {
          width: 100%;
          height: 50px;
          line-height: 50px;
          color: #000;
          font-weight: 600;
          background-color: antiquewhite;
          box-sizing: border-box;
          padding-right: 10px;
        }

        .list_box {
          width: 100%;
          height: 200px;
          box-sizing: border-box;
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

          .thing_item {
            color: #000;
            height: 24px;
            line-height: 24px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            cursor: pointer;
            text-align: center;
            background-color: #ddd;

              span {
                color: #000;
                font-size: 16px;
                flex: 1;
                text-align: left;
                &:nth-of-type(2) {
                  flex: 3;
                }
                &:nth-of-type(9) {
                  &:hover{
                    color: red;
                  }
                }
              }

            &:nth-of-type(odd) {
              background-color: #eee;
            }

            &:hover{
              background-color: #ddd;
            }

            &.active {
              background: yellow;
              font-weight: 500;
            }

            span {
              display: inline-block;
            }
          }
        }
      }
    }
}
</style>
