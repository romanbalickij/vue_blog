<template>
  <div class="home-page">
     <McvBanner/>
    <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <McvFeedToggler/>
            <McvFeed :api-url="apiUrl"></McvFeed>
          </div>
          <div class="col-md-3">
            <McvPopularTags/>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed'
import McvPopularTags from "@/components/PopularTags";
import McvBanner from "@/components/Banner";
import McvFeedToggler from "@/components/FeedToggler";
export default {
name: "McvYourFeed",
  components:{
    McvFeedToggler,
    McvBanner,
    McvPopularTags,
    McvFeed
  },
  data() {
    return {
       apiUrl:'/articles/feed',
    }
  }
}
</script>

<style scoped>

</style>