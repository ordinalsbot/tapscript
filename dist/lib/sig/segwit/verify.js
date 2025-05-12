import { Buff } from '@cmdcode/buff-utils';
import { noble } from '@cmdcode/crypto-utils';
import { safeThrow } from '../../utils.js';
import { Tx } from '../../tx/index.js';
import { hashTx } from './hash.js';
import { Script } from '../../script/index.js';
export function verifyTx(txdata, index, config = {}) {
    const tx = Tx.fmt.toJson(txdata);
    const { throws = false } = config;
    const { witness = [] } = tx.vin[index];
    const witnessData = Tx.util.readWitness(witness);
    const { script, params } = witnessData;
    let pub = null;
    if (params.length < 1) {
        return safeThrow('Invalid witness data: ' + String(witness), throws);
    }
    if (config.script === undefined &&
        script !== null) {
        config.script = script;
    }
    if (config.pubkey !== undefined) {
        pub = Buff.bytes(config.pubkey);
    }
    else if (params.length > 1 &&
        params[1].length === 33) {
        pub = Buff.bytes(params[1]);
    }
    else {
        return safeThrow('No pubkey provided!', throws);
    }
    const rawsig = Script.fmt.toParam(params[0]);
    const signature = rawsig.slice(0, -1);
    const sigflag = rawsig.slice(-1)[0];
    const hash = hashTx(tx, index, { ...config, sigflag });
    if (!noble.secp.verify(signature, hash, pub)) {
        return safeThrow('Invalid signature!', throws);
    }
    return true;
}
//# sourceMappingURL=verify.js.map