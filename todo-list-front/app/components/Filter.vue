<script setup>
  import { useTodoStore } from '../../stores/todoStore'
  import { storeToRefs } from 'pinia'

  const store = useTodoStore()
  const { filter } = storeToRefs(store)

  const setFilter = (newFilter) => {
    store.setFilter(newFilter)
  }

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ]
</script>

<template>
  <div class="flex items-center space-x-4 font-bold">

    <button v-for="f in filters" :key="f.value" @click="setFilter(f.value)" class="transition-colors" :class="{
      'text-blue-500': filter === f.value,
      'text-light-text-muted dark:text-dark-text-muted hover:text-light-text dark:hover:text-dark-text-hover': filter !== f.value
    }">
      {{ f.label }}
    </button>
  </div>
</template>
