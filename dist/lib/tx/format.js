import { Buff } from '@cmdcode/buff-utils';
import { isBytes } from '../check.js';
import { decodeTx } from './decode.js';
import { encodeTx } from './encode.js';
import { createTx } from './create.js';
export function toJson(txdata) {
    if (isBytes(txdata)) {
        return decodeTx(txdata);
    }
    if (typeof txdata === 'object' &&
        !(txdata instanceof Uint8Array)) {
        encodeTx(txdata);
        return createTx(txdata);
    }
    throw new Error('Invalid format: ' + String(typeof txdata));
}
export function toBytes(txdata) {
    if (isBytes(txdata)) {
        decodeTx(txdata);
        return Buff.bytes(txdata);
    }
    if (typeof txdata === 'object') {
        return encodeTx(txdata);
    }
    throw new Error('Invalid format: ' + String(typeof txdata));
}
export const TxFmt = {
    toBytes,
    toJson
};
//# sourceMappingURL=format.js.map