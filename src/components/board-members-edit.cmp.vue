<template>
  <section class="board-members-edit">
      <task-action-container title="Add Members">
            <form-input
            type="text"
            placeholder="Search Members"    
            :debounceInput="true"
            @input="searchUsers"        
            />
            <section class="members-container">
                <section v-for="user in filteredUsers" :key="user.userName">
                    {{user.userName}}

                </section>
            </section>
      </task-action-container>

  </section>
</template>

<script>
import taskActionContainer from "./task-action-container.cmp";
import formInput from '../components/From Elements/form-input.cmp' 
export default {
    name:"board-members-edit",
    components:{
        taskActionContainer,
        formInput
    },
    data(){
        return{
            filteredUsers:null,
        }
    },
    computed:{
        users(){
            this.$store.getters.users
        }
    },
    methods:{
        setSearchValue(text){
            this.searchText=text
        },
        searchUsers(text){
            console.log('users',users)
            return users.map(user=>{
                user.userName.toLowerCase().includes(text.toLowerCase())
                })
        },
    }
}
</script>

<style>

</style>