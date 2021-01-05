// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../types" {
   export type AsyncReducer<S, A> = {
      init: () => Promise<A>
      step: (s: S) => AsyncMor<A, A>
   }

   export namespace AsyncReducer {
      export const type: unique symbol
      export type type = typeof type

      export type HigherType =
         Extendable<AsyncReducer.type>
         & Nameable<AsyncReducer.type>
         & Comprehendible<AsyncReducer.type>
         & {
            fromReducer: <S, T>(red: Reducer<S, T>) => AsyncReducer<S, T>,
            project: <S, T>(fn: Mor<S, T>, init: T) => AsyncReducer<S, T>
         }
   }

   export namespace Bivariate {
      export interface Register<A1, A2> {
         [AsyncReducer.type]: AsyncReducer<A1, A2>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   AsyncReducer,
   Product,
   Extendable,
   Nameable,
   Reducer,
   Mor,
} from ".."

import {
   defineExtendable,
   defineComprehendible,
} from ".."
import { reducer } from "./Reducer"

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const { extend, hoist }: Extendable<AsyncReducer.type> =
   defineExtendable({
      initial:
         <S>() =>
            ({
               init:
                  async () => ({}),
               step:
                  (_: S) =>
                     async () => ({})
            }),
      hoist: <S, T>(
         red: AsyncReducer<S, T>) =>
            ({
               init:
                  red.init,
               step:
                  ([s, _]: [S, {}]) =>
                     async (acc: T) =>
                        await red.step(s)(acc)
            }),
      extend: <S, B extends Product, E extends Product>(
         base: AsyncReducer<S, B>,
         extension: AsyncReducer<[S, B], E>
         ): AsyncReducer<S, B & E> =>
            ({
               init:
                  async () =>
                     ({
                        ...await base.init(),
                        ...await extension.init(),
                     }),
               step:
                  s =>
                     async acc =>
                        {
                           const b = await base.step(s)(acc)

                           return {
                              ...b,
                              ...await extension.step([s, b])(acc)
                           }
                        }
            })
   })

const liftName: Nameable<AsyncReducer.type>["liftName"] = <K extends string>(
   k: K) => <S, T>(
      asred: AsyncReducer<S, T>
      ) =>
         ({
            init:
               async () =>
                  ({
                     [k]: await asred.init()
                  }) as Record<K, T>,
            step:
               (s: S) =>
                  async ({ [k]: t }: Record<K, T>) =>
                     ({
                        [k]: await asred.step(s)(t)
                     }) as Record<K, T>
         })

const { comprehend } = defineComprehendible<AsyncReducer.type>({
   liftName,
   extend
})

const fromReducer = <S, A>(
   { init, step }: Reducer<S, A>
   ): AsyncReducer<S, A> =>
      ({
         init: async () => init(),
         step: s => async acc => step(s)(acc)
      })

const project = <S, T>(
   fn: Mor<S, T>,
   init: T
   ): AsyncReducer<S, T> =>
      fromReducer(reducer.project(fn, init))

// ---------------------------------------------------------------------------
// Augmentations
// ---------------------------------------------------------------------------

export const asyncReducer
   : AsyncReducer.HigherType
   =
      {
         hoist,
         extend,
         liftName,
         comprehend,
         fromReducer,
         project
      }
