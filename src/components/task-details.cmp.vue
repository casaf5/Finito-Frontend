<template>
  <section class="task-details">
    <!-- will change to col from task width-->
    <div class="task-details-containers-wraper">
      <button class="close-modal-btn" @click="closeModal">X</button>
      <div class="task-details-main-container ">
        <div class="task-left-container">
          <div class="task-details-titles-container">
            <h2 class="task-name">{{ task.title }}</h2>
            <h5 class="task-group-name">in Group <span>{{taskGroup.title}}</span></h5>
          </div>
          <!-- <el-checkbox v-model="checked" class="task-isComplete">Completed</el-checkbox> -->
          <div class="task-members-labels-container flex wrap " >
            <section class="task-members-container">
              <h6>MEMBERS | </h6>
              <div v-for="(member,idx) in task.members" :key="idx">
                <!-- change to member name -->
                   <avatar username="member"></avatar>
              </div>
            </section>
            <section class="task-labels-container">
              <h6>LABELS</h6>
              <!-- v for labels -->
            </section>
          <section class="task-date-container">
            <h6>|DUE DATE</h6>
            {{task.dueDate}}
          </section>
          </div>
          <div class="task-desc-container">
            <h4><i class="fas fa-grip-lines"></i> Description</h4>
            <textarea  placeholder="Add Description to task.." 
            @click="focusOnDesc" v-model="task.desc" ref="desTextArea"
            @blur="removeFocus" class="desc-textarea" />
          </div>
          <div  class="task-checklists" v-if="task.checkLists.length!=0">
               <task-check-list v-for="checklist in task.checkLists" 
               :checklist="checklist" 
               :key="checklist.id" 
               @remove="removeCheckList(checklist.id)"
               @update="saveBoard"
               />
          </div>
          <div class="task-activities">
            <div class="task-activties-header flex row space-between">
              <div>
                <h4><i class="fas fa-hdd"></i> Activity</h4>
                <button>Show Details</button>
              </div>
            </div>
          </div>
        </div>
        <div class="task-right-container flex col ">
          <button>
            <i class="el-icon-user"></i> Members
          </button>
          <button>
            <i class="el-icon-price-tag"></i> Labels
          </button>
          <button>
            <i class="el-icon-date"></i> Due date
          </button>
          <button @click="addCheckList">
            <i class="el-icon-document-checked"></i> Checklist
          </button>
          <button>
            <i class="el-icon-paperclip"></i> Attachment
          </button>
          <button>
            <i class="el-icon-picture-outline"></i> Cover
          </button>
          <button>
            <i class="el-icon-document-copy"></i> Copy
          </button>
          <button @click="removeTask">
            <i class="el-icon-delete"></i> Remove
          </button>
          <button>
            <i class="el-icon-right"></i> Move
          </button>
          <button>
            <i class="el-icon-view"></i> Watch
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {utilService} from '../utils/utils.js';
import TaskActionContainer from "./task-action-container.cmp";
import taskCheckList from '../components/checklist-cmp';
import Avatar from 'vue-avatar';

export default {
  name: "task-details",
  // move taskgroup to data, not a prop & updated at created
  props: ["taskToEdit"],
  data() {
    return {
      task:null,
      taskGroup: null,
      user: null,
      taskIdx: null,
      checked: false,
      activityToAdd: {
        edditedTask: {
          id: this.taskToEdit.id,
          name: this.taskToEdit.name
        }
      },
      boardToEdit: null
    };
  },
   created() {
    /// copying the task it self also so could be editted out of the store
    this.boardToEdit = JSON.parse(JSON.stringify(this.board));
    const taskGroupId = this.taskToEdit.parentListId;
    this.taskGroup = this.boardToEdit.taskGroups.find(
      tg => tg.id === taskGroupId
    );
    const taskGroupIdx = this.boardToEdit.taskGroups.findIndex(
      tg => tg.id === taskGroupId
    );
    this.task=this.taskGroup.tasks.find(task=>task.id===this.taskToEdit.id)
    this.taskIdx = this.taskGroup.tasks.findIndex(t => t.id === this.task.id);
    this.user = this.$store.getters.loggedUser
      ? this.$store.getters.loggedUser
      : { name: "Guest", url: "guestimg" };
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
    checkListsToShow() {
      return this.task.checkLists[0].items;
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    saveBoard(){
      this.$store.dispatch({type:'saveBoard',board:this.boardToEdit})
    },
    //DESCREPTION 
    focusOnDesc(){
      this.$refs.desTextArea.select()
      this.$refs.desTextArea.classList.add('edit')
    },
    removeFocus(){
     this.$refs.desTextArea.classList.remove('edit')
     this.saveBoard()
    },
    //CheckList
    addCheckList(){
      this.task.checkLists.push(utilService.getEmptyCheckList())
      this.saveBoard()
    },
    removeCheckList(id){
      const listIdx=this.task.checkLists.findIndex(list=>list.id===id)
      this.task.checkLists.splice(listIdx,1)
      this.saveBoard()
    },
 
    // TASK CRUDL +
    removeTask() {
      this.taskGroup.tasks.splice(this.taskIdx, 1);
      this.addActivity("REMOVED_TASK");
      this.closeModal();
    },
    copyTask() {
      this.taskGroup.tasks.unshift(JSON.parse(JSON.stringify(this.task)));
      this.addActivity("COPPIED_TASK");
    },
    toggleTaskCompletion() {
      let action = "";
      this.task.isComplete = !this.task.isComplete;
      action = this.task.isComplete ? " COMPLETED_TASK" : "INCOMPLETED_TASK";
      this.addActivity(action);
    },
    watchTask() {},
    // gets the new taskgroup id from the relevant comp
    moveTask(newTaskgroupId) {
      this.task.parentListId = newTaskgroupId;
      const newGroupIdx = this.boardToEdit.taskGroups.findIndex(
        g => g.id === newTaskgroupId
      );
      this.taskGroup.tasks.splice(this.taskIdx, 1);
      this.boardToEdit.taskGroups[newGroupIdx].push(this.task);
      this.addActivity("MOVED_TASK");
    },

    // LABEL "CRUDL" => should emit by component
    labelAdded(label) {
      this.taskGroup.tasks.labels.push(label);
      this.addActivity("ADDED_LABEL");
    },
    labelRemoved(idx) {
      this.taskGroup.tasks.labels.splice(idx, 1);
      this.addActivity("REMOVED_LABEL");
    },
    // CHECKLIST CRUDL => should emit by component (inside will be also items crudl)
    checkListAdded(checklist) {
      this.task.checkLists.push(checklist);
      this.addActivity("ADDED_CHECKLIST");
    },
    checkListRemoved(idx) {
      this.task.checkLists.splice(idx, 1);
      this.addActivity("REMOVED_CHECKLIST");
    },
    // will emit from the checklistpreview comp
    checkListUpdated(idx) {
      const checklist = this.task.checkLists[idx];
      this.addActivity("UPDATED_CHECKLIST", checklist.title);
    },
    // OTHERS
    // get an obj of the changes and update the board
    coverUpdated(cover) {},
    memberJoined(memeber) {},
    fileAttched(file) {},
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
        case "isComplete_TASK":
          txt = `${this.user.name} isComplete the task ${this.task.name}`;
          break;
        case "INisComplete_TASK":
          txt = `${this.user.name} inisComplete the task ${this.task.name}`;
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
 
  components: {
    taskCheckList,
    Avatar,
    TaskActionContainer
  }
};
</script>
