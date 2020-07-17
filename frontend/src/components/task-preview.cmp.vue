<template>
  <div class="task-preview-container">
    <span>{{task.title}}</span>
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