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
        @click="imageChoosen(url,index)"
        :src="url[imageDisplaySize]"
        :key="index"
        v-for="(url, index) in imagesToDisplay"
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
    imageDisplaySize: {
      type: String,
      default: "thumb"
    },
    saveSettings: {
      type: Object,
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
      this.searchedImages = await UnsplashService.searchPhoto(this.query, "9");
    },
    imageChoosen(url, index) {
      const { previewSize, saveSize } = this.saveSettings;
      let img = {
        thumbnail: url["thumb"]
      };
      if (previewSize) {
        img.previewUrl = url[previewSize];
      }
      if (saveSize) {
        img.saveSize = url[saveSize];
      }
      this.$emit("imageChoosen", img);
    }
  },
  components: {
    formInput
  },
  computed: {
    imagesToDisplay() {
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
    width: 78px;
    height: 50px;
    object-fit: cover;
  }
}
</style>