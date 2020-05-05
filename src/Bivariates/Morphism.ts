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
   Product,
   Functor,
   Identity,
   Extendable,
   Nameable,
} from ".."

import {
   defineCategory,
   defineExtendable,
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const map: Functor<Identity.type>["map"] =
   fn =>
      fn

const { identity, compose }: Category<Mor.type> = defineCategory({
   identity: <S>() =>
      (s: S) => s,
   compose: <T0, T1, T2>(
      m1: Mor<T0, T1>,
      m2: Mor<T1, T2>,
      ): Mor<T0, T2> =>
         t1 => m2(m1(t1))
})

const liftName: Nameable<Mor.type>["liftName"] = <K extends string>(
   k: K) => <S, T>(
      mor: Mor<S, T>) =>
         (s: S) =>
            ({ [k]: mor(s) } as Record<K, T>)

const { hoist, extend }: Extendable<Mor.type> =
   defineExtendable({
      initial:
         () =>
            () => ({}),
      hoist: <S, T>
         (mor: Mor<S, T>) =>
            ([s, _]: [S, {}]) =>
               mor(s),
      extend: <S, B extends Product, E extends Product>(
         base: Mor<S, B>,
         extension: Mor<[S, B], E>) =>
            (s: S) =>
               {
                  const b = base(s)

                  return {
                     ...b,
                     ...extension([s, b])
                  }
               }
   })

// ---------------------------------------------------------------------------
// Augmentations
// ---------------------------------------------------------------------------

export const morphism
   : Category<Mor.type>
   & Functor<Identity.type, Mor.type, Mor.type>
   & Extendable<Mor.type>
   & Nameable<Mor.type>
   =
      {
         identity,
         compose,
         map,
         extend,
         hoist,
         liftName
      }
