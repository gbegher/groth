export const withCallCount =
   (fn: (...args: any[]) => any) =>
      {
         let count = 0

         const wrapped = (...args: any[]) =>
            {
               count++

               return fn(...args)
            }

         return {
            wrapped,
            callCount: () => count
         }
      }

export const withAsyncCallCount =
   (fn: (...args: any[]) => any) =>
      {
         let count = 0

         const wrapped = async (...args: any[]) =>
            {
               count++

               return await fn(...args)
            }

         return {
            wrapped,
            callCount: () => count
         }
      }