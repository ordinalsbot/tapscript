import TxScript from './TxScript.js';
import { readScriptPubKey } from '../../lib/tx/parse.js';
export default class TxOutput {
    constructor(txout) {
        this.value = BigInt(txout.value);
        this.scriptPubKey = new TxScript(txout.scriptPubKey);
    }
    get type() {
        const { type } = readScriptPubKey(this.scriptPubKey.raw);
        return type;
    }
}
//# sourceMappingURL=TxOutput.js.map