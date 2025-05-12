import { Buff, Stream } from '@cmdcode/buff-utils';
import { util } from '@cmdcode/crypto-utils';
import { getTweakedKey } from './tweak.js';
import { safeThrow } from '../utils.js';
import { xOnlyPub } from './utils.js';
import { getTapBranch, merkleize } from './tree.js';
const DEFAULT_VERSION = 0xc0;
export function getTapSecKey(seckey, config = {}) {
    return getTapKey(seckey, { ...config, isPrivate: true });
}
export function getTapPubKey(pubkey, config = {}) {
    return getTapKey(pubkey, { ...config, isPrivate: false });
}
function getTapKey(intkey, config = {}) {
    const { isPrivate = false, tree = [], version = DEFAULT_VERSION } = config;
    const pubkey = (isPrivate)
        ? util.getPublicKey(intkey, true)
        : xOnlyPub(intkey);
    let { target } = config;
    if (target !== undefined)
        target = Buff.bytes(target).hex;
    let tapkey, ctrlpath = [];
    if (tree.length > 0) {
        const [root, _t, path] = merkleize(tree, target);
        ctrlpath = path;
        tapkey = getTweakedKey(intkey, root, isPrivate);
    }
    else {
        if (target !== undefined) {
            tapkey = getTweakedKey(intkey, target, isPrivate);
        }
        else {
            tapkey = getTweakedKey(intkey, undefined, isPrivate);
        }
    }
    const parity = (isPrivate)
        ? util.getPublicKey(tapkey)[0]
        : tapkey[0];
    const cbit = Buff.num(version + readParityBit(parity));
    const block = [cbit, pubkey];
    if (ctrlpath.length > 0) {
        ctrlpath.forEach(e => block.push(Buff.hex(e)));
    }
    const cblock = Buff.join(block);
    if (target !== undefined) {
        if (!checkPath(tapkey, target, cblock, config)) {
            throw new Error('Path checking failed! Unable to generate path.');
        }
    }
    return [xOnlyPub(tapkey).hex, cblock.hex];
}
export function checkPath(tapkey, target, cblock, config = {}) {
    const { isPrivate = false, throws = false } = config;
    const { parity, paths, intkey } = readCtrlBlock(cblock);
    const pub = (isPrivate)
        ? util.getPublicKey(tapkey, true)
        : xOnlyPub(tapkey);
    const extkey = Buff.join([parity, pub]);
    if (extkey.length !== 33) {
        return safeThrow('Invalid tapkey: ' + extkey.hex, throws);
    }
    let branch = Buff.bytes(target).hex;
    for (const path of paths) {
        branch = getTapBranch(branch, path);
    }
    const k = getTweakedKey(intkey, branch);
    return (Buff.raw(k).hex === Buff.raw(extkey).hex);
}
export function readCtrlBlock(cblock) {
    const buffer = new Stream(Buff.bytes(cblock));
    const cbyte = buffer.read(1).num;
    const intkey = buffer.read(32);
    const [version, parity] = (cbyte % 2 === 0)
        ? [cbyte, 0x02]
        : [cbyte - 1, 0x03];
    const paths = [];
    while (buffer.size >= 32) {
        paths.push(buffer.read(32).hex);
    }
    if (buffer.size !== 0) {
        throw new Error('Non-empty buffer on control block: ' + String(buffer));
    }
    return { intkey, paths, parity, version };
}
export function readParityBit(parity = 0x02) {
    if (parity === 0 || parity === 1)
        return parity;
    if (parity === 0x02 || parity === '02')
        return 0;
    if (parity === 0x03 || parity === '03')
        return 1;
    throw new Error('Invalid parity bit: ' + String(parity));
}
//# sourceMappingURL=key.js.map