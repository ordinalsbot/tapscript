import { Buff } from '@cmdcode/buff-utils';
import { xOnlyPub } from '../tap/utils.js';
import { checkSize } from '../utils.js';
import { BECH32_PREFIXES } from './schema.js';
const VALID_PREFIXES = ['bc1p', 'tb1p', 'bcrt1p'];
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
    return bytes.toBech32(prefix, 1);
}
export function decode(address) {
    if (!check(address)) {
        throw new TypeError('Invalid taproot address!');
    }
    return Buff.bech32(address);
}
export function scriptPubKey(input) {
    const bytes = Buff.bytes(input);
    checkSize(bytes, 32);
    return ['OP_1', bytes.hex];
}
export function fromPubKey(pubkey, network) {
    const bytes = xOnlyPub(pubkey);
    return encode(bytes, network);
}
export const P2TR = { check, encode, decode, scriptPubKey, fromPubKey };
//# sourceMappingURL=p2tr.js.map