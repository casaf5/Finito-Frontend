<template>
  <div @click="createTemplate" class="template-container">
    <div class="template-img-container">
      <img :src="template.img" alt="template-img" />
      <i class="el-icon-s-platform"></i>
    </div>
    <h5 class="template-header">{{template.name}}</h5>
    <p>{{template.desc}}</p>
  </div>
</template>

<script>
export default {
  name: "board-template",
  props: {
    template: Object
  },
  methods: {
    createTemplate() {
      this.$emit("createTemplate", this.template);
    }
  }
};
</script>

<style>
</style>