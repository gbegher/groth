// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type AsyncReducer<S, A> = {
      init: () => Promise<A>
      step: (s: S) => AsyncMor<A, A>
   }

   export namespace AsyncReducer {
      export const type = "AsyncReducer"
      export type type = typeof type
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
} from ".."

import {
   defineExtendable
} from ".."

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
                  (s: S) =>
                     async () => ({})
            }),
      hoist: <S, T>(
         red: AsyncReducer<S, T>) =>
            ({
               init:
                  red.init,
               step:
                  ([s, {}]: [S, {}]) =>
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
      asred: AsyncReducer<S, T>) =>
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

// ---------------------------------------------------------------------------
// Augmentations
// ---------------------------------------------------------------------------

export const reducer
   : Extendable<AsyncReducer.type>
   & Nameable<AsyncReducer.type>
   =
      {
         hoist,
         extend,
         liftName
      }
