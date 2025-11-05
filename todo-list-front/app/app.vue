<script setup>
  import { onMounted } from 'vue'
  import { useTodoStore } from '../stores/todoStore'
  import { storeToRefs } from 'pinia'

  const store = useTodoStore()

  const { filteredTodos, activeCount, completedCount, loading, filter } = storeToRefs(store)

  onMounted(async () => {
    await store.fetchTodos()
  })

  const handleAddTask = async (content) => {
    if (!content.trim()) return
    await store.addTodo(content)
  }

  const handleDeleteTask = async (id) => {
    await store.deleteTodo(id)
  }

  const handleToggle = async (todo) => {
    await store.updateTodo({
      id: todo.id,
      status: !todo.status
    })
  }

  const clearCompleted = async () => {
    const completed = store.todos.filter(t => t.status)
    await Promise.all(completed.map(todo => store.deleteTodo(todo.id)))
  }
</script>

<template>
  <div class="min-h-screen z-10 transition-colors bg-light-bg dark:bg-dark-bg">
    <img src="/images/bg-desktop-light.jpg" alt="Background Light"
      class="hidden md:block absolute top-0 left-0 w-full h-64 object-cover pointer-events-none select-none z-0"
      v-if="$colorMode.value === 'light'" />
    
    <img src="/images/bg-desktop-dark.jpg" alt="Background Dark"
      class="hidden md:block absolute top-0 left-0 w-full h-64 object-cover pointer-events-none select-none z-0"
      v-else />

    <div class="max-w-2xl mx-auto px-6 relative py-12 md:py-20 z-10">

      <!-- Header with Theme Toggle -->
      <div class="flex items-center justify-between mb-10">
        <h1 class="text-white text-3xl md:text-4xl font-bold tracking-[0.3em] md:tracking-[0.5em]">
          TODO
        </h1>

        <ToogleMode />
      </div>

      <!-- Todo Input -->
      <TodoListAdd @add-todo="handleAddTask" />

      <!-- Todo List -->
      <div class="mt-4 rounded-lg shadow-2xl bg-light-card dark:bg-dark-card overflow-hidden">

        <!-- Loading State -->
        <div v-if="loading" class="p-8 text-center text-light-text-muted dark:text-dark-text-muted">
          Loading todos...
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredTodos.length === 0" class="p-8 text-center text-light-text-muted dark:text-dark-text-muted">
          {{ filter === 'completed' ? 'No completed todos' : filter === 'active' ? 'No active todos' : 'No todos yet. Add one above!' }}
        </div>

        <!-- Task item -->
        <div v-else>
          <Task
            v-for="todo in filteredTodos"
            :key="todo.id"
            :todo="todo"
            @toggle="handleToggle(todo)"
            @delete="handleDeleteTask(todo.id)"
          />
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between p-4 text-sm text-light-text-muted dark:text-dark-text-muted">
          <span>{{ activeCount }} {{ activeCount === 1 ? 'item' : 'items' }} left</span>

          <!-- Show filters when available -->
          <div class="hidden md:block">
            <Filter />
          </div>

          <button
            v-if="completedCount > 0"
            @click="clearCompleted"
            class="transition-opacity hover:opacity-70 hover:text-light-text dark:hover:text-dark-text-hover"
          >
            Clear Completed
          </button>
        </div>
      </div>

      <!-- Mobile Filter -->
      <div class="md:hidden mt-4 rounded-lg shadow-2xl p-4 flex justify-center bg-light-card dark:bg-dark-card">
        <Filter />
      </div>

      <!-- Footer Note -->
      <p class="text-center mt-12 text-sm text-light-text-muted dark:text-dark-text-muted">
        Drag and drop to reorder list
      </p>
    </div>
  </div>
</template>
