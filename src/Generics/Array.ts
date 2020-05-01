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
         // & Transformable<Array.type>
         & Functor<Array.type>

      export type Augmented<S> =
         Reducible<S>
         & { map: <T>(fn: Mor<S, T>) => Array<T> }

      export const augmented = "Array.Augmented"
      export type augmented = typeof augmented
   }

   export namespace Generic {
      export interface Register<A1> {
         [Array.type]: Array<A1>
         [Array.augmented]: Array.Augmented<A1>
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
   Mor,
} from ".."

import {
   // transformableFromCollectible,
   augment,
   transducer
} from ".."
import { transformableFromCollectible } from "../HigherKindedTypes/Transformable"

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
                  (t, s) => step(s)(t),
                  init())
      })

const collector: Collectible<Array.type, Identity.type>["collector"] =
   <S>() =>
      ({
         init: () => [],
         step:
            s => acc =>
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
   <S>(arr: Array<S>) =>
      ({
         ...asReducible(arr),
         map: <T>(fn: Mor<S, T>) => map(fn)(arr),
      })


const higherType
   : Array.HigherType
   = {
      asReducible,
      collector,
      // transform,
      map
   }

export const array = augment<
      Array.type,
      Array.augmented,
      Array.HigherType
   >(
      augmentation,
      higherType
   )