// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Collectible<T, X> = $2<Collectible.name, T, X>

   export namespace Collectible {
      export type Type<T, X> =
         T extends Generic.Type ?
         X extends Generic.Type
            ?
               {
                  asReducible: <S>(tx: $<T, S>) => Reducible<$<X, S>>
                  collector: <S>() => Reducer<$<X, S>, $<T, S>>
               }
            : never : never

      export const name = "Collectible"
      export type name = typeof name
   }

   export namespace Bivariate {
      export interface Eval<A1, A2> {
         [Collectible.name]: Collectible.Type<A1, A2>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Collectible,
   Generic
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const asReducible = <
   T extends Generic.Type,
   X extends Generic.Type
   >
   ({ asReducible }: Collectible<T, X>)
   : Collectible<T, X>["asReducible"] =>
      asReducible

export const collector = <
   T extends Generic.Type,
   X extends Generic.Type
   >
   ({ collector }: Collectible<T, X>)
   : Collectible<T, X>["collector"] =>
      collector
