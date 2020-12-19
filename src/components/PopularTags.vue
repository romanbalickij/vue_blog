<template>
  <div>
    <McvLoading v-if="isLoading"/>
    <McvErrorMessage v-if="error"></McvErrorMessage>
    <div class="sidebar" v-if="popularTags">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link v-for="tag in popularTags"
                     :key="tag"
                     :to="{name:'tag', params:{slug:tag}}"
                     class="tag-default tag-pill"
        >
        {{tag}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {actionTypes} from "@/store/modules/popularTgs";
import McvLoading from "@/components/Loading";
import McvErrorMessage from "@/components/ErrorMessage";

export default {
  name: "McvPopularTags",
  components: {McvErrorMessage, McvLoading},
  computed: {
    ...mapState({
      isLoading: state => state.popularTags.isLoading,
      popularTags: state => state.popularTags.data,
      error: state => state.popularTags.error
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags)
  }

}
</script>

<style scoped>

</style>