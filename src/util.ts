export const llog = <X>(x: X, reason=""): X =>
   {
      console.log(
         reason,
         JSON.stringify(x, undefined, 3)
      )

      return x
   }