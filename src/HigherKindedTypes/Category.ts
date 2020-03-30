// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Category<H extends Bivariate> = {
      identity: <T>() => $2<H, T, T>
      compose: <T1, T2, T3>(h1: $2<H, T1, T2>, h2: $2<H, T2, T3>) => $2<H, T1, T3>
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Category,
   Bivariate,
   $2
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const identity = <H extends Bivariate>(
   { identity }: Category<H>) =>
      identity

export const compose = <H extends Bivariate>(
   { compose, identity }: Category<H>) =>
      {
         type C<T1, T2> = $2<H, T1, T2>

         function result<T1>
            ()
            : C<T1, T1>

         function result<T1, T2>
            (m1: C<T1, T2>)
            : C<T1, T2>

         function result<T1, T2, T3>
            (m1: C<T1, T2>,
             m2: C<T2, T3>
            )
            : C<T1, T3>

         function result<T1, T2, T3, T4>
            (m1: C<T1, T2>,
             m2: C<T2, T3>,
             m3: C<T3, T4>,
            )
            : C<T1, T4>

         function result<T1, T2, T3, T4, T5>
            (m1: C<T1, T2>,
             m2: C<T2, T3>,
             m3: C<T3, T4>,
             m4: C<T4, T5>,
            )
            : C<T1, T5>

         function result<T1, T2, T3, T4, T5, T6>
            (m1: C<T1, T2>,
             m2: C<T2, T3>,
             m3: C<T3, T4>,
             m4: C<T4, T5>,
             m5: C<T5, T6>,
            )
            : C<T1, T6>

         function result<T1, T2, T3, T4, T5, T6, T7>
            (m1: C<T1, T2>,
             m2: C<T2, T3>,
             m3: C<T3, T4>,
             m4: C<T4, T5>,
             m5: C<T5, T6>,
             m6: C<T6, T7>,
            )
            : C<T1, T7>

         function result<T1, T2, T3, T4, T5, T6, T7, T8>
            (m1: C<T1, T2>,
             m2: C<T2, T3>,
             m3: C<T3, T4>,
             m4: C<T4, T5>,
             m5: C<T5, T6>,
             m6: C<T6, T7>,
             m7: C<T7, T8>,
            )
            : C<T1, T8>

         function result<T1, T2, T3, T4, T5, T6, T7, T8, T9>
            (m1: C<T1, T2>,
             m2: C<T2, T3>,
             m3: C<T3, T4>,
             m4: C<T4, T5>,
             m5: C<T5, T6>,
             m6: C<T6, T7>,
             m7: C<T7, T8>,
             m8: C<T8, T9>,
            )
            : C<T1, T9>

         function result
            (...ms: C<any, any>[])
            : C<any, any>
               {
                  return ms.reduce(
                     compose,
                     identity())
               }

         return result
      }
