<template>
  <section class="attachment-preview" @click="downloadFile">
      <img :src="file.imageUrl" class="file-img">
      <h6 class="file-name">Name :{{file.name}}</h6>
      <h6 class="file-created">Added : {{getRelativeTime}}</h6>
      <section class="file-actions">
            <button>Remove</button>
            <button>Comment</button>
            <button>Edit</button>
      </section>
  </section>
</template>

<script>
import moment from 'moment';
export default {
    name:"attachmen-preview",
    props:['file'],
    computed:{
        getRelativeTime(){
            return moment(this.file.createdAt).fromNow()
           
        }
    },
    methods:{
        downloadFile(){
            window.open(`${this.file.downloadLink}`)
        }
    }
}
</script>

<style>

</style>