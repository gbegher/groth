import "mocha"
import { expect } from "chai"

import {
   Array,
   array
} from "../../src"

context("The Array type", () => {
   context("... is a collectible", () => {
      const testCases: Array<number>[] = [
         [],
         [0],
         [0, 1, 2],
      ]

      testCases.forEach(cs => {
         it(`[${cs}] should reconstruct correctly`, () => {
            const result = array(cs).reduce(array.collector())

            expect(result).to.deep.equal(cs)
         })
      })
   })
})