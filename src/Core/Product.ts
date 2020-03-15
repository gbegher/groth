// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

declare module "../index" {
   export type ValueOf<X> = X[keyof X]

   export type Product<T = any> = Record<string, T>

   export type exclude<K, E> =
      K extends E
         ? { __not_allowed: E, __error: never }
         : K

   export type Expand<T> = T extends infer U ? { [k in keyof U]: U[k] } : never
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

import type {} from ".."

// ---------------------------------------------------------------------------
// Implementation
// ---------------------------------------------------------------------------

export const restrictTo = <Y>(
   y: Y) => <X extends Y>(
      x: X)
      : Pick<X, keyof Y> =>
         Object.entries(y).reduce(
            (acc, [k, v]) =>
               ({
                  ...acc,
                  [k]: v
               }),
            {}) as Pick<X, keyof Y>
