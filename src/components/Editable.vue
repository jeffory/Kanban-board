<template>
  <span class="editable"
    contenteditable="true"
    v-text="text"
    @blur="updated"
    @input="(e) => currentText = e.target.innerText"
    @keydown.enter="enterPressed"
    @keydown.esc="escapePressed"
    :data-placeholder="placeholder"></span>
</template>

<script>
export default {
  props: ['id', 'text', 'no-newlines', 'placeholder'],
  data () {
    return {
      currentText: ''
    }
  },
  methods: {
    updated () {
      // Trim last <br /> that some browsers add, so the placeholder can work
      this.currentText = this.currentText.replace(/<br[^>]*\/?>\n*$/gim, '')

      // If text is no different to the original
      if (this.currentText === this.text) {
        return
      }

      let data = {'text': this.currentText}

      if (this.id) {
        data.id = this.id
      }

      this.$emit('change', data)
    },
    escapePressed (event) {
      event.preventDefault()
      this.currentText = this.text.valueOf()
      event.target.innerText = this.text
      event.target.blur()
    },
    enterPressed (event) {
      if (this.noNewlines) {
        event.preventDefault()
        this.updated()
        event.target.blur()
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
    background-color: $white-2;
    color: $grey-4;
  }

  &:empty:before {
    color: $grey-2;
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
  background-color: $white;
  border: 1px solid $grey-2;
  color: $grey-4;
  outline: none;
  padding: .28rem .5rem .20rem;
}
</style>
