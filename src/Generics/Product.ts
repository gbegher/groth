// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Product<T = any> = Record<string, T>

   export namespace Product {
      export const type = "Product"
      export type type = typeof type

      export type HigherType =
         Functor<Product.type>
         & Collectible<Product.type, Named.type>
         & Transformable<Product.type, Named.type>
         & { mapNamed: Functor<Product.type, Named.cokleisli, Mor.type>["map"] }

      export type Augmented<S> =
         Reducible<Named<S>>
         & AsyncReducible<Named<S>>
         & Table<string, S>
         & { map: <T>(fn: Mor<S, T>) => Product<T> }
         & { mapNamed: <T>(fn: Mor<Named<S>, T>) => Product<T> }

      export const augmented = "Product.Augmented"
      export type augmented = typeof augmented
   }

   export namespace Generic {
      export interface Register<A1> {
         [Product.type]: Product<A1>
         [Product.augmented]: Product.Augmented<A1>
      }
   }

   export type ValueOf<X> = X[keyof X]

   export type exclude<K, E> =
      K extends E
         ? K & { __key_not_allowed: E, error: never }
         : K

   export type Expand<T> = T extends infer U ? { [k in keyof U]: U[k] } : never
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Collectible,
   Product,
   Reducer,
   Named,
   Augmentation,
   Table,
   Maybe,
   Functor,
   AsyncReducer,
} from ".."

import {
   augment,
   transformableFromCollectible,
   asyncCollectorFromCollector,
   some,
   none,
   transducer,
   filter,
   named,
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const asTable = <S>(
   product: Product<S>)
   : Table<string, S> =>
      {
         const has =
            (s: string)
            : boolean =>
               Object.getOwnPropertyNames(product).indexOf(s) != 1

         const get =
            (s: string)
            : Maybe<S> =>
               has(s) ? some<S>(product[s]) : none<S>()

         return { get, has }
      }

const asReducible: Collectible<Product.type, Named.type>["asReducible"] = <S>(
   prod: Product<S>) =>
      ({
         reduce: <T>
            ({ init, step }: Reducer<Named<S>, T>)
            : T =>
               Object.keys(prod).reduce(
                  (acc, key) => step([key, prod[key]])(acc),
                  init())
      })

const asAsyncReducible: Collectible<Product.type, Named.type>["asAsyncReducible"] = <S>(
   prod: Product<S>) =>
      ({
         reduceAsync: async <T>(
            { init, step }: AsyncReducer<Named<S>, T>) =>
               {
                  let acc = await init()

                  for (const key in prod) {
                     acc = await step([key, prod[key]])(acc)
                  }

                  return acc
               }

      })

const collector: Collectible<Product.type, Named.type>["collector"] =
   <S>() =>
      ({
         init: () => ({}),
         step:
            ([key, v]) => acc =>
               ({ ...acc, [key]: v })
      }) as Reducer<Named<S>, Product<S>>

const asyncCollector: Collectible<Product.type, Named.type>["asyncCollector"] =
   asyncCollectorFromCollector(collector)

const { transform } = transformableFromCollectible<Product.type, Named.type>({
   asReducible,
   collector
})

const map: Functor<Product.type>["map"] =
   mor =>
      transform(
         transducer.map(
            named.map(mor)))

const mapNamed: Product.HigherType["mapNamed"] =
   mor =>
      transform(
         transducer.map(
            named.lift(mor)))


// -----------------------------------------------------------------------
// Utility

export const restrictTo = <Y>(
   y: Y) => <X extends Y>(
      x: X)
      : Pick<X, keyof Y> =>
         Object.entries(y).reduce(
            (acc, [k, v]) =>
               ({
                  ...acc,
                  [k]: v
               }),
            {}) as Pick<X, keyof Y>

export const omit = <P extends Product>(
   pr: P
   ) => <Ks extends Array<keyof P>>(
      ...ks: Ks)
      : Omit<P, Ks[number]> =>
         transform(
            filter<Named<any>>(([key, _]) => ks.indexOf(key) === -1)
         )(pr) as Omit<P, Ks[number]>

export const pick = <P extends Product>(
   pr: P
   ) => <Ks extends Array<keyof P>>(
      ...ks: Ks)
      : Omit<P, Ks[number]> =>
         transform(
            filter<Named<any>>(([key, _]) => ks.indexOf(key) !== -1)
         )(pr) as Omit<P, Ks[number]>


// ---------------------------------------------------------------------------
// Augmentation
// ---------------------------------------------------------------------------

const augmentation: Augmentation<Product.type, Product.augmented> =
   prod => ({
      ...asReducible(prod),
      ...asAsyncReducible(prod),
      ...asTable(prod),
      map: fn => map(fn)(prod),
      mapNamed: fn => mapNamed(fn)(prod),
   })

const higherType
   : Product.HigherType
   = {
      asReducible,
      asAsyncReducible,
      collector,
      asyncCollector,
      transform,
      map,
      mapNamed
   }

export const product = augment<
      Product.type,
      Product.augmented,
      typeof higherType
   >(
      augmentation,
      higherType
   )