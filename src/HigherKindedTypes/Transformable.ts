// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Transformable<T extends Generic.Type> = $<Transformable.name, T>

   export namespace Transformable {
      export type Type<T> =
         T extends Generic.Type
            ?
               {
                  transform: Functor<T, Transducer.name, Mor.name>["map"]
               }
            : never

      export const name = "Transformable"
      export type name = typeof name
   }

   export namespace Generic {
      export interface Eval<A1> {
         [Transformable.name]: Transformable.Type<A1>
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

export const transform = <T extends Generic.Type>(
   { transform }: Transformable<T>)
   : Transformable<T>["transform"] =>
      transform

// maybe extract into apply.ts as apply.transform?
export const applyTransform = <T extends Generic.Type>(
   { transform }: Transformable<T>)
   : <X, Y>(tx: $<T, X>, tr: Transducer<X, Y>) => $<T, Y> =>
      (tr, tx) =>
         transform(tr)(tx)

// ---------------------------------------------------------------------------
// Theorems
// ---------------------------------------------------------------------------

export const transformableFromCollectible = <
   T extends Generic.Type,
   X extends Generic.Type
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

