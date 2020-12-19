<template>
  <div>
     <McvLoading v-if="isLoading"/>
     <McvErrorMessage v-if="error"></McvErrorMessage>
     <div v-if="feed">
        <div class="articles-preview" v-for="(article, index) in feed.articles" :key="index">
          <div class="article-meta">
              <router-link 
                  :to="{ name:'userProfile', params:{slug:article.author.username}}">
                  <img :src="article.author.image"/>
              </router-link>
            <div class="info">
              <router-link

                  :to="{ name:'userProfile', params:{slug:article.author.username}}">
                {{article.author.username}}
              </router-link>
              <span class="date">{{article.createdAt}}</span>
            </div>
            <div class="pull-xs-right">
              <McvAddToFavorites
                  :is-favorited="article.favorited"
                  :article-slug="article.slug"
                  :favorites-count="article.favoritesCount"
              >
              </McvAddToFavorites>
            </div>
          </div>
          <router-link :to="{name:'article', params:{slug:article.slug}}" class="preview-link">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
            <McvTagLIst :tags="article.tagList"/>
          </router-link>
        </div>
         <mcv-pagination
             :total="feed.articlesCount"
             :limit="limit"
             :current-page="currentPage"
             :url="baseUrl"
         ></mcv-pagination>
     </div>
  </div>
</template>

<script>
import {actionTypes} from "@/store/modules/feed";
import {mapState} from 'vuex';
import McvPagination from '@/components/Pagination';
import {limit} from "@/helpers/vars";
import {stringify, parseUrl} from 'query-string';
import McvLoading from "@/components/Loading";
import McvErrorMessage from "@/components/ErrorMessage";
import McvTagLIst from "@/components/TagLIst";
import McvAddToFavorites from "@/components/AddToFavorites";

export default {
name: "McvFeed",

  components:{
    McvAddToFavorites,
    McvTagLIst,
    McvErrorMessage,
    McvLoading,
    McvPagination
  },

  props:{
    apiUrl:{
       type:String,
       required:true
    }
  },

  data() {
    return {
      total:500,
      limit,
      url:'/articles'
    }
  },

  mounted() {
   this.fetchFeed()
  },

  watch:{
    currentPage() {
        this.fetchFeed()
    }
  },
  methods:{
      fetchFeed() {
        const parsedUrl = parseUrl(this.apiUrl)
        const stringifieldParams = stringify({
          limit,
          offset:this.offset,
          ...parsedUrl.query
        })

        const apiUrlWitchParams = `${parsedUrl.url}?${stringifieldParams}`
        console.log(apiUrlWitchParams)
        this.$store.dispatch(actionTypes.getFeed, {

          apiUrl:apiUrlWitchParams
        })
      }
  },

  computed:{
    ...mapState({
        isLoading: state => state.feed.isLoading,
        feed: state => state.feed.data,
        error: state => state.feed.error
    }),
    currentPage() {
      return Number(this.$route.query.page || '1')
    },

    baseUrl() {
      return this.$route.path
    },
    offset() {
        return this.currentPage * limit - limit
    }
  }
}
</script>

<style scoped>

</style>
//23