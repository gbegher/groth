import "mocha"
import { expect } from "chai"

import {
   Mor, array, Named, forall
} from "../../src"

import {
   morphism
} from "../../src"

type CountedFunction = {
   wrapped: (...args: any[]) => any
   counter: () => number
}

const memoizeCallCount =
   (fn: (...args: any[]) => any)
   : CountedFunction =>
      {
         let count = 0

         const wrapped = (...args: any[]) =>
            {
               count++

               return fn(...args)
            }

         return {
            wrapped,
            counter: () => count
         }
      }

const memoizeDefinitions =
   (definition: Named<Mor<any, any>>[]) =>
      {
         const memoized = array(definition)
            .map(([key, mor]) =>
               [key, memoizeCallCount(mor)] as Named<CountedFunction>
            )

         return {
            counter:
               array(memoized)
                  .map(([key, { counter }]) => counter),
            definitions:
               array(memoized)
                  .map(([key, { wrapped }]) => [key, wrapped] as Named<Mor<any, any>>),
         }
      }


context.only("The `Mor` type", () => {
   context("... allows `Constructions`", () => {
      type TestCase = {
         title: string,
         input: any
         definition: [string, Mor<any, any>][]
         expectation: any
      }
      const testCases: TestCase[] = [
         // {
         //    title: "the empty construction to an empty input",
         //    input: {},
         //    definition: [],
         //    expectation: {}
         // },
         // {
         //    title: "the empty construction to a nonempty input",
         //    input: { some: "input" },
         //    definition: [],
         //    expectation: {}
         // },
         // {
         //    title: "a parallel (constant) construction to an empty input",
         //    input: {},
         //    definition: [
         //       ["one", () => 1],
         //       ["two", () => 2],
         //       ["three", () => 3],
         //    ],
         //    expectation: {
         //       one: 1,
         //       two: 2,
         //       three: 3,
         //    }
         // },
         {
            title: "a parallel (constant) construction to a nonempty input",
            input: { value: 2 },
            definition: [
               ["one", ({ value }) => 1 * value],
               ["two", ({ value }) => 2 * value],
               ["three", ({ value }) => 3 * value],
            ],
            expectation: {
               one: 2,
               two: 4,
               three: 6,
            }
         },
         // {
         //    title: "a simple construction",
         //    input: {
         //       init: 0
         //    },
         //    definition: [
         //       ["one", x => x],
         //       ["two", x => x],
         //       ["three", x => x],
         //    ],
         //    expectation: {
         //       one: {
         //          init: 0
         //       },
         //       two: {
         //          init: 0,
         //          one: { init: 0 }
         //       },
         //       three: {
         //          init: 0,
         //          one: { init: 0 },
         //          two: { init: 0, one: { init: 0 } }
         //       },
         //    }
         // }
      ]

      testCases.forEach(({ title, input, definition, expectation }) => {
         context(`When applying ${title}`, () => {
            const { definitions, counter } = memoizeDefinitions(definition)

            const construction = morphism.construct(...definitions)

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