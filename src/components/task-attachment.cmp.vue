<template>
  <div class="task-attachment">
    <task-action-container title="Upload Files" @close="closeAttach">
      <section class="img-container">
        <img class="img-upload-preview" :src="imageUrl" />
      </section>
      <h5 class="status">{{ uploadStatus }}</h5>
      <h6 v-if="status === 'Upload'">Please Wait</h6>
      <section class="upload-select" v-if="!status">
        <button class="btn-primary full-width" @click="openInput('imageInput')">
          Image
        </button>
        <button class="btn-primary full-width" @click="openInput('fileInput')">
          File
        </button>
        <input
          ref="fileInput"
          type="file"
          @change.prevent="uploadFile($event, 'file')"
          hidden
        />
        <input
          ref="imageInput"
          type="file"
          @change.prevent="uploadFile($event, 'image')"
          hidden
        />
      </section>
      <section class="upload-options" v-if="status === true">
        <button @click="addFile" class="btn-primary full-width">
          Add to Task
        </button>
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
      status: null,
      imageUrl:
        "https://res.cloudinary.com/dwgaobhor/image/upload/v1595762512/yqfkginczj15h9dxcw3a.png",
      fileName: "",
      downloadLink: null,
      attachment: null,
    };
  },
  methods: {
    async uploadFile(ev, type) {
      this.status = "Upload";
      let res = await uploadService.upload(ev, type);
      this.downloadLink = type === "file" ? `https://gofile.io/?c=${res}` : res;
      if (type === "image") this.imageUrl = res;
      this.fileName = ev.target.files[0].name;
      this.createAttachment();
    },
    createAttachment() {
      this.attachment = {
        name: this.fileName,
        imageUrl: this.imageUrl,
        createdAt: Date.now(),
        downloadLink: this.downloadLink,
      };
      this.status = true;
    },
    closeAttach() {
      this.$emit("closeAttach");
    },
    addFile() {
      this.$emit("closeAttach");
      this.$emit("uploded", this.attachment);
    },
    openInput(type) {
      this.$refs[type].click();
    },
  },
  computed: {
    uploadStatus() {
      if (!this.status) return "Pick A File...";
      if (this.status === "Upload") return "Uploading...";
      return this.status ? "File Uploded!" : "Problem Uploding..";
    },
  },
  components: {
    TaskActionContainer,
  },
};
</script>
