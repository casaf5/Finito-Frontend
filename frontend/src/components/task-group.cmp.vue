<template>
  <div class="task-group-container">
    <div class="task-group-title-container">
      <textarea class="task-group-title" v-model="taskGroup.title"></textarea>
      <i @click="show = !show" class="el-icon-more task-icon"></i>
      <task-actions @close="show = !show" v-show="show" />
    </div>
    <task-preview :task="task" :key="task.id" v-for="task in taskGroup.tasks" />
    <div class="add-task-container">
      <div class="add-task-left-content">
        <i class="el-icon-plus task-icon"></i>
        <span type="text">Add another card</span>
      </div>
      <i class="el-icon-full-screen task-icon"></i>
    </div>
  </div>
</template>

<script>
import TaskPreview from "./task-preview.cmp";
import TaskActions from "./task-actions.cmp";
const GROUP_DROP = "groupDrop";
const TASK_DROP = "taskDrop";
export default {
  props: {
    taskGroup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    groupDrop(groupId, e) {
      this.$emit(GROUP_DROP, groupId, e);
    }
  },
  components: {
    TaskPreview,
    TaskActions
  }
};
</script>

<style lang="scss">
</style>