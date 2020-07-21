export const loggerService = {
  getTxtToRndr,
};

// getting an action and what has been changed (name/date etc..) => using switch case to get the write txt
function getTxtToRndr(action, changed, user, task) {
  let txt = "";
  // return `${action} happend`
  switch (action) {
    // ADD
    case "ADDED_LABEL":
      txt = `${user.name} added label in ${task.title}`;
      break;
    case "ADDED_CHECKLIST":
      txt = `${user.name} added checklist in ${task.title}`;
      break;
    case "ADDED_ITEM":
      // checklist name in changed
      txt = `${user.name} added item in ${task.title} ${changed}`;
      break;
    case "ADDED_COVER":
      txt = `${user.name} added cover to ${task.title}`;
      break;
    case "ADDED_ATTACHMENT":
      txt = `${user.name} attached a file to ${task.title}`;
      break;
    // REMOVE
    case "REMOVED_TASK":
      txt = `${user.name} removed ${task.title}`;
      break;
    case "REMOVED_LABEL":
      txt = `${user.name} removed label from ${task.title}`;
      break;
    case "REMOVED_CHECKLIST":
      txt = `${user.name} removed checklist from ${task.title}`;
      break;
    case "REMOVED_ITEM":
      // checklist name in changed
      txt = `${user.name} removed item from ${task.title} ${changed}`;
      break;
    case "REMOVED_ATTACHMENT":
      txt = `${user.name} removed a file from ${task.title}`;
      break;
    // UPDATE
    case "UPDATED_DESCRIPSTION":
      txt = `${user.name} updated the description of ${task.title}`;
      break;
    case "UPDATED_COVER":
      txt = `${user.name} changed the cover of ${task.title}`;
      break;
    case "CHANGED_DATE":
      // the new date in changed
      txt = `${user.name} changed the due-date of ${task.title} to ${changed}`;
      break;
    case "REMOVED_DATE":
      // the new date in changed
      txt = `${user.name} removed the due-date of ${task.title}`;
      break;
    case "UPDATED_CHECKLIST":
      // changed is the name of the checklist
      txt = `${user.name} updated the checklist ${changed} in ${task.title}`;
      break;
    // OTHERS
    case "JOINED_MEMBER":
      txt = `${user.name} joined as a memeber to ${task.title}`;
      break;
    case "MEMBER_LEFT":
      txt = `${user.name} has left ${task.title}`;
      break;
    case "MOVED_TASK":
      // changed gets the new list task was moved to
      txt = `${user.name} moved ${task.title} to ${changed}`;
      break;
    case "COMPLETED_TASK":
      txt = `${user.name} completed the task - ${task.title}`;
      break;
    case "INCOMPLETED_TASK":
      txt = `${user.name} incompleted the task - ${task.title}`;
      break;
    case "COPPIED_TASK":
      txt = `${user.name} coppied ${task.title}`;
      break;
    case "WATCHED_TASK":
      txt = `${user.name} watched ${task.title}`;
      break;
    case "UNWATCHED_TASK":
      txt = `${user.name} unwatched ${task.title}`;
      break;
  }
  return txt;
}
