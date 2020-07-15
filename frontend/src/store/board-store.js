import { toyService } from "../services/toy-service.js";

export const toyStore = {
  state: {
    toys: null,
    filterBy: {
      name: "",
      inStock: "all",
      type: "all",
      sortBy:'name',
    },
  },
  getters: {
    toys(state) {
      return state.toys;
    },
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys;
    },
    deleteToy(state, { id }) {
      const idx = state.toys.findIndex((t) => t._id === id);
      state.toys.splice(idx, 1);
    },
    updateToy(state, { toy }) {
      const idx = state.toys.findIndex((t) => t._id === toy._id);
      state.toys.splice(idx, 1, toy);
    },
    addToy(state, { toy }) {
      state.toys.push(toy);
    },
    setFilterBy(state,{filterBy}){
      state.filterBy=filterBy
    }
  },
  actions: {
    loadToys({ commit,state }, { filterBy }) {
      return toyService.query(state.filterBy)
        .then((toys) => {
        commit({ type: "setToys", toys });
        return toys;
      });
    },
    deleteToy({ commit }, { id }) {
      return toyService.deleteToy(id)
        .then(() => {
        commit({ type: "deleteToy", id });
      })
        .catch(err=>console.log("Problem Deleting,",err))
    },
    saveToy({ commit }, { toy }) {
      const type = toy._id ? "updateToy" : "addToy";
      return toyService.save(toy)
        .then((savedToy) => {
        commit({ type: type, toy: savedToy });
        return savedToy;
      })
      .catch(err=>console.log("Problem With,",type,err))

    },
  },
};
