// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Reducible<S> = $<Reducible.name, S>

   export namespace Reducible {
      export type Type<S> = {
         reduce: <T>(reducer: Reducer<S, T>) => T
      }

      export const name = "Reducible"
      export type name = typeof name
   }

   export namespace Generic {
      export interface Eval<A1> {
         [Reducible.name]: Reducible.Type<A1>
      }
   }
}


// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Reducible,
   Mor,
   Functor
} from ".."

import {
   transducer
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const map = <S, T>
   (fn: Mor<S, T>)
   : Mor<Reducible<S>, Reducible<T>> =>
      reducible =>
         ({
            reduce:
               reducer =>
                  reducible.reduce(
                     transducer.map(fn)(reducer))
         })

// ---------------------------------------------------------------------------
// Utility functions
// ---------------------------------------------------------------------------

export const forall = <S>(
   red: Reducible<S>,
   pred: Mor<S, boolean>
): boolean =>
   red.reduce({
      init: () => true as boolean,
      step:
         (s, acc) =>
            acc && pred(s)
   })

export const exists = <S>(
   red: Reducible<S>,
   pred: Mor<S, boolean>
): boolean =>
   red.reduce({
      init: () => false as boolean,
      step:
         (s, acc) =>
            acc || pred(s)
   })

// ---------------------------------------------------------------------------
// Augmentation
// ---------------------------------------------------------------------------

export const reducible:
   Functor<Reducible.name, Mor.name, Mor.name> =
      {
         map
      }
