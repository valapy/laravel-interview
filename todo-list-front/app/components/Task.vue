<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle', 'delete'])
</script>

<template>
  <div
    class="flex items-center p-4 border-b border-light-border dark:border-dark-border group transition-colors duration-300">

    <!-- Checkbox Personalizado -->
    <button @click="$emit('toggle')"
      class="w-6 h-6 rounded-full border border-light-text-muted dark:border-dark-text-muted flex-shrink-0 mr-4 flex items-center justify-center transition-all"
      :class="{
        'checkbox-gradient': todo.status, // Tu clase de gradiente
        'border-transparent': todo.status
      }">
      <!-- Icono de Check (solo visible si status es true) -->
      <svg v-if="todo.status" xmlns="http://www.w3.org/2000/svg" width="11" height="9">
        <path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" />
      </svg>
    </button>

    <!-- Contenido del Todo -->
    <span class="flex-grow text-light-text dark:text-dark-text transition-colors duration-300" :class="{
      'line-through text-light-text-muted dark:text-dark-text-muted': todo.status
    }">
      {{ todo.content }}
    </span>

    <!-- Botón de Borrar (visible al hacer hover en el 'group') -->
    <button @click="$emit('delete')"
      class="ml-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path fill="#494C6B" fill-rule="evenodd"
          d="M16.97 0l.708.707L9.707 8.707l7.97 7.97-.707.707L9 9.414l-7.97 7.97-.707-.707L8.293 8.707.323.707.707 0 9 8.293 16.971 0z" />
      </svg>
    </button>
  </div>
</template>
