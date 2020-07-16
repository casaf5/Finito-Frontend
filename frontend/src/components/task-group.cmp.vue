<template>
  <div class="task-group-container">
    <div class="task-group-title-container">
      <h3 class="task-group-title">{{taskGroup.title}}</h3>
      <span>...</span>
    </div>
    <task-preview :task="task" :key="task.id" v-for="task in taskGroup.tasks" />
    <div class="add-task-container">
      <span>+</span>
      <input type="text" />
      <span>icon</span>
    </div>
  </div>
</template>

<script>
import TaskPreview from "./task-preview.cmp";
export default {
  props: {
    taskGroup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  components: {
    TaskPreview
  }
};
</script>

<style lang="scss">
</style>