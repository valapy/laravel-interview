<template>
  <div class="rounded-lg shadow-2xl p-5"
       :class="isDark ? 'bg-dark-card' : 'bg-light-card'">
    <div class="flex items-center gap-4">
      <div class="w-6 h-6 rounded-full border-2"
           :class="isDark ? 'border-dark-border' : 'border-light-border'">
      </div>
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        type="text"
        placeholder="Create a new todo..."
        class="flex-1 bg-transparent outline-none text-base md:text-lg"
        :class="isDark 
          ? 'text-dark-text placeholder-dark-text-muted' 
          : 'text-light-text placeholder-light-text-muted'"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-todo'])
const { isDark } = useTheme()
const newTodo = ref('')

const addTodo = () => {
  if (newTodo.value.trim()) {
    emit('add-todo', newTodo.value.trim())
    newTodo.value = ''
  }
}
</script>
