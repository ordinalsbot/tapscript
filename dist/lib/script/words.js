export const OPCODE_MAP = {
    OP_0: 0,
    OP_PUSHDATA1: 76,
    OP_PUSHDATA2: 77,
    OP_PUSHDATA4: 78,
    OP_1NEGATE: 79,
    OP_SUCCESS80: 80,
    OP_1: 81,
    OP_2: 82,
    OP_3: 83,
    OP_4: 84,
    OP_5: 85,
    OP_6: 86,
    OP_7: 87,
    OP_8: 88,
    OP_9: 89,
    OP_10: 90,
    OP_11: 91,
    OP_12: 92,
    OP_13: 93,
    OP_14: 94,
    OP_15: 95,
    OP_16: 96,
    OP_NOP: 97,
    OP_SUCCESS98: 98,
    OP_IF: 99,
    OP_NOTIF: 100,
    OP_ELSE: 103,
    OP_ENDIF: 104,
    OP_VERIFY: 105,
    OP_RETURN: 106,
    OP_TOALTSTACK: 107,
    OP_FROMALTSTACK: 108,
    OP_2DROP: 109,
    OP_2DUP: 110,
    OP_3DUP: 111,
    OP_2OVER: 112,
    OP_2ROT: 113,
    OP_2SWAP: 114,
    OP_IFDUP: 115,
    OP_DEPTH: 116,
    OP_DROP: 117,
    OP_DUP: 118,
    OP_NIP: 119,
    OP_OVER: 120,
    OP_PICK: 121,
    OP_ROLL: 122,
    OP_ROT: 123,
    OP_SWAP: 124,
    OP_TUCK: 125,
    OP_SUCCESS126: 126,
    OP_SUCCESS127: 127,
    OP_SUCCESS128: 128,
    OP_SUCCESS129: 129,
    OP_SIZE: 130,
    OP_SUCCESS131: 131,
    OP_SUCCESS132: 132,
    OP_SUCCESS133: 133,
    OP_SUCCESS134: 134,
    OP_EQUAL: 135,
    OP_EQUALVERIFY: 136,
    OP_SUCCESS137: 137,
    OP_SUCCESS138: 138,
    OP_1ADD: 139,
    OP_1SUB: 140,
    OP_SUCCESS141: 141,
    OP_SUCCESS142: 142,
    OP_NEGATE: 143,
    OP_ABS: 144,
    OP_NOT: 145,
    OP_0NOTEQUAL: 146,
    OP_ADD: 147,
    OP_SUB: 148,
    OP_SUCCESS149: 149,
    OP_SUCCESS150: 150,
    OP_SUCCESS151: 151,
    OP_SUCCESS152: 152,
    OP_SUCCESS153: 153,
    OP_BOOLAND: 154,
    OP_BOOLOR: 155,
    OP_NUMEQUAL: 156,
    OP_NUMEQUALVERIFY: 157,
    OP_NUMNOTEQUAL: 158,
    OP_LESSTHAN: 159,
    OP_GREATERTHAN: 160,
    OP_LESSTHANOREQUAL: 161,
    OP_GREATERTHANOREQUAL: 162,
    OP_MIN: 163,
    OP_MAX: 164,
    OP_WITHIN: 165,
    OP_RIPEMD160: 166,
    OP_SHA1: 167,
    OP_SHA256: 168,
    OP_HASH160: 169,
    OP_HASH256: 170,
    OP_CODESEPARATOR: 171,
    OP_CHECKSIG: 172,
    OP_CHECKSIGVERIFY: 173,
    OP_CHECKMULTISIG: 174,
    OP_CHECKMULTISIGVERIFY: 175,
    OP_NOP1: 176,
    OP_CHECKLOCKTIMEVERIFY: 177,
    OP_CHECKSEQUENCEVERIFY: 178,
    OP_NOP4: 179,
    OP_NOP5: 180,
    OP_NOP6: 181,
    OP_NOP7: 182,
    OP_NOP8: 183,
    OP_NOP9: 184,
    OP_NOP10: 185,
    OP_CHECKSIGADD: 186,
    OP_SUCCESS187: 187,
    OP_SUCCESS188: 188,
    OP_SUCCESS189: 189,
    OP_SUCCESS190: 190,
    OP_SUCCESS191: 191,
    OP_SUCCESS192: 192,
    OP_SUCCESS193: 193,
    OP_SUCCESS194: 194,
    OP_SUCCESS195: 195,
    OP_SUCCESS196: 196,
    OP_SUCCESS197: 197,
    OP_SUCCESS198: 198,
    OP_SUCCESS199: 199,
    OP_SUCCESS200: 200,
    OP_SUCCESS201: 201,
    OP_SUCCESS202: 202,
    OP_SUCCESS203: 203,
    OP_SUCCESS204: 204,
    OP_SUCCESS205: 205,
    OP_SUCCESS206: 206,
    OP_SUCCESS207: 207,
    OP_SUCCESS208: 208,
    OP_SUCCESS209: 209,
    OP_SUCCESS210: 210,
    OP_SUCCESS211: 211,
    OP_SUCCESS212: 212,
    OP_SUCCESS213: 213,
    OP_SUCCESS214: 214,
    OP_SUCCESS215: 215,
    OP_SUCCESS216: 216,
    OP_SUCCESS217: 217,
    OP_SUCCESS218: 218,
    OP_SUCCESS219: 219,
    OP_SUCCESS220: 220,
    OP_SUCCESS221: 221,
    OP_SUCCESS222: 222,
    OP_SUCCESS223: 223,
    OP_SUCCESS224: 224,
    OP_SUCCESS225: 225,
    OP_SUCCESS226: 226,
    OP_SUCCESS227: 227,
    OP_SUCCESS228: 228,
    OP_SUCCESS229: 229,
    OP_SUCCESS230: 230,
    OP_SUCCESS231: 231,
    OP_SUCCESS232: 232,
    OP_SUCCESS233: 233,
    OP_SUCCESS234: 234,
    OP_SUCCESS235: 235,
    OP_SUCCESS236: 236,
    OP_SUCCESS237: 237,
    OP_SUCCESS238: 238,
    OP_SUCCESS239: 239,
    OP_SUCCESS240: 240,
    OP_SUCCESS241: 241,
    OP_SUCCESS242: 242,
    OP_SUCCESS243: 243,
    OP_SUCCESS244: 244,
    OP_SUCCESS245: 245,
    OP_SUCCESS246: 246,
    OP_SUCCESS247: 247,
    OP_SUCCESS248: 248,
    OP_SUCCESS249: 249,
    OP_SUCCESS250: 250,
    OP_SUCCESS251: 251,
    OP_SUCCESS252: 252,
    OP_SUCCESS253: 253,
    OP_SUCCESS254: 254
};
export function getOpLabel(num) {
    if (num > 186 && num < 255) {
        return 'OP_SUCCESS' + String(num);
    }
    for (const [k, v] of Object.entries(OPCODE_MAP)) {
        if (v === num)
            return k;
    }
    throw new Error('OPCODE not found:' + String(num));
}
export function getOpCode(string) {
    for (const [k, v] of Object.entries(OPCODE_MAP)) {
        if (k === string)
            return Number(v);
    }
    throw new Error('OPCODE not found:' + string);
}
export function getWordType(word) {
    switch (true) {
        case (word === 0):
            return 'opcode';
        case (word >= 1 && word <= 75):
            return 'varint';
        case (word === 76):
            return 'pushdata1';
        case (word === 77):
            return 'pushdata2';
        case (word === 78):
            return 'pushdata4';
        case (word <= 254):
            return 'opcode';
        default:
            throw new Error(`Invalid word range: ${word}`);
    }
}
export function isValidWord(word) {
    const MIN_RANGE = 75;
    const MAX_RANGE = 254;
    const DISABLED_OPCODES = [];
    switch (true) {
        case (typeof (word) !== 'number'):
            return false;
        case (word === 0):
            return true;
        case (DISABLED_OPCODES.includes(word)):
            return false;
        case (MIN_RANGE < word && word < MAX_RANGE):
            return true;
        default:
            return false;
    }
}
//# sourceMappingURL=words.js.map