<template>
  <div>
    <h1>Page with posts</h1>
    <MyInput
        v-focus
        v-model="searchValue"
        placeholder="Search..."
    />
    <div class="app__btns">
      <MyButton>Create Post</MyButton>
      <MySelect
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <DialogWindow v-model:show="dialogVisible">
      <PostForm/>
    </DialogWindow>
    <PostList
        :posts="sortedAndSearchedPosts"
        v-if="!isLoading"
    />
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import {usePosts} from "@/hooks/usePosts";
import useSortedPost from "@/hooks/useSortedPost";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

export default {
  name: "App",
  components: {PostList, PostForm},
  data: () => {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'By name'},
        {value: 'body', name: 'By context'},
      ]
    }
  },
  setup(props) {
    console.log(props)
    const {posts, isLoading, totalPages} = usePosts(10)

    const {sortedPosts, selectedSort} = useSortedPost(posts)
    const {searchValue, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)

    return {
      posts, isLoading, totalPages, sortedPosts, selectedSort, searchValue, sortedAndSearchedPosts
    }
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