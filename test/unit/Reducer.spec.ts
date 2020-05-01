import "mocha"
import { expect } from "chai"

import type {
   Reducer,
   Named,
} from "../../src"

import {
   reducer,
   forall,
   array
} from "../../src"

type Red = Reducer<any, any>

type CountedReducer = {
   wrapped: Red
   counter: {
      init: () => number
      step: () => number
   }
}

const memoizeCallCount =
   (red: Red)
   : CountedReducer =>
      {
         let initCount = 0
         let stepCount = 0

         return {
            wrapped: {
               init: () => { initCount++ ; return red.init() },
               step: s => a => { stepCount++ ; return red.step(s)(a) }
            },
            counter: {
               init: () => initCount,
               step: () => stepCount
            }
         }
      }

const memoizeDefinitions =
   (definition: Named<Reducer<any, any>>[]) =>
      {
         const memoized = array(definition)
            .map(([key, red]) =>
               [key, memoizeCallCount(red)] as Named<CountedReducer>
            )

         return {
            counter:
               array(memoized)
                  .map(([_, { counter }]) => counter),
            definitions:
               array(memoized)
                  .map(([key, { wrapped }]) => [key, wrapped] as Named<Red>),
         }
      }


context("The `Reducer` type", () => {
   context("... allows `Constructions`", () => {
      type TestCase = {
         title: string,
         input: any[]
         definition: Named<Red>[]
         expectation: any
      }

      const testCases: TestCase[] = [
         // {
         //    title: "the empty construction to an empty input",
         //    input: [],
         //    definition: [],
         //    expectation: {}
         // },
         // {
         //    title: "the empty construction to a nonempty input",
         //    input: [{ some: "input" }],
         //    definition: [],
         //    expectation: {}
         // },
         // {
         //    title: "a parallel (constant) construction to an empty input",
         //    input: [],
         //    definition: [
         //       ["one", { init: () => ["init one"], step: s => a => [...a, ["one", s]] }],
         //       ["two", { init: () => ["init two"], step: s => a => [...a, ["two", s]] }],
         //    ],
         //    expectation: {
         //       one: ["init one"],
         //       two: ["init two"],
         //    }
         // },
         {
            title: "a parallel (constant) construction to a series of inputs",
            input: [{ value: 1 }, { value: 2 }, { value: 3 }],
            definition: [
               ["one", { init: () => ["init one"], step: ({ value }) => a => [...a, ["one", value]] }],
               // ["two", { init: () => ["init two"], step: s => a => [...a, ["two", s]] }],
            ],
            expectation: {
               one: ["init one", ["one", 1], ["one", 2], ["one", 3]],
               // two: ["init two", ["two", 1], ["two", 2], ["two", 3]],
            }
         },
      ]

      testCases.forEach(({ title, input, definition, expectation }) => {
         context(`When applying ${title}`, () => {
            const { definitions, counter } = memoizeDefinitions(definition)

            const construction = reducer.construct(...definitions)

            const result = array(input).reduce(construction)

            it("should yield the expected result", () => {
               expect(result).to.deep.equal(expectation)
            })

            it("should call each of the defining `init` functions precisely once", () => {
               expect(
                  forall(array(counter),
                     c => c.init() === 1
                  )
               ).to.deep.equal(true)
            })

            it("should call each of the defining `init` functions precisely once for each input", () => {
               expect(
                  forall(array(counter),
                     c => c.step() === input.length
                  )
               ).to.deep.equal(true)
            })
         })
      })
   })
})