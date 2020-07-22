<template>
  <div class="template-container">
    <img :src="template.img" alt="template-img" />
    <h5 class="template-header">{{template.name}}</h5>
    <p>{{template.desc}}</p>
  </div>
</template>

<script>
export default {
  props: {
    template: Object
  }
};
</script>

<style>
</style>