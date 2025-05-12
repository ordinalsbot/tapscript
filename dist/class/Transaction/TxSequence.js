const MAX_VAL = 0xFFFFFFFF;
const NO_LOCK = (1 << 31);
const TIME_MOD = 512;
const LOCK_TYPE = (1 << 22);
export default class TxSequence {
    constructor(value) {
        if (typeof value === 'string') {
            this.value = parseInt(value, 16);
        }
        else {
            this.value = value;
        }
    }
    get isReplaceable() {
        return this.value < MAX_VAL;
    }
    get isLocked() {
        return !(this.value !== MAX_VAL || (this.value & NO_LOCK) !== 0);
    }
    get isTimelock() {
        return (this.value & LOCK_TYPE) !== 0;
    }
    get timestamp() {
        return this.isLocked
            ? this.isTimelock
                ? this.value * TIME_MOD
                : this.value * TIME_MOD * 600
            : 0;
    }
    set timestamp(value) {
        this.value = Math.ceil(value / TIME_MOD);
    }
    get blockheight() {
        return this.isLocked
            ? !this.isTimelock
                ? this.value
                : Math.ceil((this.value * TIME_MOD) / 600)
            : 0;
    }
    set blockheight(value) {
        this.value = value;
    }
    get estDate() {
        return this.isTimelock
            ? new Date(Date.now() + (this.value * TIME_MOD * 1000))
            : new Date(Date.now() + (this.value * 600 * 1000));
    }
    set estDate(date) {
        const delta = date.getTime() - Date.now();
        this.value = (delta > (TIME_MOD * 1000))
            ? Math.ceil(delta / 1000 / TIME_MOD)
            : 1;
    }
    toJSON() {
        return this.value;
    }
}
//# sourceMappingURL=TxSequence.js.map