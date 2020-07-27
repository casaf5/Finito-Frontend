import { authService } from "../services/auth-service.js";
import { userService } from "../services/user-service.js";

export const userStore = {
  state: {
    users: null,
    loggedUser: {
      userName:"Tomer Zuker",
      img:"https://scontent.foko1-1.fna.fbcdn.net/v/t1.0-1/c80.0.320.320a/p320x320/73388525_1504606459711208_171111612044283349_o.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=y-D9JVHdoNYAX_qExYn&_nc_ht=scontent.foko1-1.fna&oh=214bfcdfc90f78bf6a7b5e44596eb85e&oe=5F4355C2"
    },
    userPrefs: null,
  },
  getters: {
    users(state) {
      return state.users;
    },
    loggedUser(state) {
      return state.loggedUser;
    },
  },
  mutations: {
    setUsers(state, { users }) {
      state.users = users;
    },
    setLoggedUser(state, { user }) {
      state.loggedUser = user;
      console.log("loggeduser", state.loggedUser);
    },
  },
  actions: {
    //Authintication:
    async login({ commit }, { credentials }) {
      console.log("credentials",credentials)
      const loggedUser = await authService.login(credentials);
      commit({ type: "setLoggedUser", user: loggedUser });
      return loggedUser;
    },
    async signup({ commit }, { registerDetails }) {
      const registeredUser = await authService.signup(registerDetails);
      commit({ type: "setLoggedUser", user: registeredUser });
      return registeredUser;
    },
    async logout({ commit }) {
      await authService.logout();
      commit({ type: "setLoggedUser", user: null });
    },
    //USERS CURD:
    async loadUsers({ commit }) {
      try {
        const users = await userService.getUsers();
        commit({ type: "setUsers", users });
        return users;
      } catch (err) {
        console.log("Problem getting Users! ");
        throw err;
      }
    },
  },
};
