// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type AsyncMor<S, T> = (s: S) => Promise<T>

   export namespace AsyncMor {
      export const type = "AsyncMor"
      export type type = typeof type
   }

   export namespace Bivariate {
      export interface Register<A1, A2> {
         [AsyncMor.type]: AsyncMor<A1, A2>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Category,
   Mor,
   Product,
   Functor,
   Identity,
   AsyncMor,
   Extendable,
   Nameable,
} from ".."

import {
   defineExtendable,
   defineCategory,
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const map: Functor<Identity.type, Mor.type, AsyncMor.type>["map"] =
   fn =>
      async s => fn(s)

const { compose, identity }: Category<AsyncMor.type> =
   defineCategory({
      identity: <S>() =>
         async (s: S) => s,
      compose: <T0, T1, T2>(
         m1: AsyncMor<T0, T1>,
         m2: AsyncMor<T1, T2>,
         ): AsyncMor<T0, T2> =>
            async t1 => await m2(await m1(t1))
   })

const { extend, hoist }: Extendable<AsyncMor.type> =
   defineExtendable({
      initial:
         () =>
            async () => ({}),
      hoist: <S, T>(
         asmor: AsyncMor<S, T>) =>
            async ([s, _]: [S, {}]) =>
               await asmor(s),
      extend: <S, B extends Product, E extends Product>(
         base: AsyncMor<S, B>,
         extension: AsyncMor<[S, B], E>
         ) =>
            async (s: S) =>
               {
                  const b = await base(s)

                  return {
                     ...b,
                     ...await extension([s, b])
                  }
               }
   })

const liftName: Nameable<AsyncMor.type>["liftName"] = <K extends string>(
   k: K) => <S, T>(
      asmor: AsyncMor<S, T>) =>
         async (s: S) =>
            ({ [k]: await asmor(s) } as Record<K, T>)

// ---------------------------------------------------------------------------
// Augmentations
// ---------------------------------------------------------------------------

export const asyncMor
   : Category<AsyncMor.type>
   & Functor<Identity.type, AsyncMor.type, AsyncMor.type>
   & Extendable<AsyncMor.type>
   & Nameable<AsyncMor.type>
   =
      {
         identity,
         compose,
         map,
         hoist,
         extend,
         liftName
      }
