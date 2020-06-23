import type { Generic, $ } from "../types"

export type Augmentation<T extends Generic, AT extends Generic> =
    <X>(x: $<T, X>) => $<AT, X>

export type AugmentationDomain<A extends Augmentation<any, any>> =
   A extends Augmentation<infer D, any> ? D : never

export type AugmentationCoDomain<A extends Augmentation<any, any>> =
   A extends Augmentation<any, infer CD> ? CD : never

export const augment = <T extends Generic, AT extends Generic, HT>(
    augmentation: <X>(x: $<T, X>) => $<AT, X>,
    ht: HT)
    : HT & (<X>(x: $<T, X>) => $<AT, X>) =>
        Object.assign(augmentation, ht)
