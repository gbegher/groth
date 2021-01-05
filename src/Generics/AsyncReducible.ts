// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../types" {
   export type AsyncReducible<S> = {
      reduceAsync: <T>(reducer: AsyncReducer<S, T>) => Promise<T>
   }

   export namespace AsyncReducible {
      export type Augmentor<F extends Generic, X extends Generic> = {
         asAsyncReducible: <S>(fs: $<F, S>) => AsyncReducible<$<X, S>>
      }

      export const type: unique symbol
      export type type = typeof type
   }

   export namespace Generic {
      export interface Register<A1> {
         [AsyncReducible.type]: AsyncReducible<A1>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   AsyncReducible,
   Generic,
   AsyncMor,
} from ".."

import {
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const reduceAsync = <S>(
   { reduceAsync }: AsyncReducible<S>) =>
      reduceAsync

export const asAsyncReducible = <
   T extends Generic,
   X extends Generic
   >
   ({ asAsyncReducible }: AsyncReducible.Augmentor<T, X>) =>
      asAsyncReducible

// ---------------------------------------------------------------------------
// Utility functions
// ---------------------------------------------------------------------------

export const forallAsync = async <S>(
   red: AsyncReducible<S>,
   pred: AsyncMor<S, boolean>
) =>
   await red.reduceAsync({
      init: async () => true as boolean,
      step:
         s =>
            async acc =>
               acc && await pred(s)
   })

export const existsAsync = async <S>(
   red: AsyncReducible<S>,
   pred: AsyncMor<S, boolean>
) =>
   await red.reduceAsync({
      init: async () => false as boolean,
      step:
         s =>
            async acc =>
               acc || await pred(s)
   })

// ---------------------------------------------------------------------------
// Augmentation
// ---------------------------------------------------------------------------

export const asyncReducible: {} = {}
