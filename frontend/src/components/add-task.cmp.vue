<template>
  <div
    :style="{'padding':!inGroup? '5px' :''}"
    :class="{'transparent':!inGroup}"
    class="add-task-container"
  >
    <div @click="toggleEdit" v-if="!show" class="add-task-left-content">
      <i class="el-icon-plus task-icon"></i>
      <span type="text">Add another card</span>
      <i class="el-icon-full-screen task-icon"></i>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="show" class="add-task-content-container">
        <textarea :placeholder="placeholderText" v-model="content"></textarea>
        <button @click="addTask">{{buttonText}}</button>
        <i @click="toggleEdit" class="el-icon-close"></i>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["inGroup", "show"],
  data() {
    return {
      items: [],
      content: "",
      showEditSection: false
    };
  },
  methods: {
    toggleEdit() {
      this.$emit("toggleEdit", !this.show);
    },
    addTask() {
      if (this.content) {
        if (this.inGroup) {
          this.$emit("addTask", this.content);
          this.show = false;
        } else {
          this.$emit("addList", this.content);
          this.show = false;
        }
        return;
      }
      alert("tasks cant be empty");
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