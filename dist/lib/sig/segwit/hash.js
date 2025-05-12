import { Buff } from '@cmdcode/buff-utils';
import * as ENC from '../../tx/encode.js';
import { Script } from '../../script/index.js';
import { Tx } from '../../tx/index.js';
import { hash160, hash256 } from '@cmdcode/crypto-utils';
const VALID_HASH_TYPES = [0x01, 0x02, 0x03];
export function hashTx(txdata, idx, config = {}) {
    const { sigflag = 0x01 } = config;
    const isAnypay = (sigflag & 0x80) === 0x80;
    const flag = sigflag % 0x80;
    if (!VALID_HASH_TYPES.includes(flag)) {
        throw new Error('Invalid hash type: ' + String(sigflag));
    }
    const tx = Tx.fmt.toJson(txdata);
    const { version, vin, vout, locktime } = tx;
    const { txid, vout: prevIdx, prevout, sequence } = vin[idx];
    const { value } = prevout ?? {};
    if (value === undefined) {
        throw new Error('Prevout value is empty!');
    }
    let script = config.script;
    if (script === undefined &&
        config.pubkey !== undefined) {
        const pkhash = hash160(config.pubkey);
        script = `76a914${pkhash.hex}88ac`;
    }
    if (script === undefined) {
        throw new Error('No pubkey / script has been set!');
    }
    if (Script.fmt.toAsm(script).includes('OP_CODESEPARATOR')) {
        throw new Error('This library does not currently support the use of OP_CODESEPARATOR in segwit scripts.');
    }
    const sighash = [
        ENC.encodeVersion(version),
        hashPrevouts(vin, isAnypay),
        hashSequence(vin, flag, isAnypay),
        ENC.encodeTxid(txid),
        ENC.encodePrevOut(prevIdx),
        Script.encode(script, true),
        ENC.encodeValue(value),
        ENC.encodeSequence(sequence),
        hashOutputs(vout, idx, flag),
        ENC.encodeLocktime(locktime),
        Buff.num(sigflag, 4).reverse()
    ];
    return hash256(Buff.join(sighash));
}
function hashPrevouts(vin, isAnypay) {
    if (isAnypay === true) {
        return Buff.num(0, 32);
    }
    const stack = [];
    for (const { txid, vout } of vin) {
        stack.push(ENC.encodeTxid(txid));
        stack.push(ENC.encodePrevOut(vout));
    }
    return hash256(Buff.join(stack));
}
function hashSequence(vin, sigflag, isAnyPay) {
    if (isAnyPay || sigflag !== 0x01) {
        return Buff.num(0, 32);
    }
    const stack = [];
    for (const { sequence } of vin) {
        stack.push(ENC.encodeSequence(sequence));
    }
    return hash256(Buff.join(stack));
}
function hashOutputs(vout, idx, sigflag) {
    const stack = [];
    if (sigflag === 0x01) {
        for (const { value, scriptPubKey } of vout) {
            stack.push(ENC.encodeValue(value));
            stack.push(Script.encode(scriptPubKey, true));
        }
        return hash256(Buff.join(stack));
    }
    if (sigflag === 0x03 && idx < vout.length) {
        const { value, scriptPubKey } = vout[idx];
        stack.push(ENC.encodeValue(value));
        stack.push(Script.encode(scriptPubKey, true));
        return hash256(Buff.join(stack));
    }
    return Buff.num(0, 32);
}
//# sourceMappingURL=hash.js.map