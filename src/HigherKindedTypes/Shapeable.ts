// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Shapeable<C extends Bivariate> = {
      final: <S>
         ()
            => $2<C, S, {}>

      liftName: <K extends string, S extends Product, T>
         (
            k: K,
            m: $2<C, S, T>
         )
            => $2<C, S, Record<K, T>>

      merge: <S,
         T1 extends Product,
         T2 extends Product
         >
         (
            m1: $2<C, S, Omit<T1, keyof T2>>,
            m2: $2<C, S, Omit<T2, keyof T1>>,
         )
            => $2<C, S, Omit<T1, keyof T2> & Omit<T2, keyof T1>>
   }

   export type Demergable<C extends Bivariate> = {
      demerge: <S extends Product, P extends Product, T>(
            m: $2<C, S & P, T>
         )
            => $2<C, [S, P], T>
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Shapeable,
   Bivariate
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const liftName = <C extends Bivariate>(
   { liftName }: Shapeable<C>)
   : Shapeable<C>["liftName"] =>
      liftName

export const merge = <C extends Bivariate>(
   { merge }: Shapeable<C>)
   : Shapeable<C>["merge"] =>
      merge
