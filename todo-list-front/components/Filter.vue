<template>
  <div class="flex gap-4 font-bold">
    <button
      v-for="option in filters"
      :key="option.value"
      @click="setFilter(option.value)"
      class="px-2 py-1 rounded transition-colors"
      :class="[
        currentFilter === option.value 
          ? 'text-bright-blue' 
          : isDark 
            ? 'text-dark-text-muted hover:text-dark-text-hover' 
            : 'text-light-text-muted hover:text-light-text'
      ]">
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const { isDark } = useTheme()

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' }
]

const currentFilter = computed(() => store.state.filter)

const setFilter = (filter) => {
  store.dispatch('setFilter', filter)
}
</script>
