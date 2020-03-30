// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Array<S> = S[]

   export namespace Array {
      export const type = "Array"
      export type type = typeof type

      export type HigherType =
         Collectible<Array.type, Identity.type>
         & Transformable<Array.type>
         & Functor<Array.type>

      export type AugmentedType<T> =
         Reducible<T>

      export const augmented = "Array.Augmented"
      export type augmented = typeof augmented
   }

   export namespace Generic {
      export interface Register<A1> {
         [Array.type]: Array<A1>
         [Array.augmented]: Array.AugmentedType<A1>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Array,
   Identity,
   Collectible,
   Reducer,
   Augmentation,
   Functor,
} from ".."

import {
   transformableFromCollectible,
   augment
} from ".."
import { transducer } from "../Bivariates/Transducer"

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const asReducible: Collectible<Array.type, Identity.type>["asReducible"] =
   <S>(array: Array<S>) =>
      ({
         reduce: <T>
            ({ init, step }: Reducer<S, T>)
            : T =>
               array.reduce(
                  (t, s) => step(s, t),
                  init())
      })

const collector: Collectible<Array.type, Identity.type>["collector"] =
   <S>() =>
      ({
         init: () => [],
         step:
            (s, acc) =>
               [...acc, s]
      }) as Reducer<S, Array<S>>

const { transform } =
   transformableFromCollectible<Array.type, Identity.type>({
      asReducible,
      collector
   })

const map: Functor<Array.type>["map"] =
   mor =>
      transform(transducer.map(mor))


// ---------------------------------------------------------------------------
// Augmentation
// ---------------------------------------------------------------------------

const augmentation: Augmentation<Array.type, Array.augmented> =
   <S>(x: Array<S>) =>
      asReducible(x)

const higherType
   : Array.HigherType
   = {
      asReducible,
      collector,
      transform,
      map
   }

export const array = augment<
      Array.type,
      Array.augmented,
      typeof higherType
   >(
      augmentation,
      higherType
   )