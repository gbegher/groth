import "mocha"
import { expect } from "chai"

import type {
   Named,
   AsyncMor
} from "../../src"

import {
   asyncMor,
   forall,
   array,
} from "../../src"

type AsFn = AsyncMor<any, any>

type CountedFunction = {
   wrapped: AsFn
   counter: () => number
}

const memoizeCallCount =
   (fn: AsFn)
   : CountedFunction =>
      {
         let count = 0

         const wrapped: AsFn =
            async x =>
               {
                  count++

                  return await fn(x)
               }

         return {
            wrapped,
            counter: () => count
         }
      }

const memoizeDefinitions =
   (definition: Named<AsFn>[]) =>
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
                  .map(([key, { wrapped }]) => [key, wrapped] as Named<AsFn>),
         }
      }


context("The `AsyncMor` type", () => {
   context("... allows `Constructions`", () => {
      type TestCase = {
         title: string,
         input: any
         definition: [string, AsFn][]
         expectation: any
      }

      const testCases: TestCase[] = [
         {
            title: "the empty construction to an empty input",
            input: {},
            definition: [],
            expectation: {}
         },
         {
            title: "the empty construction to a nonempty input",
            input: { some: "input" },
            definition: [],
            expectation: {}
         },
         {
            title: "a parallel (constant) construction to an empty input",
            input: {},
            definition: [
               ["one", async () => 1],
               ["two", async () => 2],
               ["three", async () => 3],
            ],
            expectation: {
               one: 1,
               two: 2,
               three: 3,
            }
         },
         {
            title: "a parallel (constant) construction to a nonempty input",
            input: { value: 2 },
            definition: [
               ["one", async ({ value }) => 1 * value],
               ["two", async ({ value }) => 2 * value],
               ["three", async ({ value }) => 3 * value],
            ],
            expectation: {
               one: 2,
               two: 4,
               three: 6,
            }
         },
         {
            title: "a simple construction",
            input: {
               init: 0
            },
            definition: [
               ["one", async x => x],
               ["two", async x => x],
               ["three", async x => x],
            ],
            expectation: {
               one: {
                  init: 0
               },
               two: {
                  init: 0,
                  one: { init: 0 }
               },
               three: {
                  init: 0,
                  one: { init: 0 },
                  two: { init: 0, one: { init: 0 } }
               },
            }
         }
      ]

      testCases.forEach(({ title, input, definition, expectation }) => {
         context(`When applying ${title}`, () => {
            const { definitions, counter } = memoizeDefinitions(definition)

            const construction = asyncMor.construct(...definitions)

            let result: any

            before(async () => {
               result = await construction(input)
            })

            it("should yield the expected result", async () => {
               expect(result).to.deep.equal(expectation)
            })

            it("should call each defining morphism precisely once", async () => {
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