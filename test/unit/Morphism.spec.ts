import "mocha"
import { expect } from "chai"

import { withCallCount } from "./util"

import type {
   Mor
} from "../../src"

import {
   morphism,
   array,
   forall,
} from "../../src"

type CountedFunction = {
   wrapped: (...args: any[]) => any
   counter: () => number
}

const memoizeDefinitions =
   (definition: Mor<any, any>[]) =>
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
} = morphism

context("The `Mor` type", () => {
   context("... is `Extendable`", () => {
      type TestCase = {
         title: string,
         input: any
         definition: Mor<[any, any], any>[]
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
               () => ({ one: 1 }),
               () => ({ two: 2 }),
               () => ({ three: 3 }),
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
               hoist(i => ({ one: 1 * i })),
               hoist(i => ({ two: 2 * i })),
               hoist(i => ({ three: 3 * i })),
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
               ([input, acc]) => ({ one: { input, acc } }),
               ([input, acc]) => ({ two: { input, acc } }),
               ([input, acc]) => ({ three: { input, acc } }),
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
            } = memoizeDefinitions(definition)

            const construction = extend(...definitions)

            const result = construction(input)

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