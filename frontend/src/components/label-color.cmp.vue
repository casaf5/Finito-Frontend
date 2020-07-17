<template>
  <div class="colors-container">
    <div :style="colorObject" class="color unique-color"></div>
    <i v-if="displayIcon" class="el-icon-edit"></i>
  </div>
</template>


<script>
export default {
  props: {
    color: {
      type: Object
    },
    displayIcon: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  computed: {
    colorObject() {
      return {
        "--color": this.color.color,
        "--hover-color": this.color.selectedColor,
        width: this.displayIcon ? "85%" : "100%"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>