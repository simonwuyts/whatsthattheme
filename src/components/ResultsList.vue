<template>
  <div class="c-results-list">
    <div class="c-count">
      There are <span class="c-count__number">3 themes</span> matching your
      image
    </div>
    <ul class="c-results">
      <li class="c-result" v-for="n in 3" :key="n">
        <a href="#" class="c-result__link">
          <img
            src="https://equinusocio.gallerycdn.vsassets.io/extensions/equinusocio/vsc-material-theme/32.5.0/1581769762885/Microsoft.VisualStudio.Services.Icons.Default"
            alt="Theme Icon"
            class="c-result__icon"
          />
          <h2 class="c-result__title">Material Theme</h2>
          <div class="c-result__meta">Open in Marketplace</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
export default createComponent({
  name: 'ResultsList'
})
</script>

<style lang="scss">
.c-results-list {
  margin-top: 6.4rem;
}

.c-count {
  margin-bottom: var(--line-height-normal);
}

.c-count__number {
  color: var(--color-text);
  font-weight: 700;
}

.c-results {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.c-result {
  display: block;

  & + & {
    margin-top: var(--line-height-normal);
  }
}

.c-result__link {
  color: inherit;
  display: block;
  padding-left: 8.8rem;
  position: relative;
  text-decoration: none;
}

.c-result__icon {
  border-radius: 50%;
  height: 6.4rem;
  left: 0;
  position: absolute;
  top: 0;
  width: 6.4rem;
}

.c-result__title {
  color: var(--color-text);
  font-size: var(--font-size-lead);
  font-weight: 700;
  line-height: var(--line-height-lead);
  margin: 0;
}

.c-result__meta {
  display: flex;

  &:after {
    background: url('../assets/images/arrow-right.svg') no-repeat center center;
    content: '';
    height: var(--line-height-normal);
    margin-left: 0.8rem;
    opacity: 0;
    transition: all 0.1s var(--ease-in-out);
    width: var(--line-height-normal);
  }

  .c-result:hover &:after {
    opacity: 1;
    transform: translateX(0.8rem);
  }
}
</style>
