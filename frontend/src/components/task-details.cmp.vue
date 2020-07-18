<template>
  <section v-if="isShown" class="task-details">
          <!-- will change to col from task width-->
   <div class="task-details-containers-wraper">
    <button @click="closeModal">X</button>
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
        <div class="task-checklists">
          <!-- v-if="checkListsToShow" -->
          <ul >
            <li v-for="(checklist,idx) in task.checkLists" :key="idx">
              <checklist-preview :checklist="checklist"/>
            </li>
          </ul>
        </div>
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
        <button @click="removeTask">Remove</button>
        <button>Move</button>
        <button>Watch</button>
      </div>
    </div>
  </div>
  </section>
</template>

<script>
  import checklistPreview from "@/components/checklist-preview.cmp.vue"
  // import { eventBus, SHOW_MSG } from "@/services/event-bus.service.js";

export default {
  name: "task-details",
  // move taskgroup to data, not a prop & updated at created
  props: ["taskGroup", "task"],
  data() {
    return {
      isShown:true,
      currGroupIdx:null,
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
    },
    // checkListsToShow (){
    //     return  this.task.checkLists
  },
  methods: {
    closeModal (){
      this.isShown = false;
    },
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
      console.log('cl', this.boardToEdit.taskGroups[0].tasks[0].checkLists);
       this.addActivity("ADDED_ITEM", 'checklist');
    },
    ////////
    // TASK CRUDL +
    removeTask() {
      const taskIdx = this.taskGroup.tasks.findIndex(t => t.id===this.task.id)
      this.boardToEdit.taskGroups[this.currGroupIdx].tasks.splice(taskIdx, 1);
      this.addActivity("REMOVED_TASK");
      this.closeModal()
    },
    copyTask() {
      this.boardToEdit.taskGroups[this.currGroupIdx].tasks.unshift(JSON.parse(JSON.stringify(this.task)));
      this.addActivity("COPPIED_TASK");
    },
    toggleTaskCompletion(){
      let action = ''
      this.task.completed = !this.task.completed
      action = (this.task.completed)? "COMPLETED_TASK" : "INCOMPLETED_TASK"
      this.addActivity(action)
    },
    watchTask(){
    },
    // gets the new taskgroup id from the relevant comp
    moveTask(newTaskgroupId) {
      this.task.parentListId = newTaskgroupId
      const idx = this.taskGroup.tasks.findIndex(t => t.id===this.task.id)
      this.boardToEdit.taskGroups[this.currGroupIdx].tasks.splice(idx, 1);
      this.boardToEdit.taskGroups[this.currGroupIdx].tasks.unshift(this.task);
    },

    // LABEL "CRUDL" => should emit by component
    labelAdded(label){
      this.boardToEdit.taskGroups[this.currGroupIdx].tasks.labels.push(label)
      this.addActivity("ADDED_LABEL");
    },
    labelRemoved(idx){
      this.boardToEdit.taskGroups[this.currGroupIdx].tasks.labels.splice(idx, 1)
      this.addActivity("REMOVED_LABEL");
    },
    // CHECKLIST CRUDL => should emit by component (inside will be also items crudl)
    checkListAdded(checklist){
      this.task.checkLists.push(checklist)
      this.addActivity("ADDED_CHECKLIST");
    },
    checkListRemoved(idx){
       this.task.checkLists.splice(idx, 1);
       this.addActivity("REMOVED_CHECKLIST");
    },
    // will emit from the checklistpreview comp
    checkListUpdated(idx){
      const checklist = this.task.checkLists[idx]
      this.addActivity("UPDATED_CHECKLIST", checklist.title);
    },
    // OTHERS
    // get an obj of the changes and update the board
    coverUpdated(cover) {

    },
    memberJoined(memeber){

    },
    fileAttched(file){

    },
    ///////// activiy log + state board update/////////
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
        case "UPDATED_CHECKLIST":
          // changed is the name of the checklist
          txt = `${this.user.name} updated the checklist ${changed} in ${this.task.name}`;
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
    console.log('cls', this.task.checkLists)
    // /////

    // /// copying the task it self also so could be editted out of the store
    
    // this.task = this.boardToEdit.taskGroups.tasks.find(t => t.id===this.task.id)
    // const taskGroupId = this.task.parentListId
    // this.taskGroup = this.boardToEdit.taskGroups.find(tg => tg.id === taskGroupId)
    // this.currGroupIdx = this.boardToEdit.taskGroups.findIndex (g => g.id === this.taskGroup.id)

 
    this.user = this.$store.getters.loggedUser
      ? this.$store.getters.loggedUser
      : { name: "Guest", url: "guestimg" };
    // this.boardToEdit = JSON.parse(JSON.stringify(this.board))
    // console.log('board to edit', this.boardToEdit)
  },
  components : {
    checklistPreview
  }
};
</script>
