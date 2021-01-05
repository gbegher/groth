// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../types" {
   export type Named<T> = [string, T]

   export type CoKleisliNamed<A, B> = Mor<Named<A>, B>

   export namespace Named {
      export const type: unique symbol
      export type type = typeof type

      export type HigherType =
         Functor<Named.type>
         & Category<Named.cokleisli>
         & { lift: Functor<Named.type, Named.cokleisli, Mor.type>["map"] }

      export const cokleisli: unique symbol
      export type cokleisli = typeof cokleisli
   }

   export namespace Generic {
      export interface Register<A1> {
         [Named.type]: Named<A1>
      }
   }

   export namespace Bivariate {
      export interface Register<A1, A2> {
         [Named.cokleisli]: CoKleisliNamed<A1, A2>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Functor,
   Named,
   Category,
   Mor,
} from ".."

import {
   defineCategory
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const map: Functor<Named.type>["map"] =
   fn =>
      ([k, v]) =>
         [k, fn(v)]

// Todo: Move type to CoMonad.ts?
const lift: Named.HigherType["lift"] =
   fn =>
      ([k, v]) =>
         [k, fn([k, v])]

const { identity, compose }: Category<Named.cokleisli> = defineCategory({
   identity: <S>() =>
      ([_, s]: Named<S>) => s,
   compose: <T0, T1, T2>(
      m1: Mor<Named<T0>, T1>,
      m2: Mor<Named<T1>, T2>,
      ): Mor<Named<T0>, T2> =>
         ([n, t]) =>
            m2([n, m1([n, t])])
})

export const forgetName =
   <X>([_, x]: Named<X>): X => x

// ---------------------------------------------------------------------------
// Augmentation
// ---------------------------------------------------------------------------

export const named: Named.HigherType
   = {
      map,
      identity,
      compose,
      lift
   }
