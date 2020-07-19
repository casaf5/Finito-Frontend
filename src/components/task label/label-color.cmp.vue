<template>
  <div class="colors-container">
    <div @click="selectedColor" :style="colorObject" class="color unique-color">
      <span>{{color.label}}</span>
    </div>
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
    },
    index: {
      type: Number
    }
  },
  data() {
    return {};
  },
  methods: {
    selectedColor() {
      this.$emit("selectedColor", this.color.color);
    }
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