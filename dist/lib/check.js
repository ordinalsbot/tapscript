export function isHex(value) {
    return (typeof value === 'string' &&
        value.length % 2 === 0 &&
        /[0-9a-fA-F]/.test(value));
}
export function isBytes(value) {
    return (isHex(value) || value instanceof Uint8Array);
}
export function isValidAnnex(annex) {
    return (typeof annex === 'string' &&
        annex.startsWith('50'));
}
//# sourceMappingURL=check.js.map