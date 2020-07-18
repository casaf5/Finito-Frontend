export const utilService = {
  getRandomId,
  getEmptyTask,
  deepCopy,
};

//Tired of wirting JSON.parse(JSON.stringify(object)

function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
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
    createdAt: new Date(),
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
