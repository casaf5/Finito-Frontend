<template>
    <div class="user-msg screen" :class="msgClass" v-show="message">
        <h3>{{message}}</h3>
    </div>
</template>

<script>
import {eventBus,SHOW_MSG} from '../services/event-bus-service.js'
export default {
  template: `
 
    `,
    data() {
        return {
            message: '',
            timeoutMsg:null,
            msgClass:'',
        }
    },
  
    created() {
        eventBus.$on(SHOW_MSG, msg => {
            this.message = msg
            // this.msgClass=msgClass
            this.timeoutMsg=setTimeout(()=>{
                this.message=''
            },2000)
        })
    },
    destroyed(){
        clearTimeout(this.timeoutMsg)
    }

};
</script>

