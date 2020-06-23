// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../types" {
   export type Array<S> = S[]

   export namespace Array {
      export const type = "Array"
      export type type = typeof type

      export type HigherType =
         Collectible<Array.type, Identity.type>
         & Functor<Array.type>

      export type Augmented<S> =
         Reducible<S>
         & AsyncReducible<S>
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
   AsyncReducer,
   Augmentation,
   Functor,
   Mor,
} from ".."

import {
   augment,
   transducer,
   transformableFromCollectible,
} from ".."
import { asyncCollectorFromCollector } from "../HigherKindedTypes/Collectible"

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const asReducible: Collectible<Array.type, Identity.type>["asReducible"] = <S>(
   items: Array<S>) =>
      ({
         reduce: <A>(
            { init, step }: Reducer<S, A>) =>
               {
                  let acc: A = init()

                  for(const s of items) {
                     acc = step(s)(acc)
                  }

                  return acc
               }
      })

const asAsyncReducible: Collectible<Array.type, Identity.type>["asAsyncReducible"] = <S>(
   items: Array<S>) =>
      ({
         reduceAsync: async <A>(
            { init, step }: AsyncReducer<S, A>) =>
               {
                  let acc: A = await init()

                  for(const s of items) {
                     acc = await step(s)(acc)
                  }

                  return acc
               }
      })

const collector: Collectible<Array.type, Identity.type>["collector"] = <S>() =>
   ({
      init: () => [],
      step:
         s => acc =>
            [...acc, s]
   }) as Reducer<S, Array<S>>

const asyncCollector: Collectible<Array.type, Identity.type>["asyncCollector"] =
   asyncCollectorFromCollector(collector)

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

const augmentation: Augmentation<Array.type, Array.augmented> = <S>(
   arr: Array<S>) =>
      ({
         ...asReducible(arr),
         ...asAsyncReducible(arr),
         map: <T>(fn: Mor<S, T>) => map(fn)(arr),
      })

const higherType: Array.HigherType = {
   asReducible,
   asAsyncReducible,
   collector,
   asyncCollector,
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