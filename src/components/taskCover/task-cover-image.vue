<template>
  <div>
    <task-action-container
      @close="$emit('close')"
      @back="changeComponent"
      :showIcon="true"
      title="Search for images"
    >
      <form-input :debounceInput="true" v-model="query" @input="searchForPhotos" />
      <h4>Images taken from Unsplash</h4>
      <div class="imgs-container">
        <img
          @click="imageChoosen(url)"
          :src="url"
          :key="index"
          v-for="(url, index) in imagesToRender"
          alt
        />
      </div>
    </task-action-container>
  </div>
</template>

<script>
import taskActionContainer from "../task-action-container.cmp";
import FormInput from "../From Elements/form-input.cmp";
import { UnsplashService } from "../../services/unsplashImage-service";
export default {
  props: {
    topImages: {
      type: Array
    },
  },
  async created() {},
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
        "small"
      );
    },
    imageChoosen(url) {
      this.$emit("imageChoosen", url);
      this.changeComponent();
    },
    changeComponent() {
      this.$emit("changeComponent", "taskCoverColor");
    },
    closeCmp() {
      this.$emit("close");
    }
  },
  computed: {
    imagesToRender() {
      return this.searchedImages.length ? this.searchedImages : this.topImages;
    }
  },
  components: {
    taskActionContainer,
    FormInput
  }
};
</script>

<style scoped lang="scss">
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
    height: 45px;
    object-fit: cover;
  }
}
</style>
