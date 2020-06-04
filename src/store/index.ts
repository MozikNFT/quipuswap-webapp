import Vue from "vue";
import Vuex from "vuex";
import { getStorage } from "@/taquito/contracts/factory";
import { getTezosBalance } from "@/taquito/tezos";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tokens: [],
    accountPublicKeyHash: "tz1bQEJqMqC92ommfsRB6pWG9LVBKNgXPysh",
    balance: 0,
    tokensStorage: {} as any,
  },
  mutations: {
    tokens(state, tokens) {
      state.tokens = tokens;
    },
    tokensStorage(state, storage) {
      state.tokensStorage = { ...state.tokensStorage, [storage.key]: storage.value };
    },
    balance(state, balance) {
      state.balance = balance;
    },
  },
  actions: {
    async tokens({ commit, state }) {
      const storage: any = await getStorage().catch(e => console.error(e));
      const tokenList = storage.tokenList.map((token: any) => ({
        id: token,
        name: "Token",
        type: "token",
        symbol: token,
        exchange: storage.tokenToExchange.get(token),
        imgUrl:
          "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB6eD7644C69416d67B522e20bC294A9a9B405B31/logo.png",
      }));
      commit("tokens", tokenList);
    },
    async balance({ commit, state }) {
      const balance1 = await getTezosBalance(state.accountPublicKeyHash);
      console.log(balance1, "1");
      commit("balance", balance1);
    },
  },
  modules: {},
});
