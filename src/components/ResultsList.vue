<template>
  <div class="c-results-list" v-if="state.matches('results')">
    <template v-if="state.context.themeScores.length > 0">
      <div class="c-count">
        There are
        <span class="c-count__number">
          {{ state.context.themeScores.length }} themes
        </span>
        matching your image.
        <a href="#" @click.prevent="send('RETRY')">Wanna try again?</a>
      </div>
      <ul class="c-results">
        <li
          class="c-result"
          v-for="result in state.context.themeScores"
          :key="`${result.extension}.${result.themeName}`"
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
              <img
                src="@/assets/images/thumb.svg"
                :alt="result.extensionName"
                class="c-result__image"
                v-else
              />
            </div>
            <h2 class="c-result__title">
              <span>{{ result.themeName || result.extensionName }}</span>
            </h2>
            <div class="c-result__description">
              <span class="c-result__arrow">=&gt;</span> by
              {{ result.publisherName }}
            </div>
          </a>
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="c-empty">
        <strong>No matches found.</strong> 😕<br />
        <a href="#" @click.prevent="send('RETRY')">Try again</a> with another
        image for better results.
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
    const { state, send } = useStateMachine()

    return {
      state,
      send
    }
  }
})
</script>

<style lang="scss">
.c-results-list {
  margin-top: var(--line-height-normal);
}

.c-count {
  margin-bottom: var(--line-height-normal);

  a {
    color: var(--color-accent);
    display: inline-flex;
    font-weight: 700;
    text-decoration: none;

    &:hover {
      box-shadow: inset 0 -0.1rem 0 var(--color-accent);
    }
  }
}

.c-count__number {
  color: var(--color-text);
  font-weight: 700;
}

.c-empty a {
  color: var(--color-accent);
  display: inline-flex;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    box-shadow: inset 0 -0.1rem 0 var(--color-accent);
  }
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

  & + & {
    margin-top: var(--line-height-normal);
  }
}

.c-result__link {
  color: inherit;
  display: block;
  min-height: calc(var(--line-height-normal) * 2);
  padding-left: 8rem;
  position: relative;
  text-decoration: none;

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

  &:after {
    background: transparent;
    bottom: calc((var(--line-height-normal) / 2) * -1);
    left: -100vw;
    content: '';
    position: absolute;
    right: -100vw;
    top: calc((var(--line-height-normal) / 2) * -1);
    z-index: 1;
  }
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
  z-index: 2;
}

.c-result__title {
  color: var(--color-text);
  display: flex;
  font-size: var(--font-size-lead);
  font-weight: 700;
  line-height: var(--line-height-lead);
  margin: 0;
  position: relative;
  z-index: 2;

  & > span {
    background: var(--color-lines);
    padding: 0 0.8rem;
  }

  .c-result:hover & > span {
    background: var(--color-accent);
    color: #fff;
  }
}

.c-result__description {
  color: var(--color-text-light);
  font-size: 1.4rem;
  overflow: hidden;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 2;
}

.c-result__arrow {
  color: var(--color-text-muted);
}
</style>
