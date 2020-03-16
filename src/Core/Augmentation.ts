import { Generic, $ } from ".."

export type Augmentation<T extends Generic.Type, AT extends Generic.Type> =
    <X>(x: $<T, X>) => $<AT, X>

export const augment = <T extends Generic.Type, AT extends Generic.Type, HT>(
    augmentation: <X>(x: $<T, X>) => $<AT, X>,
    ht: HT)
    : HT & (<X>(x: $<T, X>) => $<AT, X>) =>
        Object.assign(augmentation, ht)