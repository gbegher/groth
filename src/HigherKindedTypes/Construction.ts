// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Construction<C extends Bivariate> =
         __Construction.Spread<C> &
         __Construction.C0<C> &
         __Construction.C1<C> &
         __Construction.C2<C> &
         __Construction.C3<C> &
         __Construction.C4<C> &
         __Construction.C5<C> &
         __Construction.C6<C> &
         __Construction.C7<C>

   export namespace __Construction {
      export type Spread<C extends Bivariate> = {
         construct: <S extends Product>(...args: [string, $2<C, S & Product, Product>][]) => $2<C, S, Product>
      }

      export type C0<C extends Bivariate> = {
         construct: <S extends Product>() => $2<C, S, {}>
      }

      export type C1<C extends Bivariate> = {
         construct: <S extends Product,
               K1 extends string, T1
               >
            (
               c1: [exclude<K1, keyof S>,
                    $2<C, S, T1>]
            )
            => $2<C, S, Expand<Record<K1, T1>>>
      }

      export type C2<C extends Bivariate> = {
         construct: <S extends Product,
               K1 extends string, T1,
               K2 extends string, T2
               >
            (
               c1: [exclude<K1, keyof S>,
                    $2<C, S, T1>],
               c2: [exclude<K2, keyof S | K1>,
                     $2<C,
                        Expand<S & Record<K1, T1>>,
                        T2>]
            )
            => $2<C, S, Expand<
                     Record<K1, T1>
                     & Record<K2, T2>
               >>
      }

      export type C3<C extends Bivariate> = {
         construct: <S extends Product,
               K1 extends string, T1,
               K2 extends string, T2,
               K3 extends string, T3
               >
            (
               c1: [exclude<K1, keyof S>,
                    $2<C, S, T1>],
               c2: [exclude<K2, keyof S | K1>,
                     $2<C,
                        Expand<S & Record<K1, T1>>,
                        T2>],
               c3: [exclude<K3, keyof S | K1 | K2>,
                     $2<C,
                        Expand<S & Record<K1, T1> & Record<K2, T2>>,
                        T3>],
            )
            => $2<C, S, Expand<
                     S
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
               >>
      }

      export type C4<C extends Bivariate> = {
         construct: <S extends Product,
               K1 extends string, T1,
               K2 extends string, T2,
               K3 extends string, T3,
               K4 extends string, T4
               >
            (
               c1: [exclude<K1, keyof S>,
                    $2<C, S, T1>],
               c2: [exclude<K2, keyof S | K1>,
                     $2<C,
                        Expand<S & Record<K1, T1>>,
                        T2>],
               c3: [exclude<K3, keyof S | K1 | K2>,
                     $2<C,
                        Expand<S & Record<K1, T1> & Record<K2, T2>>,
                        T3>],
               c4: [exclude<K4, keyof S | K1 | K2 | K3>,
                     $2<C,
                        Expand<S & Record<K1, T1> & Record<K2, T2> & Record<K3, T3>>,
                        T4>],
            )
            => $2<C, S, Expand<
                     Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                     & Record<K4, T4>
               >>
      }

      export type C5<C extends Bivariate> = {
         construct: <S extends Product,
               K1 extends string, T1,
               K2 extends string, T2,
               K3 extends string, T3,
               K4 extends string, T4,
               K5 extends string, T5
               >
            (
               c1: [exclude<K1, keyof S>,
                    $2<C, S, T1>],
               c2: [exclude<K2, keyof S | K1>,
                     $2<C,
                        Expand<S & Record<K1, T1>>,
                        T2>],
               c3: [exclude<K3, keyof S | K1 | K2>,
                     $2<C,
                        Expand<S & Record<K1, T1> & Record<K2, T2>>,
                        T3>],
               c4: [exclude<K4, keyof S | K1 | K2 | K3>,
                     $2<C,
                        Expand<S & Record<K1, T1> & Record<K2, T2> & Record<K3, T3>>,
                        T4>],
               c5: [exclude<K5, keyof S | K1 | K2 | K3 | K4>,
                     $2<C,
                        Expand<S
                           & Record<K1, T1>
                           & Record<K2, T2>
                           & Record<K3, T3>
                           & Record<K4, T4>
                           >,
                        T5>],
            )
            => $2<C, S, Expand<
                     Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                     & Record<K4, T4>
                     & Record<K5, T5>
               >>
      }

      export type C6<C extends Bivariate> = {
         construct: <S extends Product,
               K1 extends string, T1,
               K2 extends string, T2,
               K3 extends string, T3,
               K4 extends string, T4,
               K5 extends string, T5,
               K6 extends string, T6
               >
            (
               c1: [exclude<K1, keyof S>,
                    $2<C, S, T1>],
               c2: [exclude<K2, keyof S | K1>,
                     $2<C,
                        Expand<S & Record<K1, T1>>,
                        T2>],
               c3: [exclude<K3, keyof S | K1 | K2>,
                     $2<C,
                        Expand<S & Record<K1, T1> & Record<K2, T2>>,
                        T3>],
               c4: [exclude<K4, keyof S | K1 | K2 | K3>,
                     $2<C,
                        Expand<S & Record<K1, T1> & Record<K2, T2> & Record<K3, T3>>,
                        T4>],
               c5: [exclude<K5, keyof S | K1 | K2 | K3 | K4>,
                     $2<C,
                        Expand<S
                           & Record<K1, T1>
                           & Record<K2, T2>
                           & Record<K3, T3>
                           & Record<K4, T4>
                           >,
                        T5>],
               c6: [exclude<K6, keyof S | K1 | K2 | K3 | K4 | K5>,
                     $2<C,
                        Expand<S
                           & Record<K1, T1>
                           & Record<K2, T2>
                           & Record<K3, T3>
                           & Record<K4, T4>
                           & Record<K5, T5>
                           >,
                        T6>],
            )
            => $2<C, S, Expand<
                     Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                     & Record<K4, T4>
                     & Record<K5, T5>
                     & Record<K6, T6>
               >>
      }

      export type C7<C extends Bivariate> = {
         construct: <S extends Product,
               K1 extends string, T1,
               K2 extends string, T2,
               K3 extends string, T3,
               K4 extends string, T4,
               K5 extends string, T5,
               K6 extends string, T6,
               K7 extends string, T7
               >
            (
               c1: [exclude<K1, keyof S>,
                    $2<C, S, T1>],
               c2: [exclude<K2, keyof S | K1>,
                     $2<C,
                        Expand<S & Record<K1, T1>>,
                        T2>],
               c3: [exclude<K3, keyof S | K1 | K2>,
                     $2<C,
                        Expand<S & Record<K1, T1> & Record<K2, T2>>,
                        T3>],
               c4: [exclude<K4, keyof S | K1 | K2 | K3>,
                     $2<C,
                        Expand<S & Record<K1, T1> & Record<K2, T2> & Record<K3, T3>>,
                        T4>],
               c5: [exclude<K5, keyof S | K1 | K2 | K3 | K4>,
                     $2<C,
                        Expand<S
                           & Record<K1, T1>
                           & Record<K2, T2>
                           & Record<K3, T3>
                           & Record<K4, T4>
                           >,
                        T5>],
               c6: [exclude<K6, keyof S | K1 | K2 | K3 | K4 | K5>,
                     $2<C,
                        Expand<S
                           & Record<K1, T1>
                           & Record<K2, T2>
                           & Record<K3, T3>
                           & Record<K4, T4>
                           & Record<K5, T5>
                           >,
                        T6>],
               c7: [exclude<K7, keyof S | K1 | K2 | K3 | K4 | K5 | K6>,
                     $2<C,
                        Expand<S
                           & Record<K1, T1>
                           & Record<K2, T2>
                           & Record<K3, T3>
                           & Record<K4, T4>
                           & Record<K5, T5>
                           & Record<K6, T6>
                           >,
                        T7>],
            )
            => $2<C, S, Expand<
                     Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                     & Record<K4, T4>
                     & Record<K5, T5>
                     & Record<K6, T6>
                     & Record<K7, T7>
               >>
      }

   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Bivariate,
   Construction,
   Incorporatable,
   Shapeable,
   Product,
   $2
} from ".."

import {
   asReducible,
   array
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const construct = <C extends Bivariate>(
   { construct }: Construction<C>)
   : Construction<C>["construct"] =>
      construct

// ---------------------------------------------------------------------------
// Theorems
// ---------------------------------------------------------------------------

export const constructionFromIncorporate = <
   C extends Bivariate
>(
   {
      incorporate,
      merge,
      liftName,
      final
   }: Incorporatable<C> & Shapeable<C>
): Construction<C> =>
   ({
      construct:
         <S extends Product>(
            ...args: [string, $2<C, S & Product, Product>][]
         ) =>
            asReducible(array)(args).reduce({
               init:
                  () =>
                     final<S>() as $2<C, S, Product>,
               step:
                  ([k, next], acc) =>
                     merge(
                        acc,
                        liftName(k, incorporate(acc, next))
                     )

            })
   }) as Construction<C>
