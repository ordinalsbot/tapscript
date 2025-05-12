import { Buff } from '@cmdcode/buff-utils';
export function checkSize(input, size) {
    const bytes = Buff.bytes(input);
    if (bytes.length !== size) {
        throw new Error(`Invalid input size: ${bytes.hex} !== ${size}`);
    }
}
export function safeThrow(errorMsg, shouldThrow) {
    if (shouldThrow) {
        throw new Error(errorMsg);
    }
    else {
        return false;
    }
}
export function hashTag(tag, ...data) {
    const htag = Buff.str(tag).digest.raw;
    const buff = data.map(e => Buff.bytes(e));
    return Buff.join([htag, htag, Buff.join(buff)]).digest;
}
//# sourceMappingURL=utils.js.map