// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Transformable<T extends Generic> = $<Transformable.type, T>

   export namespace Transformable {
      export type Eval<T> =
         T extends Generic
            ?
               {
                  transform: Functor<T, Transducer.type, Mor.type>["map"]
               }
            : never

      export const type = "Transformable"
      export type type = typeof type
   }

   export namespace Generic {
      export interface Register<A1> {
         [Transformable.type]: Transformable.Eval<A1>
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

export const transform = <T extends Generic>(
   { transform }: Transformable<T>)
   : Transformable<T>["transform"] =>
      transform

// maybe extract into apply.ts as apply.transform?
export const applyTransform = <T extends Generic>(
   { transform }: Transformable<T>)
   : <X, Y>(tx: $<T, X>, tr: Transducer<X, Y>) => $<T, Y> =>
      (tr, tx) =>
         transform(tr)(tx)

// ---------------------------------------------------------------------------
// Theorems
// ---------------------------------------------------------------------------

export const transformableFromCollectible = <
   T extends Generic,
   X extends Generic
   >
   ({
      asReducible,
      collector
   }: Collectible<T, X>)
   : Transformable<T> =>
      ({
         transform:
            tr =>
               tx =>
                  asReducible(tx)
                     .reduce(
                        tr(collector()))
      }) as Transformable<T>

