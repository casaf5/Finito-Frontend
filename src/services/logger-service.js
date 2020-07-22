export const loggerService = {
  buildLog,
};

// getting an action and what has been changed (name/date etc..) => using switch case to get the write txt
function buildLog(action, changed, user, task) {
  let txt = "";
  switch (action) {
    // ADD
    case "ADDED_LABEL":
      txt = `${user.userName} added a Label in ${task.title}`;
      break;
    case "ADDED_CHECKLIST":
      txt = `${user.userName} added Checklist in ${task.title}`;
      break;
    case "ADDED_ITEM":
      // Checklist name in changed
      txt = `${user.userName} added item in ${task.title} ${changed}`;
      break;
    case "ADDED_COVER":
      txt = `${user.userName} added Cover to ${task.title}`;
      break;
    case "ADDED_ATTACHMENT":
      txt = `${user.userName} attached a File to ${task.title}`;
      break;
    // REMOVE
    case "REMOVED_TASK":
      txt = `${user.userName} removed ${task.title}`;
      break;
    case "REMOVED_LABEL":
      txt = `${user.userName} removed Label from ${task.title}`;
      break;
    case "REMOVED_COVER":
      txt = `${user.userName} removed Label from ${task.title}`;
      break;
    case "REMOVED_CHECKLIST":
      txt = `${user.userName} removed Checklist from ${task.title}`;
      break;
    case "REMOVED_ITEM":
      // Checklist name in changed
      txt = `${user.userName} removed item from ${task.title} ${changed}`;
      break;
    case "REMOVED_ATTACHMENT":
      txt = `${user.userName} removed a File from ${task.title}`;
      break;
    // UPDATE
    case "UPDATED_DESCRIPSTION":
      txt = `${user.userName} updated the Description of ${task.title}`;
      break;
    case "UPDATED_TITLE":
      txt = `${user.userName} updated the Description of ${task.title}`;
      break;
    case "UPDATED_COVER":
      txt = `${user.userName} changed the Cover of ${task.title}`;
      break;
    case "CHANGED_DATE":
      // the new date in changed
      txt = `${user.userName} changed the Due-date of ${task.title} to ${changed}`;
      break;
    case "REMOVED_DATE":
      // the new date in changed
      txt = `${user.userName} removed the Due-date of ${task.title}`;
      break;
    case "UPDATED_CHECKLIST":
      // changed is the name of the Checklist
      txt = `${user.userName} updated Checklist ${changed} in ${task.title}`;
      break;
    // OTHERS
    case "JOINED_MEMBER":
      txt = `${user.userName} joined task ${task.title}`;
      break;
    case "MEMBER_LEFT":
      txt = `${user.userName} has left ${task.title}`;
      break;
    case "MOVED_TASK":
      // changed gets the new list task was moved to
      txt = `${user.userName} moved ${task.title} to ${changed}`;
      break;
    case "COMPLETED_TASK":
      txt = `${user.userName} completed the task - ${task.title}`;
      break;
    case "INCOMPLETED_TASK":
      txt = `${user.userName} incompleted the task - ${task.title}`;
      break;
    case "COPPIED_TASK":
      txt = `${user.userName} Coppied ${task.title}`;
      break;
    case "WATCHED_TASK":
      txt = `${user.userName} Watched ${task.title}`;
      break;
    case "UNWATCHED_TASK":
      txt = `${user.userName} unwatched ${task.title}`;
      break;
  }
  return txt;
}
