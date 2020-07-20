<template>
  <div class="task-attachment">
    <task-action-container title="Upload Files" @close="closeAttach">
      <!-- <button >Image</button>
      <button>File</button> -->
      <img
        style="width:200px;height:200px;margin:0 auto;"
        class="img-upload-preview"
        :src="attachment.imageUrl"
      />
      <section class="upload-select">
        <input type="file" @change.prevent="uploadFile" />
        <input type="file" @change.prevent="uploadImage" />
      </section>
      <h5>{{ uploadStatus }}</h5>
      <section class="upload-options" v-if="sucsses">
        <input type="text" placeholder="Your File Name" />
        <button @click="addFile">Add to Task</button>
      </section>
    </task-action-container>
  </div>
</template>

<script>
import { uploadService } from "../services/upload-service.js";
import TaskActionContainer from "./task-action-container.cmp";

export default {
  name: "task-attachment",
  data() {
    return {
      sucsses: null,
      attachment: {
        imageUrl:
          "https://res.cloudinary.com/dwgaobhor/image/upload/v1595256587/file-logo_ngwvr9.png",
        fileName: "New File",
        createdAt: null,
        downloadLink: null,
      },
    };
  },
  methods: {
    uploadFile(ev) {
      uploadService.fileUpload(ev).then((dLink) => {
        this.downloadLink = `https://gofile.io/?c=${dLink.data.code}`;
        this.createdAt = new Date().toLocaleDateString();
        this.sucsses=true
      });
    },
    async uploadImage(ev) {
      let url = await uploadService.imageUpload(ev);
      this.imageUrl = url;
      this.createdAt = new Date().toLocaleDateString();
      this.downloadLink = url;
      this.sucsses=true
    },
    closeAttach() {
      this.$emit("closeAttach");
    },
    addFile() {
      this.$emit("uploded", this.attachment);
    },
  },
  computed: {
    uploadStatus() {
      if (!this.sucsses) return "Pick A File...";
      return this.sucsses
        ? "File Uploded!"
        : "Problem Uploding, Please try again later...";
    },
  },
  components: {
    TaskActionContainer,
  },
};
</script>
