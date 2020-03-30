// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Named<T> = [string, T]

   export type CoKleisliNamed<A, B> = Mor<Named<A>, B>

   export namespace Named {
      export const type = "Named"
      export type type = typeof type

      export type HigherType =
         Functor<Named.type>
         & Category<Named.cokleisli>
         & { lift: Functor<Named.type, Named.cokleisli, Mor.type>["map"] }

      export const cokleisli = "CoKleisli"
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
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const map: Functor<Named.type>["map"] =
   fn =>
      ([k, v]) =>
         [k, fn(v)]

// Todo: Move type to CoMonad.ts
const lift: Named.HigherType["lift"] =
   fn =>
      ([k, v]) =>
         [k, fn([k, v])]

const identity: Category<Named.cokleisli>["identity"] =
   () =>
      ([_, t]) =>
         t

const compose: Category<Named.cokleisli>["compose"] =
   (h1, h2) =>
      ([n, t]) =>
         h2([n, h1([n, t])])

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
