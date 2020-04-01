import "mocha"
import { expect } from "chai"

import {
   Product,
   Mor,
   parallel,
   sumCase,
   codiagonal,
} from "../../src"

context("The Sum type", () => {
   context("The codiagnoal", () => {
      type TestCase<T> = {
         mors: Product<Mor<any, T>>,
         inputs: Product,
         outputs: Product<T>
      }

      const testCases: TestCase<any>[] = [
         {
            mors: {
               num1: (x: number) => `number ${x}`,
               str1: (x: string) => `string ${x}`,
            },
            inputs: {
               num1: 1,
               str1: "s"
            },
            outputs: {
               num1: "number 1",
               str1: "string s"
            }
         },
         {
            mors: {
               num1: (x: number) => `number2 ${x}`,
               str1: (x: string) => `string2 ${x}`,
            },
            inputs: {
               num1: 2,
               str1: "ss"
            },
            outputs: {
               num1: "number2 2",
               str1: "string2 ss"
            }
         },
      ]

      testCases.forEach(({ mors, inputs, outputs }) => {
         context(`... with keys [${Object.keys(mors)}]`, () => {
            const cod = codiagonal(mors)

            Object.keys(inputs).forEach(key => {
               it(`should map \`${key}\` correctly`, () => {
                  const output = cod(sumCase(key, inputs[key]))

                  expect(output).to.deep.equal(outputs[key])
               })
            })
         })
      })
   })

   context("Parallel morphisms", () => {
      type TestCase = {
         mors: Product<Mor<any, any>>,
         inputs: Product,
         outputs: Product
      }

      const testCases: TestCase[] = [
         {
            mors: {
               num1: (a: number) => 2 * a,
               str1: (a: number) => `number ${a}`,
            },
            inputs: {
               num1: 1,
               str1: 2
            },
            outputs: {
               num1: 2,
               str1: `number 2`
            }
         },
         {
            mors: {
               num2: (a: number) => 3 * a,
               str2: (a: number) => `number2 ${a}`,
            },
            inputs: {
               num2: 2,
               str2: 3
            },
            outputs: {
               num2: 6,
               str2: `number2 3`
            }
         },
      ]

      testCases.forEach(({ mors, inputs, outputs }) => {
         context(`... with keys [${Object.keys(mors)}]`, () => {
            const par = parallel(mors)

            Object.keys(inputs).forEach(key => {
               it(`should map \`${key}\` correctly`, () => {
                  const output = par(sumCase(key, inputs[key]))
                  const expected = sumCase(key, outputs[key])

                  expect(output).to.deep.equal(expected)
               })
            })
         })
      })
   })
})