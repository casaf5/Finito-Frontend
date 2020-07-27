<template>
  <task-actions-container
    :fullSize="true"
    @back="$emit('changeComp', 'sidebar-background-menu')"
    :showIcon="true"
    title="Choose a color"
  >
    <colorSmall size="extra-large" />
  </task-actions-container>
</template>

<script>
import taskActionsContainer from "../task-action-container.cmp";
import colorSmall from "../UIComponents/color-small";

export default {
  components: {
    taskActionsContainer,
    colorSmall,
  },
};
</script>

<style></style>
