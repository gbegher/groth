import "mocha"
import { expect } from "chai"

import {
   Array,
   array,
   map
} from "../../src"
import { functorTestSuite } from "./TestSuites/FunctorTestSuite"

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

   context("... is a functor", () => {
      type TestCase = {
         mor: (n: number) => any
         input: Array<number>
         output: Array<any>
      }

      const testCases: TestCase[] = [
         {
            mor: (x: number) => 2 * x,
            input: [],
            output: [],
         },
         {
            mor: (x: number) => 2 * x,
            input: [1, 2],
            output: [2, 4],
         },
         {
            mor: (x: number) => `2 * ${x}`,
            input: [1, 2],
            output: [`2 * ${1}`, `2 * ${2}`],
         },
      ]

      functorTestSuite(
         array,
         testCases,
         { hasAugmentor: false }
      )
   })
})