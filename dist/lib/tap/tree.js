import { Buff } from '@cmdcode/buff-utils';
import { Script } from '../script/index.js';
const DEFAULT_VERSION = 0xc0;
export function getTapTag(tag) {
    const htag = Buff.str(tag).digest;
    return Buff.join([htag, htag]);
}
export function getTapLeaf(data, version = DEFAULT_VERSION) {
    return Buff.join([
        getTapTag('TapLeaf'),
        getVersion(version),
        Buff.bytes(data)
    ]).digest.hex;
}
export function getTapScript(script, version) {
    return getTapLeaf(Script.fmt.toBytes(script), version);
}
export function getTapBranch(leafA, leafB) {
    if (leafB < leafA) {
        [leafA, leafB] = [leafB, leafA];
    }
    return Buff.join([
        getTapTag('TapBranch'),
        Buff.hex(leafA).raw,
        Buff.hex(leafB).raw
    ]).digest.hex;
}
export function getTapRoot(leaves) {
    return Buff.hex(merkleize(leaves)[0]);
}
export function merkleize(taptree, target, path = []) {
    const leaves = [];
    const tree = [];
    if (taptree.length < 1) {
        throw new Error('Tree is empty!');
    }
    for (let i = 0; i < taptree.length; i++) {
        const leaf = taptree[i];
        if (Array.isArray(leaf)) {
            const [r, t, p] = merkleize(leaf, target);
            target = t;
            leaves.push(r);
            for (const e of p) {
                path.push(e);
            }
        }
        else {
            leaves.push(leaf);
        }
    }
    if (leaves.length === 1) {
        return [leaves[0], target, path];
    }
    leaves.sort();
    if (leaves.length % 2 !== 0) {
        leaves.push(leaves[leaves.length - 1]);
    }
    for (let i = 0; i < leaves.length - 1; i += 2) {
        const branch = getTapBranch(leaves[i], leaves[i + 1]);
        tree.push(branch);
        if (typeof target === 'string') {
            if (target === leaves[i]) {
                path.push(leaves[i + 1]);
                target = branch;
            }
            else if (target === leaves[i + 1]) {
                path.push(leaves[i]);
                target = branch;
            }
        }
    }
    return merkleize(tree, target, path);
}
export function getVersion(version = 0xc0) {
    return version & 0xfe;
}
//# sourceMappingURL=tree.js.map