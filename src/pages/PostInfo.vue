<template>
  <div :post="post" class="post">
    <h1 class="post__title">Title:<br> <span>{{ post.title }}</span></h1>
    <p class="post__body">Description: <br><span>{{ post.body }}</span></p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostInfo",
  data() {
    return {
      postId: +this.$route.params.id,
      post: {}
    }
  },
  methods: {
    async getPost() {
      try {
        const {data} = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.postId}`)
        this.post = data
      } catch (e) {
        alert(e.response.data.message)
      }
    }
  },
  mounted() {
    this.getPost()
  }
}
</script>

<style scoped>
.post {
  border: 2px solid teal;
  border-top: none;
  padding: 20px 15px;
  margin-top: -20px;
}

span:first-letter {
  text-transform: uppercase;
}

.post__body {
  margin-top: 20px;
}
</style>