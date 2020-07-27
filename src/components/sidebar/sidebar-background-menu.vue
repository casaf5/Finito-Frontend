<template>
  <task-actions-container
    :fullSize="true"
    @back="$emit('changeComp', 'sidebar-options')"
    :showIcon="true"
    title="Choose background"
  >
    <div class="background-menu">
      <img
        @click="$emit('changeComp', 'sidebar-img')"
        src="@/assets/images/search-img.jpg"
        alt=""
      />
      <img
        @click="$emit('changeComp', 'sidebar-color')"
        src="@/assets/images/search-color.jpg"
        alt=""
      />
    </div>
  </task-actions-container>
</template>

<script>
import taskActionsContainer from "../task-action-container.cmp";

export default {
  components: {
    taskActionsContainer,
  },
};
</script>

<style lang="scss" scoped>
.background-menu {
  img {
    cursor: pointer;
    width: 100%;
    object-fit: cover;
    height: 250px;
  }
}
</style>
