import { boardService } from "../services/board-service.js";

export default {
  state: {
    boards: [],
    board: null,
    filterBy: {
      name: '',
      tags: '',
      creator: '',
    },
  },
  getters: {
    boards(state) {
      return state.boards;
    },
    board(state) {
      return state.board;
    },
    activities(state) {
      return state.board.activities
    }
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards;
    },
    setBoard(state, {id}) {
      state.board = state.boards.find((b) => b._id === id)
    },
    deleteBoard(state, { id }) {
      const idx = state.boards.findIndex((t) => t._id === id);
      state.boards.splice(idx, 1);
    },
    updateBoard(state, { board }) {
      const idx = state.boards.findIndex((t) => t._id === board._id);
      state.boards.splice(idx, 1, board);
    },
    addBoard(state, { board }) {
      state.boards.push(board);
    },
    setFilterBy(state,{filterBy}){
      state.filterBy=filterBy
    }
  },
  actions: {
    loadBoards({ commit,state }, { filterBy }) {
      return boardService.query(state.filterBy)
        .then((boards) => {
        console.log(boards)
        commit({ type: "setBoards", boards });
        return boards;
      });
    },
    deleteBoard({ commit }, { id }) {
      return boardService.deleteboard(id)
        .then(() => {
        commit({ type: "deleteBoard", id });
      })
        .catch(err=>console.log("Problem Deleting,",err))
    },
    saveBoard({ commit }, { board }) {
      const type = board._id ? "updateBoard" : "addBoard";
      return boardService.save(board)
        .then((savedboard) => {
        commit({ type: type, board: savedoard });
        return savedboard;
      })
      .catch(err=>console.log("Problem With,",type,err))
    },
  },
};
