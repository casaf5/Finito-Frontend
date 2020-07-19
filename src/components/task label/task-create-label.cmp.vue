<template>
  <task-action-container
    @back="$emit('back','task-choose-label')"
    title="Create Label"
    :showIcon="true"
  >
    <div class="task-create-label-container">
      <li>
        <label>Name</label>
        <form-input v-model="labelText" />
      </li>
      <span>Labels</span>
      <li>
        <label>Select Color</label>
        <label-color :color="color" :key="index" v-for="(color,index) in colorsToDisplay" />
      </li>
      <button class="btn-primary" @click="createNewLabel">Create</button>
    </div>
  </task-action-container>
</template>

<script>
import TaskActionContainer from "../task-action-container.cmp";
import LabelColor from "./label-color.cmp";
import formInput from "../From Elements/form-input.cmp";
export default {
  props: {
    choosenColor: {
      type: String
    }
  },
  components: {
    TaskActionContainer,
    LabelColor,
    formInput
  },
  data() {
    // <!-- :style="{'background-color':color.color}" -->
    return {
      labelText: "",
      colors: [
        {
          label: "hey",
          color: "#61BD4F",
          selectedColor: "#519839"
        },
        {
          label: "hello",
          color: "#f2d600",
          selectedColor: "#D9B51C"
        },
        {
          label: "",
          color: "#ff9f1a",
          selectedColor: "#cd8313"
        },
        {
          label: "",
          color: "#eb5a46",
          selectedColor: "#b04632"
        },
        {
          label: "",
          color: "#0079BF",
          selectedColor: "#055A8C"
        },
        {
          label: "",
          color: "#C377E0",
          selectedColor: "#89609E"
        }
      ]
    };
  },
  methods: {
    createNewLabel() {
      this.$emit("createLabel");
    }
  },
  computed: {
    colorsToDisplay() {
      const searchTerm = this.labelText.toLowerCase();
      return this.colors.filter(color =>
        color.label.toLowerCase().includes(searchTerm)
      );
    }
  },
  created() {
    if (this.choosenColor) {
      console.log(this.choosenColor);
    }
  }
};
</script>

<style lang="scss" scoped>
.task-create-label-container {
  .task-label-search {
    width: 100%;
    padding: 5px;
  }
}
</style>