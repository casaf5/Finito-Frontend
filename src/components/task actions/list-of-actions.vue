<template>
  <div class="action-list-container">
    <li @click="createCard">Add Card...</li>
    <li @click="duplicateList">Copy List...</li>
    <li @click="emitCompoenentToRender('move-list', 'Move List')">
      Move List...
    </li>
    <li @click="emitCompoenentToRender('SortBy', 'Sort By')">Sort By...</li>
    <li @click="$emit('watchList')">Watch</li>
    <hr />
    <li>Move All Cards in this List...</li>
    <li>Archive All Cards in this List...</li>
    <hr />
    <li>Archive This List</li>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    createCard() {
      this.$emit("createCard");
    },
    duplicateList() {
      this.$emit("duplicateList");
    },
    emitCompoenentToRender(name, title) {
      this.$emit("compToRender", {
        name,
        title,
        showIcon: true,
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
