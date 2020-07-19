<template>
  <div
    @click="$emit('labelClicked')"
    class="label-color"
    :class="{ 'label-color-enlarged': enenlargeLabel }"
    :style="{ 'background-color': label.color }"
  >
    <transition name="fade">
      <span v-if="enenlargeLabel">{{ label.title }}</span>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: Object,
      labelsClicked: false,
    },
    enenlargeLabel: {
      type: Boolean,
    },
  },
};
</script>

<style></style>
