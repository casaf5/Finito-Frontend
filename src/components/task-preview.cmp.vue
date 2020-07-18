<template>
    <div class="task-preview-container" @click="taskClicked" >
      <div class="task-preview-content">
        <div v-if="currentTask.labels.length>=1" class="task-label-container">
          <div
            @click="labelsClicked = !labelsClicked"
            class="label-color"
            :class="{'label-color-enlarged':labelsClicked}"
            :style="{'background-color':label.color}"
            :key="index"
            v-for="(label,index) in currentTask.labels"
          ></div>
        </div>
        <div class="task-title flex" >
          <span>{{task.title}}</span>
          <i class="el-icon-edit edit"></i>
        </div>
        <div class="task-status-container">
          <!-- <div
            :class="{'check-list-completed':allTaskCompleted}"
            v-if="unCompletedTasks"
            class="checklist-container"
          >
            <i class="el-icon-document-checked"></i>
            <span>{{taskString}}</span>
          </div>-->
          <i class="el-icon-aim"></i>
          <i v-if="currentTask.desc" class="el-icon-tickets"></i>
        </div>
      </div>
    </div>
</template>

<script>
import Modal from "./UI Components/modal";

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
      labelsClicked: false,
      displayModal: false
    };
  },
  computed: {
    // unCompletedTasks() {
    //   const checkLists = this.currentTask.checkLists;
    //   return this.currentTask.checkLists.forEach(checkList => {
    //     for (key in checkList) {
    //       if (key === "items") {
    //         checkList[key].some(item => !item.completed);
    //       }
    //     }
    //   });
    // },
    // allTaskCompleted() {
    //   this.currentTask.checkLists.forEach(checkList =>
    //     checkList["items"].every(task => task.completed)
    //   );
    // },
    // taskString() {
    //   const uncompletedTasks = this.currentTask.checkLists
    //     .forEach(checkList => checkList["items"])
    //     .reduce((acc, task) => {
    //       if (task.completed) acc++;
    //       return acc;
    //     }, 0);

    //   return `  ${uncompletedTasks}/${this.currentTask.checkLists.tasks.length}`;
    // },
    currentTask() {
      const board = this.$store.getters.board;
      const currentTaskGroup = board.taskGroups.findIndex(
        taskGroup => taskGroup.id === this.task.parentListId
      );
      const currentTask = board.taskGroups[currentTaskGroup].tasks.find(
        task => task.id === this.task.id
      );
      return currentTask;
    }
  },
  methods:{
     taskClicked() {
      this.$emit("taskClicked", this.task);
    },
  },
  components: {
    Modal
  }
};
</script>

<style  lang="scss">
.task-preview-container {
  margin: 10px;
  .task-preview-content {
    display: flex;
    flex-direction: column;
    .task-status-container {
      display: flex;
      align-items: center;
      * {
        margin-right: 3px;
      }
    }
  }
  .task-label-container {
    .label-color {
      display: inline-block;
      height: 7px;
      border-radius: 3px;
      margin: 0 5px;
      width: 30px;
      transition: all 0.5s ease-in-out;
      cursor: pointer;
    }
  }
}
.label-color-enlarged {
  padding-right: 40px;
  padding-top: 20px;
}
.check-list-completed {
  background-color: green;
  color: #fff;
}
</style>