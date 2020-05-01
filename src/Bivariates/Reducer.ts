// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Reducer<S, A> = {
      init: () => A
      step: (s: S) => Mor<A, A>
   }

   export namespace Reducer {
      export const type = "Reducer"
      export type type = typeof type
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
   Shapeable,
   Reducer,
   Product,
   Incorporatable,
   Construction,
   Extendable,
   exclude,
   Demergable,
} from ".."

import {
   restrictTo,
   constructionFromExtendable,
} from ".."
import { completeExtendable } from "../HigherKindedTypes/Extendable"

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const final: Shapeable<Reducer.type>["final"] = <S>
   (): Reducer<S, {}> =>
      ({
         init:
            () =>
               ({}),
         step:
            (s: S) => (_) =>
               ({})
      })

const liftName: Shapeable<Reducer.type>["liftName"] =
   <K extends string, S extends Product, T>(
      k: K, m: Reducer<S, T>
   ): Reducer<S, Record<K, T>> =>
      ({
         init: () => ({ [k]: m.init() }) as Record<K, T>,
         step:
            s => ({ [k]: acc }) =>
               ({ [k]: m.step(s)(acc) }) as Record<K, T>,
      })

const merge: Shapeable<Reducer.type>["merge"] =
   (r1, r2) =>
      ({
         init:
            () =>
               ({
                  ...r1.init(),
                  ...r2.init()
               }),
         step:
            (s) => (acc) =>
               ({
                  ...(r1.step(s)(acc)),
                  ...(r2.step(s)(acc)),
               })
      })

const demerge: Demergable<Reducer.type>["demerge"] =
   red =>
      ({
         init: red.init,
         step:
            ([s, p]) => acc =>
               red.step({...s, ...p})(acc)
      })

const incorporate: Incorporatable<Reducer.type>["incorporate"] =
   (r1, r2) =>
      {
         const i1 = r1.init()
         const i2 = r2.init()

         // We have to project to P and T respectively
         const pr1 = restrictTo(i1)
         const pr2 = restrictTo(i2)

         return ({
            init:
               () =>
                  ({
                     ...i1,
                     ...i2
                  }),
            step:
               s => pt =>
                  {
                     const pp = r1.step(s)(pr1(pt))

                     return {
                        ...pp,
                        ...r2.step({...s, ...pp})(pr2(pt))
                     }
                  }
         })
      }

const { extend }: Extendable<Reducer.type> =
   completeExtendable(
      <S, P extends Product>(base: Reducer<S, P>) =>
         <K extends string, T>(
            [key, red]: [exclude<K, keyof P>, Reducer<[S, P], T>]) =>
               ({
                  init:
                     () =>
                        ({
                           ...base.init(),
                           [key]: red.init()
                        }) as P & Record<K, T>,
                  step:
                     (s: S) =>
                        (pp: P & Record<K, T>) =>
                           {
                              const { [key as K]: t, ...p } = pp

                              const nextBase = base.step(s)(p as P)

                              return {
                                 ...nextBase,
                                 [key as string]: red.step([s, nextBase])(t as T)
                              } as P & Record<K, T>
                           }
               })
   )

const { construct } = constructionFromExtendable<Reducer.type>({
   final,
   extend,
   demerge
})

// ---------------------------------------------------------------------------
// Augmentations
// ---------------------------------------------------------------------------

export const reducer
   : Shapeable<Reducer.type>
   & Incorporatable<Reducer.type>
   & Construction<Reducer.type>
   & Extendable<Reducer.type>
   & Demergable<Reducer.type>
   & Construction<Reducer.type>
   =
      {
         final,
         liftName,
         merge,
         incorporate,
         construct,
         demerge,
         extend
      }
