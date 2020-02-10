<template>
  <div>
    <input type="file" @change="updateFile($event.target.files)" />
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { useColors } from '@/composables/use-colors'

export default createComponent({
  name: 'FileInput',
  setup() {
    const { imageColors, getImageColors } = useColors()

    function updateFile(files: FileList) {
      getImageColors(files[0])
    }

    return {
      imageColors,
      updateFile
    }
  }
})
</script>
