// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Collectible<
      T extends Generic,
      X extends Generic
      > =
         $2<Collectible.type, T, X>

   export namespace Collectible {
      export type _Collectible<T, X> =
         T extends Generic ?
         X extends Generic
            ?
               Reducible.Augmentor<T, X>
               & AsyncReducible.Augmentor<T, X>
               & {
                  collector: <S>() => Reducer<$<X, S>, $<T, S>>
                  asyncCollector: <S>() => AsyncReducer<$<X, S>, $<T, S>>
               }
            : never : never

      export const type = "Collectible"
      export type type = typeof type
   }

   export namespace Bivariate {
      export interface Register<A1, A2> {
         [Collectible.type]: Collectible._Collectible<A1, A2>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Collectible,
   Generic,
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const collector = <T extends Generic, X extends Generic>(
   { collector }: Collectible<T, X>
   ): Collectible<T, X>["collector"] =>
      collector

export const asyncCollector = <T extends Generic, X extends Generic>(
   { asyncCollector }: Collectible<T, X>
   ): Collectible<T, X>["asyncCollector"] =>
      asyncCollector

export const asyncCollectorFromCollector = <T extends Generic, X extends Generic>(
   collector: Collectible<T, X>["collector"]
   ): Collectible<T, X>["asyncCollector"] =>
      <S>() =>
         {
            const { init, step } = collector()

            return {
               init: async () => init(),
               step: s => async acc => step(s)(acc)
            }
         }
