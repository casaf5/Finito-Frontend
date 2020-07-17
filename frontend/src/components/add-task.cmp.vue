<template>
  <div
    :style="{'padding':!inGroup? '5px' :''}"
    :class="{'transparent':!inGroup}"
    class="add-task-container"
  >
    <div @click="toggleEdit" v-if="!showEditSection" class="add-task-left-content">
      <i class="el-icon-plus task-icon"></i>
      <span type="text">Add another card</span>
      <i class="el-icon-full-screen task-icon"></i>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="showEditSection" class="add-task-content-container">
        <textarea :placeholder="placeholderText" v-model="content"></textarea>
        <button>{{buttonText}}</button>
        <i @click="toggleEdit" class="el-icon-close"></i>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["inGroup"],
  data() {
    return {
      items: [],
      content: "",
      showEditSection: false
    };
  },
  methods: {
    toggleEdit() {
      this.showEditSection = !this.showEditSection;
    }
  },
  computed: {
    buttonText() {
      return this.inGroup ? "Add Card" : "Add List";
    },
    placeholderText() {
      return this.inGroup ? "Enter Card title..." : "Enter List Title...";
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.2s ease;
}
</style>