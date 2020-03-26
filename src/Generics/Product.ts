// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Product<T = any> = $<Product.type, T>

   export namespace Product {
      export type Eval<T = any> = Record<string, T>

      export const type = "Product"
      export type type = typeof type

      export type AugmentedType<T> =
         Reducible<Named<T>>
         & Mapping<string, T>

      export const augmented = "Product.Augmented"
      export type augmented = typeof augmented
   }

   export namespace Generic {
      export interface Register<A1> {
         [Product.type]: Product.Eval<A1>
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

import {
   Collectible,
   Product,
   Reducer,
   Named,
   Transformable,
   Augmentation,
   Mapping,
   Maybe,
} from ".."

import {
   transformableFromCollectible,
   augment,
   some,
   none,
} from "../index"

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const asMapping = <S>(
   product: Product<S>)
   : Mapping<string, S> =>
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

const asReducible: Collectible<Product.type, Named.type>["asReducible"] =
   <S>(product: Product<S>) =>
      ({
         reduce: <T>
            ({ init, step }: Reducer<Named<S>, T>)
            : T =>
               Object.keys(product).reduce(
                  (acc, key) => step([key, product[key]], acc),
                  init())
      })

const collector: Collectible<Product.type, Named.type>["collector"] =
   <S>() =>
      ({
         init: () => ({}),
         step:
            ([key, v], acc) =>
               ({ ...acc, [key]: v })
      }) as Reducer<Named<S>, Product<S>>

const { transform } = transformableFromCollectible<Product.type, Named.type>({
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

const augmentation: Augmentation<Product.type, Product.augmented> =
   p => ({
      ...asReducible(p),
      ...asMapping(p)
   })

const higherType
   : Collectible<Product.type, Named.type>
   & Transformable<Product.type>
   = {
      asReducible,
      collector,
      transform
   }

export const product = augment<
      Product.type,
      Product.augmented,
      typeof higherType
   >(
      augmentation,
      higherType
   )