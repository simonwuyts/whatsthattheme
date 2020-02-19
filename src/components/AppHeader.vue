<template>
  <header class="c-header">
    <h1 class="c-title">
      What's <br /><span class="c-title__accent">=></span> that theme
    </h1>
    <p class="c-lead">
      Upload a screenshot of your favorite code editor color theme and find the
      best match in <strong>more than 1.500 VS Code themes</strong>.
    </p>
  </header>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
export default createComponent({
  name: 'AppHeader'
})
</script>

<style lang="scss">
.c-header {
  margin-bottom: var(--line-height-normal);
}

@keyframes blinkingCursor {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.c-title {
  color: var(--color-text);
  font-size: var(--font-size-title);
  font-weight: 800;
  line-height: var(--line-height-title);
  margin: 0 0 var(--line-height-normal) 0;
  text-transform: uppercase;

  &:after {
    animation: blinkingCursor 1s step-end 0s infinite both;
    background: var(--color-accent);
    content: '';
    display: inline-flex;
    height: var(--font-size-title);
    position: relative;
    top: calc((var(--line-height-title) - var(--font-size-title)) / 2);
    width: 0.6rem;
  }
}

.c-title__accent {
  color: var(--color-accent);
}

.c-lead {
  font-size: var(--font-size-lead);
  line-height: var(--line-height-lead);
  margin: 0;
  max-width: 56rem;
}
</style>
