<template>
  <div class="colors-container">
    <div @click="labelClicked" :style="colorObject" class="color unique-color">
      <span>{{ color.label }}</span>
    </div>
    <i v-if="displayIcon" class="el-icon-edit"></i>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: Object,
    },
    displayIcon: {
      type: Boolean,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  methods: {
    labelClicked() {
      const label = {
        title: this.color.label,
        color: this.color.color,
      };
      this.$emit("labelClicked", { label: label, index: this.index });
    },
  },
  computed: {
    colorObject() {
      return {
        "--color": this.color.color,
        "--hover-color": this.color.selectedColor,
        width: this.displayIcon ? "85%" : "100%",
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
