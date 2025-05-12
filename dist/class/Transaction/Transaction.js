import { Buff } from '@cmdcode/buff-utils';
import { hash256 } from '@cmdcode/crypto-utils';
import TxInput from './TxInput.js';
import TxOutput from './TxOutput.js';
import TxLocktime from './TxLocktime.js';
import { Tx } from '../../lib/tx/index.js';
import { Schema } from '../../schema/check.js';
export default class Transaction {
    constructor(txdata) {
        if (typeof txdata === 'string') {
            txdata = Buff.hex(txdata);
        }
        if (txdata instanceof Uint8Array) {
            txdata = Tx.decode(txdata);
        }
        const schema = Schema.TxData;
        this._data = schema.parse(Tx.create(txdata));
    }
    get data() {
        return this._data;
    }
    get version() {
        return this.data.version;
    }
    get vin() {
        return this.data.vin.map((_e, i) => new TxInput(this.data, i));
    }
    get vout() {
        return this.data.vout.map((e) => new TxOutput(e));
    }
    get locktime() {
        return new TxLocktime(this.data.locktime);
    }
    get base() {
        return Tx.encode(this.data, true);
    }
    get buff() {
        return Tx.encode(this.data);
    }
    get raw() {
        return this.buff.raw;
    }
    get hex() {
        return this.buff.hex;
    }
    get size() {
        return this.raw.length;
    }
    get bsize() {
        return this.base.length;
    }
    get weight() {
        return this.bsize * 3 + this.size;
    }
    get vsize() {
        const remainder = (this.weight % 4 > 0) ? 1 : 0;
        return Math.floor(this.weight / 4) + remainder;
    }
    get hash() {
        const hash = hash256(this.buff);
        return hash.reverse().hex;
    }
    get txid() {
        const hash = hash256(this.base);
        return hash.reverse().hex;
    }
    async export() {
        const { size, weight, vsize, hex } = this;
        const txid = this.txid;
        const hash = this.hash;
        return { txid, hash, ...this.data, size, weight, vsize, hex };
    }
}
//# sourceMappingURL=Transaction.js.map