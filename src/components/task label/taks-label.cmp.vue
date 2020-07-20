<template>
  <component
    @selectedColor="selectedColor"
    @back="toggleComponent"
    @toggleCreateComponent="toggleComponent"
    @labelClicked="labelClicked"
    @editLabel="editLabel"
    @createLabel="createLabel"
    :editMode="editMode"
    :choosenLabelIndex="choosenLabelIndex"
    :choosenColor="choosenColor"
    :title="title"
    :colors="colors"
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
    TaskCreateLabel,
  },
  data() {
    return {
      component: "task-choose-label",
      choosenColor: "",
      editMode: false,
      choosenLabelIndex: -1,
      title: "",
      newLabel: null,
      labelToEdit: null,
      colors: [
        {
          title: "hey",
          color: "#61BD4F",
          selectedColor: "#519839",
          wasClicked: false,
        },
        {
          title: "hello",
          color: "#f2d600",
          selectedColor: "#D9B51C",
          wasClicked: false,
        },
        {
          title: "",
          color: "#ff9f1a",
          selectedColor: "#cd8313",
          wasClicked: false,
        },
        {
          title: "",
          color: "#eb5a46",
          selectedColor: "#b04632",
          wasClicked: false,
        },
        {
          title: "",
          color: "#0079BF",
          selectedColor: "#055A8C",
          wasClicked: false,
        },
        {
          title: "",
          color: "#C377E0",
          selectedColor: "#89609E",
          wasClicked: false,
        },
      ],
    };
  },
  methods: {
    toggleComponent(component) {
      this.component = component;
      if (component === "task-choose-label") this.editMode = false;
    },
    selectedColor({ name, color }) {
      this.component = name;
      this.choosenColor = color;
    },
    labelClicked(label) {
      console.log(label);
    },
    editLabel(label) {
      this.editMode = true;
      this.choosenLabelIndex = label.labelIndex;
      this.title = label.label.title;
      this.toggleComponent("task-create-label");
    },
    createLabel(label) {
      console.log(label);
      if (label.index > -1) {
        // update
        this.colors.splice(label.index, 1, label.label);
        this.editMode = false;
      } else {
        console.log("create label", label);
        this.colors.push(label);
      }
      this.component = "task-choose-label";
    },
  },
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
