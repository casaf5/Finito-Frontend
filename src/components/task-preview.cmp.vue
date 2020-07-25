<template>
  <div class="task-preview-container">
    <div :style="taskCover" class="task-cover" @click="taskClicked"></div>
    <div class="task-preview-content">
      <div v-if="currentTask.labels.length >= 1" class="task-label-container">
        <small-label
          @labelClicked="toggleLabels"
          :enenlargeLabel="enlargeLabel"
          :key="index"
          v-for="(label, index) in currentTask.labels"
          :label="label"
        />
      </div>
      <div class="task-title-container flex">
        <span @click="taskClicked">{{ task.title }}</span>
        <i class="el-icon-delete"></i>
      </div>
      <div class="task-status-container" @click="taskClicked">
        <div
          :class="{ 'check-list-completed': allCompleted }"
          class="checklist-container"
          v-if="currentTask.checkLists.length"
        >
          <div v-if="checkListsStatus.allTasks">
            <i class="el-icon-document-checked"></i>
            <span>{{ taskString }}</span>
          </div>
        </div>
        <div v-if="currentTask.attachments.length" class="attachments-container">
          <i class="fas fa-paperclip"></i>
          <span>{{this.currentTask.attachments.length}}</span>
        </div>
        <i v-if="currentTask.desc" class="fas fa-stream"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "./UI Components/modal";
import SmallLabel from "./UI Components/small-label";
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {},
  data() {
    return {
      displayModal: false
    };
  },
  computed: {
    checkListsStatus() {
      let isUncompleted;
      let completedAmout = 0;
      let allTasks = 0;
      this.currentTask.checkLists.forEach(checkList => {
        allTasks += checkList["items"].length;
        isUncompleted = checkList["items"].some(item => !item.completed);
        completedAmout += checkList["items"].reduce((acc, task) => {
          if (task.completed) acc++;
          return acc;
        }, 0);
      });
      return {
        allTasks,
        isUncompleted,
        completedAmout
      };
    },
    taskCover() {
      if (this.currentTask.cover.url) {
        return (
          `background:url("${this.currentTask.cover.url}");` + "height:130px"
        );
      } else {
        return this.currentTask.cover.color
          ? "background-color:" + this.currentTask.cover.color + ";height:25px"
          : "";
      }
    },
    taskString() {
      return `  ${this.checkListsStatus.completedAmout}/${this.checkListsStatus.allTasks}`;
    },
    allCompleted() {
      return (
        this.checkListsStatus.completedAmout ===
          this.checkListsStatus.allTasks && this.checkListsStatus.allTasks >= 1
      );
    },
    currentTask() {
      const board = this.$store.getters.board;
      const currentTaskGroup = board.taskGroups.findIndex(
        taskGroup => taskGroup.id === this.task.parentListId
      );
      const currentTask = board.taskGroups[currentTaskGroup].tasks.find(
        task => task.id === this.task.id
      );
      return currentTask;
    },
    board() {
      return this.$store.getters.board;
    },
    enlargeLabel() {
      const currentTaskGroup = this.board.taskGroups.findIndex(
        taskGroup => taskGroup.id === this.task.parentListId
      );
      return this.board.taskGroups[currentTaskGroup].labelsOpen;
    }
  },
  methods: {
    taskClicked() {
      this.$emit("taskClicked", this.task);
    },
    toggleLabels() {
      this.board.taskGroups.forEach(taskGroup => {
        console.log(taskGroup.isOpen);
        taskGroup.labelsOpen = !taskGroup.labelsOpen;
      });
    }
  },
  components: {
    Modal,
    SmallLabel
  }
};
</script>

<style lang="scss">
// .task-preview-container {
//   margin: 10px;
//   .task-preview-content {
//     display: flex;
//     flex-direction: column;
//     .task-status-container {
//       display: flex;
//       align-items: center;
//       * {
//         margin-right: 3px;
//       }
//     }
//   }
//   .task-label-container {
//     .label-color {
//       display: inline-block;
//       height: 7px;
//       border-radius: 3px;
//       margin: 0 5px;
//       width: 30px;
//       transition: all 0.5s ease-in-out;
//       cursor: pointer;
//     }
//   }
// }
// .label-color-enlarged {
//   padding-right: 40px;
//   padding-top: 20px;
// }

//
</style>
