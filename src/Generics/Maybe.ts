// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Maybe<T> = Sum<{
      NONE: undefined
      SOME: T
   }>

   export namespace Maybe {
      export const type = "Maybe"
      export type type = typeof type
   }

   export namespace Generic {
      export interface Register<A1> {
         [Maybe.type]: Maybe<A1>
      }
   }
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {
   Maybe,
   Mor,
   Functor
} from ".."

import { match } from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const some = <T>
   (value: T)
   : Maybe<T> =>
      ({
         type: "SOME",
         value
      })

export const none = <T>
   ()
   : Maybe<T> =>
      ({
         type: "NONE",
         value: undefined
      })

const map = <S, T>
   (fn: Mor<S, T>)
   : Mor<Maybe<S>, Maybe<T>> =>
      maybeS =>
         match(maybeS, {
            SOME: s => some(fn(s)),
            NONE: () => none()
         })

export const ifLet = <S, T>
   (maybeS: Maybe<S>,
    ifSome: (s: S) => T,
    ifNone: () => T)
   : T =>
      match(maybeS, {
         SOME: ifSome,
         NONE: ifNone
      })

// ---------------------------------------------------------------------------
// Augmentations
// ---------------------------------------------------------------------------

export const maybe
   : Functor<Maybe.type> =
      {
         map
      }
