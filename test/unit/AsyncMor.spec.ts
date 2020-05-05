import "mocha"
import { expect } from "chai"

import { withCallCount } from "./util"

import type {
   AsyncMor
} from "../../src"

import {
   asyncMor,
   array,
   forall,
} from "../../src"

const wrapDefinitions =
   (definition: AsyncMor<any, any>[]) =>
      {
         const memoized = array(definition).map(withCallCount)

         return {
            counter:
               array(memoized).map(({ callCount: counter }) => counter),
            definitions:
               array(memoized).map(({ wrapped }) => wrapped),
         }
      }

const {
   hoist,
   extend
} = asyncMor

context("The `AsyncMor` type", () => {
   context("... is `Extendable`", () => {
      type TestCase = {
         title: string,
         input: any
         definition: AsyncMor<[any, any], any>[]
         expectation: any
      }

      const testCases: TestCase[] = [
         {
            title: "the empty extension to an empty input",
            input: undefined,
            definition: [],
            expectation: {}
         },
         {
            title: "the empty extension to a nonempty input",
            input: { some: "input" },
            definition: [],
            expectation: {}
         },
         {
            title: "a constant construction to an empty input",
            input: undefined,
            definition: [
               async () => ({ one: 1 }),
               async () => ({ two: 2 }),
               async () => ({ three: 3 }),
            ],
            expectation: {
               one: 1,
               two: 2,
               three: 3,
            }
         },
         {
            title: "a parallel construction",
            input: 2,
            definition: [
               hoist(async i => ({ one: 1 * i })),
               hoist(async i => ({ two: 2 * i })),
               hoist(async i => ({ three: 3 * i })),
            ],
            expectation: {
               one: 2,
               two: 4,
               three: 6,
            }
         },
         {
            title: "a general construction",
            input: "input",
            definition: [
               async ([input, acc]) => ({ one: { input, acc } }),
               async ([input, acc]) => ({ two: { input, acc } }),
               async ([input, acc]) => ({ three: { input, acc } }),
            ],
            expectation: {
               one: {
                  input: "input",
                  acc: {},
               },
               two: {
                  input: "input",
                  acc: {
                     one: {
                        input: "input",
                        acc: {},
                     },
                  },
               },
               three: {
                  input: "input",
                  acc: {
                     one: {
                        input: "input",
                        acc: {},
                     },
                     two: {
                        input: "input",
                        acc: {
                           one: {
                              input: "input",
                              acc: {},
                           },
                        },
                     },
                  }
               }
            }
         }
      ]

      testCases.forEach(({ title, input, definition, expectation }) => {
         context(`When applying ${title}`, () => {
            const {
               definitions,
               counter
            } = wrapDefinitions(definition)

            const construction = asyncMor.extend(...definitions)

            let result: any

            before(async () => {
               result = await construction(input)
            })

            it("should yield the expected result", () => {
               expect(result).to.deep.equal(expectation)
            })

            it("should call each defining morphism precisely once", () => {
               expect(
                  forall(array(counter),
                     c => c() === 1
                  )
               ).to.deep.equal(true)
            })
         })
      })
   })
})