<template>
  <div>
    <component
      :isCoverSet="isCoverSet"
      @changeComponent="toggleComp"
      @setImage="setImage"
      :topImages="imagesUrl"
      :is="component"
      @imageChoosen="addImage"
      @colorClicked="colorClicked"
      @removeCover="removeCover"
      @close="$emit('close')"
    ></component>
  </div>
</template>

<script>
import taskCoverColor from "./task-cover-color.cmp";
import taskCoverImg from "./task-cover-image";
export default {
  props: {
    isCoverSet: {
      type: Boolean
    },
    imageSize: {
      type: String,
      default: "small"
    }
  },
  async created() {
    await this.getImages(
      `https://api.unsplash.com/photos/random/?client_id=mL5OYkRmJrdpSTr4xqCqaswySn95yN_m38YtI8rw1Uk&count=8&orientation=landscape`,
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
      this.imagesUrl = imageData.map(image => image.urls[this.imageSize]);
    },
    toggleComp(compoentToRender) {
      this.component = compoentToRender;
    },
    addImage(url) {
      this.imagesUrl.unshift(url);
    },
    colorClicked(color, index) {
      this.$emit("setCover", { payload: color.color, type: "color" });
    },
    setImage(url) {
      this.$emit("setCover", { payload: url, type: "image" });
    },
    removeCover() {
      this.$emit("removeCover");
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
