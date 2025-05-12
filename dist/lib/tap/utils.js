import { Buff } from '@cmdcode/buff-utils';
export function xOnlyPub(key) {
    const bytes = Buff.bytes(key);
    return (bytes.length > 32) ? bytes.slice(1, 33) : bytes;
}
//# sourceMappingURL=utils.js.map