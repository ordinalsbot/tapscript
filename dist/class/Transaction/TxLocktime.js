import { Buff } from '@cmdcode/buff-utils';
const LOCKTIME_THRESHOLD = 500000000;
export default class TxLocktime {
    constructor(value = 0) {
        this.value = Buff.bytes(value).num;
    }
    get isTimelock() {
        return this.value > LOCKTIME_THRESHOLD;
    }
    get timestamp() {
        return this.isTimelock
            ? this.value
            : this.value * 600;
    }
    set timestamp(value) {
        this.value = value;
    }
    get blockheight() {
        return !this.isTimelock
            ? this.value
            : Math.floor(this.value / 600);
    }
    set blockheight(value) {
        this.value = value;
    }
    get estDate() {
        return this.isTimelock
            ? new Date(Date.now() + (this.value * 1000))
            : new Date(Date.now() + (this.value * 600 * 1000));
    }
    set estDate(date) {
        this.value = Math.floor((date.getTime() - Date.now()) / 1000);
    }
    toJSON() {
        return this.value;
    }
}
//# sourceMappingURL=TxLocktime.js.map