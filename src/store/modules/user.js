const state = {
  nickname: '',
  avatar: '',
};

const mutations = {
  setUser(state, data) {
    state.nickname = data.name;
    state.avatar = data.avatar_url;
  },
};

const actions = {
  login(store, data) {
    console.log(data);
    store.commit('setUser', data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
