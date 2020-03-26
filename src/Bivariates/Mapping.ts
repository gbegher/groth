// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Mapping<K, T> = $2<Mapping.type, K, T>

   export namespace Mapping {
      export type Eval<K, T> = {
         has: (key: K) => boolean
         // Todo: Refactor as Kleisli<Maybe, K, T>
         get: (key: K) => Maybe<T>
      }

      export type Augmentor<K, T> =
         T extends Generic
            ? { asMapping: <S>(t: $<T, S>) => Mapping<K, S> }
            : never

      export const type = "Mapping"
      export type type = typeof type

      export const augmentor = "Mapping.Augmentor"
      export type augmentor = typeof augmentor
   }

   export namespace Bivariate {
      export interface Register<A1, A2> {
         [Mapping.type]: Mapping.Eval<A1, A2>
         [Mapping.augmentor]: Mapping.Augmentor<A1, A2>
      }
   }


}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Mapping,
} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const has = <K, T>
   ({ has }: Mapping<K, T>) =>
      has

export const get = <K, T>
   ({ get }: Mapping<K, T>) =>
      get

export const asMapping = <K, T>
   ({ asMapping }: Mapping.Augmentor<K, T>) =>
      asMapping

// ---------------------------------------------------------------------------
// Augmentation
// ---------------------------------------------------------------------------
