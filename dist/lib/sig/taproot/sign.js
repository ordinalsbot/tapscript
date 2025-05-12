import { Buff } from '@cmdcode/buff-utils';
import { Field, Point } from '@cmdcode/crypto-utils';
import { hashTx } from './hash.js';
import { xOnlyPub } from '../../tap/utils.js';
import { hashTag, safeThrow } from '../../utils.js';
const FIELD_SIZE = 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2fn;
const CURVE_ORDER = 0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n;
export function signTx(seckey, txdata, index, config = {}) {
    const { sigflag = 0x00 } = config;
    const hash = hashTx(txdata, index, config);
    const sig = sign(seckey, hash);
    return (sigflag === 0x00)
        ? Buff.raw(sig)
        : Buff.join([sig, sigflag]);
}
export function sign(secret, message, rand = Buff.random(32)) {
    const m = Buff.bytes(message);
    const dp = new Field(secret);
    const P = dp.point;
    const d = (P.hasEvenY) ? dp.big : dp.negated.big;
    const a = hashTag('BIP0340/aux', Buff.bytes(rand));
    const t = d ^ a.big;
    const n = hashTag('BIP0340/nonce', t, P.x.raw, m);
    const kp = new Field(n);
    const R = kp.point;
    const k = (R.hasEvenY) ? kp.big : kp.negated.big;
    const e = new Field(hashTag('BIP0340/challenge', R.x.raw, P.x.raw, m));
    const s = new Field(k + (e.big * d));
    return Buff.join([R.x.raw, s.raw]);
}
export function verify(signature, message, pubkey, shouldThrow = false) {
    const P = Point.from_x(xOnlyPub(pubkey));
    const m = Buff.bytes(message);
    const stream = Buff.bytes(signature).stream;
    if (stream.size < 64) {
        safeThrow('Signature length is too small: ' + String(stream.size), shouldThrow);
    }
    const r = stream.read(32);
    if (r.big > FIELD_SIZE) {
        safeThrow('Signature r value greater than field size!', shouldThrow);
    }
    const s = stream.read(32);
    if (s.big > CURVE_ORDER) {
        safeThrow('Signature s value greater than curve order!', shouldThrow);
    }
    const e = new Field(hashTag('BIP0340/challenge', r.raw, P.x.raw, m));
    const sG = new Field(s).point;
    const eP = P.mul(e.big);
    const R = sG.sub(eP);
    if (R.hasOddY) {
        safeThrow('Signature R value has odd Y coordinate!', shouldThrow);
    }
    if (R.x.big === 0n) {
        safeThrow('Signature R value is infinite!', shouldThrow);
    }
    return R.x.big === r.big;
}
//# sourceMappingURL=sign.js.map