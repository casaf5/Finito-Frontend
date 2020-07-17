<template>
  <section class="task-details">
          <!-- will change to col from task width-->
   <div class="task-details-containers-wraper">
    <div class="flex row task-details-main-container">
      <div class="flex col space-between task-left-container">
        <h2 class="task-name">{{ task.name }}</h2>
        <h3 class="task-group-name">{{ taskGroup.name }}</h3>
        <div class="task-completed">checkbox</div>
        <div class="task-members-labels-container flex row">
          <div class="task-members-container">
            <h5>Members</h5>
            {{user.name}}
            <!-- v for members -->
          </div>
          <div class="task-labels-container">
             <h5>Labels</h5>
             <!-- v for labels preview -->
          </div>
        </div>
        <div>duedate</div>
        <div class="task-desc">
          <!-- <task-desc/> -->desc
        </div>
        <!-- <div class="task-checklists">
          <ul>
            <li v-for="checklist in board.tasks.checkLists" :key="checklist.id">
              <checklist-preview :checklist="checklist"/>
            </li>
          </ul>
        </div>-->
        <div class="task-activities">
          <div class="task-activties-header flex row space-between">
            <div>icon</div>
            <button>Show Details</button>
          </div>
          <ul v-if="activitiesToShow">
            <li v-for="activity in activitiesToShow" :key="activity.id">{{activity.txt}}</li>
          </ul>
        </div>
      </div>
      <div class="flex col task-right-container">
        <button>Members</button>
        <button>Labels</button>
        <button>Due date</button>
        <button>Checklist</button>
        <button>Attachment</button>
        <button>Cover</button>
        <button>Copy</button>
        <button>Remove</button>
        <button>Move</button>
        <button>Watch</button>
      </div>
    </div>
  </div>
  </section>
</template>

<script>
export default {
  name: "task-details",
  props: ["taskGroup", "task"],
  data() {
    return {
      user: null,
      activityToAdd: {
        edditedTask: {
          id: this.task.id,
          name: this.task.name
        }
      },
      boardToEdit: null
    };
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    activitiesToShow() {
      let activities = null;
      if (this.boardToEdit) {
        activities = this.boardToEdit.activities;
        return activities.filter(
          activity => activity.edditedTask.id === this.task.id
        );
      } else {
        return activities;
      }
    }
  },
  methods: {
    // delete after
    async loadBoards() {
      await this.$store.dispatch({ type: "loadBoards" });
      console.log("boardsare loaded");
      this.setBoard();
    },
    async setBoard() {
      await this.$store.commit({ type: "setBoard", id: "b101" });
      this.boardToEdit = JSON.parse(JSON.stringify(this.board));
      console.log("board to edit", this.boardToEdit);
      // /////check for checklist
      console.log('cl', this.boardToEdit.taskGroup[0].tasks[0].checkLists);
       this.addActivity("ADDED_ITEM", 'checklist');
    },
    //////
    removeTask(id) {
      this.boardToEdit.findIndex(t => t.id === id);
      this.boardToEdit.splice(idx, 1);
      this.addActivity("REMOVED_TASK");
    },
    copyTask(id) {
      // this.boardToEdit.findIndex(t => t.id === id);
      // this.boardToEdit.unshift(idx, 1);
      this.addActivity("COPPIED_TASK");
    },

    // adding activity to store
    // async
    addActivity(action, changed = "") {
      this.activityToAdd.action = action;
      this.activityToAdd.byUser = this.user;
      this.activityToAdd.url = this.user.url;
      const txt = this.getTxtToRndr(action, changed);
      this.activityToAdd.txt = txt;
      this.boardToEdit.activities.unshift(this.activityToAdd);
      // const updatedboard = await this.$store.dispatch({ type:"saveBoard", board: this.boardToEdit});
      // const type = (updatedboard) ? 'success' : 'error'
      // const msg = (updatedboard) ? `${this.activityToAdd.action} successfully!` : `${this.activityToAdd.action} faild...`
      // eventBus.$emit(SHOW_MSG, {msg, type});
    },

    // getting an action and what has been changed (name/date etc..) => using switch case to get the write txt
    getTxtToRndr(action, changed) {
      let txt = "";
      // return `${action} happend`
      switch (action) {
        // ADD
        case "ADDED_LABEL":
          txt = `${this.user.name} added label in ${this.task.name}`;
          break;
        case "ADDED_CHECKLIST":
          txt = `${this.user.name} added checklist in ${this.task.name}`;
          break;
        case "ADDED_ITEM":
          // checklist name in changed
          txt = `${this.user.name} added item in ${this.task.name} ${changed}`;
          break;
        case "ADDED_COVER":
          txt = `${this.user.name} added cover to ${this.task.name}`;
          break;
        case "ADDED_ATTACHMENT":
          txt = `${this.user.name} attached a file to ${this.task.name}`;
          break;
        // REMOVE
        case "REMOVED_TASK":
          txt = `${this.user.name} removed ${this.task.name}`;
          break;
        case "REMOVED_LABEL":
          txt = `${this.user.name} removed label from ${this.task.name}`;
          break;
        case "REMOVED_CHECKLIST":
          txt = `${this.user.name} removed checklist from ${this.task.name}`;
          break;
        case "REMOVED_ITEM":
          // checklist name in changed
          txt = `${this.user.name} removed item from ${this.task.name} ${changed}`;
          break;
        // UPDATE
        case "UPDATED_DESC":
          txt = `${this.user.name} updated the description of ${this.task.name}`;
          break;
        case "UPDATED_COVER":
          txt = `${this.user.name} changed the cover of ${this.task.name}`;
          break;
        case "UPDATED_DATE":
          // the new date in changed
          txt = `${this.user.name} changed the due-date of ${this.task.name} to ${changed}`;
          break;
        // OTHERS
        case "JOINED_MEMBER":
          txt = `${this.user.name} joined as a memeber to ${this.task.name}`;
          break;
        case "MOVED_TASK":
          // changed gets the new list task was moved to
          txt = `${this.user.name} moved ${this.task.name} to ${changed}`;
          break;
        case "COMPLETED_TASK":
          txt = `${this.user.name} completed the task ${this.task.name}`;
          break;
        case "INCOMPLETED_TASK":
          txt = `${this.user.name} incompleted the task ${this.task.name}`;
          break;
        case "COPPIED_TASK":
          txt = `${this.user.name} coppied ${this.task.name}`;
          break;
        case "WATCHED_TASK":
          txt = `${this.user.name} watched ${this.task.name}`;
          break;
      }
      return txt;
    }
  },
  created() {
    // //only for testing
    this.loadBoards();
    ///////
    this.user = this.$store.getters.loggedUser
      ? this.$store.getters.loggedUser
      : { name: "Guest", url: "guestimg" };
    // this.boardToEdit = JSON.parse(JSON.stringify(this.board))
    // console.log('board to edit', this.boardToEdit)
  }
};
</script>
