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
         & Nameable<Array.kleisli>
         & Extendable<Array.kleisli>
         & Comprehendible<Array.kleisli>

      export type Augmented<S> =
         Reducible<S>
         & AsyncReducible<S>
         & { map: <T>(fn: Mor<S, T>) => Array<T> }

      export const augmented = "Array.Augmented"
      export type augmented = typeof augmented

      export type Kleisli<A1, A2> = Mor<A1, Array<A2>>

      export const kleisli = "Array.kleisli"
      export type kleisli = typeof kleisli
   }

   export namespace Generic {
      export interface Register<A1> {
         [Array.type]: Array<A1>
         [Array.augmented]: Array.Augmented<A1>
      }
   }

   export namespace Bivariate {
      export interface Register<A1, A2> {
         [Array.kleisli]: Array.Kleisli<A1, A2>
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
   Nameable,
   Extendable,
   Product,
} from ".."

import {
   augment,
   transducer,
   transformableFromCollectible,
   asyncCollectorFromCollector,
   defineComprehendible,
   defineExtendable,
} from ".."

import { llog } from "../util"

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

const liftName: Nameable<Array.kleisli>["liftName"] = <K extends string>(
   k: K) => <S, T>(
      fn: Array.Kleisli<S, T>) =>
         (s: S) =>
            fn(s).map(
               t => ({ [k]: t } as Record<K, T>))

const { extend, hoist }: Extendable<Array.kleisli> =
   defineExtendable({
      initial:
         <S>() =>
            () => [{}] as Array<S>,
      hoist: <S, T>(
         fn: Array.Kleisli<S, T>) =>
            ([s, _]: [S, {}]) => fn(s),
      extend: <S, B extends Product, E extends Product>(
         base: Array.Kleisli<S, B>,
         extension: Array.Kleisli<[S, B], E>
         ): Array.Kleisli<S, B & E> =>
            (s: S) =>
               {
                  return array(base(s)).reduce({
                     init: () => [] as Array<B & E>,
                     step:
                        b => acc =>
                           {
                              llog({
                                 acc,
                                 b,
                                 ext: extension([s, b]),
                                 new: extension([s, b]).map(
                                    e => {
                                       llog({s, b, e}, "extending")
                                       return ({ ...b, ...e })
                                    }
                                 )
                              })

                              return [
                                 ...acc,
                                 ...extension([s, b]).map(
                                    e => ({...b, ...e })
                                 )
                              ]
                           }
                  })
               }
   })

const { comprehend } = defineComprehendible<Array.kleisli>({
   liftName,
   extend,
})

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
   map,
   liftName,
   extend,
   hoist,
   comprehend,
}

export const array = augment<
      Array.type,
      Array.augmented,
      Array.HigherType
   >(
      augmentation,
      higherType
   )
