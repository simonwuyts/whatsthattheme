<template>
  <div class="c-upload">
    <label class="c-upload__wrapper">
      <input
        class="c-upload__input"
        type="file"
        @change="updateFile($event.target.files)"
      />
      <div class="c-upload__button">
        <div class="c-upload__label">Choose an image…</div>
      </div>
    </label>
    <div class="c-upload__note">…or drag it on the screen</div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { useColors } from '@/composables/use-colors'

export default createComponent({
  name: 'FileInput',
  setup() {
    const { imageColors, getImageColors } = useColors()

    function updateFile(files: FileList) {
      getImageColors(files[0])
    }

    return {
      imageColors,
      updateFile
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

.c-upload__button {
  background: linear-gradient(
    to bottom,
    var(--color-accent-light),
    var(--color-accent)
  );
  border: 0;
  border-radius: 0.8rem;
  box-shadow: inset 0 0 0 0.2rem var(--color-accent),
    0px 1.13351px 2.23268px rgba(204, 0, 135, 0.0279017),
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
  line-height: var(--line-height-lead);
  padding: 1.6rem 2.4rem;

  &:hover {
    opacity: 0.8;
  }
}

.c-upload__note {
  color: var(--color-accent);
  opacity: 0.6;
}
</style>
