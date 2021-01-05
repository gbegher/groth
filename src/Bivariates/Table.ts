// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../types" {
   export type Table<K, T> = {
      has: (key: K) => boolean
      get: (key: K) => Maybe<T>
   }

   export namespace Table {
      export type Augmentor<K, T extends Generic> = {
         asTable: <S>(t: $<T, S>) => Table<K, S>
      }

      export const type: unique symbol
      export type type = typeof type
   }

   export namespace Bivariate {
      export interface Register<A1, A2> {
         [Table.type]: Table<A1, A2>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Generic,
   Table,
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const has = <K, T extends Generic>(
   { has }: Table<K, T>) =>
      has

export const get = <K, T extends Generic>(
   { get }: Table<K, T>) =>
      get

export const asTable = <K, T extends Generic>(
   { asTable }: Table.Augmentor<K, T>) =>
      asTable

// ---------------------------------------------------------------------------
// Augmentation
// ---------------------------------------------------------------------------
