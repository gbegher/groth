// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../types" {
   export type Filterable<
      C extends Bivariate,
      FC extends Bivariate=Mor.type
   > =
      {
         filter: <S>(pred: $2<FC, S, boolean>) => $2<C, S, S>
      }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import {
   Filterable,
   Bivariate,
   Mor,
} from "../types"

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const filter = <
      C extends Bivariate,
      FC extends Bivariate=Mor.type
   >(
   { filter }: Filterable<C, FC>
   ): Filterable<C, FC>["filter"] =>
      filter
