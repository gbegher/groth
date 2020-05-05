// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Category<C extends Bivariate> = {
      identity: Category.core<C>["identity"]
      compose: {
         <S>(...args: $2<C, S, any>): $2<C, S, any>

         <S>(): $2<C, S, S>

         <S, T0>(
            m0: $2<C, S, T0>,
         ): $2<C, S, T0>

         <S, T0, T1>(
            m0: $2<C, S, T0>,
            m1: $2<C, T0, T1>,
         ): $2<C, S, T1>

         <S, T0, T1, T2>(
            m0: $2<C, S, T0>,
            m1: $2<C, T0, T1>,
            m2: $2<C, T1, T2>,
         ): $2<C, S, T2>

         <S, T0, T1, T2, T3>(
            m0: $2<C, S, T0>,
            m1: $2<C, T0, T1>,
            m2: $2<C, T1, T2>,
            m3: $2<C, T2, T3>,
         ): $2<C, S, T3>

         <S, T0, T1, T2, T3, T4>(
            m0: $2<C, S, T0>,
            m1: $2<C, T0, T1>,
            m2: $2<C, T1, T2>,
            m3: $2<C, T2, T3>,
            m4: $2<C, T3, T4>,
         ): $2<C, S, T4>

         <S, T0, T1, T2, T3, T4, T5>(
            m0: $2<C, S, T0>,
            m1: $2<C, T0, T1>,
            m2: $2<C, T1, T2>,
            m3: $2<C, T2, T3>,
            m4: $2<C, T3, T4>,
            m5: $2<C, T4, T5>,
         ): $2<C, S, T5>

         <S, T0, T1, T2, T3, T4, T5, T6>(
            m0: $2<C, S, T0>,
            m1: $2<C, T0, T1>,
            m2: $2<C, T1, T2>,
            m3: $2<C, T2, T3>,
            m4: $2<C, T3, T4>,
            m5: $2<C, T4, T5>,
            m6: $2<C, T5, T6>,
         ): $2<C, S, T6>

         <S, T0, T1, T2, T3, T4, T5, T6, T7,>(
            m0: $2<C, S, T0>,
            m1: $2<C, T0, T1>,
            m2: $2<C, T1, T2>,
            m3: $2<C, T2, T3>,
            m4: $2<C, T3, T4>,
            m5: $2<C, T4, T5>,
            m6: $2<C, T5, T6>,
            m7: $2<C, T6, T7>,
         ): $2<C, S, T7>

         <S, T0, T1, T2, T3, T4, T5, T6, T7, T8>(
            m0: $2<C, S, T0>,
            m1: $2<C, T0, T1>,
            m2: $2<C, T1, T2>,
            m3: $2<C, T2, T3>,
            m4: $2<C, T3, T4>,
            m5: $2<C, T4, T5>,
            m6: $2<C, T5, T6>,
            m7: $2<C, T6, T7>,
            m8: $2<C, T7, T8>,
         ): $2<C, S, T8>
      }
   }

   export namespace Category {
      export type core<C extends Bivariate> = {
         identity: <T>() => $2<C, T, T>
         compose: <T1, T2, T3>(h1: $2<C, T1, T2>, h2: $2<C, T2, T3>) => $2<C, T1, T3>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Category,
   Bivariate,
   $2,
} from ".."

import { array } from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const identity = <C extends Bivariate>(
   { identity }: Category<C>) =>
      identity

export const compose = <C extends Bivariate>(
   { compose }: Category<C>) =>
      compose

export const defineCategory = <C extends Bivariate>(
   { identity, compose }: Category.core<C>
   ): Category<C> =>
      ({
         identity,
         compose:
            <S>(...args: $2<C, S, any>[]) =>
               array(args).reduce({
                  init: identity,
                  step:
                     m => acc =>
                        compose(acc, m)
               })
      })