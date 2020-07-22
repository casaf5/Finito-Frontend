<template>
  <section class="board-menu">
    <section class="menu-title">
      <i @click="$emit('close')" class="el-icon-close"></i>
      <h4>Menu</h4>
    </section>
    <hr />
    <section class="menu-section-container">
      <section class="menu-section">
        <h5 class="menu-section-title">
          <i class="fas fa-cogs"></i>Board Settings
        </h5>
      </section>
      <section class="menu-section">
        <h5 class="menu-section-title">
          <i class="fas fa-list"></i>Activity Log
        </h5>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  name: "board-menu",
  data() {
    return {
      menuClose: false,
    };
  },
  computed: {},
  methods: {},
};
</script>

<style></style>
