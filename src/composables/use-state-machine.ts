import { Machine, assign, interpret, State, EventObject } from 'xstate'
import { getImageColors, ColorResult } from '@/composables/use-colors'
import { getThemes, compareColors, ThemeResult } from '@/composables/use-themes'
import { ref, Ref } from '@vue/composition-api'

import './use-composition-api'

export interface StateContext {
  imageFile?: File
  imageColors: ColorResult[]
  themes: ThemeResult[]
  themeScores: ThemeResult[]
}

interface StateSchema {
  states: {
    idle: {}
    fetchingThemes: {}
    extractingColors: {}
    comparing: {}
    results: {}
  }
}

export const compareMachine = Machine<StateContext, StateSchema>(
  {
    id: 'compare',
    initial: 'idle',

    context: {
      imageFile: undefined,
      imageColors: [],
      themes: [],
      themeScores: []
    } as StateContext,

    states: {
      idle: {
        on: {
          UPDATE_IMAGE: [
            {
              cond: 'hasThemes',
              target: 'extractingColors',
              actions: 'setImageFile'
            },
            {
              cond: 'noThemes',
              target: 'fetchingThemes',
              actions: 'setImageFile'
            }
          ]
        }
      },
      fetchingThemes: {
        invoke: {
          id: 'fetchThemes',
          src: 'getThemes',
          onDone: {
            target: 'extractingColors',
            actions: 'setThemes'
          },
          onError: {
            target: 'idle'
          }
        }
      },
      extractingColors: {
        invoke: {
          id: 'extractColors',
          src: 'getImageColors',
          onDone: {
            target: 'comparing',
            actions: 'setImageColors'
          },
          onError: {
            target: 'idle'
          }
        }
      },
      comparing: {
        invoke: {
          id: 'compare',
          src: 'compareColors',
          onDone: {
            target: 'results',
            actions: 'setThemeScores'
          },
          onError: {
            target: 'idle'
          }
        }
      },
      results: {
        on: {
          UPDATE_IMAGE: {
            target: 'extractingColors',
            actions: 'setImageFile'
          }
        }
      }
    }
  },
  {
    actions: {
      setImageFile: assign({ imageFile: (context, event) => event.value }),
      setImageColors: assign({ imageColors: (context, event) => event.data }),
      setThemes: assign({ themes: (context, event) => event.data }),
      setThemeScores: assign({ themeScores: (context, event) => event.data })
    },
    guards: {
      noThemes: (context: StateContext) => context.themes.length === 0,
      hasThemes: (context: StateContext) => context.themes.length > 0
    },
    services: {
      getThemes: () => getThemes(),
      getImageColors: context => getImageColors(context.imageFile),
      compareColors: context =>
        compareColors(context.imageColors, context.themes)
    }
  }
)

export const compareService = interpret(compareMachine)

const send = compareService.send
const state: Ref<State<StateContext>> = ref(compareService.state)

compareService.onTransition(newState => (state.value = newState))

compareService.start()

export function useStateMachine() {
  return {
    send,
    state
  }
}
