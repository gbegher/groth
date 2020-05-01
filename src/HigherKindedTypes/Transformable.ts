// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Transformable<
      T extends Generic,
      X extends Generic=Identity.type
   > =
      $2<Transformable.type, T, X>

   export namespace Transformable {
      export type _Transformable<F, X> =
         F extends Generic ?
         X extends Generic
            ?
               {
                  transform: <S, T>(tr: Transducer<$<X, S>, $<X, T>>) => Mor<$<F, S>, $<F, T>>
               }
            : never : never

      export const type = "Transformable"
      export type type = typeof type
   }

   export namespace Bivariate {
      export interface Register<A1, A2> {
         [Transformable.type]: Transformable._Transformable<A1, A2>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Generic,
   Transducer,
   Transformable,
   Collectible,
   $,
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Theorems
// ---------------------------------------------------------------------------

export const transformableFromCollectible = <
      F extends Generic,
      X extends Generic
   >(
      { asReducible, collector }: Collectible<F, X>
   ): Transformable<F, X> =>
      ({
         transform:
            <S, T>(tr: Transducer<$<X, S>, $<X, T>>) =>
               (fs: $<F, S>) =>
                  asReducible<S>(fs)
                     .reduce(
                        tr(collector()))
      }) as Transformable<F, X>
