import { z } from 'zod';
export declare const Schema: {
    TxData: z.ZodObject<{
        version: z.ZodNumber;
        vin: z.ZodArray<z.ZodObject<{
            txid: z.ZodString;
            vout: z.ZodNumber;
            scriptSig: z.ZodUnion<[z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>, "many">, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>;
            sequence: z.ZodNumber;
            prevout: z.ZodOptional<z.ZodObject<{
                value: z.ZodUnion<[z.ZodNumber, z.ZodBigInt]>;
                scriptPubKey: z.ZodUnion<[z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>, "many">, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>;
            }, "strip", z.ZodTypeAny, {
                value: number | bigint;
                scriptPubKey: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
            }, {
                value: number | bigint;
                scriptPubKey: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
            }>>;
            witness: z.ZodArray<z.ZodUnion<[z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>, "many">, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            vout: number;
            witness: (string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[])[];
            txid: string;
            scriptSig: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
            sequence: number;
            prevout?: {
                value: number | bigint;
                scriptPubKey: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
            } | undefined;
        }, {
            vout: number;
            witness: (string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[])[];
            txid: string;
            scriptSig: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
            sequence: number;
            prevout?: {
                value: number | bigint;
                scriptPubKey: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
            } | undefined;
        }>, "many">;
        vout: z.ZodArray<z.ZodObject<{
            value: z.ZodUnion<[z.ZodNumber, z.ZodBigInt]>;
            scriptPubKey: z.ZodUnion<[z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>, "many">, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>;
        }, "strip", z.ZodTypeAny, {
            value: number | bigint;
            scriptPubKey: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
        }, {
            value: number | bigint;
            scriptPubKey: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
        }>, "many">;
        locktime: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        version: number;
        vin: {
            vout: number;
            witness: (string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[])[];
            txid: string;
            scriptSig: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
            sequence: number;
            prevout?: {
                value: number | bigint;
                scriptPubKey: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
            } | undefined;
        }[];
        vout: {
            value: number | bigint;
            scriptPubKey: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
        }[];
        locktime: number;
    }, {
        version: number;
        vin: {
            vout: number;
            witness: (string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[])[];
            txid: string;
            scriptSig: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
            sequence: number;
            prevout?: {
                value: number | bigint;
                scriptPubKey: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
            } | undefined;
        }[];
        vout: {
            value: number | bigint;
            scriptPubKey: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
        }[];
        locktime: number;
    }>;
    TxInput: z.ZodObject<{
        txid: z.ZodString;
        vout: z.ZodNumber;
        scriptSig: z.ZodUnion<[z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>, "many">, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>;
        sequence: z.ZodNumber;
        prevout: z.ZodOptional<z.ZodObject<{
            value: z.ZodUnion<[z.ZodNumber, z.ZodBigInt]>;
            scriptPubKey: z.ZodUnion<[z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>, "many">, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>;
        }, "strip", z.ZodTypeAny, {
            value: number | bigint;
            scriptPubKey: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
        }, {
            value: number | bigint;
            scriptPubKey: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
        }>>;
        witness: z.ZodArray<z.ZodUnion<[z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>, "many">, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        vout: number;
        witness: (string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[])[];
        txid: string;
        scriptSig: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
        sequence: number;
        prevout?: {
            value: number | bigint;
            scriptPubKey: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
        } | undefined;
    }, {
        vout: number;
        witness: (string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[])[];
        txid: string;
        scriptSig: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
        sequence: number;
        prevout?: {
            value: number | bigint;
            scriptPubKey: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
        } | undefined;
    }>;
    TxOutput: z.ZodObject<{
        value: z.ZodUnion<[z.ZodNumber, z.ZodBigInt]>;
        scriptPubKey: z.ZodUnion<[z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>, "many">, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>;
    }, "strip", z.ZodTypeAny, {
        value: number | bigint;
        scriptPubKey: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
    }, {
        value: number | bigint;
        scriptPubKey: string | Uint8Array<ArrayBuffer> | (string | number | Uint8Array<ArrayBuffer>)[];
    }>;
    witness: z.ZodArray<z.ZodUnion<[z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>, "many">, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>, "many">;
    script: z.ZodUnion<[z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>, "many">, z.ZodString, z.ZodType<Uint8Array<ArrayBuffer>, z.ZodTypeDef, Uint8Array<ArrayBuffer>>]>;
    hexstr: z.ZodString;
    hash: z.ZodString;
    uint32: z.ZodNumber;
    uint64: z.ZodBigInt;
};
//# sourceMappingURL=check.d.ts.map