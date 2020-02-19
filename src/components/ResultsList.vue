<template>
  <div class="c-results-list" v-if="state.matches('results')">
    <template v-if="state.context.themeScores.length > 0">
      <div class="c-count">
        There are
        <span class="c-count__number">
          {{ state.context.themeScores.length }} themes
        </span>
        matching your image
      </div>
      <ul class="c-results">
        <li
          class="c-result"
          v-for="result in state.context.themeScores"
          :key="result.id"
        >
          <a
            :href="
              `https://marketplace.visualstudio.com/items?itemName=${result.publisher}.${result.extension}`
            "
            target="_blank"
            rel="noreferrer"
            class="c-result__link"
          >
            <div class="c-result__icon">
              <img
                :src="result.icon"
                :alt="result.extensionName"
                class="c-result__image"
                v-if="result.icon"
              />
            </div>
            <h2 class="c-result__title">{{ result.extensionName }}</h2>
            <div class="c-result__meta">
              <div class="c-result__description">
                {{ result.publisherName }}
              </div>
            </div>
          </a>
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="c-empty">
        No matches found. 😕 Try again with another image for better results.
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { useStateMachine } from '@/composables/use-state-machine'

export default createComponent({
  name: 'ResultsList',

  setup() {
    const { state } = useStateMachine()

    return {
      state
    }
  }
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
  border-radius: calc(var(--line-height-normal) * 2) 0 0
    calc(var(--line-height-normal) * 2);
  display: block;
  position: relative;

  &:before {
    bottom: 0;
    left: -100vw;
    content: '';
    position: absolute;
    right: -100vw;
    top: 0;
    z-index: 1;
  }

  &:hover:before {
    background: var(--color-result-hover);
  }

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
  box-shadow: inset 0 0 0 0.1rem var(--color-lines);
  border-radius: 50%;
  height: 6.4rem;
  left: 0;
  position: absolute;
  top: 0;
  width: 6.4rem;
}

.c-result__image {
  border-radius: 2.4rem;
  height: 4.8rem;
  left: 0.8rem;
  position: absolute;
  top: 0.8rem;
  width: 4.8rem;
}

.c-result__title {
  color: var(--color-text);
  font-size: var(--font-size-lead);
  font-weight: 700;
  line-height: var(--line-height-lead);
  margin: 0;
  position: relative;
  z-index: 2;
}

.c-result__meta {
  color: var(--color-text-light);
  display: flex;
  font-size: 1.4rem;
  position: relative;
  z-index: 2;

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

.c-result__description {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
