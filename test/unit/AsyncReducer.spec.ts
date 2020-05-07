import "mocha"
import { expect } from "chai"

import {
   withCallCount,
   withAsyncCallCount,
} from "./util"

import {
   AsyncReducer
} from "../../src"

import {
   asyncReducer,
   array,
   forall,
} from "../../src"


const countReducer =
   (red: AsyncReducer<any, any>) =>
      {
         const {
            wrapped: init,
            callCount: initCount,
         } = withAsyncCallCount(red.init)

         const {
            wrapped: step,
            callCount: stepCount,
         } = withCallCount(red.step)

         return {
            wrapped: {
               init,
               step
            },
            initCount,
            stepCount
         }
      }

const memoizeDefinitions =
   (definition: AsyncReducer<any, any>[]) =>
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
} = asyncReducer

context("The `AsyncReducer` type", () => {
   context("... is `Extendable`", () => {
      type TestCase = {
         title: string,
         input: number[]
         definition: AsyncReducer<[any, any], any>[]
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
            title: "a singular extension to some inputs",
            input: [0, 1, 2],
            definition: [
               hoist<any, any>({
                  init: async () => ({ one: [] }),
                  step: s => async ({ one }) => ({ one: [...one, s] })
               }),
            ],
            expectation: {
               one: [0, 1, 2],
            }
         },
         {
            title: "a parallel extension to some inputs",
            input: [0, 1, 2],
            definition: [
               hoist<any, any>({
                  init: async () => ({ one: [] }),
                  step: s => async ({ one }) => ({ one: [...one, s] })
               }),
               hoist<any, any>({
                  init: async () => ({ eno: [] }),
                  step: s => async ({ eno }) => ({ eno: [s, ...eno] })
               }),
               hoist<any, any>({
                  init: async () => ({ tre: [] }),
                  step: s => async ({ tre }) => ({ tre: [s, ...tre] })
               }),
            ],
            expectation: {
               one: [0, 1, 2],
               eno: [0, 1, 2].reverse(),
               tre: [0, 1, 2].reverse(),
            }
         },
         {
            title: "a general extension",
            input: [0, 1, 2],
            definition: [
               hoist<any, any>({
                  init: async () => ({ one: [] }),
                  step: inp => async ({ one }) => ({ one: [...one, { v: 2 * inp }] })
               }),
               {
                  init: async () => ({ two: [] }),
                  step:
                     ([inp, { one }]) =>
                        async ({ two }) =>
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

            let result: any

            before(async () => {
               result = await array(input).reduceAsync(construction)
            })

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

   context("... is `Comprehendible`", () => {
      type TestCase = {
         title: string,
         input: any
         schema: [string, AsyncReducer<[any, any], any>][]
         expectation: any
      }

      const schema: TestCase["schema"] = [
         ["acc", hoist({
            init: async () => [],
            step: n => async acc => [...acc, n]
         })],
         ["sum", hoist({
            init: async () => 0,
            step: n => async acc => acc + n
         })],
         ["count", hoist({
            init: async () => 0,
            step: _ => async acc => acc + 1
         })],
         ["avrg", {
            init: async () => 0 as number | string,
            step:
               ([_, { sum, count }]) =>
                  async _ =>
                     count ? sum/count : "infty"
         }],
      ]

      const testCases: TestCase[] = [
         {
            title: "a general reducer schema on an empty array",
            input: [],
            schema,
            expectation: {
               acc: [],
               sum: 0,
               count: 0,
               avrg: 0
            }
         },
         {
            title: "a general reducer schema on a one item array",
            input: [10],
            schema,
            expectation: {
               acc: [10],
               sum: 10,
               count: 1,
               avrg: 10
            }
         },
         {
            title: "a general reducer schema on some array",
            input: [1, 2, 3, 4, 5],
            schema,
            expectation: {
               acc: [1, 2, 3, 4, 5],
               sum: 15,
               count: 5,
               avrg: 3
            }
         },
      ]

      testCases.forEach(({ title, input, schema, expectation }) => {
         context(`When comprehending ${title}`, () => {
            const red = asyncReducer.comprehend(...schema)

            let result

            before(async () => {
               result = await array(input).reduceAsync(red)
            })

            it("should yield the expected result", () => {
               expect(result).to.deep.equal(expectation)
            })
         })
      })
   })
})