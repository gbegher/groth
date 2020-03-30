import "mocha"
import { expect } from "chai"

import {
   Product,
   product,
   map
} from "../../src"

context("The Array type", () => {
   context("... is a collectible", () => {
      const testCases: Product<number>[] = [
         {},
         {
            "one": 1,
         },
         {
            "one": 1,
            "two": 2,
            "three": 3,
         },
      ]

      testCases.forEach(cs => {
         it(`The item should reconstruct correctly`, () => {
            const result = product(cs).reduce(product.collector())

            expect(result).to.deep.equal(cs)
         })
      })
   })

   context("... is a functor", () => {
      type TestCase = {
         mor: (n: number) => any
         input: Product<number>
         output: Product
      }

      const testCases: TestCase[] = [
         {
            mor: (x: number) => 2 * x,
            input: {},
            output: {},
         },
         {
            mor: (x: number) => 2 * x,
            input: { a: 1, b: 2 },
            output: { a: 2, b: 4 },
         },
         {
            mor: (x: number) => `2 * ${x}`,
            input: { a: 1, b: 2 },
            output: { a: `2 * ${1}`, b: `2 * ${2}` },
         },
      ]

      context("via the generic `map`", () => {
         testCases.forEach(({mor, input, output}) => {
            it("should map as expected", () => {
               const result = map(product)(mor)(input)

               expect(result).to.deep.equal(output)
            })
         })
      })
   })
})