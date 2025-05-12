import { Buff } from '@cmdcode/buff-utils';
import { Field, Point } from '@cmdcode/crypto-utils';
import { getTapTag } from './tree.js';
import { xOnlyPub } from './utils.js';
export function getTapTweak(key, data = new Uint8Array(), isPrivate = false) {
    const pub = (isPrivate)
        ? new Field(key).point.x.raw
        : xOnlyPub(key);
    return Buff.join([getTapTag('TapTweak'), pub, Buff.bytes(data)]).digest;
}
export function getTweakedKey(intkey, data, isPrivate = false) {
    if (data === undefined)
        data = new Uint8Array();
    const k = Buff.bytes(intkey);
    const t = getTapTweak(intkey, data, isPrivate);
    if (isPrivate) {
        return tweakSecKey(k, t);
    }
    else {
        return tweakPubKey(k, t);
    }
}
export function getTweakedPub(pubkey, data) {
    return getTweakedKey(pubkey, data);
}
export function getTweakedSec(seckey, data) {
    return getTweakedKey(seckey, data, true);
}
export function tweakSecKey(seckey, tweak) {
    let sec = new Field(seckey);
    if (sec.point.hasOddY) {
        sec = sec.negate();
    }
    return Buff.raw(sec.add(tweak).raw);
}
export function tweakPubKey(pubkey, tweak) {
    pubkey = xOnlyPub(pubkey);
    const P = Point.from_x(pubkey);
    const Q = P.add(tweak);
    return Buff.raw(Q.raw);
}
function getScriptOnlyPubkey() {
    const G = Buff.hex('0479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8');
    return Point.from_x(G.digest).x;
}
export const SCRIPT_PUBKEY = getScriptOnlyPubkey();
//# sourceMappingURL=tweak.js.map