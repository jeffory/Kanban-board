<template>
  <span class="is-editable" contenteditable="true" v-text="text" @blur="updated" @keydown.enter="enterPressed"></span>
</template>

<script>
export default {
  props: ['id', 'text', 'no-newlines'],
  methods: {
    updated (event) {
      // If text is no different to the original
      if (event.target.innerText === this.text) {
        return
      }

      let data = {'text': event.target.innerText}

      if (this.id) {
        data.id = this.id
      }

      this.$emit('change', data)
    },
    enterPressed (event) {
      if (this.noNewlines) {
        event.preventDefault()
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.is-editable {
  display: inline-block;
  box-sizing: border-box;
  min-height: 1.6em;
  padding: .35em .5em .25em;
}

.is-editable:not(:focus):not(:active) {
  cursor: pointer;
}

.is-editable:active,
.is-editable:focus {
  background-color: #fff;
  border: 1px solid #ccc;
  color: #555;
  outline: none;
  padding: .25em .5em .20em;
  width: 100%;
}
</style>
