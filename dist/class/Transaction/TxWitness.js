import { Buff } from '@cmdcode/buff-utils';
import { readWitness } from '../../lib/tx/parse.js';
import { Script } from '../../lib/script/index.js';
export default class TxWitness {
    constructor(data, format) {
        this._data = data;
        this._meta = readWitness(data);
        this.format = format;
    }
    get length() {
        return this._data.length;
    }
    get annex() {
        const annex = this._meta.annex;
        return (annex !== null)
            ? Buff.raw(annex).hex
            : undefined;
    }
    get cblock() {
        const cblock = this._meta.cblock;
        return (cblock !== null)
            ? Buff.raw(cblock).hex
            : undefined;
    }
    get script() {
        const script = this._meta.script;
        return (script !== null)
            ? Script.decode(script)
            : undefined;
    }
    get params() {
        return this._meta.params;
    }
    toJSON() {
        return this._data;
    }
}
//# sourceMappingURL=TxWitness.js.map