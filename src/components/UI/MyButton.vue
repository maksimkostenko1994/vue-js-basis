<template>
  <button class="btn"><slot/></button>
</template>

<script>
export default {
  name: "MyButton"
}
</script>

<style scoped>
.btn {
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.5s ease;
}

.btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>