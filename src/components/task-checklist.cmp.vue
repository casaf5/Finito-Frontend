<template>
  <task-action-container @close="close" title="Enter Title">
    <form-input :showLabel="true" labelText="title" v-model="title" type="text" />
    <button @click="createCheckList" class="btn-primary large">Add</button>
  </task-action-container>
</template>

<script>
import TaskActionContainer from "./task-action-container.cmp";
import FormInput from "./From Elements/form-input.cmp";

export default {
  components: {
    TaskActionContainer,
    FormInput
  },
  data() {
    return {
      title: ""
    };
  },
  methods: {
    createCheckList() {
      if (this.title) {
        this.$emit("createCheckList", this.title);
      }
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss"></style>
