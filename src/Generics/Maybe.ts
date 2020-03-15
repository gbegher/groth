// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type Maybe<T> = $<Maybe.name, T>

   export namespace Generic {
      export interface Eval<A1> {
         [Maybe.name]: Maybe.Type<A1>
      }
   }

   export namespace Maybe {
      export type Type<T> = Sum<{
         NONE: undefined
         SOME: T
      }>

      export const name = "Maybe"
      export type name = typeof name
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

import {
   match
} from ".."

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
   : Functor<Maybe.name> =
      {
         map
      }
