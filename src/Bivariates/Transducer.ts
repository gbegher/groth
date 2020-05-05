// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Transducer<S, T> = <A>(reducer: Reducer<T, A>) => Reducer<S, A>

   export namespace Transducer {
      export const type = "Transducer"
      export type type = typeof type
   }

   export namespace Bivariate {
      export interface Register<A1, A2> {
         [Transducer.type]: Transducer<A1, A2>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Product,
   Functor,
   Transducer,
   Mor,
   Reducer,
   Category,
   Identity,
   Extendable,
   Nameable,
} from ".."

import {
   morphism,
   defineExtendable,
   defineCategory,
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const { identity, compose }: Category<Transducer.type> = defineCategory({
   identity: <S>() =>
      <A>(red: Reducer<S, A>) => red,
   compose: <T0, T1, T2>(
      tr1: Transducer<T0, T1>, tr2: Transducer<T1, T2>) =>
         <A>(red: Reducer<T2, A>) => tr1(tr2(red))
})

const map = <S, T>(
   mor: Mor<S, T>)
   : Transducer<S, T> =>
      <A>(red: Reducer<T, A>) =>
         ({
            ...red,
            step: (s: S) => (acc: A) => red.step(mor(s))(acc)
         })

const { hoist, extend } = defineExtendable<Transducer.type>({
   initial:
      <S>() => <A>(
         red: Reducer<{}, A>
         ): Reducer<S, A> =>
            ({
               init: red.init,
               step:
                  (_) => acc =>
                     red.step({})(acc)
            }),
   hoist: <S, T>(
      tr: Transducer<S, T>
      ): Transducer<[S, {}], T> =>
         compose(
            map(([s, _]: [S, {}]) => s),
            tr,
         ),
   extend: <S, B extends Product, E extends Product>(
      base: Transducer<S, B>,
      extension: Transducer<[S, B], E>
      ): Transducer<S, B & E> => <A>(
         red: Reducer<B & E, A>) =>
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

const liftName: Nameable<Transducer.type>["liftName"] = <K extends string>(
      k: K) => <S, T>(
         tr: Transducer<S, T>
         ): Transducer<S, Record<K, T>> =>
            reducer =>
               {
                  const nName = morphism.liftName(k)(morphism.identity<T>())

                  return tr(map(nName)(reducer))
               }

// ---------------------------------------------------------------------------
// Special constructors
// ---------------------------------------------------------------------------

export const filter = <S>(
   pred: Mor<S, boolean>
   ): Transducer<S, S> =>
      <A>(red: Reducer<S, A>) =>
         ({
            init: red.init,
            step:
               (s: S) => (acc: A) =>
                  pred(s) ? red.step(s)(acc) : acc
         })

// ---------------------------------------------------------------------------
// Augmentations
// ---------------------------------------------------------------------------

export const transducer
   : Category<Transducer.type>
   & Extendable<Transducer.type>
   & Nameable<Transducer.type>
   & Functor<Identity.type, Mor.type, Transducer.type>
   =
      {
         identity,
         compose,
         extend,
         hoist,
         map,
         liftName
      }
