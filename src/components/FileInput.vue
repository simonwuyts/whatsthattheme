<template>
  <div>
    <input type="file" @change="updateFile($event.target.files)" />
  </div>
</template>

<script lang="ts">
import { createComponent, ref, Ref } from '@vue/composition-api'
import { useColors, ColorResult } from '@/composables/use-colors'

export default createComponent({
  name: 'FileInput',
  setup() {
    const imageColors: Ref<ColorResult[]> = ref([])

    async function updateFile(files: FileList) {
      imageColors.value = useColors(files[0])
    }

    return {
      imageColors,
      updateFile
    }
  }
})
</script>
