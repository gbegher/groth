import "mocha"
import { expect } from "chai"

import {
   Array,
   array,
} from "../../src"

import { functorTestSuite } from "./TestSuites/FunctorTestSuite"

const {
   comprehend,
   hoist,
} = array

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
         { hasAugmentor: true }
      )
   })

   context("... is `Comprehendible`", () => {
      type TestCase = {
         title: string
         input: any
         schema: [string, Array.Kleisli<any, any>][],
         expectation: any
      }

      const testCases: TestCase[] = [
         {
            title: "the empty schema",
            input: "input",
            schema: [],
            expectation: [{}]
         },
         {
            title: "an identity schema",
            input: "input",
            schema: [
               ["named", hoist(x => [x])]
            ],
            expectation: [
               { "named": "input" }
            ]
         },
         {
            title: "a nested array",
            input: "context",
            schema: [
               ["character",
                  () => ["A", "B"]
               ],
               ["number",
                  () => [1, 2]
               ],
               ["nested",
                  ([s, { character, number }]) =>
                     [`${s}--character:${character}--number:${number}`]
               ]
            ],
            expectation: [
               {
                  character: "A",
                  number: 1,
                  nested: "context--character:A--number:1",
               },
               {
                  character: "A",
                  number: 2,
                  nested: "context--character:A--number:2",
               },
               {
                  character: "B",
                  number: 1,
                  nested: "context--character:B--number:1",
               },
               {
                  character: "B",
                  number: 2,
                  nested: "context--character:B--number:2",
               },
            ]
         }
      ]

      testCases.forEach(({ title, input, schema, expectation }) => {
         context(`When comprehening ${title}`, () => {
            const construction = comprehend(...schema)

            let result

            beforeEach(() => {
               result = construction(input)
            })

            it("should yield the expected result", () => {
               expect(result).to.deep.equal(expectation)
            })
         })
      })
   })
})
