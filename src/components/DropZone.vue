<template>
  <div
    class="c-dropzone"
    :class="{ 'c-dropzone--active': state.matches('dragging') }"
  >
    <div class="c-dropzone__label">Drop your screenshot here…</div>
  </div>
</template>

<script lang="ts">
import { createComponent, onMounted } from '@vue/composition-api'
import { useStateMachine } from '@/composables/use-state-machine'

export default createComponent({
  name: 'DropZone',

  setup() {
    const { state, send } = useStateMachine()

    const handleDragging = (e: DragEvent) => {
      e.preventDefault()
      send('DRAG')
    }

    const handleDragLeave = () => {
      send('RELEASE')
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      if (e.dataTransfer && e.dataTransfer.files.length > 0) {
        send({
          type: 'DROP',
          value: e.dataTransfer.files[0]
        })
      }
    }

    onMounted(() => {
      window.addEventListener('dragover', handleDragging, false)
      window.addEventListener('dragleave', handleDragLeave, false)
      window.addEventListener('drop', handleDrop, false)
    })

    return {
      state,
      send
    }
  }
})
</script>

<style lang="scss">
.c-dropzone {
  background: red;
  bottom: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  right: 0;
  transition: opacity 0.1s linear;
}

.c-dropzone--active {
  opacity: 1;
}
</style>
