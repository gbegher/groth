// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Generic = keyof Generic.Register<any>

   export namespace Generic {
      export interface Register<A1> {
         [k: string]: any
      }

      export type $<H extends Generic, A1> =
         Register<A1>[H]
   }

   export type Bivariate = keyof Bivariate.Register<any, any>

   export namespace Bivariate {
      export interface Register<A1, A2> {
         [k: string]: any
      }

      export type $<H extends Bivariate, A1, A2> =
         Register<A1, A2>[H]
   }

   export type $<H extends Generic, T1> = Generic.$<H, T1>
   export type $2<H extends Bivariate, T1, T2> = Bivariate.$<H, T1, T2>
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {} from ".."
