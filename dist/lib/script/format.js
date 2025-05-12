import { Buff } from '@cmdcode/buff-utils';
import { isHex } from '../check.js';
import { decodeScript } from './decode.js';
import { encodeScript } from './encode.js';
function toAsm(script, varint) {
    if (Array.isArray(script)) {
        script = encodeScript(script, varint);
    }
    if (script instanceof Uint8Array ||
        isHex(script)) {
        return decodeScript(script, varint);
    }
    throw new Error('Invalid format: ' + String(typeof script));
}
function toBytes(script, varint) {
    if (script instanceof Uint8Array ||
        isHex(script)) {
        script = decodeScript(script, varint);
    }
    if (Array.isArray(script)) {
        return encodeScript(script, varint);
    }
    throw new Error('Invalid format: ' + String(typeof script));
}
function toParam(script) {
    if (!Array.isArray(script)) {
        return Buff.bytes(script);
    }
    throw new Error('Invalid format: ' + String(typeof script));
}
export const FmtScript = {
    toAsm,
    toBytes,
    toParam
};
//# sourceMappingURL=format.js.map