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
      sfWarList: [],
      // 算法-物体
      sfThingList: [],
      loading: false,
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
      },
      setLoading: (state, data) => {
        state.loading = data;
      }
    }
});
