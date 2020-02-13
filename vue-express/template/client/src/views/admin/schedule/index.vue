<template>
  <div class="app">
    <div class="container">
      <div class="row header">
        <h1 class="col s6 offset-s3 center-align teal-text">Schedule</h1>
      </div>
      <div class="row">
        <form class="col s6 offset-s3" @submit.prevent="submitTodo">
          <div class="input-field">
            <i class="material-icons prefix">list</i>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Object</th>
                  <th>Value</th>
                  <th>Day</th>
                  <th>Time(HH:mm)</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr v-for="todo in todos" :key="todo.id">
                  <td>
                    <select id="new-object" v-model="todo.object" type="text">
                      <option>A</option>
                      <option>B</option>
                    </select>
                  </td>

                  <td><input id="icon_prefix2" v-model="todo.value" type="text"></td>

                  <td>
                    <select id="new-day" v-model="todo.day" type="text">
                      <option>Mon</option>
                      <option>Tue</option>
                      <option>Wed</option>
                      <option>Thu</option>
                      <option>Fri</option>
                    </select>
                  </td>

                  <td><vue-timepicker id="new-time" v-model="todo.time" format="HH:mm" /></td>
                  <td>
                    <a @click.prevent="deleteTodo(todo)">
                      <i class="btn btn-danger">delete</i>
                    </a>
                  </td>
                </tr>

              </tbody>
              <button class="btn btn-primary">Submmit</button>
              <br>
              <h3>Add New Task</h3>
              <tbody>
                <tr>
                  <td>
                    <select id="new-object" v-model="newObject" type="text">
                      <option>A</option>
                      <option>B</option>
                    </select>
                  </td>

                  <td><input id="icon_prefix2" v-model="newValue" type="text"></td>

                  <td>
                    <select id="new-day" v-model="newDay" type="text">
                      <option>Mon</option>
                      <option>Tue</option>
                      <option>Wed</option>
                      <option>Thu</option>
                      <option>Fri</option>
                    </select>
                  </td>

                  <td><vue-timepicker id="new-time" v-model="newTime" format="HH:mm" /></td>
                  <td>
                    <button class="btn btn-primary">Add</button>
                  </td>
                </tr>
              </tbody>
              <br>
            </table>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
export default {
  name: 'App',
  components: { VueTimepicker },
  data() {
    return {
      todos: [],
      newObject: '',
      newValue: '',
      newDay: '',
      elements: [],
      newTime: {
        HH: '00',
        mm: '00'
      }
    }
  },
  watch: {
    todos: {
      handler() {
        localStorage.todos = JSON.stringify(this.todos)
      },
      deep: true
    }
  },
  mounted() {
    if (localStorage.todos) {
      this.todos = JSON.parse(localStorage.todos)
    }
  },
  methods: {
    submitTodo() {
      this.todos.push({
        object: this.newObject,
        value: this.newValue,
        day: this.newDay,
        time: this.newTime
      })
      this.newObject = ''
      this.newValue = ''
      this.newDay = ''
      this.newTime =
      {
        HH: '00',
        mm: '00'
      }
    },
    deleteTodo(todo) {
      const todoIndex = this.todos.indexOf(todo)
      this.todos.splice(todoIndex, 1)
    }
  }
}
</script>

<style lang="scss">
.header{
  margin-top: 100px;
}
</style>
