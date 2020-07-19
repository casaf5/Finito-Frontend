<template>
  <component
    @selectedColor="selectedColor"
    @back="toggleComponent"
    @createLabel="toggleComponent"
    :choosenColor="choosenColor"
    :is="component"
  />
</template>

<script>
import TaskActionContainer from "../task-action-container.cmp";
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
    return {
      component: "task-choose-label",
      choosenColor: ""
    };
  },
  methods: {
    toggleComponent(component) {
      this.component = component;
    },
    selectedColor({ name, color }) {
      this.component = name;
      this.choosenColor = color;
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