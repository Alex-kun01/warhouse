/* eslint no-param-reassign: "off" */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      // 当前仓库信息
      warInfo: {},
      // 当前物体信息
      things: [],
      // 算法-仓库
      sfWarList: [
        {
          name: '仓库A',
          id: '123'
        },
        {
          name: '仓库B',
          id: '122'
        },
        {
          name: '仓库C',
          id: '121'
        }
      ],
      // 算法-物体
      sfThingList: [
        {
          name: '物体A物体A物体A',
          id: '121'
        },
        {
          name: '物体B',
          id: '122'
        },
        {
          name: '物体C',
          id: '123'
        }
      ],
    },
    mutations: {
      setWarInfo: (state, data) => {
        state.warInfo = data;
      },
      setThings: (state, data) => {
        state.things = data;
      },
      setSfWarList: (state, data) => {
        state.sfWarList = data;
      },
      setSfThingList: (state, data) => {
        state.sfThingList = data;
      } 
    }
});
