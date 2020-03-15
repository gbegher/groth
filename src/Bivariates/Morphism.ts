// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Mor<S, T> = $2<Mor.name, S, T>

   export namespace Bivariate {
      export interface Eval<A1, A2> {
         [Mor.name]: Mor.Type<A1, A2>
      }
   }

   export namespace Mor {
      export type Type<S, T> = (s: S) => T

      const name = "Mor"
      type name = typeof name
   }

   export type Identity<S> = $<Identity.name, S>

   export namespace Generic {
      export interface Eval<A1> {
         [Identity.name]: Identity.Type<A1>
      }
   }

   export namespace Identity {
      export type Type<S> = S

      const name = "Identity"
      type name = typeof name
   }
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
   Construction
} from ".."

import {
   compoundFromCategory,
   incorporateFromCompound,
   constructionFromIncorporate,
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const map: Functor<Identity.name>["map"] =
   fn =>
      fn

const identity: Category<Mor.name>["identity"] =
   () =>
      x => x

const compose: Category<Mor.name>["compose"] =
   (m1, m2) =>
      t1 => m2(m1(t1))

const final: Shapeable<Mor.name>["final"] =
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

const { compound } = compoundFromCategory<Mor.name>({
   merge,
   identity,
   compose
})

const { incorporate } = incorporateFromCompound<Mor.name>({
   merge,
   compound
})

const { construct } = constructionFromIncorporate<Mor.name>({
   final,
   liftName,
   merge,
   incorporate
})

// ---------------------------------------------------------------------------
// Augmentations
// ---------------------------------------------------------------------------

export const morphism
   : Category<Mor.name>
   & Functor<Identity.name, Mor.name, Mor.name>
   & Shapeable<Mor.name>
   & Compound<Mor.name>
   & Incorporatable<Mor.name>
   & Construction<Mor.name>
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
         construct
      }
