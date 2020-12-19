<template>
  <div>
    <McvLoading v-if="isLoading"/>
    <McvArticleForm
        v-if="initialValues"
        :initial-value="initialValues"
        :errors="validationErrors"
        :is-submitting="isSubmitting"
        @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import McvArticleForm from "@/components/ArticleForm";
import {mapState} from 'vuex';
import {actionTypes} from "@/store/modules/editArticle";
import McvLoading from '@/components/Loading'

export default {
name: "McvEditArticle",
  components: {McvArticleForm, McvLoading},


  methods:{
    onSubmit(articleInput) {

        const slug = this.$route.params.slug

        this.$store.dispatch(actionTypes.updateArticle, {slug,articleInput})
            .then(article =>{
               this.$router.push({name:'article', params:{slug: article.slug}})
            })
    }
  },

  mounted() {
     this.$store.dispatch(actionTypes.getArticle, {
       slug:this.$route.params.slug
     })
  },
  computed:{
    ...mapState({
        isSubmitting:state => state.editArticle.isSubmitting,
        validationErrors:state => state.editArticle.validationErrors,
        isLoading:state => state.editArticle.isLoading,
        article:state => state.editArticle.article,
    }),
      initialValues() {
          if(!this.article) {
              return null

          }
        return {
            title:this.article.title,
            description:this.article.description,
            body:this.article.body,
            tagList:this.article.tagList
        }
      }
  }
}
</script>

<style scoped>

</style>