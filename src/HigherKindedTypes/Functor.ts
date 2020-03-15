// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Functor<F extends Generic.Type, C1 extends Bivariate.Type = Mor.name, C2 extends Bivariate.Type = Mor.name> = {
      map: <S, T>(mor: $2<C1, S, T>) => $2<C2, $<F, S>, $<F, T>>
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Functor,
   Generic,
   Mor,
   Bivariate
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const map = <
      F extends Generic.Type,
      C1 extends Bivariate.Type = Mor.name,
      C2 extends Bivariate.Type = Mor.name
   >
   ({ map }: Functor<F, C1, C2>)
   : Functor<F, C1, C2>["map"] =>
      map
