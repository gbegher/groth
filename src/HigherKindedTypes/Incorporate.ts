// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Incorporatable<C extends Bivariate.Type> = {
      incorporate: <S, P, T>(
         m1: $2<C, S, P>,
         m2: $2<C, S & P, T>,
      ) =>
         $2<C, S, P & T>
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Bivariate,
   Incorporatable,
   Shapeable,
   Compound,
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const incorporate = <C extends Bivariate.Type>(
   { incorporate }: Incorporatable<C>)
   : Incorporatable<C>["incorporate"] =>
      incorporate

// ---------------------------------------------------------------------------
// Theorems
// ---------------------------------------------------------------------------

export const incorporateFromCompound = <
   C extends Bivariate.Type
>(
   {
      merge,
      compound
   }: Compound<C> & Pick<Shapeable<C>, "merge">)
   : Incorporatable<C> =>
      ({
         incorporate:
            (m1, m2) =>
               merge(
                  m1,
                  compound(m1, m2))
      })
