import { createStore } from "vuex";

export default createStore({
  state: {
    loading: false,
    toast: {
      show: false,
      type: "",
      msg: "",
    },
  },

  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setToast(state, payload) {
      state.toast = payload;

      setTimeout(() => {
        state.toast.show = false;
        state.toast.type = "";
        state.toast.msg = "";
      }, 3000);
    },
  },

  actions: {},
});
