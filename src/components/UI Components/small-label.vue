<template>
  <div
    @click="$emit('labelClicked')"
    class="label-color"
    :class="{'label-color-enlarged':enenlargeLabel}"
    :style="{'background-color':label.color}"
  >
    <span v-if="label.title">{{label.title}}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: Object,
      labelsClicked: false
    },
    enenlargeLabel: {
      type: Boolean
    }
  }
};
</script>

<style>
</style>