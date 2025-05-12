import { Buff } from '@cmdcode/buff-utils';
import { checkSize } from '../utils.js';
import { BECH32_PREFIXES } from './schema.js';
import { hash160pkh } from './hash.js';
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
    checkSize(bytes, 20);
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
    checkSize(bytes, 20);
    return ['OP_0', bytes.hex];
}
export function fromPubKey(pubkey, network) {
    const pkh = hash160pkh(pubkey);
    return encode(pkh, network);
}
export const P2WPKH = { check, encode, decode, hash: hash160pkh, scriptPubKey, fromPubKey };
//# sourceMappingURL=p2w-pkh.js.map