<template>
  <div class="article-page">
      <div class="banner">
        <div class="container" v-if="article">
           <h1>{{article.title}}</h1>
          <div class="article-meta">
            <router-link :to="{name:'userProfile', params:{slug:article.author.username}}">
              <img :src="article.author.image"/>
            </router-link>
            <div class="info">
              <router-link :to="{name:'userProfile', params:{slug:article.author.username}}">
                  {{article.author.username}}
              </router-link>
              <span class="date">{{article.createdAt}}</span>
            </div>
            <span >
               <router-link
                   class="btn btn-outline-secondary btn-sm"
                   :to="{name:'editArticle', params:{slug:article.slug}}">
                  <i class="ion-edit"></i>
                  Edit Article
               </router-link>
              <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
                <i class="ion-trash-a"></i>
                 Delete Article
              </button>
            </span>
          </div>
        </div>
      </div>
      <div class="container page">
        <McvLoading v-if="isLoading"/>
        <McvErrorMessage v-if="error"></McvErrorMessage>
        <div class="row article-content" v-if="article">
          <div class="col-xs-12">
            <div>
              <p>{{article.body}}</p>
            </div>
            <McvTagLIst :tags="article.tagList"></McvTagLIst>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {actionTypes as articleActionType} from "@/store/modules/article";
import {getterTypes as authGetterType} from "@/store/modules/auth";
import {mapState, mapGetters} from 'vuex';
import McvLoading from "@/components/Loading";
import McvErrorMessage from "@/components/ErrorMessage";
import McvTagLIst from "@/components/TagLIst";


export default {
  name: "McvArticle",
  components: {McvTagLIst, McvErrorMessage, McvLoading},
  mounted() {
    this.$store.dispatch(articleActionType.getArticle,{
      slug:this.$route.params.slug
    })
  },
  computed: {
    ...mapState({
        isLoading:state => state.article.isLoading,
        error:state => state.article.error,
        article:state => state.article.data,

    }),
    ...mapGetters({
       currentUser: authGetterType.currentUser
    }),
    isAuthor() {
       if(!this.currentUser || !this.article) {
          return false
       }

       return this.currentUser.username === this.article.username
    }
  },

  methods:{
    deleteArticle() {
      this.$store.dispatch(articleActionType.deleteArticle, {
        slug:this.$route.params.slug
      }).then(() =>{
        this.$route.push({name:'home'})
      })
    }
  }
}
</script>

<style scoped>

</style>
//29 next