import { Buff } from '@cmdcode/buff-utils';
import { checkSize } from '../utils.js';
import { BECH32_PREFIXES } from './schema.js';
import { sha256sh } from './hash.js';
const VALID_PREFIXES = ['bc1q', 'tb1q', 'bcrt1q'];
export function check(address) {
    for (const prefix of VALID_PREFIXES) {
        if (address.startsWith(prefix)) {
            return true;
        }
    }
    return false;
}
export function encode(input, network = 'main') {
    const prefix = BECH32_PREFIXES[network];
    const bytes = Buff.bytes(input);
    checkSize(bytes, 32);
    return bytes.toBech32(prefix, 0);
}
export function decode(address) {
    if (!check(address)) {
        throw new TypeError('Invalid segwit address!');
    }
    return Buff.bech32(address);
}
export function scriptPubKey(input) {
    const bytes = Buff.bytes(input);
    checkSize(bytes, 32);
    return ['OP_0', bytes.hex];
}
export function fromScript(script, network) {
    const sh = sha256sh(script);
    return encode(sh, network);
}
export const P2WSH = { check, encode, decode, hash: sha256sh, scriptPubKey, fromScript };
//# sourceMappingURL=p2w-sh.js.map