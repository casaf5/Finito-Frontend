<template>
  <div class="actions-container">
    <ul class="actions-list">
      <li class="actions-header">
        <i @click="$emit('back')" :class="iconClass" class="icon" v-if="icon"></i>
        <span>{{title}}</span>
        <i @click="$emit('close')" class="el-icon-close"></i>
      </li>
      <hr />
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String
    }
  },
  computed: {
    iconClass() {
      return this.icon ? `el-icon-${this.icon}` : "";
    }
  }
};
</script>

<style scoped lang="scss">
</style>