<template>
  <div class="profile-page" v-if="userProfile">
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
                <img class="user-img" :src="userProfile.image"/>
              <h4>{{userProfile.username}}</h4>
              <p>{{userProfile.bio}}</p>
              <div>
                Follow user Button
                <router-link  v-if="isCurrentUserProfile" :to="{name:'settings'}" class="btn btn=sm btn-outline-secondary action-btn">
                  Edit profile Setting
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
                <div class="article-toggle">
                  <ul class="nav-nav-pills outline-active">
                    <li class="nav-item">
                      <router-link :to="{name:'userProfile', params:{slug:userProfile.username}}" class="nav-link">
                        My post
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link :to="{name:'userProfileFavorites', params:{slug:userProfile.username}}" class="nav-link">
                        Favorites Posts
                      </router-link>
                    </li>
                  </ul>
                </div>
              <McvFeed :api-url="apiUrl"></McvFeed>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import McvFeed from "@/components/Feed";
import {actionTypes as userProfileActionTypes} from "@/store/modules/userProfile";
import { getterTypes as authGetterTypes} from '@/store/modules/auth'
export default {
name: "McvUserProfile",
  components: {McvFeed},
  computed:{
    ...mapState({
        isLoading:state => state.userProfile.isLoading,
        error:state => state.userProfile.error,
        userProfile:state => state.userProfile.data,
    }),

    ...mapGetters({
        currentUser:authGetterTypes.currentUser
    }),

    isCurrentUserProfile() {

      if(!this.currentUser || !this.userProfile) {
          return false
      }
      return this.currentUser.username === this.userProfile.username
    },
    apiUrl() {

        const isFavorites = this.$route.path.includes('favorites')
        return isFavorites
            ? `/articles?favorited=${this.userProfileSlug}`
            : `/articles?author=${this.userProfileSlug}`
    },
    userProfileSlug(){
      return this.$route.params.slug
    }
   },


  mounted() {
      this.$store.dispatch(userProfileActionTypes.getUserProfile, {slug:this.userProfileSlug})
  }
}
</script>

<style scoped>

</style>