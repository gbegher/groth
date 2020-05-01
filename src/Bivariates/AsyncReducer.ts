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
   Shapeable,
   Product,
   Construction,
   Extendable,
   exclude,
   Demergable
} from ".."

import {
   constructionFromExtendable,
   completeExtendable
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const final: Shapeable<AsyncReducer.type>["final"] = <S>
   (): AsyncReducer<S, {}> =>
      ({
         init:
            async () => ({}),
         step:
            (s: S) =>
               async (_) => ({})
      })

const liftName: Shapeable<AsyncReducer.type>["liftName"] =
   <K extends string, S extends Product, T>(
      k: K, m: AsyncReducer<S, T>
   ): AsyncReducer<S, Record<K, T>> =>
      ({
         init:
            async () => ({ [k]: await m.init() }) as Record<K, T>,
         step:
            step =>
               async ({ [k]: acc }) =>
                  ({ [k]: await m.step(step)(acc) }) as Record<K, T>,
      })

const merge: Shapeable<AsyncReducer.type>["merge"] =
   (r1, r2) =>
      ({
         init:
            async () =>
               ({
                  ...await r1.init(),
                  ...await r2.init()
               }),
         step:
            step =>
               async acc =>
                  ({
                     ...(await r1.step(step)(acc)),
                     ...(await r2.step(step)(acc)),
                  })
      })

const demerge: Demergable<AsyncReducer.type>["demerge"] =
   asred =>
      ({
         init: asred.init,
         step:
            ([s, p]) => acc =>
               asred.step({...s, ...p})(acc)
      })

const { extend }: Extendable<AsyncReducer.type> =
   completeExtendable(
      <S, P extends Product>(base: AsyncReducer<S, P>) =>
         <K extends string, T>(
            [key, red]: [exclude<K, keyof P>, AsyncReducer<[S, P], T>]) =>
               ({
                  init:
                     async () =>
                        ({
                           ...await base.init(),
                           [key]: await red.init()
                        }) as P & Record<K, T>,
                  step:
                     (s: S) =>
                        async (pp: P & Record<K, T>) =>
                           {
                              const { [key as K]: t, ...p } = pp

                              const nextBase = await base.step(s)(p as P)

                              return {
                                 ...nextBase,
                                 [key as string]: red.step([s, nextBase])(t as T)
                              } as P & Record<K, T>
                           }
               })
   )

const { construct } = constructionFromExtendable<AsyncReducer.type>({
   final,
   extend,
   demerge
})

// ---------------------------------------------------------------------------
// Augmentations
// ---------------------------------------------------------------------------

export const reducer
   : Shapeable<AsyncReducer.type>
   & Extendable<AsyncReducer.type>
   & Demergable<AsyncReducer.type>
   & Construction<AsyncReducer.type>
   =
      {
         final,
         liftName,
         merge,
         extend,
         demerge,
         construct
      }
