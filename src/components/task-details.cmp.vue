<template>
  <section class="task-details">
    <!-- will change to col from task width-->
    <div class="task-details-containers-wraper">
      <button class="close-modal-btn" @click="closeModal">
        <i class="fas fa-times-circle"></i>
      </button>
      <div class="task-details-main-container">
        <div class="task-left-container">
          <div class="task-details-titles-container">
            <h2 class="task-name">
              <i class="el-icon-postcard icon-margin"></i>
              {{ task.title }}
            </h2>
            <h6 class="task-group-name">
              Task-Group
              <span>{{ taskGroup.title }}</span>
            </h6>
          </div>
          <!-- combine with due date -->
          <!-- <el-checkbox  @click="toggleTaskCompletion" v-model="checked" class="task-isComplete" >Completed</el-checkbox> -->
          <div class="task-members-labels-date flex wrap">
            <section
              v-show="task.members.length"
              class="task-members-container-wraper"
            >
              <!-- <i class="fas fa-users"></i> -->
              <h6>Members</h6>
              <div class="task-members-container flex">
                <div v-for="(member, idx) in task.members" :key="idx">
                  <!-- change to member name -->
                  <avatar
                    v-if="member.url"
                    :src="member.url"
                    :size="30"
                  ></avatar>
                  <avatar v-else :username="member.name" :size="30"></avatar>
                </div>
              </div>
            </section>
            <section
              v-show="task.labels.length"
              class="task-labels-container-wraper"
            >
              <!-- <i class="fas fa-tags"></i> -->
              <h6>Labels</h6>
              <div class="task-labels-container flex">
                <!-- v for labels -->
              </div>
            </section>
            <section v-show="task.dueDate" class="task-date-container-wraper">
              <h6>Due Date</h6>
              <div class="task-date-container flex">
                <label>
                  <input type="checkbox" v-model="task.isComplete" @click="toggleTaskCompletion" />
                  {{ task.dueDate }}
                </label>
              </div>
            </section>
          </div>
          <div class="task-desc-container">
            <i class="el-icon-s-unfold"></i>
            <h4>Description</h4>
            <textarea
              placeholder="Add Description to task.."
              @click="focusOnDesc"
              v-model="task.desc"
              ref="desTextArea"
              @blur="removeFocus"
              class="desc-textarea"
            />
          </div>
          <div
            class="task-attachments-container"
            v-if="task.attachments.length > 0"
          >
            <i class="fas fa-file-alt"></i>
            <h4>Attachments</h4>
            <file-preview
              v-for="(file, idx) in task.attachments"
              :file="file"
              :cover="task.cover"
              :key="idx"
              @remove="removeAttach(idx)"
              @cover="setTaskCover(idx)"
            />
          </div>
          <div class="task-checklists" v-if="task.checkLists.length">
            <task-check-list
              v-for="(checklist, idx) in task.checkLists"
              :checklist="checklist"
              :key="idx"
              @remove="removeCheckList(idx)"
              @update="updateCheckList(idx)"
            />
          </div>
          <task-activity v-if="activitiesToShow" :activities="activitiesToShow" />
        </div>
        <div class="task-right-container">
          <details-btns
            :board="boardToEdit"
            :user="user"
            :taskIdx="taskIdx"
            :task="task"
            @emitBoardChange="boardChanged"
            @emitCloseModal="closeModal"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from "../utils/utils.js";
import { loggerService } from "../services/logger-service.js";
import socketService from "../services/socket-service.js";
import TaskActionContainer from "./task-action-container.cmp";
import detailsBtns from "./details-btns.cmp";
import taskCheckList from "../components/checklist-preview-cmp";
import taskActivity from "../components/task-activity.cmp.vue";
import taskAttachment from "../components/task-attachment.cmp.vue";
import filePreview from "../components/task-attach-preview.cmp.vue";

import Avatar from "vue-avatar";
import { eventBus, SHOW_MSG } from "../services/event-bus-service.js";

