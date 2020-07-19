<template>
  <task-action-container title="Labels">
    <div class="task-label-container">
      <li>
        <form-input v-model="labelText" type="text" />
      </li>
      <span>Labels</span>
      <li>
        <label-color
          :displayIcon="true"
          :color="color"
          :key="index"
          :index="index"
          v-for="(color, index) in colorsToDisplay"
          @labelClicked="labelClicked"
        />
      </li>
      <button class="btn-primary" @click="createNewLabel">
        Create new Label
      </button>
    </div>
  </task-action-container>
</template>

<script>
import TaskActionContainer from "../task-action-container.cmp";
import LabelColor from "./label-color.cmp";
import FormInput from "../From Elements/form-input.cmp";
export default {
  components: {
    TaskActionContainer,
    LabelColor,
    FormInput,
  },
  data() {
    return {
      labelText: "",
      colors: [
        {
          label: "hey",
          color: "#61BD4F",
          selectedColor: "#519839",
          wasClicked: false,
        },
        {
          label: "hello",
          color: "#f2d600",
          selectedColor: "#D9B51C",
          wasClicked: false,
        },
        {
          label: "",
          color: "#ff9f1a",
          selectedColor: "#cd8313",
          wasClicked: false,
        },
        {
          label: "",
          color: "#eb5a46",
          selectedColor: "#b04632",
          wasClicked: false,
        },
        {
          label: "",
          color: "#0079BF",
          selectedColor: "#055A8C",
          wasClicked: false,
        },
        {
          label: "",
          color: "#C377E0",
          selectedColor: "#89609E",
          wasClicked: false,
        },
      ],
    };
  },
  methods: {
    createNewLabel() {
      this.$emit("createLabel", "task-create-label");
    },
    labelClicked({ label, index }) {
      this.$emit("labelClicked", label);
      console.log("before press", this.colors[index].wasClicked);
      this.colors[index].wasClicked = !this.colors[index].wasClicked;
      console.log("after press", this.colors[index].wasClicked);
    },
    // selectedColor(choosenColor) {
    //   this.$emit("createLabel", {
    //     name: task - create - label,
    //     color: choosenColor
    //   });
    // }
  },
  computed: {
    colorsToDisplay() {
      const searchTerm = this.labelText.toLowerCase();
      return this.colors.filter((color) =>
        color.label.toLowerCase().includes(searchTerm)
      );
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
