import axios from "axios";
axios.defaults.withCredentials = true;

export const boardService = {
  query,
  deleteBoard,
  save,
  getById,
  // getEmptyBoard,
};

function _getUrl(id = "") {
  const BASE_URL =
    process.env.NODE_ENV !== "development"
      ? "/api/board"
      : "//localhost:3000/board";
  return `${BASE_URL}/${id}`;
}
async function query(filterBy) {
  // let filterQuery = `?name=${filterBy.name}`;
  const res = await axios.get(_getUrl());
  const boards = res.data;
  console.log("boards", boards);
  return boards;
}
async function getById(boardId) {
  const res = await axios.get(_getUrl(boardId));
  const board = res.data;
  console.log("board", board);
  return board;
}

async function deleteBoard(boardId) {
  return await axios.delete(_getUrl(boardId));
}
async function _add(board) {
  const savedBoard = await axios.post(_getUrl(), board);
  return savedBoard.data;
}

async function _update(board) {
  const savedBoard = await axios.put(_getUrl(board._id), board);
  return savedBoard.data;
}

function save(board) {
  return board._id ? _update(board) : _add(board);
}

// function getEmptyBoard(){
//   return {
//     name: "",
//     price: 0,
//     type: "",
//     inStock: false,
//     image:'',
//   }
// }
