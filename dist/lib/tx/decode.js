import { Buff, Stream } from '@cmdcode/buff-utils';
export function decodeTx(bytes) {
    if (typeof bytes === 'string') {
        bytes = Buff.hex(bytes).raw;
    }
    const stream = new Stream(bytes);
    const version = readVersion(stream);
    const hasWitness = checkWitnessFlag(stream);
    const vin = readInputs(stream);
    const vout = readOutputs(stream);
    if (hasWitness) {
        for (const txin of vin) {
            txin.witness = readWitness(stream);
        }
    }
    const locktime = readLocktime(stream);
    return { version, vin, vout, locktime };
}
function readVersion(stream) {
    return stream.read(4).reverse().toNum();
}
function checkWitnessFlag(stream) {
    const [marker, flag] = [...stream.peek(2)];
    if (marker === 0) {
        stream.read(2);
        if (flag === 1) {
            return true;
        }
        else {
            throw new Error(`Invalid witness flag: ${flag}`);
        }
    }
    return false;
}
function readInputs(stream) {
    const inputs = [];
    const vinCount = stream.readSize('le');
    for (let i = 0; i < vinCount; i++) {
        inputs.push(readInput(stream));
    }
    return inputs;
}
function readInput(stream) {
    const txin = {
        txid: stream.read(32).reverse().toHex(),
        vout: stream.read(4).reverse().toNum(),
        scriptSig: readScript(stream, true),
        sequence: stream.read(4).reverse().toHex(),
        witness: []
    };
    return txin;
}
function readOutputs(stream) {
    const outputs = [];
    const outcount = stream.readSize('le');
    for (let i = 0; i < outcount; i++) {
        outputs.push(readOutput(stream));
    }
    return outputs;
}
function readOutput(stream) {
    const txout = {
        value: stream.read(8).reverse().big,
        scriptPubKey: readScript(stream, true)
    };
    return txout;
}
function readWitness(stream) {
    const stack = [];
    const count = stream.readSize();
    for (let i = 0; i < count; i++) {
        const word = readData(stream, true);
        stack.push(word ?? '');
    }
    return stack;
}
function readData(stream, varint) {
    const size = (varint === true)
        ? stream.readSize('le')
        : stream.size;
    return size > 0
        ? stream.read(size).hex
        : null;
}
function readScript(stream, varint) {
    const data = readData(stream, varint);
    return (data !== null) ? data : [];
}
function readLocktime(stream) {
    return stream.read(4).reverse().toNum();
}
//# sourceMappingURL=decode.js.map