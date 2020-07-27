<template>
  <div class="template-container">
    <div class="template-img-container">
      <img :src="template.previewImg" alt="template-img" />
      <i @click="showTemplate" class="el-icon-s-platform"></i>
      <span>View Template</span>
    </div>
    <div class="template-content-container">
      <h5 class="template-header">{{ template.name }}</h5>
      <p>{{ template.desc }}</p>
    </div>
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
    },
    showTemplate() {
      this.$emit("showTemplate", this.template);
    }
  }
};
</script>

<style></style>
