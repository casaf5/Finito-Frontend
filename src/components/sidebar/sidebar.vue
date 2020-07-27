<template>
  <div>
    <h1>adsad</h1>
    <component @changeComp="changeComp" :is="component" />
  </div>
</template>

<script>
import sidebarOptions from "./sidebar-options";
import sidebarBackgroundMenu from "./sidebar-background-menu";
import sidebarImg from "./sidebar-img";
import sidebarColor from "./sidebar-color";
export default {
  data() {
    return {
      component: "sidebar-options",
    };
  },
  components: {
    sidebarOptions,
    sidebarBackgroundMenu,
    sidebarImg,
    sidebarColor,
  },
  methods: {
    changeComp(compToRender) {
      this.component = compToRender;
    },
  },
};
</script>

<style></style>
