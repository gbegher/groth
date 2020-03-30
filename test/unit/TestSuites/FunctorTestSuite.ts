import "mocha"
import { expect } from "chai"

import {
   Mor,
   Generic,
   $,
   map,
   Functor
} from "../../../src"

export const functorTestSuite = <F extends Generic>(
   augmentedType: Functor<F>,
   testCases: {
      mor: Mor<any, any>
      input: $<F, any>
      output: $<F, any>
   }[],
   options: { hasAugmentor: boolean } = { hasAugmentor: false }
) =>
   {
      context("via the generic `map`", () => {
         testCases.forEach(({mor, input, output}) => {
            it("should map as expected", () => {
               const result = map(augmentedType)(mor)(input)

               expect(result).to.deep.equal(output)
            })
         })
      })

      context("via the higher type", () => {
         testCases.forEach(({mor, input, output}) => {
            it("should map as expected", () => {
               const result = augmentedType.map(mor)(input)

               expect(result).to.deep.equal(output)
            })
         })
      })

      if (options.hasAugmentor) {
         // @ts-ignore
         const augmentor: Functor.Augmentor<F> = augmentedType

         context("via the augmented type", () => {
            testCases.forEach(({mor, input, output}) => {
               it("should map as expected", () => {
                  const result = augmentor(input).map(mor)

                  expect(result).to.deep.equal(output)
               })
            })
         })
      }
   }