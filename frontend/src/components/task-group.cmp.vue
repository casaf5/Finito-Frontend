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
const GROUP_DROP='groupDrop'
const TASK_DROP="taskDrop"
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
  methods:{
    groupDrop(groupId,e){
      this.$emit(GROUP_DROP,groupId,e)
    }
  },
  components: {
    TaskPreview
  }
};
</script>

<style lang="scss">
</style>