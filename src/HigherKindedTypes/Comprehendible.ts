// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type R<K extends string, T> = Record<K, T>

declare module "../types" {
   export type Comprehendible<C extends Bivariate> = {
      comprehend: {
            // Spread
            <S>(...schema: [string, $2<C, [S, Product], any>][]): $2<C, S, Product>

            // 0
            <S>(): $2<C, S, {}>

            // 1
            <S,
               K0 extends string, T0,
            >(
               c0: [K0, $2<C, [S, {}], T0>],
               ): $2<C, S, R<K0, T0>>

            // 2
            <S,
               K0 extends string, T0,
               K1 extends string, T1,
            >(
               c0: [K0, $2<C, [S, {}], T0>],
               c1: [exclude<K1, K0>, $2<C, [S, R<K0, T0>], T1>],
               ): $2<C, S, R<K0, T0> & R<K1, T1>>

            // 3
            <S,
               K0 extends string, T0,
               K1 extends string, T1,
               K2 extends string, T2,
            >(
               c0: [K0, $2<C, [S, {}], T0>],
               c1: [exclude<K1, K0>, $2<C, [S, R<K0, T0>], T1>],
               c2: [exclude<K2, K0 | K1>, $2<C, [S, R<K0, T0> & R<K1, T1>], T2>]
               ): $2<C, S, R<K0, T0> & R<K1, T1> & R<K2, T2>>

            // 4
            <S,
               K0 extends string, T0,
               K1 extends string, T1,
               K2 extends string, T2,
               K3 extends string, T3,
            >(
               c0: [K0, $2<C, [S, {}], T0>],
               c1: [exclude<K1, K0>, $2<C, [S, R<K0, T0>], T1>],
               c2: [exclude<K2, K0 | K1>, $2<C, [S, R<K0, T0> & R<K1, T1>], T2>],
               c3: [exclude<K3, K0 | K1 | K2>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2>], T3>]
               ): $2<C, S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3>>

            // 5
            <S,
               K0 extends string, T0,
               K1 extends string, T1,
               K2 extends string, T2,
               K3 extends string, T3,
               K4 extends string, T4,
            >(
               c0: [K0, $2<C, [S, {}], T0>],
               c1: [exclude<K1, K0>, $2<C, [S, R<K0, T0>], T1>],
               c2: [exclude<K2, K0 | K1>, $2<C, [S, R<K0, T0> & R<K1, T1>], T2>],
               c3: [exclude<K3, K0 | K1 | K2>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2>], T3>],
               c4: [exclude<K4, K0 | K1 | K2 | K3>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3>], T4>],
               ): $2<C, S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3> & R<K4, T4>>

            // 6
            <S,
               K0 extends string, T0,
               K1 extends string, T1,
               K2 extends string, T2,
               K3 extends string, T3,
               K4 extends string, T4,
               K5 extends string, T5,
            >(
               c0: [K0, $2<C, [S, {}], T0>],
               c1: [exclude<K1, K0>, $2<C, [S, R<K0, T0>], T1>],
               c2: [exclude<K2, K0 | K1>, $2<C, [S, R<K0, T0> & R<K1, T1>], T2>],
               c3: [exclude<K3, K0 | K1 | K2>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2>], T3>],
               c4: [exclude<K4, K0 | K1 | K2 | K3>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3>], T4>],
               c5: [exclude<K5, K0 | K1 | K2 | K3 | K4>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3> & R<K4, T4>], T5>]
               ): $2<C, S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3> & R<K4, T4> & R<K5, T5>>

            // 7
            <S,
               K0 extends string, T0,
               K1 extends string, T1,
               K2 extends string, T2,
               K3 extends string, T3,
               K4 extends string, T4,
               K5 extends string, T5,
               K6 extends string, T6,
            >(
               c0: [K0, $2<C, [S, {}], T0>],
               c1: [exclude<K1, K0>, $2<C, [S, R<K0, T0>], T1>],
               c2: [exclude<K2, K0 | K1>, $2<C, [S, R<K0, T0> & R<K1, T1>], T2>],
               c3: [exclude<K3, K0 | K1 | K2>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2>], T3>],
               c4: [exclude<K4, K0 | K1 | K2 | K3>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3>], T4>],
               c5: [exclude<K5, K0 | K1 | K2 | K3 | K4>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3> & R<K4, T4>], T5>],
               c6: [exclude<K6, K0 | K1 | K2 | K3 | K4 | K5>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3> & R<K4, T4> & R<K5, T5>], T6>],
               ): $2<C, S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3> & R<K4, T4> & R<K5, T5> & R<K6, T6>>

            // 8
            <S,
               K0 extends string, T0,
               K1 extends string, T1,
               K2 extends string, T2,
               K3 extends string, T3,
               K4 extends string, T4,
               K5 extends string, T5,
               K6 extends string, T6,
               K7 extends string, T7,
            >(
               c0: [K0, $2<C, [S, {}], T0>],
               c1: [exclude<K1, K0>, $2<C, [S, R<K0, T0>], T1>],
               c2: [exclude<K2, K0 | K1>, $2<C, [S, R<K0, T0> & R<K1, T1>], T2>],
               c3: [exclude<K3, K0 | K1 | K2>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2>], T3>],
               c4: [exclude<K4, K0 | K1 | K2 | K3>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3>], T4>],
               c5: [exclude<K5, K0 | K1 | K2 | K3 | K4>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3> & R<K4, T4>], T5>],
               c6: [exclude<K6, K0 | K1 | K2 | K3 | K4 | K5>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3> & R<K4, T4> & R<K5, T5>], T6>],
               c7: [exclude<K7, K0 | K1 | K2 | K3 | K4 | K5 | K6>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3> & R<K4, T4> & R<K5, T5> & R<K6, T6>], T7>],
               ): $2<C, S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3> & R<K4, T4> & R<K5, T5> & R<K6, T6> & R<K7, T7>>

            // 9
            <S,
               K0 extends string, T0,
               K1 extends string, T1,
               K2 extends string, T2,
               K3 extends string, T3,
               K4 extends string, T4,
               K5 extends string, T5,
               K6 extends string, T6,
               K7 extends string, T7,
               K8 extends string, T8,
            >(
               c0: [K0, $2<C, [S, {}], T0>],
               c1: [exclude<K1, K0>, $2<C, [S, R<K0, T0>], T1>],
               c2: [exclude<K2, K0 | K1>, $2<C, [S, R<K0, T0> & R<K1, T1>], T2>],
               c3: [exclude<K3, K0 | K1 | K2>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2>], T3>],
               c4: [exclude<K4, K0 | K1 | K2 | K3>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3>], T4>],
               c5: [exclude<K5, K0 | K1 | K2 | K3 | K4>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3> & R<K4, T4>], T5>],
               c6: [exclude<K6, K0 | K1 | K2 | K3 | K4 | K5>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3> & R<K4, T4> & R<K5, T5>], T6>],
               c7: [exclude<K7, K0 | K1 | K2 | K3 | K4 | K5 | K6>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3> & R<K4, T4> & R<K5, T5> & R<K6, T6>], T7>],
               c8: [exclude<K8, K0 | K1 | K2 | K3 | K4 | K5 | K6 | K7>, $2<C, [S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3> & R<K4, T4> & R<K5, T5> & R<K6, T6> & R<K7, T7>], T8>]
               ): $2<C, S, R<K0, T0> & R<K1, T1> & R<K2, T2> & R<K3, T3> & R<K4, T4> & R<K5, T5> & R<K6, T6> & R<K7, T7> & R<K8, T8>>
         }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Bivariate,
   Extendable,
   Product,
   $2,
   Comprehendible,
   Nameable
} from ".."

import {
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const comprehend = <C extends Bivariate>(
   { comprehend }: Comprehendible<C>) =>
      comprehend

export const defineComprehendible = <C extends Bivariate>(
   { extend, liftName }: Pick<Extendable<C>, "extend"> & Nameable<C>
   ): Comprehendible<C> =>
      ({
         comprehend: <S>(
            ...schema: [string, $2<C, [S, Product], any>][]
            ) =>
               extend(
                  ...schema.map(
                        ([key, c]) => liftName(key)(c)))
      })