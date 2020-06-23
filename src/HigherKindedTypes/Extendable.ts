// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../types" {
   export type Extendable<C extends Bivariate> = {
      hoist: <S, T>(m: $2<C, S, T>) => $2<C, [S, {}], T>
      extend: {
            // Spread
            <S>(
               ...extensions: $2<C, [S, Product], Product>[]
               ): $2<C, S, Product>

            // 0
            <S>(): $2<C, S, {}>

            // 1
            <S, E0 extends Product>(
               e0: $2<C, [S, {}], E0>
               ): $2<C, S, E0>

            // 2
            <S,
               E0 extends Product,
               E1 extends Product,
            >(
               e0: $2<C, [S, {}], E0>,
               e1: $2<C, [S, E0], E1>,
               ): $2<C, S, E0 & E1>

            // 3
            <S,
               E0 extends Product,
               E1 extends Product,
               E2 extends Product,
            >(
               e0: $2<C, [S, {}], E0>,
               e1: $2<C, [S, E0], E1>,
               e2: $2<C, [S, E0 & E1], E2>,
               ): $2<C, S, E0 & E1 & E2>

            // 4
            <S,
               E0 extends Product,
               E1 extends Product,
               E2 extends Product,
               E3 extends Product,
            >(
               e0: $2<C, [S, {}], E0>,
               e1: $2<C, [S, E0], E1>,
               e2: $2<C, [S, E0 & E1], E2>,
               e3: $2<C, [S, E0 & E1 & E2], E3>,
               ): $2<C, S, E0 & E1 & E2 & E3>

            // 5
            <S,
               E0 extends Product,
               E1 extends Product,
               E2 extends Product,
               E3 extends Product,
               E4 extends Product,
            >(
               e0: $2<C, [S, {}], E0>,
               e1: $2<C, [S, E0], E1>,
               e2: $2<C, [S, E0 & E1], E2>,
               e3: $2<C, [S, E0 & E1 & E2], E3>,
               e4: $2<C, [S, E0 & E1 & E2 & E3], E4>,
               ): $2<C, S, E0 & E1 & E2 & E3 & E4>

            // 6
            <S,
               E0 extends Product,
               E1 extends Product,
               E2 extends Product,
               E3 extends Product,
               E4 extends Product,
               E5 extends Product,
            >(
               e0: $2<C, [S, {}], E0>,
               e1: $2<C, [S, E0], E1>,
               e2: $2<C, [S, E0 & E1], E2>,
               e3: $2<C, [S, E0 & E1 & E2], E3>,
               e4: $2<C, [S, E0 & E1 & E2 & E3], E4>,
               e5: $2<C, [S, E0 & E1 & E2 & E3 & E4], E5>,
               ): $2<C, S, E0 & E1 & E2 & E3 & E4 & E5>

            // 7
            <S,
               E0 extends Product,
               E1 extends Product,
               E2 extends Product,
               E3 extends Product,
               E4 extends Product,
               E5 extends Product,
               E6 extends Product,
            >(
               e0: $2<C, [S, {}], E0>,
               e1: $2<C, [S, E0], E1>,
               e2: $2<C, [S, E0 & E1], E2>,
               e3: $2<C, [S, E0 & E1 & E2], E3>,
               e4: $2<C, [S, E0 & E1 & E2 & E3], E4>,
               e5: $2<C, [S, E0 & E1 & E2 & E3 & E4], E5>,
               e6: $2<C, [S, E0 & E1 & E2 & E3 & E4 & E5], E6>,
               ): $2<C, S, E0 & E1 & E2 & E3 & E4 & E5 & E6>

            // 8
            <S,
               E0 extends Product,
               E1 extends Product,
               E2 extends Product,
               E3 extends Product,
               E4 extends Product,
               E5 extends Product,
               E6 extends Product,
               E7 extends Product,
            >(
               e0: $2<C, [S, {}], E0>,
               e1: $2<C, [S, E0], E1>,
               e2: $2<C, [S, E0 & E1], E2>,
               e3: $2<C, [S, E0 & E1 & E2], E3>,
               e4: $2<C, [S, E0 & E1 & E2 & E3], E4>,
               e5: $2<C, [S, E0 & E1 & E2 & E3 & E4], E5>,
               e6: $2<C, [S, E0 & E1 & E2 & E3 & E4 & E5], E6>,
               e7: $2<C, [S, E0 & E1 & E2 & E3 & E4 & E5 & E6], E7>,
               ): $2<C, S, E0 & E1 & E2 & E3 & E4 & E5 & E6 & E7>

            // 9
            <S,
               E0 extends Product,
               E1 extends Product,
               E2 extends Product,
               E3 extends Product,
               E4 extends Product,
               E5 extends Product,
               E6 extends Product,
               E7 extends Product,
               E8 extends Product,
            >(
               e0: $2<C, [S, {}], E0>,
               e1: $2<C, [S, E0], E1>,
               e2: $2<C, [S, E0 & E1], E2>,
               e3: $2<C, [S, E0 & E1 & E2], E3>,
               e4: $2<C, [S, E0 & E1 & E2 & E3], E4>,
               e5: $2<C, [S, E0 & E1 & E2 & E3 & E4], E5>,
               e6: $2<C, [S, E0 & E1 & E2 & E3 & E4 & E5], E6>,
               e7: $2<C, [S, E0 & E1 & E2 & E3 & E4 & E5 & E6], E7>,
               e8: $2<C, [S, E0 & E1 & E2 & E3 & E4 & E5 & E6 & E7], E8>,
               ): $2<C, S, E0 & E1 & E2 & E3 & E4 & E5 & E6 & E7 & E8>
         }
   }

   namespace Extendable {
      export type core<C extends Bivariate> =
         {
            initial: <S>() => $2<C, S, {}>
            hoist: Extendable<C>["hoist"]
            extend: <S, B extends Product, E extends Product>(
               base: $2<C, S, B>,
               extension: $2<C, [S, B], E>
               ) => $2<C, S, Product & B & E>
         }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Bivariate,
   Extendable,
   Product,
   $2
} from ".."

import {
   array
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const extend = <C extends Bivariate>(
   { extend }: Extendable<C>) =>
      extend

export const hoist = <C extends Bivariate>(
   { hoist }: Extendable<C>) =>
      hoist

export const defineExtendable = <C extends Bivariate>(
   { initial, hoist, extend }: Extendable.core<C>
   ): Extendable<C> =>
      ({
         hoist,
         extend:
            <S>(...extensions: $2<C, [S, Product], Product>[]) =>
               array(extensions).reduce<$2<C, [S, Product], Product>>({
                  init: () => initial<S>(),
                  step:
                     ext => acc =>
                        extend(acc, ext)
               })
      })