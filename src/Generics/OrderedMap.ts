// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type OrderedMap<T> = {
         index: string[]
         values: Product<T>
      }

   export namespace OrderedMap {
      export const type = "OrderedMap"
      export type type = typeof type

      export type AugmentedType<T> =
         Reducible<Named<T>>

      export const augmented = "OrderedMap.Augmented"
      export type augmented = typeof augmented
   }

   export namespace Generic {
      export interface Register<A1> {
         [OrderedMap.type]: OrderedMap<A1>
         [OrderedMap.augmented]: OrderedMap.AugmentedType<A1>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Collectible,
   OrderedMap,
   Named,
   Reducer,
   Transformable,
   Augmentation
} from ".."

import {
   array,
   forall,
   asReducible as reducibleFrom,
   transformableFromCollectible,
   augment
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const asReducible: Collectible<OrderedMap.type, Named.type>["asReducible"] =
   <S>({ index, values }: OrderedMap<S>) =>
      ({
         reduce:
            <T>(reducer: Reducer<Named<S>, T>) =>
            reducibleFrom(array)(index)
               .reduce({
                  init: reducer.init,
                  step:
                     (key: string) => (acc: T) =>
                        reducer.step([key, values[key]])(acc)
               })
      })

const collector: Collectible<OrderedMap.type, Named.type>["collector"] =
   <S>() =>
      ({
         init: () => ({ index: [], values: {} }),
         step:
            ([k, v]) => ({ index, values }) =>
               ({
                  index: [...index, k],
                  values: { ...values, [k]: v }
               })
      }) as Reducer<Named<S>, OrderedMap<S>>

const { transform } = transformableFromCollectible<OrderedMap.type, Named.type>({
   asReducible,
   collector
})

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

export const omEquality = <T>(
   baseEq: (t1: T, t2: T) => boolean) =>
      (
         om1: OrderedMap<T>,
         om2: OrderedMap<T>,
      ): boolean =>
         forall(asReducible(om1),
            ([k, v]) =>
               baseEq(v, om2.values[k]))

// ---------------------------------------------------------------------------
// Augmentation
// ---------------------------------------------------------------------------

const augmentation: Augmentation<OrderedMap.type, OrderedMap.augmented> =
   asReducible

const higherType
   : Collectible<OrderedMap.type, Named.type>
   & Transformable<OrderedMap.type>
   = {
      asReducible,
      collector,
      transform,
   }

export const ordmap = augment<
      OrderedMap.type,
      OrderedMap.augmented,
      typeof higherType
   >(
      augmentation,
      higherType
   )
