// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Array<S> = $<Array.name, S>

   export namespace Array {
      export type Type<T> = T[]

      export const name = "Array"
      export type name = typeof name
   }

   export namespace Generic {
      export interface Eval<A1> {
         [Array.name]: Array.Type<A1>
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
   Transformable
} from ".."

import {
   transformableFromCollectible
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const asReducible: Collectible<Array.name, Identity.name>["asReducible"] =
   <S>(array: Array<S>) =>
      ({
         reduce: <T>
            ({ init, step }: Reducer<S, T>)
            : T =>
               array.reduce(
                  (t, s) => step(s, t),
                  init())
      })

const collector: Collectible<Array.name, Identity.name>["collector"] =
   <S>() =>
      ({
         init: () => [],
         step:
            (s, acc) =>
               [...acc, s]
      }) as Reducer<S, Array<S>>

const { transform } =
   transformableFromCollectible<Array.name, Identity.name>({
      asReducible,
      collector
   })

// ---------------------------------------------------------------------------
// Augmentation
// ---------------------------------------------------------------------------

export const array
   : Collectible<Array.name, Identity.name>
   & Transformable<Array.name>
   = {
      asReducible,
      collector,
      transform,
   }