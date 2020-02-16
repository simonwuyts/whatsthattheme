<template functional>
  <div class="c-line-numbers">
    <div class="c-line-number" v-for="n in 100" :key="`line${n}`">{{ n }}</div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
export default createComponent({
  name: 'LineNumbers'
})
</script>

<style lang="scss">
.c-line-numbers {
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  text-align: right;
  top: 0;
  width: 4rem;
}

.c-line-number {
  color: var(--color-text-muted);
}
</style>
