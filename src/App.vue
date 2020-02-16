<template>
  <div id="app">
    <line-numbers />
    <app-header />
    <file-input />
    <results-list />
    <app-footer />
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { useColors } from '@/composables/use-colors'
import { useThemes } from '@/composables/use-themes'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import FileInput from '@/components/FileInput.vue'
import LineNumbers from '@/components/LineNumbers.vue'
import ResultsList from '@/components/ResultsList.vue'

export default createComponent({
  name: 'App',

  components: {
    AppFooter,
    AppHeader,
    FileInput,
    LineNumbers,
    ResultsList
  },

  setup() {
    const { imageColors } = useColors()
    const {
      themes,
      themeScoresSorted,
      getThemes,
      compareColors,
      isComparing
    } = useThemes()

    const submitColors = () => {
      compareColors(imageColors.value)
    }

    return {
      imageColors,
      themes,
      themeScoresSorted,
      getThemes,
      submitColors,
      isComparing
    }
  }
})
</script>

<style lang="scss">
@import './assets/scss/generic';

#app {
  margin: 9.6rem auto;
  max-width: 80rem;
  width: calc(100% - 6.4rem);

  @media (max-width: 32em) {
    margin: 6.4rem auto;
  }
}
</style>
