<template>
  <div class="todo-page-wrapper">
    <div class="row">
      <nav class="nav nav-tabs col-sm-12">
        <span :class="['filter-link nav-link', { active: filter === 'incomplete'}]" @click="filterTodos('incomplete')">Incomplete</span>
        <span :class="['filter-link nav-link', { active: filter === 'completed'}]" @click="filterTodos('completed')">Completed</span>
        <span :class="['filter-link nav-link', { active: filter === 'all'}]" @click="filterTodos('all')">All</span>
      </nav>
    </div>

    <div v-if="renderedList.length > 0" class="row">
      <div class="todo col-lg" v-for="(todo, index) in renderedList" :key="todo.id" :class="{ completed: todo.completed }" @mouseover="showDelete(index)" @mouseout="hideDelete" @click="toggleCompleted(todo, index)">
        <span>{{ todo.text }}</span>
        <button class="delete-btn" v-if="hoverElIndex === index" @click.stop="deleteTodo(todo.id, index)">Delete</button>
      </div>
    </div>
    <div v-else class="empty-list">
      <p>{{ emptyMessage }}</p> 
      <p v-if="filter === 'incomplete'">Good job!</p>
      <p v-else>Add some items and get some work done!</p>
    </div>

    <form v-show="adding" class="add-wrapper" @submit.prevent="addTodo" novalidate>
      <div class="row">
        <input class="todo-input col-sm-12" ref="addTodoInput" type="text" name="todo" v-model="newTodo.text" v-on:keyup.escape="cancelTodo" />
        <span class="cancel-add" @click="cancelTodo">X</span>
        
        <div class="validation-messages col-sm-12" v-if="validationErrors.length > 0">
          <error-list :errors="validationErrors"></error-list>
        </div>
      </div>
    </form>

    <div class="actions">
      <button class="btn btn-primary" @click="prepareNewTodo">Add Todo</button>
    </div>
  </div>
</template>

<script>
import Error from './Error.vue'

export default {
  components: {
    'error-list': Error
  },
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  data: function() {
    return {
      todoList: this.todos,
      filter: (localStorage.getItem('todoFilter') !== null) ? localStorage.getItem('todoFilter') : 'incomplete',
      renderedList: [],
      newTodo: this.createLocalTodo(),
      adding: false,
      validationErrors: [],
      hoverElIndex: null,
      emptyMessage: ''
    }
  },
  created: function() {
    this.filterTodos(this.filter),
    this.$set(this, 'emptyMessage', this.createEmptyMessage())
  },
  methods: {
    toggleCompleted: function(todo, index) {
      let updatedTodo = { ...todo, completed: !todo.completed }

      this.$http.put(`/todos/${todo.id}`, { todo: updatedTodo })
        .then(reponse => {
          this.$set(this.renderedList[index], 'completed', updatedTodo.completed)
          this.filterTodos(this.filter)
        }, response => {
          this.validationErrors.push(response.bodyText)
        })  
    },
    filterTodos: function(filter) {
      if (this.todoList) {
        switch (filter) {
          case 'incomplete':
            this.renderedList = this.todoList.filter(item => !item.completed)
            break
          case 'completed':
            this.renderedList = this.todoList.filter(item => item.completed)
            break
          case 'all':
            this.renderedList = this.todoList
            break
          default:
            this.renderedList = this.todoList.filter(item => !item.completed)
            break
        }

        this.$set(this, 'filter', filter)
        this.$set(this, 'emptyMessage', this.createEmptyMessage())
        localStorage.setItem('todoFilter', filter)
      } else {
        console.error('Cannot load props!')
      }
    },
    prepareNewTodo: function() {
      this.$set(this, 'adding', true)
      this.$set(this, 'filter', 'all')
      this.$nextTick(() => this.$refs.addTodoInput.focus())
      this.filterTodos(this.filter)
    },
    cancelTodo: function() {
      if (this.adding) {
        this.$set(this.newTodo, 'text', '')
        this.$set(this, 'adding', false)
        this.validationErrors.splice(0)
      }
    },
    addTodo: function() {
      if (this.newTodo.text !== '') {
        this.$http.post('/todos', this.newTodo)
          .then(response => {
            this.todoList.push(JSON.parse(response.bodyText))
            this.filterTodos(this.filter)
            this.$set(this, 'newTodo', this.createLocalTodo())
            this.$set(this, 'adding', false)
            this.validationErrors.splice(0)
          }, response => {
            this.$set(this, 'newTodo', this.createLocalTodo())
            this.validationErrors.push(response.bodyText)
          })
      } else {
        this.validationErrors.push('You must enter text to submit a new item!')
      }
    },
    createLocalTodo: function() {
      return {
        id: null,
        text: '',
        completed: false
      }
    },
    showDelete: function(index) {
      this.$set(this, 'hoverElIndex', index)
    },
    hideDelete: function() {
      this.$set(this, 'hoverElIndex', null)
    },
    deleteTodo: function(id, index) {
      this.$http.delete(`/todos/${id}`)
        .then(response => {
          this.todoList = this.todoList.filter(item => item.id !== id)
          this.filterTodos(this.filter)
        }, response => {
          this.validationErrors.push(response.bodyText)
        })
    },
    createEmptyMessage: function() {
      return `You have no ${ this.filter === 'all' ? '' : this.filter } items.`
    }
  }
}
</script>
