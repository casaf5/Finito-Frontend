<template>
  <task-actions-container
    :fullSize="true"
    @back="$emit('changeComp', 'sidebar-background-menu')"
    :showIcon="true"
    title="search for images"
  >
    <search-img :topImages="topImages" imageAmount="20" />
  </task-actions-container>
</template>

<script>
import taskActionsContainer from "../task-action-container.cmp";
import searchImg from "../UIComponents/search-img";
import { UnsplashService } from "../../services/unsplashImage-service.js";
export default {
  async created() {
    this.topImages = await UnsplashService.getRandomPhotos("20", "landscape");
  },
  data() {
    return {
      topImages: [],
    };
  },
  components: {
    taskActionsContainer,
    searchImg,
  },
};
</script>

<style></style>
