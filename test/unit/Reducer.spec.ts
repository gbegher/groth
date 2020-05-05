import "mocha"
import { expect } from "chai"

import { withCallCount } from "./util"

import type {
   Reducer
} from "../../src"

import {
   reducer,
   array,
   forall,
} from "../../src"

const countReducer =
   (red: Reducer<any, any>) =>
      {
         const {
            wrapped: init,
            callCount: initCount,
         } = withCallCount(red.init)

         const {
            wrapped: step,
            callCount: stepCount,
         } = withCallCount(red.step)

         return {
            wrapped: {
               init, step
            },
            initCount,
            stepCount
         }
      }

const memoizeDefinitions = (
   definition: Reducer<any, any>[]
   ) =>
      {
         const memoized = array(definition).map(countReducer)

         return {
            definitions:
               array(memoized).map(({ wrapped }) => wrapped),
            initCounter:
               array(memoized).map(({ initCount }) => initCount),
            stepCounter:
               array(memoized).map(({ stepCount }) => stepCount),
         }
      }

const {
   hoist,
   extend
} = reducer

context("The `Reducer` type", () => {
   context("... is `Extendable`", () => {
      type TestCase = {
         title: string,
         input: number[]
         definition: Reducer<[any, any], any>[]
         expectation: any
      }

      const testCases: TestCase[] = [
         {
            title: "the empty extension to an empty input",
            input: [],
            definition: [],
            expectation: {}
         },
         {
            title: "the empty extension to some inputs",
            input: [0, 1, 2],
            definition: [],
            expectation: {}
         },
         {
            title: "a parallel extension to some inputs",
            input: [0, 1, 2],
            definition: [
               hoist<any, any>({
                  init: () => ({ one: [] }),
                  step: s => ({ one }) => ({ one: [...one, s] })
               }),
               hoist<any, any>({
                  init: () => ({ eno: [] }),
                  step: s => ({ eno }) => ({ eno: [s, ...eno] })
               }),
            ],
            expectation: {
               one: [0, 1, 2],
               eno: [0, 1, 2].reverse(),
            }
         },
         {
            title: "a general extension",
            input: [0, 1, 2],
            definition: [
               hoist<any, any>({
                  init: () => ({ one: [] }),
                  step: inp => ({ one }) => ({ one: [...one, { v: 2 * inp }] })
               }),
               {
                  init: () => ({ two: [] }),
                  step:
                     ([inp, { one }]) => ({ two }) =>
                        ({
                           two: [
                              ...two,
                              { inp, one }
                           ]
                        })
               }
            ],
            expectation: {
               one: [{ v: 0 }, { v: 2 }, { v: 4 }],
               two: [
                  { inp: 0, one: [{ v: 0 }] },
                  { inp: 1, one: [{ v: 0 }, { v: 2 }] },
                  { inp: 2, one: [{ v: 0 }, { v: 2 }, { v: 4 }] },
               ]
            }
         },
      ]

      testCases.forEach(({ title, input, definition, expectation }) => {
         context(`When applying ${title}`, () => {
            const {
               definitions,
               initCounter,
               stepCounter
            } = memoizeDefinitions(definition)

            const construction = extend(...definitions)

            const result = array(input).reduce(construction)

            it("should yield the expected result", () => {
               expect(result).to.deep.equal(expectation)
            })

            it("should call each defining `init` function precisely once", () => {
               expect(
                  forall(array(initCounter),
                     c => c() === 1
                  )
               ).to.deep.equal(true)
            })

            it("should call each defining `step` function precisely once for each input", () => {
               expect(
                  forall(array(stepCounter),
                     c => c() === input.length
                  )
               ).to.deep.equal(true)
            })
         })
      })
   })
})