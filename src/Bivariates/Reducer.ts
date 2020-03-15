// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Reducer<S, T> = $2<Reducer.name, S, T>

   export namespace Reducer {
      export type Type<S, T> = {
         init: () => T
         step: (s: S, t: T) => T
      }

      export const name = "Reducer"
      export type name = typeof name
   }

   export namespace Bivariate {
      export interface Eval<A1, A2> {
         [Reducer.name]: Reducer.Type<A1, A2>
      }
   }
}

// Can we make this possible in TS?
// Most of the constructions on reducers should still work
// (if C is shapable, a category, etc...)
//
// declare module "./index" {
//    export type EnrichedReducer<S, T> = $2<EnrichedReducer.name, S, T>
//
//    export namespace EnrichedReducer {
//       export type Type<S, T, C extends Bivariate.Type> = {
//          init: () => T
//          step: $2<C, S, $2<C, T, T>>
//       }
//       export const name = "EnrichedReducer"
//       export type name = typeof name
//    }
//
//    export namespace Bivariate {
//       export interface Eval<A1, A2> {
//          [EnrichedReducer.name]: EnrichedReducer.Type<A1, A2>
//       }
//    }
// }

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Shapeable,
   Reducer,
   Product,
   Incorporatable,
   Construction
} from ".."

import {
   restrictTo,
   constructionFromIncorporate,
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const final: Shapeable<Reducer.name>["final"] = <S>
   (): Reducer<S, {}> =>
      ({
         init:
            () =>
               ({}),
         step:
            (s: S, _) =>
               ({})
      })

const liftName: Shapeable<Reducer.name>["liftName"] =
   <K extends string, S extends Product, T>(
      k: K, m: Reducer<S, T>
   ): Reducer<S, Record<K, T>> =>
      ({
         init: () => ({ [k]: m.init() }) as Record<K, T>,
         step:
            (step, { [k]: acc }) =>
               ({ [k]: m.step(step, acc) }) as Record<K, T>,
      })

const merge: Shapeable<Reducer.name>["merge"] =
   (r1, r2) =>
      ({
         init:
            () =>
               ({
                  ...r1.init(),
                  ...r2.init()
               }),
         step:
            (step, acc) =>
               ({
                  ...(r1.step(step, acc)),
                  ...(r2.step(step, acc)),
               })
      })

const incorporate: Incorporatable<Reducer.name>["incorporate"] =
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
               (s, pt) =>
                  {
                     const pp = r1.step(s, pr1(pt))

                     return {
                        ...pp,
                        ...r2.step({...s, ...pp}, pr2(pt))
                     }
                  }
         })
      }

const { construct } = constructionFromIncorporate<Reducer.name>({
   final,
   liftName,
   merge,
   incorporate
})

// ---------------------------------------------------------------------------
// Augmentations
// ---------------------------------------------------------------------------

export const reducer
   : Shapeable<Reducer.name>
   & Incorporatable<Reducer.name>
   & Construction<Reducer.name>
   =
      {
         final,
         liftName,
         merge,
         incorporate,
         construct
      }
