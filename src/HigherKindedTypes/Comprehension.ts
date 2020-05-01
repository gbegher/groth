// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Comprehendable<C extends Bivariate> = {
      comprehend: {
         // Spread

         <S>(...items: [string, $2<C, [S, Product], any>][]):
               $2<C, S, Product>

         // 0

         <S>(): $2<C, S, {}>

         // 1

         <S,
            K0 extends string, T0,
         >(
            r0: [
               K0,
               $2<C,
                  [S, {}],
                  T0
               >
            ],
         ): $2<C, S, Record<K0, T0>>

         // 2

         <S,
            K0 extends string, T0,
            K1 extends string, T1,
         >(
            r0: [
               K0,
               $2<C,
                  [S, {}],
                  T0
               >
            ],
            r1: [
               exclude<K1, K0>,
               $2<C,
                  [S, Record<K0, T0>],
                  T1
               >
            ],
         ): $2<C, S, Expand<
               & Record<K0, T0>
               & Record<K1, T1>
            >>

         // 3

         <S,
            K0 extends string, T0,
            K1 extends string, T1,
            K2 extends string, T2,
         >(
            r0: [
               K0,
               $2<C,
                  [S, {}],
                  T0
               >
            ],
            r1: [
               exclude<K1, K0>,
               $2<C,
                  [S, Record<K0, T0>],
                  T1
               >
            ],
            r2: [
               exclude<K2, K0 | K1>,
               $2<C,
                  [S,
                     Record<K0, T0>
                     & Record<K1, T1>
                  ],
                  T2
               >
            ],
         ): $2<C, S, Expand<
               & Record<K0, T0>
               & Record<K1, T1>
               & Record<K2, T2>
            >>

         // 4

         <S,
            K0 extends string, T0,
            K1 extends string, T1,
            K2 extends string, T2,
            K3 extends string, T3,
         >(
            r0: [
               K0,
               $2<C,
                  [S, {}],
                  T0
               >
            ],
            r1: [
               exclude<K1, K0>,
               $2<C,
                  [S, Record<K0, T0>],
                  T1
               >
            ],
            r2: [
               exclude<K2, K0 | K1>,
               $2<C,
                  [S,
                     Record<K0, T0>
                     & Record<K1, T1>
                  ],
                  T2
               >
            ],
            r3: [
               exclude<K3, K0 | K1 | K2>,
               $2<C,
                  [S,
                     Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                  ],
                  T3
               >
            ],
         ): $2<C, S, Expand<
               & Record<K0, T0>
               & Record<K1, T1>
               & Record<K2, T2>
               & Record<K3, T3>
            >>

         // 5

         <S,
            K0 extends string, T0,
            K1 extends string, T1,
            K2 extends string, T2,
            K3 extends string, T3,
            K4 extends string, T4,
         >(
            r0: [
               K0,
               $2<C,
                  [S, {}],
                  T0
               >
            ],
            r1: [
               exclude<K1, K0>,
               $2<C,
                  [S, Record<K0, T0>],
                  T1
               >
            ],
            r2: [
               exclude<K2, K0 | K1>,
               $2<C,
                  [S,
                     Record<K0, T0>
                     & Record<K1, T1>
                  ],
                  T2
               >
            ],
            r3: [
               exclude<K3, K0 | K1 | K2>,
               $2<C,
                  [S,
                     Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                  ],
                  T3
               >
            ],
            r4: [
               exclude<K4, K0 | K1 | K2 | K3>,
               $2<C,
                  [S,
                     Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                  ],
                  T4
               >
            ],
         ): $2<C, S, Expand<
               & Record<K0, T0>
               & Record<K1, T1>
               & Record<K2, T2>
               & Record<K3, T3>
               & Record<K4, T4>
            >>

         // 6

         <S,
            K0 extends string, T0,
            K1 extends string, T1,
            K2 extends string, T2,
            K3 extends string, T3,
            K4 extends string, T4,
            K5 extends string, T5,
         >(
            r0: [
               K0,
               $2<C,
                  [S, {}],
                  T0
               >
            ],
            r1: [
               exclude<K1, K0>,
               $2<C,
                  [S, Record<K0, T0>],
                  T1
               >
            ],
            r2: [
               exclude<K2, K0 | K1>,
               $2<C,
                  [S,
                     Record<K0, T0>
                     & Record<K1, T1>
                  ],
                  T2
               >
            ],
            r3: [
               exclude<K3, K0 | K1 | K2>,
               $2<C,
                  [S,
                     Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                  ],
                  T3
               >
            ],
            r4: [
               exclude<K4, K0 | K1 | K2 | K3>,
               $2<C,
                  [S,
                     Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                  ],
                  T4
               >
            ],
            r5: [
               exclude<K5, K0 | K1 | K2 | K3 | K4>,
               $2<C,
                  [S,
                     Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                     & Record<K4, T4>
                  ],
                  T5
               >
            ],
         ): $2<C, S, Expand<
               & Record<K0, T0>
               & Record<K1, T1>
               & Record<K2, T2>
               & Record<K3, T3>
               & Record<K4, T4>
               & Record<K5, T5>
            >>

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
            r0: [
               K0,
               $2<C,
                  [S, {}],
                  T0
               >
            ],
            r1: [
               exclude<K1, K0>,
               $2<C,
                  [S, Record<K0, T0>],
                  T1
               >
            ],
            r2: [
               exclude<K2, K0 | K1>,
               $2<C,
                  [S,
                     & Record<K0, T0>
                     & Record<K1, T1>
                  ],
                  T2
               >
            ],
            r3: [
               exclude<K3, K0 | K1 | K2>,
               $2<C,
                  [S,
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                  ],
                  T3
               >
            ],
            r4: [
               exclude<K4, K0 | K1 | K2 | K3>,
               $2<C,
                  [S,
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                  ],
                  T4
               >
            ],
            r5: [
               exclude<K5, K0 | K1 | K2 | K3 | K4>,
               $2<C,
                  [S,
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                     & Record<K4, T4>
                  ],
                  T5
               >
            ],
            r6: [
               exclude<K6, K0 | K1 | K2 | K3 | K4 | K5>,
               $2<C,
                  [S,
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                     & Record<K4, T4>
                     & Record<K5, T5>
                  ],
                  T6
               >
            ],
         ): $2<C, S, Expand<
               & Record<K0, T0>
               & Record<K1, T1>
               & Record<K2, T2>
               & Record<K3, T3>
               & Record<K4, T4>
               & Record<K5, T5>
               & Record<K6, T6>
            >>

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
            r0: [
               K0,
               $2<C,
                  [S, {}],
                  T0
               >
            ],
            r1: [
               exclude<K1, K0>,
               $2<C,
                  [S, Record<K0, T0>],
                  T1
               >
            ],
            r2: [
               exclude<K2, K0 | K1>,
               $2<C,
                  [S,
                     & Record<K0, T0>
                     & Record<K1, T1>
                  ],
                  T2
               >
            ],
            r3: [
               exclude<K3, K0 | K1 | K2>,
               $2<C,
                  [S,
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                  ],
                  T3
               >
            ],
            r4: [
               exclude<K4, K0 | K1 | K2 | K3>,
               $2<C,
                  [S,
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                  ],
                  T4
               >
            ],
            r5: [
               exclude<K5, K0 | K1 | K2 | K3 | K4>,
               $2<C,
                  [S,
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                     & Record<K4, T4>
                  ],
                  T5
               >
            ],
            r6: [
               exclude<K6, K0 | K1 | K2 | K3 | K4 | K5>,
               $2<C,
                  [S,
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                     & Record<K4, T4>
                     & Record<K5, T5>
                  ],
                  T6
               >
            ],
            r7: [
               exclude<K7, K0 | K1 | K2 | K3 | K4 | K5 | K6>,
               $2<C,
                  [S,
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                     & Record<K4, T4>
                     & Record<K5, T5>
                     & Record<K6, T6>
                  ],
                  T7
               >
            ],
         ): $2<C, S, Expand<
               & Record<K0, T0>
               & Record<K1, T1>
               & Record<K2, T2>
               & Record<K3, T3>
               & Record<K4, T4>
               & Record<K5, T5>
               & Record<K6, T6>
               & Record<K7, T7>
            >>

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
            r0: [
               K0,
               $2<C,
                  [S, {}],
                  T0
               >
            ],
            r1: [
               exclude<K1,  K0>,
               $2<C,
                  [S, & Record<K0, T0>],
                  T1
               >
            ],
            r2: [
               exclude<K2, K0 | K1>,
               $2<C,
                  [S,
                     & Record<K0, T0>
                     & Record<K1, T1>
                  ],
                  T2
               >
            ],
            r3: [
               exclude<K3, K0 | K1 | K2>,
               $2<C,
                  [S,
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                  ],
                  T3
               >
            ],
            r4: [
               exclude<K4, K0 | K1 | K2 | K3>,
               $2<C,
                  [S,
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                  ],
                  T4
               >
            ],
            r5: [
               exclude<K5, K0 | K1 | K2 | K3 | K4>,
               $2<C,
                  [S,
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                     & Record<K4, T4>
                  ],
                  T5
               >
            ],
            r6: [
               exclude<K6, K0 | K1 | K2 | K3 | K4 | K5>,
               $2<C,
                  [S,
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                     & Record<K4, T4>
                     & Record<K5, T5>
                  ],
                  T6
               >
            ],
            r7: [
               exclude<K7, K0 | K1 | K2 | K3 | K4 | K5 | K6>,
               $2<C,
                  [S,
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                     & Record<K4, T4>
                     & Record<K5, T5>
                     & Record<K6, T6>
                  ],
                  T7
               >
            ],
            r8: [
               exclude<K8, K0 | K1 | K2 | K3 | K4 | K5 | K6 | K7>,
               $2<C,
                  [S,
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                     & Record<K4, T4>
                     & Record<K5, T5>
                     & Record<K6, T6>
                     & Record<K7, T7>
                  ],
                  T8
               >
            ],
         ): $2<C, S, Expand<
               & Record<K0, T0>
               & Record<K1, T1>
               & Record<K2, T2>
               & Record<K3, T3>
               & Record<K4, T4>
               & Record<K5, T5>
               & Record<K6, T6>
               & Record<K7, T7>
               & Record<K8, T8>
            >>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Bivariate,
   Extendable,
   Shapeable,
   Comprehendable,
   Product,
   $2,
} from ".."

import {
   array
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Theorems
// ---------------------------------------------------------------------------

export const comprehendableFromExtendable = <C extends Bivariate>(
   { extend, final }: Extendable<C> & Pick<Shapeable<C>, "final">
   ): Comprehendable<C> =>
      ({
         comprehend:
            <S>(...items: [string, $2<C, [S, Product], Product>][]) =>
               array(items).reduce({
                  init: final,
                  step:
                     s => acc =>
                        extend(acc)(s)
               })
      })

// ---------------------------------------------------------------------------
// Augmentation
// ---------------------------------------------------------------------------

export const extend = <C extends Bivariate>(
   { comprehend }: Comprehendable<C>)
   : Comprehendable<C>["comprehend"] =>
      comprehend