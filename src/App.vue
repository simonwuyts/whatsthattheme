<template>
  <div id="app">
    <line-numbers />
    <app-header />
    <file-input />
    <drop-zone />
    <results-list />
    <app-footer />
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { useStateMachine } from '@/composables/use-state-machine'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import DropZone from '@/components/DropZone.vue'
import FileInput from '@/components/FileInput.vue'
import LineNumbers from '@/components/LineNumbers.vue'
import ResultsList from '@/components/ResultsList.vue'

export default createComponent({
  name: 'App',

  components: {
    AppFooter,
    AppHeader,
    DropZone,
    FileInput,
    LineNumbers,
    ResultsList
  },

  setup() {
    const { send, state } = useStateMachine()

    return {
      send,
      state
    }
  }
})
</script>

<style lang="scss">
@import './assets/scss/generic';

#app {
  margin: 0 auto;
  max-width: 80rem;
  padding: 9.6rem 0;
  width: calc(100% - 8rem);

  @media (max-width: 60em) {
    max-width: 60rem;
  }

  @media (max-width: 48em) {
    margin: 0 auto 0 6.4rem;
    padding: 6.4rem 0 var(--line-height-normal);
  }
}
</style>
