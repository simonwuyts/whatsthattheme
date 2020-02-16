<template>
  <footer class="c-footer">
    <div class="c-footer__credit">
      <div class="c-footer__label">Design / Dev</div>
      <a href="https://www.simonwuyts.com/" class="c-footer__name">
        Simon Wuyts
      </a>
    </div>
    <div class="c-footer__credit">
      <div class="c-footer__label">Source Code</div>
      <a
        href="https://github.com/simonwuyts/whatsthattheme"
        class="c-footer__name"
      >
        Find it on Github
      </a>
    </div>
    <div class="c-footer__credit">
      <div class="c-footer__label">Font</div>
      <a href="https://www.jetbrains.com/lp/mono/" class="c-footer__name">
        JetBrains Mono
      </a>
    </div>
  </footer>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'AppFooter'
})
</script>

<style lang="scss">
.c-footer {
  display: flex;
  margin-top: calc(var(--line-height-normal) * 3);
}

.c-footer__credit {
  & + & {
    margin-left: 7.2rem;
  }
}

.c-footer__name {
  color: var(--color-accent);
  display: inline-flex;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    box-shadow: inset 0 -0.1rem 0 var(--color-accent);
  }
}
</style>
