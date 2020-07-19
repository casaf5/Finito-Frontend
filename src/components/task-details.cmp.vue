<template>
  <section class="task-details">
    <!-- will change to col from task width-->
    <div class="task-details-containers-wraper">
      <button class="close-modal-btn" @click="closeModal">X</button>
      <div class="task-details-main-container">
        <div class="task-left-container">
          <div class="task-details-titles-container">
            <h2 class="task-name">{{ task.title }}</h2>
            <h5 class="task-group-name">
              in Group
              <span>{{taskGroup.title}}</span>
            </h5>
          </div>
          <!-- combine with due date -->
          <!-- <el-checkbox  @click="toggleTaskCompletion" v-model="checked" class="task-isComplete" >Completed</el-checkbox> -->
          <label>
              <input  type="checkbox" v-model="task.isComplete" @click="toggleTaskCompletion"  >
              Completed
          </label>
          <div class="task-members-labels-date flex wrap">
            <section class="task-members-container">
              <h6>MEMBERS |</h6>
              <div v-for="(member,idx) in task.members" :key="idx">
                <!-- change to member name -->
                <avatar :username="member"></avatar>
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
            <h4>
              <i class="fas fa-grip-lines"></i> Description
            </h4>
            <textarea placeholder="Add Description to task.." @click="focusOnDesc" v-model="task.desc"
              ref="desTextArea" @blur="removeFocus" class="desc-textarea"/>
          </div>
          <div class="task-checklists" v-if="task.checkLists.length">
            <task-check-list
              v-for="(checklist,idx) in task.checkLists"
              :checklist="checklist"
              :key="idx"
              @remove="checkListRemoved(idx)"
              @update=" checkListUpdated(idx)"
            />
          </div>
          <task-activity v-if="activitiesToShow" :activities="activitiesToShow" />
        </div>
        <div class="task-right-container flex col">
          <button>
            <i class="el-icon-user"></i> Members
          </button>
          <button>
            <i class="el-icon-price-tag"></i> Labels
          </button>
          <button>
            <i class="el-icon-date"></i> Due date
          </button>
          <button @click="checkListAdded">
            <i class="el-icon-document-checked"></i> Checklist
          </button>
          <button>
            <i class="el-icon-paperclip"></i> Attachment
          </button>
          <button>
            <i class="el-icon-picture-outline"></i> Cover
          </button>
          <button @click="copyTask">
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
import {loggerService} from "../services/logger-service.js";
import TaskActionContainer from "./task-action-container.cmp";
import taskCheckList from '../components/checklist-cmp';
import taskActivity from '../components/task-activity.cmp.vue';
import Avatar from 'vue-avatar';
import {eventBus,SHOW_MSG} from '../services/event-bus-service.js'

export default {
  name: "task-details",
  // move taskgroup to data, not a prop & updated at created
  props: ["taskToEdit"],
  data() {
    return {
      task:null,
      currDescription:this.taskToEdit.desc,
      taskGroup: null,
      user: null,
      taskIdx: null,
      // checked: false,
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
      : { name: "Guest", url: "https://api.adorable.io/avatars/400/79c159e13036a02295c94901b6628bfe.png" };
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    activitiesToShow() {
      let activities = null;
      if (this.boardToEdit) {
        activities = this.boardToEdit.activities;
        activities =  activities.filter(activity => activity.edditedTask.id === this.task.id);
        return activities.filter(activity => activity.edditedTask.id === this.task.id);
      } else {
        return activities;
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    async saveBoard(actionStr = 'ACTION SAVED'){
      const savedBoard = await this.$store.dispatch({ type:"saveBoard", board: this.boardToEdit});
      // USER MSG
      const type = (savedBoard) ? 'success' : 'error'
      let fixedStr = actionStr
      if (actionStr !== 'ACTION SAVED'){
      let words = actionStr.split("_")
      if (words) fixedStr = `${words[0]} ${words[1]}`
      } 
      const msg = (savedBoard) ? `${fixedStr} SUCCESSFULLY!` : `${fixedStr} FAILD...`
      eventBus.$emit(SHOW_MSG, {msg, type});
    },
    //DESCREPTION 
    focusOnDesc(){
      this.$refs.desTextArea.select()
      this.$refs.desTextArea.classList.add('edit')
    },
    removeFocus(){
     this.$refs.desTextArea.classList.remove('edit')
     if (this.currDescription !== this.task.desc) {
      this.addActivity('UPDATED_DESCRIPSTION')
      this.currDescription = this.task.desc;
     }
    },
    // TASK CRUDL +
    removeTask() {
      this.taskGroup.tasks.splice(this.taskIdx, 1);
      this.addActivity("REMOVED_TASK");
      this.closeModal();
    },
    // change id after copy --- make more options
    copyTask() {
      this.taskGroup.tasks.unshift(JSON.parse(JSON.stringify(this.task)));
      this.addActivity("COPPIED_TASK");
    },
    toggleTaskCompletion() {
      let action = "";
      this.task.isComplete = !this.task.isComplete;
      action = (this.task.isComplete) ? " COMPLETED_TASK" : "INCOMPLETED_TASK";
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
    //CheckList
    checkListAdded(){
      this.task.checkLists.push(utilService.getEmptyCheckList())
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

    addActivity(action, changed = "") {
      this.activityToAdd.action = action;
      this.activityToAdd.byUser = this.user;
      const txt = loggerService.getTxtToRndr(action, changed, this.user, this.task);
      this.activityToAdd.txt = txt;
      this.boardToEdit.activities.unshift(this.activityToAdd);
      this.saveBoard(action)
    },
  },
 
  components: {
    taskCheckList,
    Avatar,
    TaskActionContainer,
    taskActivity
  }
};
</script>
