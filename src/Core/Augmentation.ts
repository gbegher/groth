import { Generic, $, Product } from ".."



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

// It might be more efficient to make combined augmentors lazy, providing getters
// This way we don't have to do all the augmentations and apply one the needed ones
// Maybe via smth along the lines of:
//    const lazyAugmentation =
//       augs Product<Aug> =>
//          X =>
//             ({ get [k in augs.keys]: (...args) => augs[k](x)(args) })
//
// Let's try:
//
// ! Cannot do this without type lambas
// export const buildAugmentation = <T extends Generic>
//    (augmentations: Product<Augmentation<T, any>>)
//    : Augmentation<
//       T,
//       { [k in keyof typeof augmentations]: AugmentationCoDomain<(typeof augmentations)[k]>}
//    > =>