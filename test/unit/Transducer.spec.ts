import "mocha"
import { expect } from "chai"

import {
} from "./util"

import type {
   Transducer,
   Product,
} from "../../src"

import {
   transducer,
   array,
   filter
} from "../../src"

const {
   hoist,
   extend
} = transducer

context.only("The `Transducer` type", () => {
   context("... is `Extendable`", () => {
      type TestCase = {
         title: string,
         inputArray: number[]
         definition: [] | [
            Transducer<[number, any], any>,
            ...Transducer<[any, any], any>[]
         ]
         expectation: any
      }

      const inputReducer = array.collector<Product>()

      const testCases: TestCase[] = [
         {
            title: "an empty reducible through the empty extension",
            inputArray: [],
            definition: [],
            expectation: []
         },
         {
            title: "a one element reducible through the empty extension",
            inputArray: [0],
            definition: [],
            expectation: [{}]
         },
         {
            title: "a three element reducible through the empty extension",
            inputArray: [0, 1, 2],
            definition: [],
            expectation: [{}, {}, {}]
         },
         {
            title: "an empty reducible through a single extension",
            inputArray: [],
            definition: [
               hoist(transducer.map(x => ({ one: x })))
            ],
            expectation: []
         },
         {
            title: "a three element reducible through a single extension",
            inputArray: [0, 1, 2],
            definition: [
               hoist(transducer.map(x => ({ one: x })))
            ],
            expectation: [
               { one: 0 },
               { one: 1 },
               { one: 2 },
            ]
         },
         {
            title: "a three element reducible through some parallel extension",
            inputArray: [0, 1, 2],
            definition: [
               hoist(transducer.map(x => ({ one: x }))),
               hoist(transducer.map(x => ({ two: 2 * x }))),
            ],
            expectation: [
               { one: 0, two: 0 },
               { one: 1, two: 2 },
               { one: 2, two: 4 },
            ]
         },
         {
            title: "a three element reducible through some general extension",
            inputArray: [0, 1, 2],
            definition: [
               hoist(transducer.map(x => ({ one: x }))),
               transducer.map(([x, { one }]) => ({ two: [one, `x=${x}`] })),
               transducer.map(([x, { one, two }]) => ({ three: [x, `one=${one}`, two] })),
            ],
            expectation: [
               { one: 0, two: [0, "x=0"], three: [0, "one=0", [0, "x=0"]] },
               { one: 1, two: [1, "x=1"], three: [1, "one=1", [1, "x=1"]] },
               { one: 2, two: [2, "x=2"], three: [2, "one=2", [2, "x=2"]] },
            ]
         },
         {
            title: "a four element reducible through some a filtering extension",
            inputArray: [0, 1, 2, 3, 4],
            definition: [
               hoist(transducer.liftName("filtered")(filter(x => x > 2))),
            ],
            expectation: [
               { filtered: 3 },
               { filtered: 4 },
            ]
         },
      ]

      testCases.forEach(({ title, inputArray, definition, expectation }) => {
         context(`When collecting ${title}`, () => {
            const extendedTransducer: Transducer<number, Product> = extend(...definition)
            const transduced = extendedTransducer(inputReducer)

            const result = array(inputArray).reduce(transduced)

            it("should yield the expected result", () => {
               expect(result).to.deep.equal(expectation)
            })
         })
      })
   })
})