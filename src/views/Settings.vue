<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <McvValidationErrors v-if="validationErrors" :validation-errors="validationErrors"/>
          <form @submit.prevent="onSubmit">
              <fieldset>
                 <fieldset class="form-group">
                   <input
                       type="text"
                       class="form-control form-control-lg"
                       v-model="form.image"
                       placeholder="image">
                 </fieldset>
                <fieldset class="form-group">
                  <input
                      type="text"
                      class="form-control form-control-lg"
                      v-model="form.username"
                      placeholder="username">
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                      class="form-control form-control-lg"
                      v-model="form.bio"
                      placeholder="short bio about you"
                  >
                  </textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                      type="text"
                      class="form-control form-control-lg"
                      v-model="form.email"
                      placeholder="email"
                  >
                </fieldset>
                <fieldset class="form-group">
                  <input
                      type="password"
                      class="form-control form-control-lg"
                      v-model="form.password"
                      placeholder="password"
                  >
                </fieldset>
                <button
                    type="submit"
                    class="btn btn-lg btn-primary pull-xs-right"
                    :disabled="isSubmitting"
                >Update Settings</button>
              </fieldset>
          </form>
          <hr>
          <button type="text" class="btn btn-outline-danger" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {getterTypes as authGetterType, actionTypes as authActionType} from "@/store/modules/auth";
import McvValidationErrors from "@/components/ValidationErrors";

export default {
name: "McvSettings",
  components: {McvValidationErrors},
  computed:{
    ...mapState({
      isSubmitting:state => state.settings.isSubmitting,
      validationErrors:state => state.settings.validationErrors
    }),
    ...mapGetters({
      currentUser: authGetterType.currentUser
    }),
    form() {
         return {
           username:this.currentUser.username,
           bio:this.currentUser.bio,
           image:this.currentUser.image,
           email:this.currentUser.email,
           password:''
         }
    }
  },
  methods:{
    onSubmit() {
      console.log('go settings')
      this.$store.dispatch(authActionType.updateCurrentUser,{
        currentUserInput:this.form
      })
    },
    logout() {
      console.log('logout')
      this.$store.dispatch(authActionType.logout).then(() =>{
        this.$router.push({name:'home'})
      })
    }
  }
}
</script>

<style scoped>

</style>
//34