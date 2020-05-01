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
   Shapeable,
   Product,
   Functor,
   Identity,
   Compound,
   Incorporatable,
   Construction,
   AsyncMor,
   Extendable,
   exclude,
   Demergable
} from ".."

import {
   compoundFromCategory,
   incorporateFromCompound,
   constructionFromExtendable,
   completeExtendable
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

const map: Functor<Identity.type, Mor.type, AsyncMor.type>["map"] =
   fn =>
      async s => fn(s)

const identity: Category<AsyncMor.type>["identity"] =
   () =>
      async x => x

const compose: Category<AsyncMor.type>["compose"] =
   (m1, m2) =>
      async t1 => await m2(await m1(t1))

const final: Shapeable<AsyncMor.type>["final"] =
   () =>
      async () => ({})

const liftName = <K extends string, S, T>(
   k: K,
   fn: AsyncMor<S, T>)
   : AsyncMor<S, Record<K, T>> =>
      async (s: S) =>
         ({ [k]: await fn(s) }) as Record<K, T>

const merge = <S, T1 extends Product, T2 extends Product>(
   m1: AsyncMor<S, Omit<T1, keyof T2>>,
   m2: AsyncMor<S, Omit<T2, keyof T1>>)
   : AsyncMor<S, Omit<T1, keyof T2> & Omit<T2, keyof T1>> =>
      async (s: S) =>
         ({
            ...await m1(s),
            ...await m2(s)
         })

const { extend }: Extendable<AsyncMor.type> =
   completeExtendable(
      <S, P extends Product>(base: AsyncMor<S, P>) => <K extends string, T>(
         [key, ext]: [exclude<K, keyof P>, AsyncMor<[S, P], T>]) =>
            async (s: S) =>
               {
                  const p: P = await base(s)

                  return {
                     ...p,
                     [key]: await ext([s, p])
                  } as P & Record<K, T>
               }
   )

const demerge: Demergable<AsyncMor.type>["demerge"] =
   asmor =>
      ([s, p]) =>
         asmor({...s, ...p})

const { compound } = compoundFromCategory<AsyncMor.type>({
   merge,
   identity,
   compose
})

const { incorporate } = incorporateFromCompound<AsyncMor.type>({
   merge,
   compound
})

const { construct } = constructionFromExtendable<AsyncMor.type>({
   final,
   extend,
   demerge
})

// ---------------------------------------------------------------------------
// Augmentations
// ---------------------------------------------------------------------------

export const asyncMor
   : Category<AsyncMor.type>
   & Functor<Identity.type, AsyncMor.type, AsyncMor.type>
   & Shapeable<AsyncMor.type>
   & Compound<AsyncMor.type>
   & Incorporatable<AsyncMor.type>
   & Demergable<AsyncMor.type>
   & Construction<AsyncMor.type>
   =
      {
         identity,
         compose,
         map,
         final,
         liftName,
         merge,
         compound,
         incorporate,
         demerge,
         construct
      }