export default {
  name: "task-details",
  // move taskgroup to data, not a prop & updated at created
  props: ["taskToEdit"],
  data() {
    return {
      task: null,
      currDescription: this.taskToEdit.desc,
      taskGroup: null,
      user: null,
      taskIdx: null,
      // checked: false,
      activityToAdd: {
        edditedTask: {
          id: this.taskToEdit.id,
          title: this.taskToEdit.title
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
    this.task = this.taskGroup.tasks.find(
      task => task.id === this.taskToEdit.id
    );
    this.taskIdx = this.taskGroup.tasks.findIndex(t => t.id === this.task.id);
    this.user = this.$store.getters.loggedUser
      ? this.$store.getters.loggedUser
      : {
          id:"443",
          name: "Guest",
          url:
            "https://api.adorable.io/avatars/400/79c159e13036a02295c94901b6628bfe.png"
        };
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    activitiesToShow() {
      let activities = null;
      if (this.boardToEdit) {
        activities = this.boardToEdit.activities ;
        activities = activities.filter((activity) => activity.edditedTask.id === this.task.id);
        return activities;
      }
    }
  },
  methods: {
    updateBoard(actionStr = "ACTION SAVED") {
      socketService.emit("boardUpdate", this.boardToEdit);
      socketService.on("boardUpdate", board => {
      this.$store.commit({ type: "setBoard", board });
      });
      // USER MSG
      // const type = savedBoard ? "success" : "error";
      // let fixedStr = actionStr;
      // if (actionStr !== "ACTION SAVED") {
      //   let words = actionStr.split("_");
      //   if (words) fixedStr = `${words[0]} ${words[1]}`;
      // }
      // const msg = savedBoard
      //   ? `${fixedStr} SUCCESSFULLY!`
      //   : `${fixedStr} FAILD...`;
      // eventBus.$emit(SHOW_MSG, { msg, type });
    },
    closeModal() {
      this.$emit("closeModal");
    },
    boardChanged(action, changed = null) {
      changed? this.addActivity(action, changed): this.addActivity(action);
    },
    //DESCREPTION
    focusOnDesc() {
      this.$refs.desTextArea.select();
      this.$refs.desTextArea.classList.add("edit");
    },
    removeFocus() {
      this.$refs.desTextArea.classList.remove("edit");
      if (this.currDescription !== this.task.desc) {
        this.addActivity("UPDATED_DESCRIPSTION");
        this.currDescription = this.task.desc;
      }
    },
    toggleTaskCompletion() {
      let action = "";
      this.task.isComplete = !this.task.isComplete;
      action = this.task.isComplete ? "COMPLETED_TASK" : "INCOMPLETED_TASK";
      this.addActivity(action);
    },
    //ATTACHMENT
    removeAttach(idx) {
      this.task.attachments.splice(idx, 1);
      this.addActivity("REMOVED_ATTACHMENT");
    },

    setTaskCover(idx) {
      if(this.task.cover.url === this.task.attachments[idx].imageUrl){
        this.task.cover.url=""
        this.addActivity("REMOVED_COVER");
      }
      else{
        this.task.cover.url = this.task.attachments[idx].imageUrl;
        this.addActivity("ADDED_COVER");
      }
    },
    // CHECKLIST
    removeCheckList(idx) {
      this.task.checkLists.splice(idx, 1);
      this.addActivity("REMOVED_CHECKLIST");
    },
    // will emit from the checklistpreview comp
    updateCheckList(idx) {
      const checklist = this.task.checkLists[idx];
      this.addActivity("UPDATED_CHECKLIST", checklist.title);
    },

    // get a string as an action and if needed another string of what changed
    addActivity(action, changed = "") {
      this.activityToAdd.action = action;
      this.activityToAdd.byUser = this.user;
      const txt = loggerService.getTxtToRndr(
        action,
        changed,
        this.user,
        this.task
      );
      this.activityToAdd.txt = txt;
      this.boardToEdit.activities.unshift(this.activityToAdd);
      this.updateBoard(action);
    }
  },

  components: {
    taskCheckList,
    Avatar,
    TaskActionContainer,
    taskActivity,
    detailsBtns,
    filePreview
  }
};
</script>
