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
// Implementation
// ---------------------------------------------------------------------------

import type {
   Product,
   Functor,
   Transducer,
   Mor,
   Reducer,
   Category,
   Shapeable,
   Construction,
   Identity,
   Compound,
   Incorporatable,
} from ".."

import {
   morphism,
   constructionFromIncorporate,
   incorporateFromCompound,
   compoundFromCategory,
 } from ".."

// ---------------------------------------------------------------------------
// Imports
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
            step: (s: S, acc: A) => red.step(mor(s), acc)
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

const merge = <
   S, T1 extends Product, T2 extends Product
   >(
      tr1: Transducer<S, Omit<T1, keyof T2>>,
      tr2: Transducer<S, Omit<T2, keyof T1>>,
   ): Transducer<S, Omit<T1, keyof T2> & Omit<T2, keyof T1>> =>
      <A>(red: Reducer<Omit<T1, keyof T2> & Omit<T2, keyof T1>, A>) =>
         {
            return {
               init: red.init,
               step:
                  (s: S, acc: A) =>
                     {
                        const a1 = tr1({
                           init: red.init,
                           step:
                              (t1: Omit<T1, keyof T2>, acc) =>
                                 {
                                    const a2 = tr2({
                                       init: red.init,
                                       step:
                                          (t2: Omit<T2, keyof T1>) =>
                                             // We can replace T1 & T2 with any type T1 * T2
                                             // that has a constructor Mor<[T1, T2], T1 * T2>
                                             // Implicitly, we are also using map:Mor=>Tr
                                             red.step({ ...t1, ...t2 }, acc)
                                    })

                                    return a2.step(s, acc)
                                 }
                        })

                        return a1.step(s, acc)
                     }
            }
         }

export const filter = <S>(
   pred: Mor<S, boolean>)
   : Transducer<S, S> =>
      <A>(red: Reducer<S, A>) =>
         ({
            ...red,
            step: (s: S, acc: A) => pred(s) ? red.step(s, acc) : acc
         })

const { compound } = compoundFromCategory<Transducer.type>({
   identity,
   compose,
   merge
})

const { incorporate } = incorporateFromCompound<Transducer.type>({
   merge,
   compound
})

const { construct } = constructionFromIncorporate<Transducer.type>({
   final,
   liftName,
   merge,
   incorporate
})

// ---------------------------------------------------------------------------
// Augmentations
// ---------------------------------------------------------------------------

export const transducer
   : Category<Transducer.type>
   & Shapeable<Transducer.type>
   & Compound<Transducer.type>
   & Incorporatable<Transducer.type>
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
         construct,
         map,
      }
