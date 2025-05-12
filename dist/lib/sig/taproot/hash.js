import { Buff } from '@cmdcode/buff-utils';
import * as ENC from '../../tx/encode.js';
import { Tx } from '../../tx/index.js';
import { Script } from '../../script/index.js';
import { encodeScript } from '../../script/encode.js';
const VALID_HASH_TYPES = [0x00, 0x01, 0x02, 0x03, 0x81, 0x82, 0x83];
export function hashTx(template, index, config = {}) {
    const { extension, sigflag = 0x00, extflag = 0x00, key_version = 0x00, separator_pos = 0xFFFFFFFF } = config;
    const txdata = Tx.fmt.toJson(template);
    const { version, vin: input, vout: output, locktime } = txdata;
    if (index >= input.length) {
        throw new Error('Index out of bounds: ' + String(index));
    }
    if (!VALID_HASH_TYPES.includes(sigflag)) {
        throw new Error('Invalid hash type: ' + String(sigflag));
    }
    if (extflag < 0 || extflag > 127) {
        throw new Error('Extention flag out of range: ' + String(extflag));
    }
    const { txid, vout, sequence, witness = [] } = input[index];
    const isAnyPay = (sigflag & 0x80) === 0x80;
    const annex = getAnnexData(witness);
    const annexBit = (annex !== undefined) ? 1 : 0;
    const extendBit = (extension !== undefined) ? 1 : 0;
    const spendType = ((extflag + extendBit) * 2) + annexBit;
    const hashtag = Buff.str('TapSighash').digest;
    const preimage = [
        hashtag,
        hashtag,
        Buff.num(0x00, 1),
        Buff.num(sigflag, 1),
        ENC.encodeVersion(version),
        ENC.encodeLocktime(locktime)
    ];
    if (!isAnyPay) {
        const prevouts = input.map(e => getPrevout(e));
        preimage.push(hashOutpoints(input), hashAmounts(prevouts), hashScripts(prevouts), hashSequence(input));
    }
    if ((sigflag & 0x03) < 2 || (sigflag & 0x03) > 3) {
        preimage.push(hashOutputs(output));
    }
    preimage.push(Buff.num(spendType, 1));
    if (isAnyPay) {
        const { value, scriptPubKey } = getPrevout(input[index]);
        preimage.push(ENC.encodeTxid(txid), ENC.encodePrevOut(vout), ENC.encodeValue(value), Script.encode(scriptPubKey, true), ENC.encodeSequence(sequence));
    }
    else {
        preimage.push(Buff.num(index, 4).reverse());
    }
    if (annex !== undefined) {
        preimage.push(annex);
    }
    if ((sigflag & 0x03) === 0x03) {
        preimage.push(hashOutput(output[index]));
    }
    if (extension !== undefined) {
        preimage.push(Buff.bytes(extension), Buff.num(key_version), Buff.num(separator_pos, 4, 'le'));
    }
    return Buff.join(preimage).digest;
}
export function hashOutpoints(vin) {
    const stack = [];
    for (const { txid, vout } of vin) {
        stack.push(ENC.encodeTxid(txid));
        stack.push(ENC.encodePrevOut(vout));
    }
    return Buff.join(stack).digest;
}
export function hashSequence(vin) {
    const stack = [];
    for (const { sequence } of vin) {
        stack.push(ENC.encodeSequence(sequence));
    }
    return Buff.join(stack).digest;
}
export function hashAmounts(prevouts) {
    const stack = [];
    for (const { value } of prevouts) {
        stack.push(ENC.encodeValue(value));
    }
    return Buff.join(stack).digest;
}
export function hashScripts(prevouts) {
    const stack = [];
    for (const { scriptPubKey } of prevouts) {
        stack.push(encodeScript(scriptPubKey, true));
    }
    return Buff.join(stack).digest;
}
export function hashOutputs(vout) {
    const stack = [];
    for (const { value, scriptPubKey } of vout) {
        stack.push(ENC.encodeValue(value));
        stack.push(Script.encode(scriptPubKey, true));
    }
    return Buff.join(stack).digest;
}
export function hashOutput(vout) {
    return Buff.join([
        ENC.encodeValue(vout.value),
        Script.encode(vout.scriptPubKey, true)
    ]).digest;
}
function getAnnexData(witness) {
    if (witness === undefined)
        return;
    if (witness.length < 2)
        return;
    let annex = witness.at(-1);
    if (typeof annex === 'string') {
        annex = Buff.hex(annex);
    }
    if (annex instanceof Uint8Array &&
        annex[0] === 0x50) {
        return Buff.raw(annex).prefixSize('be').digest;
    }
    return undefined;
}
function getPrevout(vin) {
    if (vin.prevout === undefined) {
        throw new Error('Prevout data missing for input: ' + String(vin.txid));
    }
    return vin.prevout;
}
//# sourceMappingURL=hash.js.map