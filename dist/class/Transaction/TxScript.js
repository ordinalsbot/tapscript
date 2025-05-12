import { Buff } from '@cmdcode/buff-utils';
import { encodeScript } from '../../lib/script/encode.js';
import { decodeScript } from '../../lib/script/decode.js';
import { TapTree } from '../../lib/tap/index.js';
import { hash160, hash256 } from '@cmdcode/crypto-utils';
export default class TxScript {
    constructor(script) {
        this._buff = Buff.raw(encodeScript(script));
    }
    get raw() {
        return this._buff.raw;
    }
    get hex() {
        return this._buff.hex;
    }
    get asm() {
        return decodeScript(this._buff);
    }
    getHash(format, version) {
        switch (format) {
            case 'p2w':
                return hash256(this._buff).hex;
            case 'p2sh':
                return hash160(this._buff).hex;
            case 'p2tr':
                return TapTree.getLeaf(this._buff, version);
            default:
                throw new Error('Unrecognized format: ' + format);
        }
    }
    toJSON() {
        return this.asm ?? [];
    }
}
//# sourceMappingURL=TxScript.js.map