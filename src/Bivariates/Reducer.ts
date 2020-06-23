// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../types" {
   export type Reducer<S, A> = {
      init: () => A
      step: (s: S) => Mor<A, A>
   }

   export namespace Reducer {
      export const type = "Reducer"
      export type type = typeof type

      export type HigherType =
         Extendable<Reducer.type>
         & Nameable<Reducer.type>
         & Comprehendible<Reducer.type>
         & {
            project: <S, T>(fn: Mor<S, T>, init: T) => Reducer<S, T>
         }
   }

   export namespace Bivariate {
      export interface Register<A1, A2> {
         [Reducer.type]: Reducer<A1, A2>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Reducer,
   Product,
   Extendable,
   Nameable,
   Mor,
} from ".."

import {
   defineExtendable,
   defineComprehendible,
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const { hoist, extend }: Extendable<Reducer.type> =
   defineExtendable({
      initial:
         () =>
            ({
               init:
                  () => ({}),
               step:
                  () => () =>
                     ({})
            }),
      hoist: <S, T>(
         red: Reducer<S, T>) =>
            ({
               init:
                  red.init,
               step:
                  ([s, _]: [S, {}]) => (acc: T) =>
                     red.step(s)(acc)
            }),
      extend: <S, B extends Product, E extends Product>(
         base: Reducer<S, B>,
         extension: Reducer<[S, B], E>
         ): Reducer<S, B & E> =>
               ({
                  init:
                     () =>
                        ({
                           ...base.init(),
                           ...extension.init()
                        }),
                  step:
                     (s: S) => (acc) =>
                        {
                           const b = base.step(s)(acc)

                           return {
                              ...b,
                              ...extension.step([s, b])(acc)
                           }
                        }
               })
   })

const liftName: Nameable<Reducer.type>["liftName"] = <K extends string>(
   k: K) => <S, T>(
      asred: Reducer<S, T>) =>
         ({
            init:
               () =>
                  ({
                     [k]: asred.init()
                  }) as Record<K, T>,
            step:
               (s: S) =>
                  ({ [k]: t }: Record<K, T>) =>
                     ({
                        [k]: asred.step(s)(t)
                     }) as Record<K, T>
         })

const { comprehend } = defineComprehendible({
   liftName,
   extend
})

export const project = <S, T>(
   fn: Mor<S, T>,
   init: T
   ): Reducer<S, T> =>
      ({
         init: () => init,
         step: s => _ => fn(s)
      })

// ---------------------------------------------------------------------------
// Augmentations
// ---------------------------------------------------------------------------

export const reducer
   : Reducer.HigherType
   =
      {
         extend,
         hoist,
         liftName,
         comprehend,
         project
      }
