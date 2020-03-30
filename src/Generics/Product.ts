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
         & Transformable<Product.type>
         // & { mapNamed: Functor<Product.type, Named.cokleisli, Mor.type> }
         // & { transformNamed: <S, T>(tr: Transducer<Named<S>, T>) => Mor<Product<S>, Product<T>>}

      export type AugmentedType<T> =
         Reducible<Named<T>>
         & Table<string, T>

      export const augmented = "Product.Augmented"
      export type augmented = typeof augmented
   }

   export namespace Generic {
      export interface Register<A1> {
         [Product.type]: Product<A1>
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
   Augmentation,
   Table,
   Maybe,
   Functor,
   Mor,
   Transducer,
   $2,
} from ".."

import {
   transformableFromCollectible,
   augment,
   some,
   none,
   transducer,
   map as fmap
} from "../index"

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

const trmapNamed = <S, T>(
   fn: $2<Named.cokleisli, S, T>)
   : Transducer<Named<S>, Named<T>> =>
      ({ init, step }) =>
         ({
            init,
            step:
               ([n, s], a) =>
                  step([n, fn([n, s])], a)
         })


const map: Functor<Product.type>["map"] =
   mor =>
      transform(transducer.map(mor))

// const mapNamed: Functor<Product.type, Named.cokleisli, Mor.type>["map"] =
//    mor => transform(trmapNamed(mor))


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
      ...asTable(p)
   })

const higherType
   : Product.HigherType
   = {
      asReducible,
      collector,
      transform,
      map,
      // mapNamed,
   }

export const product = augment<
      Product.type,
      Product.augmented,
      typeof higherType
   >(
      augmentation,
      higherType
   )