import { createStore } from 'vuex';

// Define el estado
interface Todo {
  id: number
  content: string
  status: boolean
}

interface State {
  todos: Todo[]
  loading: boolean
  filter: 'all' | 'active' | 'completed'
}

// Creamos la instancia única del store
export const store = createStore<State>({
  // 1. El state (directamente como objeto)
  state: {
    todos: [],
    loading: false,
    filter: 'all' // 'all', 'active', 'completed'
  },

  // 2. Tus Getters (sin cambios)
  getters: {
    filteredTodos: (state) => {
      switch (state.filter) {
        case 'active':
          return state.todos.filter(todo => !todo.status)
        case 'completed':
          return state.todos.filter(todo => todo.status)
        default:
          return state.todos
      }
    },
    activeCount: (state) => {
      return state.todos.filter(todo => !todo.status).length
    },
    completedCount: (state) => {
      return state.todos.filter(todo => todo.status).length
    }
  },

  // 3. Tus Mutations (con una pequeña mejora)
  mutations: {
    SET_TODOS(state, todos: Todo[]) {
      state.todos = todos
    },
    ADD_TODO(state, todo: Todo) {
      // Usamos unshift() en lugar de push() para que
      // la nueva tarea aparezca al principio de la lista.
      state.todos.unshift(todo)
    },
    UPDATE_TODO(state, updatedTodo: Todo) {
      const index = state.todos.findIndex(t => t.id === updatedTodo.id)
      if (index !== -1) {
        // Reemplazamos el objeto en el array para reactividad
        state.todos[index] = updatedTodo
      }
    },
    DELETE_TODO(state, id: number) {
      state.todos = state.todos.filter(t => t.id !== id)
    },
    SET_FILTER(state, filter: 'all' | 'active' | 'completed') {
      state.filter = filter
    },
    SET_LOADING(state, loading: boolean) {
      state.loading = loading
    }
  },

  // 4. Tus Actions (ajustadas a los datos de app.vue)
  actions: {
    async fetchTodos({ commit }) {
      commit('SET_LOADING', true)
      try {
        const config = useRuntimeConfig()
        const response = await $fetch<Todo[]>(`${config.public.apiBase}/todos`)
        commit('SET_TODOS', response)
      } catch (error) {
        console.error('Error fetching todos:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async addTodo({ commit }, content: string) {
      try {
        const config = useRuntimeConfig()
        const newTodo = await $fetch<Todo>(`${config.public.apiBase}/todos`, {
          method: 'POST',
          body: { content, status: false }
        })
        commit('ADD_TODO', newTodo)
      } catch (error) {
        console.error('Error adding todo:', error)
      }
    },

    // Ajustado: app.vue solo envía 'id' y 'status', no 'content'
    async updateTodo({ commit }, { id, status }) {
      try {
        const config = useRuntimeConfig()
        const updated = await $fetch<Todo>(`${config.public.apiBase}/todos/${id}`, {
          method: 'PUT',
          body: { status } // Solo enviamos el status que es lo que cambia
        })
        commit('UPDATE_TODO', updated)
      } catch (error) {
        console.error('Error updating todo:', error)
      }
    },

    async deleteTodo({ commit }, id: number) {
      try {
        const config = useRuntimeConfig()
        await $fetch(`${config.public.apiBase}/todos/${id}`, {
          method: 'DELETE'
        })
        commit('DELETE_TODO', id)
      } catch (error) {
        console.error('Error deleting todo:', error)
      }
    },

    setFilter({ commit }, filter: 'all' | 'active' | 'completed') {
      commit('SET_FILTER', filter)
    }
  }
})
