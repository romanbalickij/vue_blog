<template>
  <div>
    <McvArticleForm
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
import {actionTypes} from "@/store/modules/createArticle";


export default {
name: "McvCreateArticle",
  components: {McvArticleForm},

    data() {
        return {
          initialValues:{
            title:'',
            description:'',
            body:'',
            tagList:[]
          },
        }
    },
  methods:{
    onSubmit(articleInput) {

        console.log(articleInput, 'create article')

        this.$store.dispatch(actionTypes.createArticle, {articleInput})
            .then(article =>{
               this.$router.push({name:'article', params:{slug: article.slug}})
            })
    }
  },
  computed:{
    ...mapState({
        isSubmitting:state => state.createArticle.isSubmitting,
        validationErrors:state => state.createArticle.validationErrors
    })
  }
}
</script>

<style scoped>

</style>