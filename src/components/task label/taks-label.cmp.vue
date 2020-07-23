<template>
  <component
    @selectedColor="selectedColor"
    @back="toggleComponent"
    @toggleCreateComponent="toggleComponent"
    @labelClicked="labelClicked"
    @editLabel="editLabel"
    @createLabel="createLabel"
    @close="$emit('close')"
    :editMode="editMode"
    :choosenLabelIndex="choosenLabelIndex"
    :labelToEdit="labelToEdit"
    :choosenColor="choosenColor"
    :title="title"
    :colors="labels"
    :is="component"
  />
</template>

<script>
import TaskActionContainer from "../task-action-container.cmp";
import LabelColor from "./label-color.cmp";
import TaskChooseLabel from "./task-choose-label.cmp";
import TaskCreateLabel from "./task-create-label.cmp";
import { utilService } from "../../utils/utils";

export default {
  // props: {
  //   labels: {
  //     type: Array,
  //     required: true,
  // }
  // },
  components: {
    TaskActionContainer,
    LabelColor,
    TaskChooseLabel,
    TaskCreateLabel
  },
  data() {
    return {
      component: "task-choose-label",
      choosenColor: "",
      editMode: false,
      choosenLabelIndex: -1,
      title: "",
      newLabel: null,
      labelToEdit: null
    };
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    labels() {
      return this.$store.getters.board.labels;
    }
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
    labelClicked(label, index) {
      this.$emit("setLabel", label);
    },
    editLabel(label) {
      //getting my label to edit and passing the index down to label create component to continue editing
      this.editMode = true;
      this.choosenLabelIndex = label.labelIndex;
      this.title = label.label.title;
      this.labelToEdit = label.label;
      console.log("from task label", label);
      this.toggleComponent("task-create-label");
    },
    createLabel(label) {
      console.log(label);
      //updating a label
      if (label.index > -1) {
        // updating a label
        //updating should happen at board level
        // refector so the board will be updated from here
        this.$emit("editLabel", label);
        this.editMode = false;
      } else {
        //creating a label and updating the board
        console.log(label);
        const board = utilService.deepCopy(this.board);
        board.labels.push(label);
        this.$store.dispatch({ type: "saveBoard", board });
      }
      this.component = "task-choose-label";
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
