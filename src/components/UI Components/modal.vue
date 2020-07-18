<template>
  <div>
    <div class="overlay-content">
      <slot></slot>
    </div>
    <div @click.prevent="backGroundClicked" style="cursor:pointer" class="overlay-wrapper"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    backGroundClicked() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.overlay-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: #000000c5;
  opacity: 1;
  z-index: 25;
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 40px;
  overflow: auto;
  z-index: 50;
}
label {
  padding: 5px;
}
.overlay-content {
  border-radius: 17px;
  width: 450px;
  background-color: #ffffff;
  z-index: 30;
  position: relative;
  margin: 0 auto;
}
</style>
