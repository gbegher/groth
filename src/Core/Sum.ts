// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Sum<Cases extends Product> = ValueOf<SumMapping<Cases>>

   export type SumMapping<Cases extends Product> = {
      [cas in keyof Cases]: {
         type: cas
         value: Cases[cas]
      }
   }

   export type Component<S extends Sum<any>, K extends CaseNames<S>> =
      SumMapping<SumDefinition<S>>[K]

   export type Case<S extends Sum<any>, type extends CaseNames<S>> =
      S extends { type: type, value: infer T } ? T : never

   export type CaseNames<S extends Sum<any>> = S["type"]

   export type SumDefinition<S extends Sum<any>> = {
      [k in CaseNames<S>]: Case<S, k>
   }

   export type Matching<S extends Sum<any>, T> = {
      [k in CaseNames<S>]: Mor<Case<S, k>, T>
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Sum,
   Matching ,
   Component,
   CaseNames,
   Case
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const match = <S extends Sum<any>, T>(
   s: S, matching: Matching<S, T>)
   : T =>
      matching[s.type as keyof Matching<S, T>](s.value)

export const buildCase = <S extends Sum<any>, K extends CaseNames<S>>(
   type: K, value: Case<S, K>)
   : Component<S, K> =>
      ({
         type,
         value
      })
