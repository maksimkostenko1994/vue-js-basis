<template>
  <form @submit.prevent>
    <h4>Creation post: </h4>
    <MyInput
        v-focus
        v-model="post.title"
        placeholder="Name"/>
    <MyInput
        v-model="post.body"
        placeholder="Description"/>
    <MyInput
        v-model="post.user"
        placeholder="User"/>
    <MyButton @click="addPost">Add post</MyButton>
  </form>
</template>

<script>
export default {
  name: "PostForm",
  data() {
    return {
      post: {
        title: '',
        body: '',
        user: ''
      }
    }
  },
  methods: {
    addPost() {
      this.post.id = Date.now()
      this.$emit('add', this.post)
      this.post = {
        title: '',
        body: '',
        user: ''
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>