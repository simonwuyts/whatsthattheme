<template>
  <div id="app">
    <file-input />
    <ul>
      <li
        v-for="color in imageColors"
        :key="color.color"
        :style="{ background: color.color }"
      >
        {{ color.color }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { useColors } from '@/composables/use-colors'
import FileInput from './components/FileInput.vue'

export default createComponent({
  name: 'App',
  components: {
    FileInput
  },
  setup() {
    const { imageColors } = useColors()

    return {
      imageColors
    }
  }
})
</script>
