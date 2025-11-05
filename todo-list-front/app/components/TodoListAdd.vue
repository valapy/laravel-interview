<script setup>
import { ref } from 'vue'

const content = ref('')
const emit = defineEmits(['add-todo'])

const handleSubmit = () => {
  emit('add-todo', content.value)
  content.value = '' // Reset input field after submission.
}
</script>

<template>
  <form @submit.prevent="handleSubmit"
    class="flex items-center p-4 rounded-lg bg-light-card dark:bg-dark-card transition-colors duration-300">
    <div
      class="w-6 h-6 rounded-full border border-light-text-muted dark:border-dark-text-muted mr-4">
    </div>

    <!-- Input for adding new task -->
    <input type="text" v-model="content"
      class="w-full bg-transparent text-light-text dark:text-dark-text placeholder-light-text-muted dark:placeholder-dark-text-muted focus:outline-none"
      placeholder="Create a new todo..." />
  </form>
</template>
