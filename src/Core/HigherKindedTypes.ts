// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export namespace Generic {
      export interface Eval<A1> {
         [k: string]: any
      }

      export type Type =
         keyof Eval<any>

      export type $<H extends Type, A1> =
         Eval<A1>[H]
   }

   export namespace Bivariate {
      export interface Eval<A1, A2> {
         [k: string]: any
      }

      export type Type =
         keyof Eval<any, any>

      export type $<H extends Type, A1, A2> =
         Eval<A1, A2>[H]
   }

   export type $<H extends Generic.Type, T1> = Generic.$<H, T1>
   export type $2<H extends Bivariate.Type, T1, T2> = Bivariate.$<H, T1, T2>
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {} from ".."
