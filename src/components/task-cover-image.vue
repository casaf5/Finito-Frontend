<template>
  <div>
    <task-action-container @back="changeComponent" @close="closeCmp" title="Search for images">
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
import taskActionContainer from "./task-action-container.cmp";
import FormInput from "./From Elements/form-input.cmp";
export default {
  props: {
    topImages: {
      type: Array
    }
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
      const imageUrlPromise = await fetch(
        `https://api.unsplash.com/search/photos/?client_id=mL5OYkRmJrdpSTr4xqCqaswySn95yN_m38YtI8rw1Uk&query=${this.query}&orientation=landscape&fit=crop&max-w=2000&max-h=4000`
      );
      const imageData = await imageUrlPromise.json();
      this.searchedImages = imageData.results.map(image => image.urls.full);
    },
    imageChoosen(url) {
      this.$emit("imageChoosen", url);
      this.changeComponent();
    },
    changeComponent() {
      this.$emit("changeComponent", "taskCoverColor");
    },
    closeCmp(){
      this.$emit('close')
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
  img {
    cursor: pointer;
    margin: 5px 5px;
    border-radius: 5px;
    width: 85px;
    height: 45px;
    object-fit: cover;
  }
}
.colors-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  .color {
    margin: 5px 10px;
    width: 55px;
    height: 35px;
  }
}
</style>
