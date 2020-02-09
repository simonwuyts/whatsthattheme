<template>
  <div id="app">
    <file-input />
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import FileInput from './components/FileInput.vue'

export default createComponent({
  name: 'App',
  components: {
    FileInput
  }
})
</script>
