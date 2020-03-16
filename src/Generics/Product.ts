// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Product<T = any> = $<Product.name, T>

   export namespace Product {
      export type Type<T = any> = Record<string, T>

      export const name = "Product"
      export type name = typeof name

      export type AugmentedType<T> =
         Reducible<Named<T>>

      export const augmented = "Product.Augmented"
      export type augmented = typeof augmented
   }

   export namespace Generic {
      export interface Eval<A1> {
         [Product.name]: Product.Type<A1>
         [Product.augmented]: Product.AugmentedType<A1>
      }
   }

   export type ValueOf<X> = X[keyof X]

   export type exclude<K, E> =
      K extends E
         ? { __not_allowed: E, __error: never }
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
   Transformable,
   Augmentation
} from ".."

import {
   transformableFromCollectible,
   augment
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const asReducible: Collectible<Product.name, Named.name>["asReducible"] =
   <S>(product: Product<S>) =>
      ({
         reduce: <T>
            ({ init, step }: Reducer<Named<S>, T>)
            : T =>
               Object.keys(product).reduce(
                  (acc, key) => step([key, product[key]], acc),
                  init())
      })

const collector: Collectible<Product.name, Named.name>["collector"] =
   <S>() =>
      ({
         init: () => ({}),
         step:
            ([key, v], acc) =>
               ({ ...acc, [key]: v })
      }) as Reducer<Named<S>, Product<S>>

const { transform } = transformableFromCollectible<Product.name, Named.name>({
   asReducible,
   collector
})

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

// ---------------------------------------------------------------------------
// Augmentation
// ---------------------------------------------------------------------------

const augmentation: Augmentation<Product.name, Product.augmented> =
   asReducible

const higherType
   : Collectible<Product.name, Named.name>
   & Transformable<Product.name>
   = {
      asReducible,
      collector,
      transform
   }

export const product = augment<
      Product.name,
      Product.augmented,
      typeof higherType
   >(
      augmentation,
      higherType
   )