<template>
  <div>
    <h1>Page with posts</h1>
    <MyInput
        v-focus
        v-model="searchValue"
        placeholder="Search..."
    />
    <div class="app__btns">
      <MyButton @click="showDialog">Create Post</MyButton>
      <MySelect
          v-model="selectedSort"
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
    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--          v-for="pageNumber in totalPages"-->
    <!--          :key="pageNumber"-->
    <!--          class="page"-->
    <!--          :class="{-->
    <!--            'current-page': page === pageNumber-->
    <!--          }"-->
    <!--          @click=""-->
    <!--      >-->
    <!--        {{ pageNumber }}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios"

export default {
  name: "App",
  components: {PostList, PostForm},
  data: () => {
    return {
      posts: [],
      dialogVisible: false,
      isLoading: false,
      selectedSort: '',
      searchValue: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: 'By name'},
        {value: 'body', name: 'By context'},
      ]
    }
  },
  methods: {
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
    async getPosts() {
      try {
        this.isLoading = true
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.posts = response.data
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
      } catch (e) {
        alert(e)
      } finally {
        this.isLoading = false
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.posts = [...this.posts, ...response.data]
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
      } catch (e) {
        alert(e)
      }
    }
  },
  mounted() {
    this.getPosts()
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchValue.toLowerCase()))
    }
  },
  watch: {}
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