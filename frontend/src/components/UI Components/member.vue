<template>
  <div class="member-container">
    <Avatar :src="member.url" :username="member.name" />
    <span class="member-name">{{member.name}}</span>
  </div>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  props: {
    member: {
      type: Object,
      required: true
    }
  },
  components: {
    Avatar
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
</style>