<template>
  <task-action-container title="Enter Title">
    <form-input :showLabel="true" labelText="title" v-model="title" type="text" />
    <button class="btn-primary large">Add</button>
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
  }
};
</script>

<style lang="scss" >
</style>