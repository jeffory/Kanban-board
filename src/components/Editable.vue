<template>
  <span class="editable" contenteditable="true" v-text="text" @blur="updated" @keydown.enter="enterPressed" :data-placeholder="placeholder"></span>
</template>

<script>
export default {
  props: ['id', 'text', 'no-newlines', 'placeholder'],
  methods: {
    updated (event) {
      // Trim last <br /> that some browsers add, so the placeholder can work
      this.text = this.text.replace(/<br[^>]*\/?>\n*$/gim, '')

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
.editable {
  display: inline-block;
  box-sizing: border-box;
  min-height: 1.6em;
  padding: .35rem .5rem .25rem;
  width: 100%;

  &:hover {
    background-color: hsl(0, 0%, 97%);
    // padding: .25em .5em .20em;
  }

  &:empty:before {
    color: #bbb;
    content: attr(data-placeholder);
    display: block;
    font-style: italic;
  }
}

.editable:not(:focus):not(:active) {
  cursor: pointer;
}

.editable:active,
.editable:focus {
  background-color: #fff;
  border: 1px solid #ccc;
  color: #555;
  outline: none;
  padding: .28rem .5rem .20rem;
}
</style>
