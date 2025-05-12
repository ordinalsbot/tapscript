import { Buff } from '@cmdcode/buff-utils';
import { encodeScript } from '../script/encode.js';
import { createTx } from './create.js';
export function encodeTx(txdata, omitWitness) {
    const { version, vin, vout, locktime } = createTx(txdata);
    const useWitness = (omitWitness !== true && checkForWitness(vin));
    const raw = [encodeVersion(version)];
    if (useWitness) {
        raw.push(Buff.hex('0001'));
    }
    raw.push(encodeInputs(vin));
    raw.push(encodeOutputs(vout));
    for (const txin of vin) {
        if (useWitness) {
            raw.push(encodeWitness(txin.witness));
        }
    }
    raw.push(encodeLocktime(locktime));
    return Buff.join(raw);
}
function checkForWitness(vin) {
    for (const txin of vin) {
        const { witness } = txin;
        if (typeof witness === 'string' ||
            witness instanceof Uint8Array ||
            (Array.isArray(witness) && witness.length > 0)) {
            return true;
        }
    }
    return false;
}
export function encodeVersion(num) {
    return Buff.num(num, 4).reverse();
}
export function encodeTxid(txid) {
    return Buff.hex(txid, 32).reverse();
}
export function encodePrevOut(vout) {
    return Buff.num(vout, 4).reverse();
}
export function encodeSequence(sequence) {
    if (typeof sequence === 'string') {
        return Buff.hex(sequence, 4).reverse();
    }
    if (typeof sequence === 'number') {
        return Buff.num(sequence, 4).reverse();
    }
    throw new Error('Unrecognized format: ' + String(sequence));
}
function encodeInputs(arr) {
    const raw = [Buff.varInt(arr.length, 'le')];
    for (const vin of arr) {
        const { txid, vout, scriptSig, sequence } = vin;
        raw.push(encodeTxid(txid));
        raw.push(encodePrevOut(vout));
        raw.push(encodeScript(scriptSig, true));
        raw.push(encodeSequence(sequence));
    }
    return Buff.join(raw);
}
export function encodeValue(value) {
    if (typeof value === 'number') {
        if (value % 1 !== 0) {
            throw new Error('Value must be an integer:' + String(value));
        }
        return Buff.num(value, 8).reverse();
    }
    return Buff.big(value, 8).reverse();
}
function encodeOutputs(arr) {
    const raw = [Buff.varInt(arr.length, 'le')];
    for (const vout of arr) {
        raw.push(encodeOutput(vout));
    }
    return Buff.join(raw);
}
function encodeOutput(vout) {
    const { value, scriptPubKey } = vout;
    const raw = [];
    raw.push(encodeValue(value));
    raw.push(encodeScript(scriptPubKey, true));
    return Buff.join(raw);
}
function encodeWitness(data = []) {
    const buffer = [];
    if (Array.isArray(data)) {
        const count = Buff.varInt(data.length);
        buffer.push(count);
        for (const entry of data) {
            buffer.push(encodeData(entry));
        }
        return Buff.join(buffer);
    }
    else {
        return Buff.bytes(data);
    }
}
function encodeData(data) {
    return (!isEmpty(data))
        ? encodeScript(data, true)
        : new Buff(0);
}
function isEmpty(data) {
    if (Array.isArray(data)) {
        return data.length === 0;
    }
    if (typeof data === 'string') {
        if (data === '')
            return true;
    }
    const bytes = Buff.bytes(data);
    return bytes.length === 1 && bytes[0] === 0;
}
export function encodeLocktime(locktime) {
    if (typeof locktime === 'string') {
        return Buff.hex(locktime, 4);
    }
    if (typeof locktime === 'number') {
        return Buff.num(locktime, 4).reverse();
    }
    throw new Error('Unrecognized format: ' + String(locktime));
}
//# sourceMappingURL=encode.js.map