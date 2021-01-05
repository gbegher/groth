// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../types" {
   export type Transformable<
      T extends Generic,
      X extends Generic=Identity.type
   > =
      $2<Transformable.type, T, X>

   export type AsyncTransformable<
      T extends Generic,
      X extends Generic=Identity.type
   > =
      $2<AsyncTransformable.type, T, X>

   export namespace Transformable {
      export type _Transformable<F, X, C=Mor.type> =
         F extends Generic ?
         X extends Generic ?
         C extends Bivariate
            ?
               {
                  transform: <S, T>(tr: Transducer<$<X, S>, $<X, T>>) => $2<C, $<F, S>, $<F, T>>
               }
            : never : never : never

      export const type: unique symbol
      export type type = typeof type
   }

   export namespace AsyncTransformable {
      export type _AsyncTransformable<F, X, C=Mor.type> =
         F extends Generic ?
         X extends Generic
            ?
               {
                  transformAsync: <S, T>(tr: AsyncTransducer<$<X, S>, $<X, T>>) => AsyncMor<$<F, S>, $<F, T>>
               }
            : never : never

      export const type: unique symbol
      export type type = typeof type
   }

   export namespace Bivariate {
      export interface Register<A1, A2> {
         [Transformable.type]: Transformable._Transformable<A1, A2>
         [AsyncTransformable.type]: AsyncTransformable._AsyncTransformable<A1, A2>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import {
   AsyncTransformable,
   Generic,
   Transducer,
   Transformable,
   Collectible,
   $,
   AsyncTransducer,
   AsyncReducer,
   AsyncMor,
   AsyncReducible,
   Product,
   Named,
} from "../types"

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
      { asReducible, collector }: Pick<Collectible<F, X>, "asReducible" | "collector">
   ): Transformable<F, X> =>
      ({
         transform:
            <S, T>(tr: Transducer<$<X, S>, $<X, T>>) =>
               (fs: $<F, S>) =>
                  asReducible<S>(fs)
                     .reduce(
                        tr(collector()))
      }) as Transformable<F, X>

export const asyncTransformableFromCollectible = <
      F extends Generic,
      X extends Generic
   >(
      { asAsyncReducible, asyncCollector }: Pick<Collectible<F, X>, "asAsyncReducible" | "asyncCollector">
   ): AsyncTransformable<F, X> =>
      ({
         transformAsync: <S, T>(
            tr: AsyncTransducer<$<X, S>, $<X, T>>) =>
               (fs: $<F, S>) =>
                  asAsyncReducible<S>(fs)
                     .reduceAsync(
                        tr(asyncCollector()))
      }) as AsyncTransformable<F, X>
