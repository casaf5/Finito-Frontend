import { taskService } from "../services/task-service.js";

export const taskStore = {
  state: {
    tasks: null,
    filterBy: {
      name: "",
      inStock: "all",
      type: "all",
      sortBy:'name',
    },
  },
  getters: {
    tasks(state) {
      return state.tasks;
    },
  },
  mutations: {
    setTasks(state, { tasks }) {
      state.tasks = tasks;
    },
    deleteTask(state, { id }) {
      const idx = state.tasks.findIndex((t) => t._id === id);
      state.tasks.splice(idx, 1);
    },
    updateTask(state, { task }) {
      const idx = state.tasks.findIndex((t) => t._id === task._id);
      state.tasks.splice(idx, 1, task);
    },
    addTask(state, { task }) {
      state.tasks.push(task);
    },
    setFilterBy(state,{filterBy}){
      state.filterBy=filterBy
    }
  },
  actions: {
    loadTasks({ commit,state }, { filterBy }) {
      return taskService.query(state.filterBy)
        .then((tasks) => {
        commit({ type: "settasks", tasks });
        return tasks;
      });
    },
    deleteTask({ commit }, { id }) {
      return taskService.deleteTask(id)
        .then(() => {
        commit({ type: "deletetask", id });
      })
        .catch(err=>console.log("Problem Deleting,",err))
    },
    saveTask({ commit }, { task }) {
      const type = task._id ? "updatetask" : "addtask";
      return taskService.save(task)
        .then((savedtask) => {
        commit({ type: type, task: savedtask });
        return savedtask;
      })
      .catch(err=>console.log("Problem With,",type,err))

    },
  },
};
