<template>
  <textarea ref="textarea" v-model="text" @blur="onBlur" @keypress.prevent.enter="save" @keydown.esc="cancel" @keydown="resize"></textarea>
</template>

<script>
export default {
  name: 'ExpandingTextarea',
  props: ['focus'],
  data () {
    return {
      text: '',
      saved: false
    }
  },
  mounted () {
    this.$refs.textarea.style.height = '1.2em'

    if (focus) {
      this.$nextTick(() => this.$refs.textarea.focus())
    }
  },
  methods: {
    save () {
      if (!this.saved) {
        this.saved = true
        this.$emit('save', this.text)
      }
    },
    resize () {
      let textarea = this.$refs.textarea

      // TODO: Get rid of the height flickering/jumping somehow.
      
      textarea.style.height = 'auto'
      this.$nextTick(() => textarea.style.height = textarea.scrollHeight + 'px')
    },
    onBlur () {
      if (this.text.trim() !== '') {
        this.save()
      } else {
        this.cancel()
      }
    },
    cancel () {
      this.text = ''
      this.$emit('cancelled')
    }
  }
}
</script>

<style lang="scss" scoped>
textarea {
  overflow: hidden;
  resize: none;
  width: 100%;
  word-wrap: break-word;

  transition: height 50ms;

  &:active,
  &:focus {
    outline: 0,
  }
}
</style>
