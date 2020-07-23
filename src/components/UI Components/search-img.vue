<template>
  <div>
    <h4>Images taken from Unsplash</h4>
    <form-input
      :showLabel="true"
      labelText="search for image"
      :debounceInput="true"
      v-model="query"
      @input="searchForPhotos"
    />
    <div class="imgs-container">
      <img
        @click="imageChoosen(url)"
        :src="url"
        :key="index"
        v-for="(url, index) in imagesToRender"
        alt
      />
    </div>
  </div>
</template>

<script>
import formInput from "../From Elements/form-input.cmp";
import { UnsplashService } from "../../services/unsplashImage-service";
export default {
  props: {
    topImages: {
      type: Array
    },
    imageSize: {
      type: String,
      default: "small"
    }
  },
  data() {
    return {
      searchedImages: [],
      query: ""
    };
  },
  methods: {
    async searchForPhotos() {
      this.searchedImages = await UnsplashService.searchPhoto(
        this.query,
        this.imageSize,
        "9"
      );
    },
    imageChoosen(url) {
      this.$emit("imageChoosen", url);
    }
  },
  components: {
    formInput
  },
  computed: {
    imagesToRender() {
      return this.searchedImages.length ? this.searchedImages : this.topImages;
    }
  }
};
</script>

<style lang="scss" scoped>
.imgs-container {
  display: flex;
  flex-wrap: wrap;
  h4 {
    font-size: 16px;
  }
  img {
    cursor: pointer;
    margin: 5px 5px;
    border-radius: 5px;
    width: 80px;
    height: 50px;
    object-fit: cover;
  }
}
</style>