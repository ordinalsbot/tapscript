import { encodeScript } from './encode.js';
import { decodeScript } from './decode.js';
export declare const Script: {
    encode: typeof encodeScript;
    decode: typeof decodeScript;
    fmt: {
        toAsm: (script?: import("../../index.js").ScriptData, varint?: boolean) => string[];
        toBytes: (script?: import("../../index.js").ScriptData, varint?: boolean) => import("@cmdcode/buff-utils").Buff;
        toParam: (script: import("../../index.js").ScriptData) => import("@cmdcode/buff-utils").Buff;
    };
};
//# sourceMappingURL=index.d.ts.map