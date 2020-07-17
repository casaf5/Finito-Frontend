<template>
  <div class="task-preview-container">
    <div class="task-preview-content">
      <span>{{task.title}}</span>
      <i class="el-icon-edit"></i>
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
  }
};
</script>

<style  lang="scss">
.task-preview-container{
  margin: 10px;
}
</style>