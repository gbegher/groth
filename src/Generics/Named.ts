// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Named<S> = $<Named.name, S>

   export namespace Named {
      export type Type<T> = [string, T]

      export const name = "Named"
      export type name = typeof name
   }

   export namespace Generic {
      export interface Eval<A1> {
         [Named.name]: Named.Type<A1>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Functor,
   Named
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const map: Functor<Named.name>["map"] =
   fn =>
      ([k, v]) =>
         [k, fn(v)]

// ---------------------------------------------------------------------------
// Augmentation
// ---------------------------------------------------------------------------

export const named
   : Functor<Named.name>
   = {
      map
   }
