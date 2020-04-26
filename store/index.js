export const strict = false;

// コンポーネントにおけるdataのような存在
export const state = () => {
  return {
    user: null,
  };
};

export const getters = {
  isAuthenticated(state) {
    return !!state.user;
  },
};

//mutationsはstateの変更を行う
export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

export const actions = {
  setUser(context, user) {
    //context.commitでmutationsに渡す合図
    //mutaionsのsetUserにuserを渡す
    context.commit("setUser", user);
  },
};
