<template>
  <component @back="toggleComponent" @createLabel="toggleComponent" :is="component" />
</template>

<script>
import TaskActionContainer from "./task-action-container.cmp";
import LabelColor from "./label-color.cmp";
import TaskChooseLabel from "./task-choose-label.cmp";
import TaskCreateLabel from "./task-create-label.cmp";
export default {
  components: {
    TaskActionContainer,
    LabelColor,
    TaskChooseLabel,
    TaskCreateLabel
  },
  data() {
    // <!-- :style="{'background-color':color.color}" -->
    return {
      component: "task-choose-label"
    };
  },
  methods: {
    toggleComponent(component) {
      this.component = component;
    }
  }
};
</script>

<style lang="scss" scoped>
.task-label-container {
  .task-label-search {
    width: 100%;
    padding: 5px;
  }
}
</style>