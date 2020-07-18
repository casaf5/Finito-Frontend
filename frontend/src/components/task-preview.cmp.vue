<template>
  <div class="task-preview-container">
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
      <div class="flex">
        <span>{{task.title}}</span>
        <i class="el-icon-edit edit"></i>    
      </div>
      <!-- <div
        :class="{'check-list-completed':allTaskCompleted}"
        v-if="unCompletedTasks"
        class="task-status-container"
      >
        <i class="el-icon-aim"></i>    
        <i v-if="currentTask.desc" class="el-icon-tickets"></i>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      labelsClicked: false
    };
  },
  computed: {
    // unCompletedTasks() {
    //   return this.currentTask.checkLists.items.some(task => !task.completed);
    // },
    // allTaskCompleted() {
    //   return this.currentTask.checkLists.items.every(task => task.completed);
    // },
    // taskString() {
    //   const uncompletedTasks = this.currentTask.checkLists.items.reduce(
    //     (acc, task) => {
    //       if (task.completed) acc++;
    //       return acc;
    //     },
    //     0
    //   );
    //   return `  ${uncompletedTasks}/${this.currentTask.checkLists.items.length}`;
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