import { userService } from "../services/user-service.js";

export const userStore = {
  state: {
    loggedUser: null,
    userPrefs: null,
  },
  getters: {
    loggedUser(state) {
      return state.loggedUser;
    },
  },
  mutations: {
    setLoggedUser(state, { user }) {
      state.loggedUser = user;
      console.log('loggeduser',state.loggedUser)
    },
  },
  actions: {
    async login({ commit }, {credentials}) {
      const loggedUser = await userService.login(credentials);
      commit({type:'setLoggedUser',user:loggedUser})
      return loggedUser
    },
    async signup({ commit }, {registerDetails}) {
      const registeredUser = await userService.signup(registerDetails);
      commit({type:'setLoggedUser',user:registeredUser})
      return registeredUser
    },
    async logout({ commit }) {
      await userService.logout();
      commit({type:'setLoggedUser',user:null})
    },
  },
};
