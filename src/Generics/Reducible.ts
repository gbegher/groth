// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../types" {
   export type Reducible<S> = {
      reduce: <T>(reducer: Reducer<S, T>) => T
   }

   export namespace Reducible {
      export const type = "Reducible"
      export type type = typeof type

      export type HigherType =
         Functor<Reducible.type, Mor.type, Mor.type>
         & Transformable<Reducible.type>

      export type Augmented<S> =
         Reducible<S>
         & {
            transform: <T>(fn: Transducer<S, T>) => Reducible<T>
            map: <T>(fn: Mor<S, T>) => Reducible<T>
         }

      export const augmented = "Reducible.Augmented"
      export type augmented = typeof augmented

      export type Augmentor<F, X> =
         F extends Generic ?
         X extends Generic
            ?
               {
                  asReducible: <S>(fs: $<F, S>) => Reducible<$<X, S>>
               }
            : never : never

      export const augmentor = "Reducible.Augmentor"
      export type augmentor = typeof augmentor
   }

   export namespace Generic {
      export interface Register<A1> {
         [Reducible.type]: Reducible<A1>
         [Reducible.augmented]: Reducible.Augmented<A1>
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
   Generic,
   Transducer,
   Augmentation
} from ".."

import {
   transducer,
   augment,
} from ".."

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

const transform = <S, T>(
   tr: Transducer<S, T>
   ) => (
      reducible: Reducible<S>
      ): Reducible<T> =>
         ({
            reduce:
               reducer =>
                  reducible.reduce(tr(reducer))
         })

const map = <S, T>
   (fn: Mor<S, T>)
   : Mor<Reducible<S>, Reducible<T>> =>
      reducible =>
         transform(transducer.map(fn))(reducible)

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

const augmentation: Augmentation<Reducible.type, Reducible.augmented> = <S>(
   rs: Reducible<S>) =>
      ({
         reduce: rs.reduce,
         transform: <T>(tr: Transducer<S, T>) => transform(tr)(rs),
         map: <T>(fn: Mor<S, T>) => map(fn)(rs),
      })

const higherType: Reducible.HigherType = {
   map,
   transform
}

export const reducible = augment<
      Reducible.type,
      Reducible.augmented,
      Reducible.HigherType
   >(
      augmentation,
      higherType
   )
