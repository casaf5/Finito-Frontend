<template>
<section class="member flex space-between" @click="emittoggleMember">
  <div class="member-container" >
    <Avatar :src="member.url" :username="member.userName" />
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
.member-container {
  margin: 10px 0;
  .member-name {
    margin-left: 10px;
  }
  display: flex;
  align-items: center;
}
.v-member{
    align-self: center;
    font-size: 0.8rem;
    margin-right: 0.9rem;
}
</style>