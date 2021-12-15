<template>
  <div>
    <h1>Page with posts</h1>
        <MyInput
            v-focus
            :model-value="searchValue"
            @update:model-value="setSearchValue"
            placeholder="Search..."
        />
    <div class="app__btns">
      <MyButton @click="showDialog">Create Post</MyButton>
            <MySelect
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
                :options="sortOptions"
            />
    </div>
    <DialogWindow v-model:show="dialogVisible">
      <PostForm @add="addPost"/>
    </DialogWindow>
    <PostList
        @remove="deletePost"
        :posts="sortedAndSearchedPosts"
        v-if="!isLoading"
    />
    <div v-else>Loading...</div>
    <div v-intersection="loadMorePosts" class="observer"/>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import {mapActions, mapMutations, mapState, mapGetters} from 'vuex'

export default {
  name: "App",
  components: {PostList, PostForm},
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchValue: 'post/setSearchValue',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      getPosts: 'post/getPosts'
    }),
    addPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    deletePost(id) {
      const index = this.posts.findIndex(item => item.id === +id)
      this.posts.splice(index, 1)
    },
    showDialog() {
      this.dialogVisible = true
    },
  },
  mounted() {
    this.getPosts()
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isLoading: state => state.post.isLoading,
      selectedSort: state => state.post.selectedSort,
      searchValue: state => state.post.searchValue,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  }
}
</script>

<style>

.app__btns {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}

.observer {
  height: 30px;
}

</style>