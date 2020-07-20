<template>
  <div class="task-attachment">
    <task-action-container title="Upload Files" @close="closeAttach">
      <section class="img-container">
           <img class="img-upload-preview" :src="imageUrl"/>
      </section>
      <h5 class="status"> {{uploadStatus }}</h5>
      <section class="upload-select">
        <button @click="openImageInput">Image</button>
        <button @click="openFileInput">File</button>
        <input ref="fileInput" type="file" @change.prevent="uploadFile" hidden/>
        <input
          ref="imageInput"
          type="file"
          @change.prevent="uploadImage"
          hidden
        />
      </section>
      <section class="upload-options" v-if="status">
        <input type="text" placeholder="Your File Name" v-model="fileName" />
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
      status: null,
      imageUrl:
        "https://res.cloudinary.com/dwgaobhor/image/upload/v1595256587/file-logo_ngwvr9.png",
      fileName: "New File",
      downloadLink: null,
      attachment: null,
    };
  },
  methods: {
    async uploadFile(ev) {
      this.status='Upload'
      let res = await uploadService.fileUpload(ev);
      this.downloadLink = `https://gofile.io/?c=${res.data.code}`;
      this.fileName = ev.target.files[0].name;
      this.createAttachment(ev);
    },
    async uploadImage(ev) {
      let url = await uploadService.imageUpload(ev);
      this.imageUrl = url;
      this.downloadLink = url;
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
      this.$emit("uploded", this.attachment);
    },
    openImageInput() {
      this.$refs.imageInput.click();
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
  },
  computed: {
    uploadStatus() {
      if (!this.status) return "Pick A File...";
      if(this.status==='Upload')return 'Uploading...'
      return this.status
        ? "File Uploded!"
        : "Problem Uploding..";
    },
  },
  components: {
    TaskActionContainer,
  },
};
</script>
