export const llog = <X>(x: X, reason="", extra?:(x: X) => any): X =>
   {
      console.log(...[
         reason,
         JSON.stringify(x, undefined, 3),
         ...(
            extra
               ? [JSON.stringify(extra(x), undefined, 3)]
               : []
         )
      ])

      return x
   }