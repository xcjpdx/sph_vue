import { reqTradeInfo, reqAddressInfo } from "@/api";
import { Message } from "element-ui";
const state = {
  tradeInfo: {},
  // 暂存修改地址时候的信息
  changAddress: {},
};
const mutations = {
  RECEIVE_CHANGEADDRESSINFO(state, value) {
    state.changAddress = value;
  },
  RECEIVE_TRADEINFO(state, value) {
    state.tradeInfo = value;
  },
};
const actions = {
  //用户修改地址信息暂存
  setChangeAddressInfo({ commit }, value) {
    commit("RECEIVE_CHANGEADDRESSINFO", value);
  },
  //获取商品信息
  async getTradeInfo({ commit }) {
    let result = await reqTradeInfo();
    let addressInfo = await reqAddressInfo(); //获取地址信息
    if (result.code == 200 && addressInfo.code == 200) {
      result.data.userAddressList = addressInfo.data;
      commit("RECEIVE_TRADEINFO", result.data);
    } else {
      Message.error(result.message);
    }
  },
};
const getters = {
  // 用户购物车商品信息
  detailArrayList(state) {
    return state.tradeInfo.detailArrayList || [];
  },
  // 用户地址信息
  userAddressList(state) {
    return state.tradeInfo.userAddressList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
