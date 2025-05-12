import { Buff } from '@cmdcode/buff-utils';
import { Script } from '../script/index.js';
import { checkSize } from '../utils.js';
import { hash160, sha256 } from '@cmdcode/crypto-utils';
export function hash160pkh(pubkey) {
    const bytes = Buff.bytes(pubkey);
    checkSize(bytes, 33);
    return hash160(bytes);
}
export function hash160sh(script) {
    const bytes = Script.fmt.toBytes(script, false);
    return hash160(bytes);
}
export function sha256sh(script) {
    const bytes = Script.fmt.toBytes(script, false);
    return sha256(bytes);
}
//# sourceMappingURL=hash.js.map