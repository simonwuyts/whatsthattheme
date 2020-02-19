<template>
  <div
    class="c-dropzone"
    :class="{ 'c-dropzone--active': state.matches('dragging') }"
  >
    <div class="c-dropzone__label">🖼<br />Drop your<br />screenshot here…</div>
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
  align-items: center;
  background: var(--color-dropzone);
  bottom: 0;
  display: flex;
  justify-content: center;
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

@keyframes pulse {
  0% {
    transform: translateY(-0.8rem);
  }
  50% {
    transform: translateY(0.8rem) scale(0.95);
  }
  100% {
    transform: translateY(-0.8rem);
  }
}

.c-dropzone__label {
  animation: pulse 2s ease-in-out 0s infinite both;
  font-size: var(--font-size-lead);
  font-weight: 700;
  max-width: 80rem;
  text-align: center;
  width: calc(100% - 6.4rem);
}
</style>
