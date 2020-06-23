// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../types" {
   export type Reducible<S> = {
      reduce: <T>(reducer: Reducer<S, T>) => T
   }

   export namespace Reducible {
      export type Augmentor<F, X> =
         F extends Generic ?
         X extends Generic
            ?
               {
                  asReducible: <S>(fs: $<F, S>) => Reducible<$<X, S>>
               }
            : never : never

      export const type = "Reducible"
      export type type = typeof type

      export const augmentor = "Reducible.Augmentor"
      export type augmentor = typeof augmentor
   }

   export namespace Generic {
      export interface Register<A1> {
         [Reducible.type]: Reducible<A1>
      }
   }

   export namespace Bivariate {
      export interface Register<A1, A2> {
         [Reducible.augmentor]: Reducible.Augmentor<A1, A2>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Reducible,
   Mor,
   Functor,
   Generic,
} from ".."

import { transducer } from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const reduce = <S>(
   { reduce }: Reducible<S>) =>
      reduce

export const asReducible = <
   T extends Generic,
   X extends Generic
   >
   ({ asReducible }: Reducible.Augmentor<T, X>) =>
      asReducible

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
         s => acc =>
            acc && pred(s)
   })

export const exists = <S>(
   red: Reducible<S>,
   pred: Mor<S, boolean>
): boolean =>
   red.reduce({
      init: () => false as boolean,
      step:
         s => acc =>
            acc || pred(s)
   })

// ---------------------------------------------------------------------------
// Augmentation
// ---------------------------------------------------------------------------

export const reducible:
   Functor<Reducible.type, Mor.type, Mor.type> =
      {
         map
      }
