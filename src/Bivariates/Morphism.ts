// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Mor<S, T> = (s: S) => T

   export namespace Mor {
      export const type = "Mor"
      export type type = typeof type
   }

   export namespace Bivariate {
      export interface Register<A1, A2> {
         [Mor.type]: Mor<A1, A2>
      }
   }

   export type Identity<S> = S

   export namespace Identity {
      export const type = "Identity"
      export type type = typeof type
   }

   export namespace Generic {
      export interface Register<A1> {
         [Identity.type]: Identity<A1>
      }
   }

   export type Dom<M extends Mor<any, any>> =
      M extends Mor<any, infer T> ? T : never

   export type CoDom<M extends Mor<any, any>> =
      M extends Mor<infer S, any> ? S : never
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Category,
   Mor,
   Shapeable,
   Product,
   Functor,
   Identity,
   Compound,
   Incorporatable,
   Construction,
   Extendable,
   exclude,
   Demergable
} from ".."

import {
   compoundFromCategory,
   incorporateFromCompound,
   constructionFromExtendable,
   completeExtendable,
   llog,
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const map: Functor<Identity.type>["map"] =
   fn =>
      fn

const identity: Category<Mor.type>["identity"] =
   () =>
      x => x

const compose: Category<Mor.type>["compose"] =
   (m1, m2) =>
      t1 => m2(m1(t1))

const final: Shapeable<Mor.type>["final"] =
   () =>
      () => ({})

const liftName = <K extends string, S, T>(
   k: K,
   fn: Mor<S, T>)
   : Mor<S, Record<K, T>> =>
      (s: S) =>
         ({
            [k]: fn(s)
         }) as Record<K, T>

const merge = <S, T1 extends Product, T2 extends Product>(
   m1: Mor<S, Omit<T1, keyof T2>>,
   m2: Mor<S, Omit<T2, keyof T1>>)
   : Mor<S, Omit<T1, keyof T2> & Omit<T2, keyof T1>> =>
      (s: S) =>
         ({
            ...m1(s),
            ...m2(s)
         })

const demerge: Demergable<Mor.type>["demerge"] =
   mor =>
      ([s, p]) =>
         mor({ ...s, ...p })

const { extend }: Extendable<Mor.type> =
   completeExtendable(
      <S, P extends Product>(base: Mor<S, P>) => <K extends string, T>(
         [key, ext]: [exclude<K, keyof P>, Mor<[S, P], T>]) =>
            (s: S) =>
               {
                  const p: P = base(s)

                  return {
                     ...p,
                     [key]: ext([s, p])
                  } as P & Record<K, T>

                  /*

                  =
                     compose(
                        pairing(id_S,base),
                        diag_[S, P], // = pairing(id, id)
                        parallel(
                           second,
                           liftName(k, ext)
                        ),
                        (p, kt) => ...kt
                     )

                  */

               }
   )

const { compound } = compoundFromCategory<Mor.type>({
   merge,
   identity,
   compose
})

const { incorporate } = incorporateFromCompound<Mor.type>({
   merge,
   compound
})

const { construct } = constructionFromExtendable<Mor.type>({
   extend,
   final,
   demerge
})

// ---------------------------------------------------------------------------
// Augmentations
// ---------------------------------------------------------------------------

export const morphism
   : Category<Mor.type>
   & Functor<Identity.type, Mor.type, Mor.type>
   & Shapeable<Mor.type>
   & Compound<Mor.type>
   & Incorporatable<Mor.type>
   & Demergable<Mor.type>
   & Construction<Mor.type>
   =
      {
         identity,
         compose,
         map,
         final,
         liftName,
         merge,
         compound,
         incorporate,
         demerge,
         construct
      }
