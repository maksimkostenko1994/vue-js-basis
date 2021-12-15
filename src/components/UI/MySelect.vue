<template>
  <select v-model="modelValue" @change="changeOptions">
    <option disabled value="">Choose from list</option>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "MySelect",
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOptions({target: {value}}) {
      this.$emit("update:modelValue", value)
    }
  }
}
</script>

<style scoped>

</style>