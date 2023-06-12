<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <!-- <p> -->
      count is {{ count }}
    <!-- </p> -->
    <button type="button" @click="count++"> + </button>
    <button type="button" @click="count--"> - </button>
    <button type="button" @click="count=0"> reset </button>
  </div>

</template>

<style scoped>
</style>
