// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type OrderedMap<S> = $<OrderedMap.name, S>

   export namespace OrderedMap {
      export type Type<T> = {
         index: string[]
         values: Product<T>
      }

      export const name = "OrderedMap"
      export type name = typeof name
   }

   export namespace Generic {
      export interface Eval<A1> {
         [OrderedMap.name]: OrderedMap.Type<A1>
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
   Transformable
} from ".."

import {
   array,
   forall,
   asReducible as reducibleFrom,
   transformableFromCollectible
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const asReducible: Collectible<OrderedMap.name, Named.name>["asReducible"] =
   <S>({ index, values }: OrderedMap<S>) =>
      ({
         reduce:
            <T>(reducer: Reducer<Named<S>, T>) =>
            reducibleFrom(array)(index)
               .reduce({
                  init: reducer.init,
                  step:
                     (key: string, acc: T) =>
                        reducer.step([key, values[key]], acc)
               })
      })

const collector: Collectible<OrderedMap.name, Named.name>["collector"] =
   <S>() =>
      ({
         init: () => ({ index: [], values: {} }),
         step:
            ([k, v], { index, values }) =>
               ({
                  index: [...index, k],
                  values: { ...values, [k]: v }
               })
      }) as Reducer<Named<S>, OrderedMap<S>>

const { transform } = transformableFromCollectible<OrderedMap.name, Named.name>({
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

export const ordmap
   : Collectible<OrderedMap.name, Named.name>
   & Transformable<OrderedMap.name>
   = {
      asReducible,
      collector,
      transform,
   }
