// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Named<S> = $<Named.type, S>

   export namespace Named {
      export type Eval<T> = [string, T]

      export const type = "Named"
      export type type = typeof type
   }

   export namespace Generic {
      export interface Register<A1> {
         [Named.type]: Named.Eval<A1>
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

const map: Functor<Named.type>["map"] =
   fn =>
      ([k, v]) =>
         [k, fn(v)]

// ---------------------------------------------------------------------------
// Augmentation
// ---------------------------------------------------------------------------

export const named
   : Functor<Named.type>
   = {
      map
   }
