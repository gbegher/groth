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

   export type Matching<S extends Sum<any>, T, C extends Bivariate=Mor.type> = {
      [k in CaseNames<S>]: $2<C, Case<S, k>, T>
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
   Case,
   Product,
   Mor,
   CoDom,
   Dom,
   AsyncMor,
} from ".."

import {
   product,
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const match = <S extends Sum<any>, T>(
   s: S, matching: Matching<S, T>)
   : T =>
      matching[s.type as keyof Matching<S, T>](s.value)

export const sumCase = <S extends Sum<any>, K extends CaseNames<S>>(
   type: K,
   value: Case<S, K>
   ): Component<S, K> =>
      ({
         type,
         value
      })

export const codiagonal = <T>(
   mors: Product<Mor<any, T>>
   ): Mor<Sum<{ [k in keyof typeof mors]: CoDom<(typeof mors)[k]>}>, T> =>
   cs => match(cs, product(mors).map(
      mor =>
         x => mor(x)
   ))

export const parallel = (
   mors: Product<Mor<any, any>>)
   : Mor<
      Sum<{ [k in keyof typeof mors]: CoDom<(typeof mors)[k]>}>,
      Sum<{ [k in keyof typeof mors]: Dom<(typeof mors)[k]>}>
   > =>
      cs => match(cs, product(mors).mapNamed(
         ([k, mor]) =>
            x => sumCase(k, mor(x))
      ))

export const matchAsync = async <S extends Sum<any>, T>(
   s: S, matching: Matching<S, T, AsyncMor.type>
   ): Promise<T> =>
      matching[s.type as keyof Matching<S, T>](s.value)