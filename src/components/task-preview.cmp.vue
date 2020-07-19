<template>
  <div class="task-preview-container" @click="taskClicked">
    <div class="task-preview-content">
      <div v-if="currentTask.labels.length >= 1" class="task-label-container">
        <small-label
          @labelClicked="enlargeLabel = !enlargeLabel"
          :enenlargeLabel="enlargeLabel"
          :key="index"
          v-for="(label, index) in currentTask.labels"
          :label="label"
        />
      </div>
      <div class="task-title flex">
        <span>{{ task.title }}</span>
        <i class="el-icon-edit edit"></i>
      </div>
      <div class="task-status-container">
        <div
          :class="{
            'check-list-completed': checkListsStatus.allTasksCompleted,
          }"
          class="checklist-container"
          v-if="currentTask.checkLists.length"
        >
          <i class="el-icon-document-checked"></i>
          <span>{{ taskString }}</span>
        </div>
        <i class="el-icon-aim"></i>
        <i v-if="currentTask.desc" class="el-icon-tickets"></i>
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
      required: true,
    },
  },
  methods: {},
  data() {
    return {
      displayModal: false,
      enlargeLabel: false,
    };
  },
  computed: {
    checkListsStatus() {
      let isUncompleted;
      let allTasksCompleted;
      let completedAmout;
      let allTasks = 0;
      this.currentTask.checkLists.forEach((checkList) => {
        allTasks += checkList["items"].length;
        isUncompleted = checkList["items"].some((item) => !item.completed);
        allTasksCompleted = checkList["items"].every((task) => task.completed);
        completedAmout = checkList["items"].reduce((acc, task) => {
          if (task.completed) acc++;
          return acc;
        }, 0);
      });
      return {
        allTasks,
        allTasksCompleted,
        isUncompleted,
        completedAmout,
      };
    },

    taskString() {
      return `  ${this.checkListsStatus.completedAmout}/${this.checkListsStatus.allTasks}`;
    },
    currentTask() {
      const board = this.$store.getters.board;
      const currentTaskGroup = board.taskGroups.findIndex(
        (taskGroup) => taskGroup.id === this.task.parentListId
      );
      const currentTask = board.taskGroups[currentTaskGroup].tasks.find(
        (task) => task.id === this.task.id
      );
      return currentTask;
    },
  },
  methods: {
    taskClicked() {
      this.$emit("taskClicked", this.task);
    },
  },
  components: {
    Modal,
    SmallLabel,
  },
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
