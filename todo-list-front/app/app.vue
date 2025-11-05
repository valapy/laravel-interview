<script setup>
import { onMounted } from 'vue'
import { useTodoStore } from '../stores/todoStore' // <-- 1. Importa tu store
import { storeToRefs } from 'pinia' // <-- 2. Importa storeToRefs

const store = useTodoStore() // <-- 3. Llama al store

// 4. Usa storeToRefs para extraer propiedades reactivas
// Esto reemplaza a todos tus 'computed' que solo leían el estado
const { filteredTodos, activeCount, completedCount, loading, filter } = storeToRefs(store)

// 5. Las actions ahora se llaman directamente
const handleAddTodo = async (content) => {
  if (!content.trim()) return // Evita añadir todos vacíos
  await store.addTodo(content) // Sin 'dispatch'
}

const handleToggle = async (todo) => {
  await store.updateTodo({ // Sin 'dispatch'
    id: todo.id,
    status: !todo.status
  })
}

const handleDelete = async (id) => {
  await store.deleteTodo(id) // Sin 'dispatch'
}

const clearCompleted = async () => {
  // Es más simple solo leer el 'store.todos'
  const completed = store.todos.filter(t => t.status)
  // Usamos Promise.all para ejecutar todas las eliminaciones en paralelo
  await Promise.all(completed.map(todo => store.deleteTodo(todo.id)))
}

// Initialize
onMounted(async () => {
  await store.fetchTodos() // Sin 'dispatch'
})
</script>

<template>
  <div class="min-h-screen transition-colors duration-300 bg-light-bg dark:bg-dark-bg">
    <div class="max-w-2xl mx-auto px-6 py-12 md:py-20">
      <!-- Header with Theme Toggle -->
      <div class="flex items-center justify-between mb-10">
        <h1 class="text-white text-3xl md:text-4xl font-bold tracking-[0.3em] md:tracking-[0.5em]">
          TODO
        </h1>
        <ToogleMode />
      </div>

      <!-- Todo Input -->
      <!-- Nuxt auto-importará 'TodoInput.vue' -->
      <TodoInput @add-todo="handleAddTodo" />

      <!-- Todo List -->
      <div class="mt-4 rounded-lg shadow-2xl overflow-hidden
                  bg-light-card dark:bg-dark-card">

        <!-- Loading State -->
        <div v-if="loading" class="p-8 text-center
                    text-light-text-muted dark:text-dark-text-muted">
          Loading todos...
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredTodos.length === 0" class="p-8 text-center
                    text-light-text-muted dark:text-dark-text-muted">
          {{ filter === 'completed' ? 'No completed todos' : filter === 'active' ? 'No active todos' : 'No todos yet. Add one above!' }}
        </div>

        <!-- Todo Items -->
        <div v-else>
          <!-- Nuxt auto-importará 'TodoItem.vue' -->
          <TodoItem
            v-for="todo in filteredTodos"
            :key="todo.id"
            :todo="todo"
            @toggle="handleToggle(todo)"
            @delete="handleDelete(todo.id)"
          />
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between p-4 text-sm
                    text-light-text-muted dark:text-dark-text-muted">
          <span>{{ activeCount }} {{ activeCount === 1 ? 'item' : 'items' }} left</span>

          <!-- Desktop Filter -->
          <div class="hidden md:block">
            <!-- Nuxt auto-importará 'TodoFilter.vue' -->
            <TodoFilter />
          </div>

          <button
            v-if="completedCount > 0"
            @click="clearCompleted"
            class="transition-opacity hover:opacity-70 
                   hover:text-light-text dark:hover:text-dark-text-hover"
          >
            Clear Completed
          </button>
        </div>
      </div>

      <!-- Mobile Filter -->
      <div class="md:hidden mt-4 rounded-lg shadow-2xl p-4 flex justify-center
                  bg-light-card dark:bg-dark-card">
        <TodoFilter />
      </div>

      <!-- Footer Note -->
      <p class="text-center mt-12 text-sm
                text-light-text-muted dark:text-dark-text-muted">
        Drag and drop to reorder list
      </p>
    </div>
  </div>
</template>

<style>
body {
  font-size: 18px;
}

.checkbox-gradient {
  background: linear-gradient(135deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
}
</style>
