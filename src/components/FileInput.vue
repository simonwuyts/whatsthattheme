<template>
  <div class="c-upload">
    <label class="c-upload__wrapper">
      <input
        class="c-upload__input"
        :class="{
          'c-upload__input--processing': showProcessingLabel || showLoadingLabel
        }"
        type="file"
        @change="updateFile($event.target.files)"
      />
      <div
        class="c-upload__button"
        :class="{
          'c-upload__button--processing':
            showProcessingLabel || showLoadingLabel
        }"
      >
        <svg class="c-upload__indicator" v-if="showProcessingLabel">
          <defs>
            <mask id="indicatorMask">
              <rect width="100%" height="100%" x="0" y="0" fill="#000" />
              <rect width="100%" height="100%" x="0" y="0" fill="#FFF" rx="8" />
            </mask>
          </defs>
          <rect
            class="c-upload__line"
            mask="url(#indicatorMask)"
            width="100%"
            height="100%"
            x="0"
            y="0"
            rx="8"
          />
        </svg>
        <div class="c-upload__label" v-if="showLoadingLabel">
          Loading image…
        </div>
        <div class="c-upload__label" v-if="showProcessingLabel">
          Processing…
        </div>
        <div
          class="c-upload__label"
          v-if="!showLoadingLabel && !showProcessingLabel"
        >
          Choose an image…
        </div>
      </div>
    </label>
    <div class="c-upload__note">
      <span v-if="showProcessingLabel || showLoadingLabel"
        >…this might take a minute</span
      >
      <span v-else>…or drag it on the screen</span>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
import { useStateMachine } from '@/composables/use-state-machine'

export default createComponent({
  name: 'FileInput',
  setup() {
    const { state, send } = useStateMachine()

    const showProcessingLabel = computed(() => {
      return state.value.matches('comparing')
    })

    const showLoadingLabel = computed(() => {
      return (
        state.value.matches('extractingColors') ||
        state.value.matches('fetchingThemes')
      )
    })

    function updateFile(files: FileList) {
      send({
        type: 'UPDATE_IMAGE',
        value: files[0]
      })
    }

    return {
      updateFile,
      state,
      showProcessingLabel,
      showLoadingLabel
    }
  }
})
</script>

<style lang="scss">
.c-upload__wrapper {
  overflow: hidden;
  position: relative;
}

.c-upload__input {
  bottom: 0;
  cursor: pointer;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.c-upload__input--processing {
  pointer-events: none;
}

.c-upload__button {
  background: linear-gradient(
    to bottom,
    var(--color-accent-light),
    var(--color-accent)
  );
  border: 0;
  border-radius: 0.8rem;
  box-shadow: 0px 1.13351px 2.23268px rgba(204, 0, 135, 0.0279017),
    0px 2.86674px 5.64662px rgba(204, 0, 135, 0.0399338),
    0px 5.84789px 11.5186px rgba(204, 0, 135, 0.0500662),
    0px 12.0455px 23.7261px rgba(204, 0, 135, 0.0620983),
    0px 33px 65px rgba(204, 0, 135, 0.09);
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: var(--font-size-lead);
  font-weight: 700;
  justify-content: center;
  line-height: var(--line-height-lead);
  padding: 1.6rem 0;
  position: relative;
  text-align: center;
  width: 24rem;

  &:hover {
    opacity: 0.8;
  }
}

.c-upload__button--processing {
  background: #fff;
  color: var(--color-accent);
  pointer-events: none;
}

.c-upload__indicator {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

@keyframes rotatingLine {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -1240;
  }
}

.c-upload__line {
  animation: rotatingLine 4s linear 0s infinite both;
  fill: none;
  stroke: var(--color-accent);
  stroke-width: 6;
  stroke-dasharray: 310 310;
}

.c-upload__note {
  color: var(--color-accent);
  opacity: 0.6;
}
</style>
