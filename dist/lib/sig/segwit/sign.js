import { Buff } from '@cmdcode/buff-utils';
import { noble } from '@cmdcode/crypto-utils';
import { hashTx } from './hash.js';
export function signTx(seckey, txdata, index, config = {}) {
    const { sigflag = 0x01 } = config;
    const hash = hashTx(txdata, index, config);
    const sig = noble.secp.sign(hash, seckey).toDERRawBytes(true);
    return Buff.join([sig, sigflag]);
}
//# sourceMappingURL=sign.js.map