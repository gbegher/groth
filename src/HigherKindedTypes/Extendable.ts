// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Extendable<C extends Bivariate> = {
      extend: {
         // Spread

         <S, P extends Product>(init: $2<C, S, P>):
            (...items: [string, $2<C, [S, Product], Product>][]) =>
               $2<C, S, Expand<P & Product>>

         // 0

         <S, P>(
            init: $2<C, S, P>
         ): () => $2<C, S, P>

         // 1

         <S, P>(
            init: $2<C, S, P>
         ): <
            K0 extends string, T0,
         >(
            r0: [
               exclude<K0, keyof P>,
               $2<C,
                  [S, P],
                  T0
               >
            ],
         ) => $2<C, S, Expand<P
               & Record<K0, T0>
            >>

         // 2

         <S, P>(
            init: $2<C, S, P>
         ): <
            K0 extends string, T0,
            K1 extends string, T1,
         >(
            r0: [
               exclude<K0, keyof P>,
               $2<C,
                  [S, P],
                  T0
               >
            ],
            r1: [
               exclude<K1, keyof P | K0>,
               $2<C,
                  [S, P & Record<K0, T0>],
                  T1
               >
            ],
         ) => $2<C, S, Expand<P
               & Record<K0, T0>
               & Record<K1, T1>
            >>

         // 3

         <S, P>(
            init: $2<C, S, P>
         ): <
            K0 extends string, T0,
            K1 extends string, T1,
            K2 extends string, T2,
         >(
            r0: [
               exclude<K0, keyof P>,
               $2<C,
                  [S, P],
                  T0
               >
            ],
            r1: [
               exclude<K1, keyof P | K0>,
               $2<C,
                  [S, P & Record<K0, T0>],
                  T1
               >
            ],
            r2: [
               exclude<K2, keyof P | K0 | K1>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                  ],
                  T2
               >
            ],
         ) => $2<C, S, Expand<P
               & Record<K0, T0>
               & Record<K1, T1>
               & Record<K2, T2>
            >>

         // 4

         <S, P>(
            init: $2<C, S, P>
         ): <
            K0 extends string, T0,
            K1 extends string, T1,
            K2 extends string, T2,
            K3 extends string, T3,
         >(
            r0: [
               exclude<K0, keyof P>,
               $2<C,
                  [S, P],
                  T0
               >
            ],
            r1: [
               exclude<K1, keyof P | K0>,
               $2<C,
                  [S, P & Record<K0, T0>],
                  T1
               >
            ],
            r2: [
               exclude<K2, keyof P | K0 | K1>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                  ],
                  T2
               >
            ],
            r3: [
               exclude<K3, keyof P | K0 | K1 | K2>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                  ],
                  T3
               >
            ],
         ) => $2<C, S, Expand<P
               & Record<K0, T0>
               & Record<K1, T1>
               & Record<K2, T2>
               & Record<K3, T3>
            >>

         // 5

         <S, P>(
            init: $2<C, S, P>
         ): <
            K0 extends string, T0,
            K1 extends string, T1,
            K2 extends string, T2,
            K3 extends string, T3,
            K4 extends string, T4,
         >(
            r0: [
               exclude<K0, keyof P>,
               $2<C,
                  [S, P],
                  T0
               >
            ],
            r1: [
               exclude<K1, keyof P | K0>,
               $2<C,
                  [S, P & Record<K0, T0>],
                  T1
               >
            ],
            r2: [
               exclude<K2, keyof P | K0 | K1>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                  ],
                  T2
               >
            ],
            r3: [
               exclude<K3, keyof P | K0 | K1 | K2>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                  ],
                  T3
               >
            ],
            r4: [
               exclude<K4, keyof P | K0 | K1 | K2 | K3>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                  ],
                  T4
               >
            ],
         ) => $2<C, S, Expand<P
               & Record<K0, T0>
               & Record<K1, T1>
               & Record<K2, T2>
               & Record<K3, T3>
               & Record<K4, T4>
            >>

         // 6

         <S, P>(
            init: $2<C, S, P>
         ): <
            K0 extends string, T0,
            K1 extends string, T1,
            K2 extends string, T2,
            K3 extends string, T3,
            K4 extends string, T4,
            K5 extends string, T5,
         >(
            r0: [
               exclude<K0, keyof P>,
               $2<C,
                  [S, P],
                  T0
               >
            ],
            r1: [
               exclude<K1, keyof P | K0>,
               $2<C,
                  [S, P & Record<K0, T0>],
                  T1
               >
            ],
            r2: [
               exclude<K2, keyof P | K0 | K1>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                  ],
                  T2
               >
            ],
            r3: [
               exclude<K3, keyof P | K0 | K1 | K2>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                  ],
                  T3
               >
            ],
            r4: [
               exclude<K4, keyof P | K0 | K1 | K2 | K3>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                  ],
                  T4
               >
            ],
            r5: [
               exclude<K5, keyof P | K0 | K1 | K2 | K3 | K4>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                     & Record<K4, T4>
                  ],
                  T5
               >
            ],
         ) => $2<C, S, Expand<P
               & Record<K0, T0>
               & Record<K1, T1>
               & Record<K2, T2>
               & Record<K3, T3>
               & Record<K4, T4>
               & Record<K5, T5>
            >>

         // 7

         <S, P>(
            init: $2<C, S, P>
         ): <
            K0 extends string, T0,
            K1 extends string, T1,
            K2 extends string, T2,
            K3 extends string, T3,
            K4 extends string, T4,
            K5 extends string, T5,
            K6 extends string, T6,
         >(
            r0: [
               exclude<K0, keyof P>,
               $2<C,
                  [S, P],
                  T0
               >
            ],
            r1: [
               exclude<K1, keyof P | K0>,
               $2<C,
                  [S, P & Record<K0, T0>],
                  T1
               >
            ],
            r2: [
               exclude<K2, keyof P | K0 | K1>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                  ],
                  T2
               >
            ],
            r3: [
               exclude<K3, keyof P | K0 | K1 | K2>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                  ],
                  T3
               >
            ],
            r4: [
               exclude<K4, keyof P | K0 | K1 | K2 | K3>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                  ],
                  T4
               >
            ],
            r5: [
               exclude<K5, keyof P | K0 | K1 | K2 | K3 | K4>,
               $2<C,
                  [S, P
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
               exclude<K6, keyof P | K0 | K1 | K2 | K3 | K4 | K5>,
               $2<C,
                  [S, P
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
         ) => $2<C, S, Expand<P
               & Record<K0, T0>
               & Record<K1, T1>
               & Record<K2, T2>
               & Record<K3, T3>
               & Record<K4, T4>
               & Record<K5, T5>
               & Record<K6, T6>
            >>

         // 8

         <S, P>(
            init: $2<C, S, P>
         ): <
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
               exclude<K0, keyof P>,
               $2<C,
                  [S, P],
                  T0
               >
            ],
            r1: [
               exclude<K1, keyof P | K0>,
               $2<C,
                  [S, P & Record<K0, T0>],
                  T1
               >
            ],
            r2: [
               exclude<K2, keyof P | K0 | K1>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                  ],
                  T2
               >
            ],
            r3: [
               exclude<K3, keyof P | K0 | K1 | K2>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                  ],
                  T3
               >
            ],
            r4: [
               exclude<K4, keyof P | K0 | K1 | K2 | K3>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                  ],
                  T4
               >
            ],
            r5: [
               exclude<K5, keyof P | K0 | K1 | K2 | K3 | K4>,
               $2<C,
                  [S, P
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
               exclude<K6, keyof P | K0 | K1 | K2 | K3 | K4 | K5>,
               $2<C,
                  [S, P
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
               exclude<K7, keyof P | K0 | K1 | K2 | K3 | K4 | K5 | K6>,
               $2<C,
                  [S, P
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
         ) => $2<C, S, Expand<P
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

         <S, P>(
            init: $2<C, S, P>
         ): <
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
               exclude<K0, keyof P>,
               $2<C,
                  [S, P],
                  T0
               >
            ],
            r1: [
               exclude<K1, keyof P | K0>,
               $2<C,
                  [S, P & Record<K0, T0>],
                  T1
               >
            ],
            r2: [
               exclude<K2, keyof P | K0 | K1>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                  ],
                  T2
               >
            ],
            r3: [
               exclude<K3, keyof P | K0 | K1 | K2>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                  ],
                  T3
               >
            ],
            r4: [
               exclude<K4, keyof P | K0 | K1 | K2 | K3>,
               $2<C,
                  [S, P
                     & Record<K0, T0>
                     & Record<K1, T1>
                     & Record<K2, T2>
                     & Record<K3, T3>
                  ],
                  T4
               >
            ],
            r5: [
               exclude<K5, keyof P | K0 | K1 | K2 | K3 | K4>,
               $2<C,
                  [S, P
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
               exclude<K6, keyof P | K0 | K1 | K2 | K3 | K4 | K5>,
               $2<C,
                  [S, P
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
               exclude<K7, keyof P | K0 | K1 | K2 | K3 | K4 | K5 | K6>,
               $2<C,
                  [S, P
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
               exclude<K8, keyof P | K0 | K1 | K2 | K3 | K4 | K5 | K6 | K7>,
               $2<C,
                  [S, P
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
         ) => $2<C, S, Expand<P
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

   export namespace Extendable {
      export type extendSingle<C extends Bivariate> = <S, P>(
         init: $2<C, S, P>) => <K extends string, T>(
            r0: [exclude<K, keyof P>, $2<C, [S, P], T>]
         ) => $2<C, S, P & Record<K, T>>
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Bivariate,
   Extendable,
   exclude,
   $2,
   Product,
} from ".."
import { array } from "../Generics/Array"

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const extend = <C extends Bivariate>(
   { extend }: Extendable<C>
   ): Extendable<C>["extend"] =>
      extend

export const completeExtendable = <C extends Bivariate>(
   extendSingle: Extendable.extendSingle<C>
   ): Extendable<C> =>
      ({
         extend:
            <S, P extends Product>(
               init: $2<C, S, P>) => (
                  ...items: [string, $2<C, [S, Product], Product>][]
                  ): $2<C, S, P & Product> =>
                     array(items).reduce({
                        init: () => init,
                        step:
                           rec => acc =>
                              extendSingle(acc)(
                                 rec as [exclude<string, keyof P>, $2<C, [S, Product], any>])
                     })
      })