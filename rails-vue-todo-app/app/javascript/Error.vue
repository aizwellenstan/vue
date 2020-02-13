<template>
  <div>
    <div v-for="error in errorList" :key="error.id" class="error alert alert-danger">
      <span>{{ error.text }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['errors'],
    data: function() {
      return {
        errorList: [],
        errorId: 0
      }
    },
    created: function() {
      console.log(this.errors)
      this.errors.map(error => {
        console.log(error)
        if (this.errorList.length > 0) {
          this.errorList.map(item => {
            if (!item.text.includes(error)) {
              this.errorList.push(this.createError(error))
            }
          })
        } else {
          this.errorList.push(this.createError(error))
        }
      })
    },
    methods: {
      createError: function(error) {
        return { id: ++this.errorId, text: error }
      }
    }
  }
</script>

<style scoped>
</style>