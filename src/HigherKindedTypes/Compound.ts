// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Compound<C extends Bivariate> = {
      compound: <S, P, T>(
         m1: $2<C, S, P>,
         m2: $2<C, S & P, T>,
      ) =>
         $2<C, S, T>
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Bivariate,
   Compound,
   Category,
   Shapeable
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const compound = <C extends Bivariate>(
   { compound }: Compound<C>)
   : Compound<C>["compound"] =>
      compound

// ---------------------------------------------------------------------------
// Theorems
// ---------------------------------------------------------------------------

export const compoundFromCategory = <
   C extends Bivariate
>(
   {
      identity,
      compose,
      merge
   }: Category<C> & Pick<Shapeable<C>, "merge">
): Compound<C> =>
      ({
         compound:
            (m1, m2) =>
               compose(
                  merge(identity(), m1),
                  m2)
      })
