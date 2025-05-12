import TxScript from './TxScript.js';
import TxSequence from './TxSequence.js';
import TxOutput from './TxOutput.js';
import TxWitness from './TxWitness.js';
import { Signer } from '../../lib/sig/index.js';
import { readScriptPubKey } from '../../lib/tx/parse.js';
export default class TxInput {
    constructor(txdata, index) {
        this._tx = txdata;
        this.idx = index;
    }
    get data() {
        return this._tx.vin[this.idx];
    }
    get txid() {
        return this.data.txid;
    }
    get vout() {
        return this.data.vout;
    }
    get prevout() {
        return (this.data.prevout !== undefined)
            ? new TxOutput(this.data.prevout)
            : undefined;
    }
    get scriptSig() {
        return new TxScript(this.data.scriptSig);
    }
    get sequence() {
        return new TxSequence(this.data.sequence);
    }
    get witness() {
        return new TxWitness(this.data.witness);
    }
    get type() {
        if (this.prevout !== undefined) {
            const script = this.prevout.scriptPubKey.raw;
            const { type } = readScriptPubKey(script);
            if (type === 'p2sh') {
                const asm = this.scriptSig.asm;
                if (asm[0] === 'OP_0') {
                    if (asm[1].length === 20) {
                        return 'p2w-p2pkh';
                    }
                    if (asm[1].length === 32) {
                        return 'p2w-p2sh';
                    }
                }
                return 'p2sh';
            }
            return type;
        }
        return 'raw';
    }
    sign(seckey, config) {
        if (this.type.startsWith('p2w')) {
            return Signer.segwit.sign(seckey, this._tx, this.idx, config);
        }
        if (this.type.startsWith('p2tr')) {
            return Signer.taproot.sign(seckey, this._tx, this.idx, config);
        }
        if (this.type.startsWith('p2pkh') ||
            this.type.startsWith('p2sh')) {
            throw new Error('This library does not support signing legacy transactions.');
        }
        throw new Error('Unable to sign this input type:' + String(this.type));
    }
}
//# sourceMappingURL=TxInput.js.map