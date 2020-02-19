<template>
  <div class="c-dropzone">
    <div class="c-dropzone__label">Drop your screenshot here…</div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'DropZone'
})
</script>

<style lang="scss">
.c-dropzone {
  background: red;
  bottom: 0;
  left: 0;
  position: fixed;
  top: 0;
  right: 0;
}
</style>
