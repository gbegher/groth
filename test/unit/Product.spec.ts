import "mocha"
import { expect } from "chai"

import {
   Product,
   product
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
})