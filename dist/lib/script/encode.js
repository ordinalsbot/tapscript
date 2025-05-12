import { Buff, Stream } from '@cmdcode/buff-utils';
import { getOpCode } from './words.js';
import { isHex } from '../check.js';
const MAX_WORD_SIZE = 0x208;
export function encodeScript(script = [], varint = true) {
    let buff = Buff.num(0);
    if (Array.isArray(script)) {
        buff = Buff.raw(encodeWords(script));
    }
    if (isHex(script)) {
        buff = Buff.hex(script);
    }
    if (script instanceof Uint8Array) {
        buff = Buff.raw(script);
    }
    if (varint) {
        buff = buff.prefixSize('le');
    }
    return buff;
}
export function encodeWords(wordArray) {
    const words = [];
    for (const word of wordArray) {
        words.push(encodeWord(word));
    }
    return (words.length > 0)
        ? Buff.join(words)
        : new Uint8Array();
}
export function encodeWord(word) {
    let buff = new Uint8Array();
    if (typeof (word) === 'string') {
        if (word.startsWith('OP_PUSHBYTES_1')) {
            buff = Buff.hex(word.split(' ')[1]);
            return Buff.join([encodeSize(buff.length), buff]);
        }
        else if (word.startsWith('OP_')) {
            return Buff.num(getOpCode(word), 1);
        }
        else if (isHex(word)) {
            buff = Buff.hex(word);
        }
        else {
            buff = Buff.str(word);
        }
    }
    else {
        buff = Buff.bytes(word);
    }
    if (buff.length === 1) {
        if (buff[0] !== 0 && buff[0] <= 16) {
            buff[0] += 0x50;
            return buff;
        }
        else if (buff[0] > 128 && buff[0] <= 255) {
            buff = new Uint8Array([buff[0], 0]);
        }
        return Buff.join([encodeSize(buff.length), buff]);
    }
    else if (buff.length > MAX_WORD_SIZE) {
        const words = splitWord(buff);
        return encodeWords(words);
    }
    else {
        return Buff.join([encodeSize(buff.length), buff]);
    }
}
function encodeSize(size) {
    const OP_DATAPUSH1 = Buff.num(0x4c, 1);
    const OP_DATAPUSH2 = Buff.num(0x4d, 1);
    switch (true) {
        case (size <= 0x4b):
            return Buff.num(size);
        case (size > 0x4b && size < 0x100):
            return Buff.join([OP_DATAPUSH1, Buff.num(size, 1, 'le')]);
        case (size >= 0x100 && size <= MAX_WORD_SIZE):
            return Buff.join([OP_DATAPUSH2, Buff.num(size, 2, 'le')]);
        default:
            throw new Error('Invalid word size:' + size.toString());
    }
}
function splitWord(word) {
    const words = [];
    const buff = new Stream(word);
    while (buff.size > MAX_WORD_SIZE) {
        words.push(buff.read(MAX_WORD_SIZE));
    }
    words.push(buff.read(buff.size));
    return words;
}
//# sourceMappingURL=encode.js.map