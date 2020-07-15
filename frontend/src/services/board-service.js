import axios from "axios";
axios.defaults.withCredentials = true

export const boardService = {
  query,
  deleteBoard,
  save,
  getById,
  getEmptyBoard,
};
function _getUrl(id=''){
  const BASE_URL=(process.env.NODE_ENV!=='development')? '/api/board':'//localhost:3030/api/board'
  return `${BASE_URL}/${id}`
}
function query(filterBy) {
  let filterQuery = `?name=${filterBy.name}&type=${filterBy.type}&inStock=${filterBy.inStock}&sort=${filterBy.sortBy}`;
  return axios
    .get(_getUrl()+filterQuery)
    .then((res) => res.data);
}
function getById(boardId) {
  return axios
    .get(_getUrl(boardId))
    .then((res) => res.data);
}

function deleteBoard(boardId) {
  return axios
    .delete(_getUrl(boardId))
    .then((res) => res.data);
}
function _add(board) {
  return axios.post(_getUrl(), board).then((res) => res.data);
}

function _update(board) {
  return axios
    .put(_getUrl(board._id), board)
    .then((res) => res.data);
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
