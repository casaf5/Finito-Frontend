export const utilService = {
  getRandomId,
  getEmptyTask,
  getEmptyCheckList,
  getNewBoard,
  deepCopy,
};

//Tired of wirting JSON.parse(JSON.stringify(object)

function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
}
// function for generating an empty checkList
function getEmptyCheckList(title = "Check List") {
  const checklist = {
    id: getRandomId(),
    title,
    items: [],
  };
  return checklist;
}
// function for generating an empty task
function getEmptyTask(parentListId) {
  const task = {
    parentListId,
    id: getRandomId(),
    title: "",
    desc: "",
    dueDate: "",
    watchMembers: [],
    createdAt: Date.now(),
    executeTime: "",
    members: [],
    labels: [],
    comments: [
      {
        createdBy: "",
        txt: "",
        createdAt: "",
      },
    ],
    cover: {
      color: "",
      url: "",
    },
    attachments: [],
    checkLists: [
      {
        title: "",
        items: [],
      },
    ],
  };
  return task;
}

function getNewBoard() {
  const newBoard = {
    name: "",
    members: [],
    tags: [],
    style: {
      bgColor: "",
      bgUrl: "",
    },
    creator: {},
    activities: [],
    taskGroups: [
      {
        id: getRandomId(),
        title: "Task-Group 1",
        position: "",
        tasks: [],
        labelsOpen: false,
      },
    ],
  };
  return newBoard;
}

function getRandomId() {
  var pt1 = Date.now().toString(16);
  var pt2 = _getRandomInt(1000, 9999).toString(16);
  var pt3 = _getRandomInt(1000, 9999).toString(16);
  return `${pt3}-${pt1}-${pt2}`.toUpperCase();
}

function _getRandomInt(num1, num2) {
  var max = num1 >= num2 ? num1 + 1 : num2 + 1;
  var min = num1 <= num2 ? num1 : num2;
  return Math.floor(Math.random() * (max - min)) + min;
}

//Specific funcion to help in DND on board!

export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};
