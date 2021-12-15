<template>
  <div class="navbar">
    <div style="cursor: pointer" @click="$router.push('/')"><h2 style="color: snow">Vue 3</h2></div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')" style="color: white">Posts</my-button>
      <my-button @click="$router.push('/about')" style="color: white; margin-left: 20px;">About</my-button>
      <my-button @click="$router.push('/store')" style="color: white; margin-left: 20px;">Store</my-button>
      <my-button @click="$router.push('/composition')" style="color: white; margin-left: 20px;">Composition</my-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",

}
</script>

<style scoped>
.navbar {
  height: 50px;
  background: teal;
  box-shadow: 0 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: auto;
}
</style>