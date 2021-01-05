// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../types" {
   export type Collectible<
      F extends Generic,
      X extends Generic
      > =
         Reducible.Augmentor<F, X>
         & AsyncReducible.Augmentor<F, X>
         & {
            collector: <S>() => Reducer<$<X, S>, $<F, S>>
            asyncCollector: <S>() => AsyncReducer<$<X, S>, $<F, S>>
         }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Collectible,
   Generic,
} from ".."
import { $, AsyncReducer, Reducer } from "../types"

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const collector = <F extends Generic, X extends Generic>(
   { collector }: Collectible<F, X>
   ): Collectible<F, X>["collector"] =>
      collector

export const asyncCollector = <F extends Generic, X extends Generic>(
   { asyncCollector }: Collectible<F, X>
   ): Collectible<F, X>["asyncCollector"] =>
      asyncCollector

export const asyncCollectorFromCollector = <F extends Generic, X extends Generic>(
   collector: Collectible<F, X>["collector"]
   ): Collectible<F, X>["asyncCollector"] =>
      <S>(): AsyncReducer<$<X, S>, $<F, S>> =>
         {
            const { init, step } = collector<S>()

            return {
               init: async () => init(),
               step: s => async acc => step(s)(acc)
            }
         }
