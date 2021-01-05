// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../types" {
   export type AsyncTransducer<S, T> = <A>(reducer: AsyncReducer<T, A>) => AsyncReducer<S, A>

   export namespace AsyncTransducer {
      export const type: unique symbol
      export type type = typeof type

      export type HigherType =
         Category<AsyncTransducer.type>
         & Extendable<AsyncTransducer.type>
         & Nameable<AsyncTransducer.type>
         & Comprehendible<AsyncTransducer.type>
         & Functor<Identity.type, Mor.type, AsyncTransducer.type>
         & { mapAsync: Functor<Identity.type, AsyncMor.type, AsyncTransducer.type>["map"] }
         & Filterable<AsyncTransducer.type>
         & { filterAsync: Filterable<AsyncTransducer.type, AsyncMor.type>["filter"] }
   }

   export namespace Bivariate {
      export interface Register<A1, A2> {
         [AsyncTransducer.type]: AsyncTransducer<A1, A2>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   AsyncTransducer,
   AsyncReducer,
   Category,
   Mor,
   Product,
   AsyncMor,
   Nameable,
} from "../types"

import {
   defineCategory,
   defineExtendable,
} from ".."
import { morphism } from "./Morphism"
import { defineComprehendible } from "../HigherKindedTypes/Comprehendible"

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const { identity, compose }: Category<AsyncTransducer.type> = defineCategory({
   identity: <S>() =>
      <A>(red: AsyncReducer<S, A>) => red,
   compose: <T0, T1, T2>(
      tr1: AsyncTransducer<T0, T1>, tr2: AsyncTransducer<T1, T2>) =>
         <A>(red: AsyncReducer<T2, A>) => tr1(tr2(red))
})

const map = <S, T>(
   mor: Mor<S, T>
   ): AsyncTransducer<S, T> =>
      mapAsync(async (s: S) => mor(s))

const { hoist, extend } = defineExtendable<AsyncTransducer.type>({
   initial:
      <S>() => <A>(
         red: AsyncReducer<{}, A>
         ): AsyncReducer<S, A> =>
            ({
               init: red.init,
               step:
                  (_) => acc =>
                     red.step({})(acc)
            }),
   hoist: <S, T>(
      tr: AsyncTransducer<S, T>
      ): AsyncTransducer<[S, {}], T> =>
         compose(
            map(([s, _]: [S, {}]) => s),
            tr,
         ),
   extend: <S, B extends Product, E extends Product>(
      base: AsyncTransducer<S, B>,
      extension: AsyncTransducer<[S, B], E>
      ): AsyncTransducer<S, B & E> => <A>(
         red: AsyncReducer<B & E, A>) =>
            {
               const iv = red.init()
               const init = () => iv

               return {
                  init,
                  step:
                     s => (accS: A) =>
                        {
                           const redBase = base({
                              init,
                              step:
                                 b => accB =>
                                    {
                                       const redExt = extension({
                                          init,
                                          step:
                                             e => accE =>
                                                red.step({...b, ...e})(accE)
                                       })

                                       return redExt.step([s, b])(accB)
                                    }
                           })

                           return redBase.step(s)(accS)
                        }
               }
            }
})

const liftName: Nameable<AsyncTransducer.type>["liftName"] = <K extends string>(
   k: K) => <S, T>(
      tr: AsyncTransducer<S, T>
      ): AsyncTransducer<S, Record<K, T>> =>
         reducer =>
            {
               const nName = morphism.liftName(k)(morphism.identity<T>())

               return tr(map(nName)(reducer))
            }

const { comprehend } = defineComprehendible<AsyncTransducer.type>({
   liftName,
   extend
})

// ---------------------------------------------------------------------------
// Special constructors
// ---------------------------------------------------------------------------

const mapAsync = <S, T>(
   mor: AsyncMor<S, T>)
   : AsyncTransducer<S, T> =>
      <A>(red: AsyncReducer<T, A>) =>
         ({
            ...red,
            step: (s: S) =>
               async (acc: A) => red.step(await mor(s))(acc)
         })

const filter = <S>(
   pred: Mor<S, boolean>
   ): AsyncTransducer<S, S> =>
      filterAsync(async (s: S) => pred(s))

const filterAsync = <S>(
   pred: AsyncMor<S, boolean>
   ): AsyncTransducer<S, S> =>
      <A>(red: AsyncReducer<S, A>) =>
         ({
            init: async () => red.init(),
            step:
               (s: S) =>
                  async(acc: A) =>
                     (await pred(s))
                        ? (await red.step(s)(acc))
                        : acc
         }) as AsyncReducer<S, A>

// ---------------------------------------------------------------------------
// Augmentations
// ---------------------------------------------------------------------------

export const asyncTransducer: AsyncTransducer.HigherType = {
   identity,
   compose,
   hoist,
   extend,
   liftName,
   comprehend,
   map,
   mapAsync,
   filter,
   filterAsync,
}
