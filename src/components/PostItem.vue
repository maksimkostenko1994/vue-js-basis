<template>
  <div class="post">
    <div>{{ post.id }}</div>
    <div><strong>Title: </strong>{{ post.title }}</div>
    <div><strong>Description: </strong>{{ post.body }}</div>
    <MyButton @click="$emit('remove', post.id)" class="remove-post">Remove</MyButton>
    <MyButton @click="$router.push(`/posts/${post.id}`)" style="margin-left: 20px; font-size: 20px">View info...</MyButton>
  </div>

</template>

<script>
export default {
  name: "PostItem",
  components: {},

  props: {
    post: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
}

.remove-post {
  color: red;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.remove-post:hover {
  transform: scale(1.2);
}
</style>