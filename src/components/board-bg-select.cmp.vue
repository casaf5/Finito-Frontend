<template>
  <div>
    <task-action-container @close="$emit('close')" title="Search for images">
      <form-input
        :debounceInput="true"
        v-model="query"
        @input="searchForPhotos"
      />
      <h4>Images taken from Unsplash</h4>
      <div class="imgs-container">
        <img
          @click="imageChoosen(urls.raw)"
          :src="urls.small"
          :key="index"
          v-for="(urls, index) in searchedImages"
          alt
        />
      </div>
    </task-action-container>
  </div>
</template>

<script>
import taskActionContainer from "./task-action-container.cmp";
import FormInput from "./From Elements/form-input.cmp";
import { UnsplashService } from "../services/unsplashImage-service.js";
export default {
  name: "board-bg-select",
  data() {
    return {
      searchedImages: [],
      query: "",
    };
  },
  methods: {
    async searchForPhotos() {
      this.searchedImages = await UnsplashService.searchPhoto(this.query,10);
    },
    imageChoosen(url) {
      this.$emit("imageChoosen", url);
    },
  },
  components: {
    taskActionContainer,
    FormInput,
  },
};
</script>

<style></style>
