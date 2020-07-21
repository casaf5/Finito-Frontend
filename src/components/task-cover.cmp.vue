<template>
  <div>
    <component
      @changeComponent="toggleComp"
      @setImage="setImage"
      :topImages="imagesUrl"
      :is="component"
      @imageChoosen="addImage"
      @colorClicked="colorClicked"
    ></component>
  </div>
</template>

<script>
import taskCoverColor from "./task-cover-color.cmp";
import taskCoverImg from "./task-cover-image";
export default {
  async created() {
    await this.getImages(
      `https://api.unsplash.com/photos/random/?client_id=${process.env.VUE_APP_UNSPLASHAPIKEY}&count=8&orientation=landscape`,
      "random"
    );
  },
  data() {
    return {
      component: "taskCoverColor",
      imagesUrl: []
    };
  },
  methods: {
    async getImages(url, type = "random") {
      const imageUrlPromise = await fetch(url);
      const imageData = await imageUrlPromise.json();
      this.imagesUrl = imageData.map(image => image.urls.thumb);
    },
    toggleComp(compoentToRender) {
      this.component = compoentToRender;
    },
    addImage(url) {
      this.imagesUrl.unshift(url);
    },
    colorClicked(color, index) {
      console.log(color);
      console.log(index);
    },
    setImage(url) {
      console.log("set Image", url);
    }
  },
  computed: {},
  components: {
    taskCoverColor,
    taskCoverImg
  }
};
</script>

<style scoped lang="scss">
</style>
