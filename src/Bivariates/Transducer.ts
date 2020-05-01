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
   Shapeable,
   Identity,
   Compound,
   Incorporatable,
   exclude,
   Demergable,
   Construction,
   Expand,
} from ".."

import {
   morphism,
   incorporateFromCompound,
   compoundFromCategory,
   completeExtendable,
   constructionFromExtendable
 } from ".."
import { comprehendableFromExtendable } from "../HigherKindedTypes/Comprehension"

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const identity: Category<Transducer.type>["identity"] =
   () => tr => tr

const compose: Category<Transducer.type>["compose"] =
   (tr1, tr2) =>
      red => tr1(tr2(red))

const map = <S, T>(
   mor: Mor<S, T>)
   : Transducer<S, T> =>
      <A>(red: Reducer<T, A>) =>
         ({
            ...red,
            step: (s: S) => (acc: A) => red.step(mor(s))(acc)
         })

const final: Shapeable<Transducer.type>["final"] = <S>(): Transducer<S, {}> =>
      // Think of this as a constant endomorphism on the accumulator,
      // applied at every step
      map(() => ({}))

const liftName: Shapeable<Transducer.type>["liftName"] = <
   K extends string, S, T
   >(
      k: K,
      tr: Transducer<S, T>
   ): Transducer<S, Record<K, T>> =>
      reducer =>
         {
            const nName = morphism.liftName<K, T, T>(k, morphism.identity<T>())

            return tr(map(nName)(reducer))
         }

const merge = <S, P extends Product, E extends Product>(
      base: Transducer<S, P>,
      ext: Transducer<[S, P], E>,
   ): Transducer<S, P & E> =>
      comprehend<S>(
         ["base", cLift(base)],
         ["ext", ext]
      )

const cLift = <S, T>(
   tr: Transducer<S, T>
   ): Transducer<[S, {}], T> =>
      compose(
         map(([s, _]) => s),
         tr
      )

const pairing = <S, T1, T2>(
   tr1: Transducer<S, T1>,
   tr2: Transducer<S, T2>,
   ): Transducer<S, [T1, T2]> =>
      compose(
         comprehend<S>(
            ["first", cLift(tr1)],
            ["second", cLift(tr2)]),
         map(({ first, second }) =>
            [ first, second ]))

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

const demerge: Demergable<Transducer.type>["demerge"] =
   tr =>
      compose(
         map(([s, t]) => ({ ...s, ...t })),
         tr)

const { extend } = completeExtendable<Transducer.type>(
   <S, P>(
      base: Transducer<S, P>) => <K extends string, T>(
         [key, ext]: [exclude<K, keyof P>, Transducer<[S, P], T>]
      ): Transducer<S, P & Record<K, T>> =>
         red =>
            {
               const iv = red.init()
               const init = () => iv

               return {
                  init,
                  step:
                     s => accS =>
                        {
                           const redBase = base({
                              init,
                              step:
                                 p => accSP =>
                                    {
                                       const redExt = ext({
                                          init,
                                          step:
                                             t => accPT =>
                                                red.step({...p, [key]: t} as P & Record<K, T>)(accPT)
                                       })

                                       return redExt.step([s, p])(accSP)
                                    }
                           })

                           return redBase.step(s)(accS)
                        }
               }
            }
   )

const { compound } = compoundFromCategory<Transducer.type>({
   identity,
   compose,
   merge
})

const { incorporate } = incorporateFromCompound<Transducer.type>({
   merge,
   compound
})

const { construct } = constructionFromExtendable<Transducer.type>({
   extend,
   final,
   demerge,
})

const { comprehend } = comprehendableFromExtendable<Transducer.type>({
   extend,
   final
})

// ---------------------------------------------------------------------------
// Augmentations
// ---------------------------------------------------------------------------

export const transducer
   : Category<Transducer.type>
   & Shapeable<Transducer.type>
   & Compound<Transducer.type>
   & Incorporatable<Transducer.type>
   & Demergable<Transducer.type>
   & Construction<Transducer.type>
   & Functor<Identity.type, Mor.type, Transducer.type>
   =
      {
         identity,
         compose,
         final,
         liftName,
         merge,
         compound,
         incorporate,
         demerge,
         construct,
         map,
      }
