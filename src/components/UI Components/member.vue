<template>
<section class="member flex space-between" @click="emittoggleMember">
  <div class="member-container" >
    <Avatar :src="member.url" :username="member.userName" :size="35" />
    <span class="member-name">{{member.userName}}</span>
  </div>
  <slot>
  </slot>
</section>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  props: {
    member: {
      type: Object,
      required: true
    },
  },
  components: {
    Avatar
  },
     methods: {
      emittoggleMember() {
        this.$emit("toggleMember");
      }
    }
};
</script>

<style lang="scss" scoped>

</style>