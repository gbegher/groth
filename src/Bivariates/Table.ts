// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Table<K, T> = {
      has: (key: K) => boolean
      get: (key: K) => Maybe<T>
   }

   export namespace Table {
      export type Augmentor<K, T> =
         T extends Generic
            ? { asTable: <S>(t: $<T, S>) => Table<K, S> }
            : never

      export const type = "Table"
      export type type = typeof type

      export const augmentor = "Table.Augmentor"
      export type augmentor = typeof augmentor
   }

   export namespace Bivariate {
      export interface Register<A1, A2> {
         [Table.type]: Table<A1, A2>
         [Table.augmentor]: Table.Augmentor<A1, A2>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Table,
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const has = <K, T>
   ({ has }: Table<K, T>) =>
      has

export const get = <K, T>
   ({ get }: Table<K, T>) =>
      get

export const asTable = <K, T>
   ({ asTable }: Table.Augmentor<K, T>) =>
      asTable

// ---------------------------------------------------------------------------
// Augmentation
// ---------------------------------------------------------------------------
