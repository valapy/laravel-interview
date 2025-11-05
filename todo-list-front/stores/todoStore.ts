import { defineStore } from 'pinia'

// Definimos las interfaces
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

// 1. defineStore('nombre-unico', { ... })
export const useTodoStore = defineStore('todo', {
  // 2. El 'state' es una función que retorna el estado inicial
  state: (): State => ({
    todos: [],
    loading: false,
    filter: 'all'
  }),

  // 3. 'getters' (computados del store)
  getters: {
    filteredTodos(state) {
      switch (state.filter) {
        case 'active':
          return state.todos.filter(todo => !todo.status)
        case 'completed':
          return state.todos.filter(todo => todo.status)
        default:
          return state.todos
      }
    },
    activeCount(state) {
      return state.todos.filter(todo => !todo.status).length
    },
    completedCount(state) {
      return state.todos.filter(todo => todo.status).length
    }
  },

  // 4. 'actions' (métodos para cambiar el estado)
  // ¡En Pinia, las actions pueden ser async y mutar el estado directamente!
  actions: {
    async fetchTodos() {
      this.loading = true // Mutación directa
      try {
        const config = useRuntimeConfig()
        const response = await $fetch<Todo[]>(`${config.public.apiBase}/todos`)
        this.todos = response // Mutación directa
      } catch (error) {
        console.error('Error fetching todos:', error)
      } finally {
        this.loading = false // Mutación directa
      }
    },

    async addTodo(content: string) {
      try {
        const config = useRuntimeConfig()
        const newTodo = await $fetch<Todo>(`${config.public.apiBase}/todos`, {
          method: 'POST',
          body: { content, status: false }
        })
        this.todos.unshift(newTodo) // Mutación directa
      } catch (error) {
        console.error('Error adding todo:', error)
      }
    },

    async updateTodo({ id, status }: { id: number; status: boolean }) {
      try {
        const config = useRuntimeConfig()
        const updated = await $fetch<Todo>(`${config.public.apiBase}/todos/${id}`, {
          method: 'PUT',
          body: { status }
        })

        const index = this.todos.findIndex(t => t.id === id)
        if (index !== -1) {
          this.todos[index] = updated // Mutación directa
        }
      } catch (error) {
        console.error('Error updating todo:', error)
      }
    },

    async deleteTodo(id: number) {
      try {
        const config = useRuntimeConfig()
        await $fetch(`${config.public.apiBase}/todos/${id}`, {
          method: 'DELETE'
        })
        this.todos = this.todos.filter(t => t.id !== id) // Mutación directa
      } catch (error) {
        console.error('Error deleting todo:', error)
      }
    },

    setFilter(filter: 'all' | 'active' | 'completed') {
      this.filter = filter // Mutación directa
    }
  }
})
