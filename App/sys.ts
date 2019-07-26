namespace sys {
    export const whitespaceRe: RegExp = /[\s\r\n]+/g;
    export const isTrueRe: RegExp = /^(t(rue)?|y(es)?|1)$/g;
    export const isFalseRe: RegExp = /^(f(alse)?|no?|o)$/g;
    export const trueFalseRe: RegExp = /^((t(?:rue)?|y(?:es)?|1)|(f(?:alse)?|no?|0))$/g;
    const urlParseRe: RegExp = /^(([^@:/?#]*):(?:\/\/((?:([^@:/?#]*)(?::([^@:/?#]*))?@)?([^:/?#]*)(?::(\d+(?=[:/?#]|$)))?))?)?(([:/]+(?=(?:[^?#:/]+[:/]*)?(?:\?|\#|$))|[:/]*[^:/?#]+(?=[:/]+[^?#])(?:[:/]+[^:/?#]+(?=[:/]+[^?#]))*)?[:/]*((\.*(?:\.[^.:/?#]*(?=\.)|[^.:/?#]+)*)(?:\.([^.:/?#]*))?)[:/]*)(?:\?([^#]*))?(?:\#(.*))?$/;
    const trimRightRe: RegExp = /^((\s*\S+)(\s+\S+)*)\s*$/;
    const trimLeftRe: RegExp = /^\s*(\S.*)$/;
    const identifierRe: RegExp = /^[a-z_][a-z\d]*$/i;
    const falseStringRe: RegExp = /^(f(alse)?|no?|0+(\.0+)?)([^\w-]|$)/i;
    const numberStringRe: RegExp = /^\d+(\.\d+)$/i;

    /**
     * Determines if a value is null or undefined.
     * @param {*} value Value to test.
     * @returns {boolean} true if value was null or undefined; otherwise, false.
     */
    export function isNil(value: any | null | undefined): value is null | undefined { return typeof (value) === 'undefined' || value === null; }

    export function isNilOrEmpty<T>(value: Array<T> | null | undefined): value is ({ length: 0 } & Array<T>) | null | undefined;
    export function isNilOrEmpty(value: Array<any> | null | undefined): value is ({ length: 0 } & Array<any>) | null | undefined;
    export function isNilOrEmpty(value: string | null | undefined): value is ({ length: 0 } & string) | null | undefined;
    export function isNilOrEmpty(value: string | Array<any> | null | undefined): value is ({ length: 0 } & string) | ({ length: 0 } & Array<any>) | null | undefined {
        return (typeof (value) !== 'string' && (typeof (value) != 'object' || value === null || !Array.isArray(value))) || value.length == 0;
    }

    export function isNilOrWhiteSpace(value: string | null | undefined): boolean { return typeof (value) !== 'string' || value.trim().length == 0; }

    export function notNil<T>(obj: T | null | undefined): obj is T;
    export function notNil(obj: any | null | undefined): obj is boolean | number | string | object | symbol;
    export function notNil(obj: any | null | undefined): boolean { return typeof (obj) !== 'undefined' && obj != null; }

    export function notNilOrEmpty<T>(value: Array<T> | null | undefined): value is Array<T>;
    export function notNilOrEmpty(value: Array<any> | null | undefined): value is Array<any>;
    export function notNilOrEmpty(value: string | null | undefined): value is string;
    export function notNilOrEmpty(value: string | Array<any> | null | undefined): value is string | Array<any> {
        return (typeof (value) == 'string' || (typeof (value) == 'object' && value != null && Array.isArray(value))) && value.length > 0;
    }

    export function notNilOrWhiteSpace(value: string | null | undefined): value is string { return typeof (value) == 'string' && value.trim().length > 0 }

    export function isNumber(value: any | null | undefined): value is number { return typeof (value) === "number" && !isNaN(value); }
    /**
     * Determines if value's type is an object.
     * @param {*} value Value to test.
     * @param {boolean} [noArray=false] If value is an array, return false.
     * @returns {boolean} true if value was null or undefined; otherwise, false.
     */
    export function isObject(value: any | null | undefined, noArray?: boolean): value is object { return (typeof (value) == "object" && value !== null && !(noArray && Array.isArray(value))); }

    /**
     * Determines if a String represents a valid identifier name.
     * @param {string} text String to test.
     * @returns {boolean} true if value was a valid identifier name; otherwise, false.
     */
    export function isValidIdentifierName(text: string): boolean { return typeof (text) == "string" && identifierRe.test(text); }

    export function asNotNil<T>(value: T | null | undefined, defaultValue: T): T;
    export function asNotNil(value: string | null | undefined, trim?: boolean): string;
    export function asNotNil(value: string | null | undefined, defaultValue: string, trim: boolean): string;
    export function asNotNil(value: any | null | undefined, opt?: any, trim?: boolean): any {
        if (typeof (value) === "undefined" || value === null)
            return (typeof (opt) !== 'undefined') ? opt : '';
        if (typeof (value) !== 'string')
            return value;
        return ((typeof (opt) === "boolean") ? opt : trim === true) ? value.trim() : value;
    }

    export function stringFormat(format: string, ...args: any[]) { return format.replace(/\{(\d+)\}/g, (subString: string, g: string) => args[parseInt(g)]); }

    /**
     * Ensures that a value is a string, converting it if necessary.
     * @param {*} value Value to assert.
     * @param {string} defaultValue The default value to return if the value is null or undefined.
     * @returns {string} Input value converted to a string.
     */
    export function asString(value: any | null | undefined, defaultValue: string);
    /**
     * Ensures that a value is a string, converting it if necessary.
     * @param {*} value Value to assert.
     * @param {boolean} trim If true, then the resulting string will be trimmed.
     * @param {string} defaultValue The default value to return if the value is null or undefined.
     * @returns {string} Input value converted to a string.
     */
    export function asString(value: any | null | undefined, trim: boolean, defaultValue: string);
    /**
     * Ensures that a value is a string, converting it if necessary.
     * @param {*} value Value to assert.
     * @param {boolean} [trim=false] If true, then the resulting string will be trimmed.
     * @param {boolean} [allowNil=false] If true, and the input value is null or undefined, then the input value will be returned; otherwise, a null or undefined input value will cause an empty string to be returned.
     * @returns {string} Input value converted to a string.
     */
    export function asString(value: any | null | undefined, trim?: boolean, allowNil?: boolean);
    export function asString(value: any | null | undefined, trim: string | boolean = false, spec: string | boolean = false): string {
        if (isNil(value))
            return (typeof (trim) === 'string') ? trim : ((typeof (spec) === 'string') ? spec : ((spec) ? value : ""));
        if (typeof (value) != "string") {
            if (Array.isArray(value))
                value = value.join("\n");
            else {
                try { value = value.toString(); } catch (err) { /* okay to ignnore */ }
                if (isNil(value))
                    return (typeof (trim) === 'string') ? trim : ((typeof (spec) === 'string') ? spec : ((spec) ? value : ""));
                if (typeof (value) != "string") {
                    try {
                        value = Object.prototype.toString.call(value);
                        if (isNil(value))
                            return (typeof (trim) === 'string') ? trim : ((typeof (spec) === 'string') ? spec : ((spec) ? value : ""));
                    }
                    catch (err) {
                        try { value = value + ""; }
                        catch (err) {
                            if (typeof (trim) === 'string')
                                return trim;
                            if (typeof (spec) === 'string')
                                return spec;
                            if (spec)
                                return;
                            return "";
                        }
                    }
                }
            }
        }

        if (typeof (trim) === 'boolean' && trim)
            return value.trim();

        return value;
    }

    export function subStringBefore(source: string, search: RegExp, nilIfNoMatch?: boolean): string;
    export function subStringBefore(source: string, search: string, nilIfNoMatch?: boolean, caseSensitive?: boolean): string;
    export function subStringBefore(source: string, search: string | RegExp, nilIfNoMatch: boolean = false, caseSensitive: boolean = false): string {
        if (!isNilOrEmpty(source)) {
            if (typeof (search) === "string") {
                if (search.length > 0) {
                    let i: number = (caseSensitive) ? source.indexOf(search) : source.toLowerCase().indexOf(search.toLowerCase());
                    if (i > -1)
                        return source.substr(0, i);
                }
            } else if (notNil(search)) {
                let match: RegExpExecArray = search.exec(source);
                if (!isNilOrEmpty(match))
                    return source.substr(0, match.index);
            }
        }
        if (!nilIfNoMatch)
            return source;
    }

    export function subStringAfter(source: string, search: RegExp, nilIfNoMatch?: boolean): string;
    export function subStringAfter(source: string, search: string, nilIfNoMatch?: boolean, caseSensitive?: boolean): string;
    export function subStringAfter(source: string, search: string | RegExp, nilIfNoMatch: boolean = false, caseSensitive: boolean = false): string {
        if (!isNilOrEmpty(source)) {
            if (typeof (search) === "string") {
                if (search.length > 0) {
                    let i: number = (caseSensitive) ? source.indexOf(search) : source.toLowerCase().indexOf(search.toLowerCase());
                    if (i > -1)
                        return source.substr(i + search.length);
                }
            } else if (notNil(search)) {
                let match: RegExpExecArray = search.exec(source);
                if (!isNilOrEmpty(match))
                    return source.substr(match.index + match[0].length);
            }
        }
        if (!nilIfNoMatch)
            return source;
    }

    export function splitAt(source: string, index: number): [string, string] | [string]
    export function splitAt(source: string, search: RegExp, includeMatch?: false): [string, string] | [string]
    export function splitAt(source: string, search: RegExp, includeMatch: true): [string, string, string] | [string]
    export function splitAt(source: string, search: string, caseSensitive?: boolean): [string, string] | [string];
    export function splitAt(source: string, spec: number | string | RegExp, opt: boolean = false): [string, string, string] | [string, string] | [string] {
        if (!isNilOrEmpty(source)) {
            if (typeof (spec) === "number") {
                if (!isNaN(spec) && spec > -1 && spec < source.length)
                    return [source.substr(0, spec), source.substr(spec)];
            } else if (typeof (spec) === "string") {
                if (spec.length > 0) {
                    let i: number = (opt) ? source.indexOf(spec) : source.toLowerCase().indexOf(spec.toLowerCase());
                    if (i > -1)
                        return [source.substr(0, i), source.substr(i)];
                }
            } else if (notNil(spec)) {
                let match: RegExpExecArray = spec.exec(source);
                if (!isNilOrEmpty(match)) {
                    if (opt)
                        return [source.substr(0, match.index), match[0], source.substr(match.index + match[0].length)];
                    return [source.substr(0, match.index), source.substr(match.index + match[0].length)];
                }
            }
        }
        return [source];
    }

    /**
     * Ensures that a value is a floating-point number, converting it if necessary.
     * @param value
     * @param defaultValue
     * @returns {string} Input value converted to a floating-point number.
     */
    export function asFloat(value: any | null | undefined, defaultValue: number | null | undefined = NaN): number {
        if (typeof (value) === 'undefined' || value === null)
            return defaultValue;
        if (typeof (value) === 'number')
            return value;
        let n: number = parseFloat(value);
        if (isNaN(n))
            return defaultValue;
        return n;
    }

    /**
     * Ensures that a value is a whole number, converting it if necessary.
     * @param value
     * @param defaultValue
     * @returns {string} Input value converted to a whole number.
     */
    export function asInt(value: any | null | undefined, defaultValue: number | null | undefined = NaN): number {
        if (typeof (value) === 'undefined' || value === null)
            return defaultValue;
        if (typeof (value) === 'number')
            return value;
        let n: number = parseInt(value);
        if (isNaN(n))
            return defaultValue;
        return n;
    }

    /**
     * Trims trailing whitespace from text.
     * @param {string} text Text to trim.
     * @returns {string} Text with trailing whitespace removed.
     */
    export function trimRight(text: string): string {
        var m = trimRightRe.exec(asString(text));
        return (isNil(m)) ? "" : m[1];
    }

    /**
     * Trims leading whitespace from text.
     * @param {string} text Text to trim.
     * @returns {string} Text with leading whitespace removed.
     */
    export function trimLeft(text: string): string {
        var m = trimLeftRe.exec(asString(text));
        return (isNil(m)) ? "" : m[1];
    }

    export function asBoolean(value: any | null | undefined, nilIsTrue: boolean = false): boolean {
        if (isNil(value))
            return (nilIsTrue == true);
        if (typeof (value) == "boolean")
            return value;
        if (typeof (value) == "object") {
            if (!Array.isArray(value)) {
                if (typeof (value.valueOf) == "function") {
                    try { value = value.valueOf(); } catch (e) { }
                    if (isNil(value))
                        return (nilIsTrue == true);
                }
                if (typeof (value) != "object" || !Array.isArray(value))
                    value = [value];
                else if (value.length == 0)
                    return false;
            } else if (value.length == 0)
                return false;
        } else
            value = [value];
        if (nilIsTrue) {
            for (var i = 0; i < value.length; i++) {
                var v = value[i];
                if (isNil(v))
                    return true;
                if (typeof (v) == "boolean") {
                    if (v)
                        return true;
                    continue;
                }
                if (typeof (v) != "string") {
                    if (typeof (v.valueOf) == "function") {
                        try { v = v.valueOf(); } catch (e) { }
                        if (isNil(v))
                            return true;
                        if (typeof (v) == "boolean") {
                            if (v)
                                return true;
                            continue;
                        }
                    }
                    if (typeof (v) != "string")
                        v = asString(v);
                }

                if (v.length == 0 || (v = v.trim()).length == 0 || !falseStringRe.test(v))
                    return true;
            }
        } else {
            for (var i = 0; i < value.length; i++) {
                var v = value[i];
                if (isNil(v))
                    continue;
                if (typeof (v) == "boolean") {
                    if (v)
                        return true;
                    continue;
                }
                if (typeof (v) != "string") {
                    if (typeof (v.valueOf) == "function") {
                        try { v = v.valueOf(); } catch (e) { }
                        if (isNil(v))
                            continue;
                        if (typeof (v) == "boolean") {
                            if (v)
                                return true;
                            continue;
                        }
                    }
                    if (typeof (v) != "string")
                        v = asString(v);
                }

                if (v.length > 0 && (v = v.trim()).length > 0 && !falseStringRe.test(v))
                    return true;
            }
        }
        return false;
    }

    export function notString(value: any | null | undefined): boolean { return typeof (value) !== 'string'; }

    export function asNotWhitespaceOrUndefined(value: string | null | undefined, trim?: boolean): string | undefined {
        if (typeof (value) === 'string') {
            if (trim === true) {
                if ((value = value.trim()).length > 0)
                    return value;
            } else if (value.trim().length > 0)
                return value;
        }
    }

    export function asDefinedOrNull<T>(value: T | null | undefined): T | null { return (typeof (value) === undefined) ? null : value; }

    export function asUndefinedIfNull<T>(value: T | null | undefined): T | undefined {
        if (typeof (value) !== undefined && value !== null)
            return value;
    }

    export function asNotEmptyOrNull<T>(value: Array<T> | null | undefined): Array<T> | undefined;
    export function asNotEmptyOrNull(value: Array<any> | null | undefined): Array<any> | undefined;
    export function asNotEmptyOrNull(value: string | null | undefined, trim?: boolean): string | undefined;
    export function asNotEmptyOrNull(value: string | Array<any> | null | undefined, trim?: boolean): string | Array<any> | null {
        if (typeof (value) === 'string') {
            if (trim) {
                if ((value = value.trim()).length > 0)
                    return value;
            } else if (value.trim().length > 0)
                return value;
        }
        return null;
    }

    export function asNotWhitespaceOrNull(value: string | null | undefined, trim?: boolean): string | null {
        if (typeof (value) === 'string') {
            if (trim === true) {
                if ((value = value.trim()).length > 0)
                    return value;
            } else if (value.trim().length > 0)
                return value;
        }
        return null;
    }

    export function asNotEmptyOrUndefined<T>(value: Array<T> | null | undefined): Array<T> | undefined;
    export function asNotEmptyOrUndefined(value: Array<any> | null | undefined): Array<any> | undefined;
    export function asNotEmptyOrUndefined(value: string | null | undefined, trim?: boolean): string | undefined;
    export function asNotEmptyOrUndefined(value: string | Array<any> | null | undefined, trim?: boolean): string | Array<any> | undefined {
        if (typeof (value) !== 'undefined' && value !== null && value.length > 0)
            return (trim === true && typeof (value) === 'string') ? value.trim() : value;
    }

    export function isError(value: any | null | undefined): value is Error {
        return typeof (value) == 'object' && value !== null && typeof (value.message) == 'string' && typeof (value.name) == 'string' &&
            (typeof (value.stack) == 'undefined' || value.stack === null || typeof (value.stack) == 'string');
    }

    export function compareStrings(a: any | null | undefined, b: any | null | undefined): number {
        if (typeof (a) === 'undefined')
            return (typeof (b) === 'undefined') ? 0 : -1;
        if (typeof (b) === 'undefined')
            return 1;
        if (a === null)
            return (b === null) ? 0 : -1;
        if (b === null)
            return 1;
        if (typeof (a) !== 'string')
            return (typeof (b) !== 'string') ? compareStrings(a.toString(), b.toString()) : 1;
        if (typeof (b) !== 'string')
            return -1;
        if (a === b)
            return 0;
        let n = a.localeCompare(b, undefined, { sensitivity: 'accent', numeric: true });
        if (n != 0 || (n = a.localeCompare(b, undefined, { numeric: true })) != 0 || (n = a.localeCompare(b)) != 0)
            return n;
        return (a < b) ? -1 : 1;
    }

    export function isIterable(value: any | null | undefined): value is { [Symbol.iterator](): Function } {
        if (typeof (value) !== 'object' || value == null)
            return false;
        if (Array.isArray(value))
            return true;
        let fn: any | null | undefined = value[Symbol.iterator];
        return (typeof (fn) === 'function');
    }

    export function asIterable<T>(source: T | T[] | Iterable<T> | null | undefined, allowNull: boolean = false): Iterable<T> {
        if (typeof (source) === 'undefined')
            return [];
        if (source === null)
            return (allowNull) ? [null] : [];
        return (Array.isArray(source)) ? source : ((isIterable(source)) ? <Iterable<T>>source : [<T>source]);
    }

    export function asArray<T>(source: T | T[] | Iterable<T> | null | undefined, allowNull: boolean = false): T[] {
        if (typeof (source) === 'undefined')
            return [];
        if (source === null)
            return (allowNull) ? [null] : [];
        if (Array.isArray(source))
            return source;
        if (isIterable(source)) {
            let iterator: Iterator<T>;
            let fn: Function = source[Symbol.iterator];
            try { iterator = fn(); } catch { /* okay to ignore */ }
            if (typeof (iterator) === 'object' && iterator !== null) {
                let result: T[] = [];
                try {
                    let ir: IteratorResult<T> = iterator.next();
                    if (allowNull)
                        while (!ir.done) {
                            if (typeof (ir.value) !== 'undefined')
                                result.push(ir.value);
                            ir = iterator.next();
                        }
                    else
                        while (!ir.done) {
                            if (typeof (ir.value) !== 'undefined' && ir.value !== null)
                                result.push(ir.value);
                            ir = iterator.next();
                        }
                } catch { /* okay to ignore */ }
                return result;
            }
        }
        return [<T>source];
    }

    export function skipFirst<T>(source: Iterable<T>, callbackfn: { (value: T, index: number, iterable: Iterable<T>): boolean }, thisArg?: any);
    export function skipFirst<T>(source: Iterable<T>, count: number);
    export function skipFirst<T>(source: Iterable<T>, spec: number | { (value: T, index: number, iterable: Iterable<T>): boolean }, thisArg?: any): T[] {
        let result: T[] = [];
        let iterator: Iterator<T> = source[Symbol.iterator]();
        let ir: IteratorResult<T> = iterator.next();
        if (typeof (spec) === 'number')
            while (!ir.done) {
                if (spec < 1) {
                    result.push(ir.value);
                    while (!(ir = iterator.next()).done)
                        result.push(ir.value);
                    break;
                }
                spec--;
                ir = iterator.next();
            }
        else {
            let index: number = 0;
            if (typeof (thisArg) === 'undefined')
                while (!ir.done) {
                    if (!spec(ir.value, index++, source)) {
                        result.push(ir.value);
                        while (!(ir = iterator.next()).done)
                            result.push(ir.value);
                        break;
                    }
                    ir = iterator.next();
                }
            else
                while (!ir.done) {
                    if (!spec.call(thisArg, ir.value, index++, source)) {
                        result.push(ir.value);
                        while (!(ir = iterator.next()).done)
                            result.push(ir.value);
                        break;
                    }
                    ir = iterator.next();
                }
        }
        return result;
    }

    export function skipLast<T>(source: Iterable<T>, callbackfn: { (value: T, index: number, iterable: Iterable<T>): boolean }, thisArg?: any);
    export function skipLast<T>(source: Iterable<T>, count: number);
    export function skipLast<T>(source: Iterable<T>, spec: number | { (value: T, index: number, iterable: Iterable<T>): boolean }, thisArg?: any): T[] {
        let result: T[] = reverse(source);
        if (typeof (spec) === 'number') {
            while (result.length > 0 && spec-- > 0)
                result.shift();
        } else if (typeof (thisArg) === 'undefined') {
            while (result.length > 0 && spec(result[0], result.length - 1, source))
                result.shift();
        } else {
            while (result.length > 0 && spec.call(thisArg, result[0], result.length - 1, source))
                result.shift();
        }
        return result.reverse();
    }

    export function takeFirst<T>(source: Iterable<T>, callbackfn: { (value: T, index: number, iterable: Iterable<T>): boolean }, thisArg?: any);
    export function takeFirst<T>(source: Iterable<T>, count: number);
    export function takeFirst<T>(source: Iterable<T>, spec: number | { (value: T, index: number, iterable: Iterable<T>): boolean }, thisArg?: any): T[] {
        let result: T[] = [];
        let iterator: Iterator<T> = source[Symbol.iterator]();
        let ir: IteratorResult<T> = iterator.next();
        if (typeof (spec) === 'number')
            while (!ir.done && spec-- > 0) {
                result.push(ir.value);
                ir = iterator.next();
            }
        else {
            let index: number = 0;
            if (typeof (thisArg) === 'undefined')
                while (!ir.done && spec(ir.value, index++, source)) {
                    result.push(ir.value);
                    ir = iterator.next();
                }
            else
                while (!ir.done && spec.call(thisArg, ir.value, index++, source)) {
                    result.push(ir.value);
                    ir = iterator.next();
                }
        }
        return result;
    }

    export function takeLast<T>(source: Iterable<T>, callbackfn: { (value: T, index: number, iterable: Iterable<T>): boolean }, thisArg?: any);
    export function takeLast<T>(source: Iterable<T>, count: number);
    export function takeLast<T>(source: Iterable<T>, spec: number | { (value: T, index: number, iterable: Iterable<T>): boolean }, thisArg?: any): T[] {
        let result: T[] = reverse(source);
        if (typeof (spec) === 'number')
            while (result.length > 0 && spec)
                result.pop();
        else if (typeof (thisArg) === 'undefined')
            while (result.length > 0 && spec(result[0], result.length - 1, source))
                result.shift();
        else
            while (result.length > 0 && spec.call(thisArg, result[0], result.length - 1, source))
                result.shift();
        return result.reverse();
    }

    export function filter<T>(source: Iterable<T>, callbackfn: { (value: T, index: number, iterable: Iterable<T>): boolean }, thisArg?: any): T[] {
        let result: T[] = [];
        let iterator: Iterator<T> = source[Symbol.iterator]();
        let ir: IteratorResult<T> = iterator.next();
        let index: number = 0;
        if (typeof (thisArg) === 'undefined')
            while (!ir.done) {
                if (callbackfn(ir.value, index++, source))
                    result.push(ir.value);
                ir = iterator.next();
            }
        else
            while (!ir.done) {
                if (callbackfn.call(thisArg, ir.value, index++, source))
                    result.push(ir.value);
                ir = iterator.next();
            }
        return result;
    }

    export function first<T>(source: Iterable<T>, callbackfn: (value: T, index: number, iterable: Iterable<T>) => boolean, thisArg?: any): T | undefined {
        let iterator: Iterator<T> = source[Symbol.iterator]();
        let r: IteratorResult<T> = iterator.next();
        let index: number = 0;
        if (typeof (thisArg) !== 'undefined')
            while (!r.done) {
                if (callbackfn.call(thisArg, r.value, index++, source))
                    return r.value;
                r = iterator.next();
            }
        else
            while (!r.done) {
                if (callbackfn(r.value, index, source))
                    return r.value;
                r = iterator.next();
            }
    }

    export function indexOf<T>(source: Iterable<T>, callbackfn: (value: T, index: number, iterable: Iterable<T>) => boolean, thisArg?: any): number {
        let iterator: Iterator<T> = source[Symbol.iterator]();
        let r: IteratorResult<T> = iterator.next();
        let index: number = 0;
        if (typeof (thisArg) !== 'undefined')
            while (!r.done) {
                if (callbackfn.call(thisArg, r.value, index++, source))
                    return index;
                r = iterator.next();
            }
        else
            while (!r.done) {
                if (callbackfn(r.value, index, source))
                    return index;
                r = iterator.next();
            }
    }

    export function last<T>(source: Iterable<T>, callbackfn: (value: T, index: number, iterable: Iterable<T>) => boolean, thisArg?: any): T | undefined {
        let iterator: Iterator<T> = source[Symbol.iterator]();
        let r: IteratorResult<T> = iterator.next();
        let result: T;
        let index: number = 0;
        if (typeof (thisArg) !== 'undefined')
            while (!r.done) {
                if (callbackfn.call(thisArg, r.value, index++, source))
                    result = r.value;
                r = iterator.next();
            }
        else
            while (!r.done) {
                if (callbackfn(r.value, index++, source))
                    result = r.value;
                r = iterator.next();
            }
        return result;
    }

    export function join<T>(source: Iterable<T>, separator?: string): string {
        if (Array.isArray(source))
            return source.join(separator);
        let iterator: Iterator<T> = source[Symbol.iterator]();
        let r: IteratorResult<T> = iterator.next();
        let result: T[] = [];
        let index: number = 0;
        while (!r.done) {
            result.push(r.value);
            r = iterator.next();
        }
        return result.join(separator);
    }

    export function reverse<T>(source: Iterable<T>): T[] {
        let result: T[] = [];
        let iterator: Iterator<T> = source[Symbol.iterator]();
        let ir: IteratorResult<T> = iterator.next();
        let index: number = 0;
        while (!ir.done) {
            result.unshift(ir.value);
            ir = iterator.next();
        }
        return result;
    }

    export function indexOfAny(value: string, position: number, ...searchString: string[]);
    export function indexOfAny(value: string, ...searchString: string[])
    export function indexOfAny(value: string, position: number | string, ...searchString: string[]) {
        let result: number;

        if (typeof (position) === 'number') {
            result = -1;
            searchString.forEach((s: string) => {
                if (s.length > 0) {
                    let i: number = value.indexOf(s, position);
                    if (i > -1 && (result < 0 || i < result))
                        result = i;
                }
            });
        } else {
            searchString.forEach((s: string) => {
                if (s.length > 0) {
                    let i: number = value.indexOf(s);
                    if (i > -1 && (result < 0 || i < result))
                        result = i;
                }
            });
        }

        return result;
    }

    export function map<TSource, TResult>(source: Iterable<TSource>, callbackfn: (value: TSource, index: number, iterable: Iterable<TSource>) => TResult, thisArg?: any): TResult[] {
        let iterator: Iterator<TSource> = source[Symbol.iterator]();
        let r: IteratorResult<TSource> = iterator.next();
        let result: TResult[] = [];
        let index: number = 0;
        if (typeof (thisArg) !== 'undefined')
            while (!r.done) {
                result.push(callbackfn.call(thisArg, r.value, index++, source));
                r = iterator.next();
            }
        else
            while (!r.done) {
                result.push(callbackfn(r.value, index++, source));
                r = iterator.next();
            }
        return result;
    }

    export function every<T>(source: Iterable<T>, callbackfn: (value: T, index: number, iterable: Iterable<T>) => boolean, thisArg?: any): boolean {
        let iterator: Iterator<T> = source[Symbol.iterator]();
        let r: IteratorResult<T> = iterator.next();
        let index: number = 0;
        if (typeof (thisArg) !== 'undefined')
            while (!r.done) {
                if (!callbackfn.call(thisArg, r.value, index++, source))
                    return false;
                r = iterator.next();
            }
        else
            while (!r.done) {
                if (!callbackfn(r.value, index++, source))
                    return false;
                r = iterator.next();
            }
        return true;
    }

    export function some<T>(source: Iterable<T>, callbackfn: (value: T, index: number, iterable: Iterable<T>) => boolean, thisArg?: any): boolean {
        let iterator: Iterator<T> = source[Symbol.iterator]();
        let r: IteratorResult<T> = iterator.next();
        let index: number = 0;
        if (typeof (thisArg) !== 'undefined')
            while (!r.done) {
                if (callbackfn.call(thisArg, r.value, index++, source))
                    return true;
                r = iterator.next();
            }
        else
            while (!r.done) {
                if (callbackfn(r.value, index++, source))
                    return true;
                r = iterator.next();
            }
        return true;
    }

    export function forEach<T>(source: Iterable<T>, callbackfn: (value: T, index: number, iterable: Iterable<T>) => void, thisArg?: any) {
        let iterator: Iterator<T> = source[Symbol.iterator]();
        let r: IteratorResult<T> = iterator.next();
        let index: number = 0;
        if (typeof (thisArg) !== 'undefined')
            while (!r.done) {
                callbackfn.call(thisArg, r.value, index++, source);
                r = iterator.next();
            }
        else
            while (!r.done) {
                callbackfn(r.value, index++, source);
                r = iterator.next();
            }
    }

    export function reduce<TSource, TResult>(source: Iterable<TSource>, callbackfn: (previousValue: TResult, currentValue: TSource, currentIndex: number, iterable: Iterable<TSource>) => TResult, initialValue: TResult): TResult {
        let iterator: Iterator<TSource> = source[Symbol.iterator]();
        let r: IteratorResult<TSource> = iterator.next();
        let result: TResult = initialValue;
        let index: number = 0;
        while (!r.done) {
            result = callbackfn(result, r.value, index++, source);
            r = iterator.next();
        }
        return result;
    }

    export function unique<T>(source: Iterable<T>, callbackfn?: (x: T, y: T) => boolean, thisArg?: any): T[] {
        if (typeof (callbackfn) !== 'function')
            callbackfn = function (x: T, y: T) { return x === y; }
        let iterator: Iterator<T> = source[Symbol.iterator]();
        let r: IteratorResult<T> = iterator.next();
        let result: T[] = [];
        if (!r.done) {
            result.push(r.value);
            r = iterator.next();
            let index: number = 0;
            if (typeof (thisArg) !== 'undefined')
                while (!r.done) {
                    if (!result.some((value: T) => callbackfn.call(thisArg, r.value, value)))
                        result.push(r.value);
                    r = iterator.next();
                }
            else
                while (!r.done) {
                    if (!result.some((value: T) => callbackfn(r.value, value)))
                        result.push(r.value);
                    r = iterator.next();
                }
        }
        return result;
    }

    export function areSequencesEqual<T>(source: Iterable<T> | null | undefined, target: Iterable<T> | null | undefined): boolean;
    export function areSequencesEqual<T>(source: Iterable<T> | null | undefined, target: Iterable<T> | null | undefined, callbackfn: (x: T, y: T, index: number) => boolean, thisArg?: any): boolean;
    export function areSequencesEqual<T>(source: Iterable<T> | null | undefined, target: Iterable<T> | null | undefined, callbackfn?: (x: any, y: any, index: number) => boolean, thisArg?: any): boolean {
        if (typeof (source) != typeof (target) || (Array.isArray(source) && Array.isArray(target) && source.length != target.length))
            return false;
        let iteratorX: Iterator<T> = source[Symbol.iterator]();
        let iteratorY: Iterator<T> = target[Symbol.iterator]();
        let resultX: IteratorResult<T> = iteratorX.next();
        let resultY: IteratorResult<T> = iteratorY.next();

        if (typeof (callbackfn) !== 'function')
            while (!resultX.done) {
                if (resultY.done || resultX.value !== resultY.value)
                    return false;
                resultX = iteratorX.next();
                resultY = iteratorY.next();
            }
        else if (typeof (thisArg) === 'undefined') {
            let index: number = -1;
            while (!resultX.done) {
                if (resultY.done || !callbackfn.call(thisArg, resultX.value, resultY.value, ++index))
                    return false;
                resultX = iteratorX.next();
                resultY = iteratorY.next();
            }
        } else {
            let index: number = -1;
            while (!resultX.done) {
                if (resultY.done || !callbackfn(resultX.value, resultY.value, ++index))
                    return false;
                resultX = iteratorX.next();
                resultY = iteratorY.next();
            }
        }
        return resultY.done;
    }

    export function isEventPropagationStoppedFunc(event: ng.IAngularEvent | BaseJQueryEventObject | null | undefined): boolean {
        return typeof event === "object" && event !== null && typeof (<BaseJQueryEventObject>event).isPropagationStopped === "function" && (<BaseJQueryEventObject>event).isPropagationStopped();
    }

    export function preventEventDefault(event: ng.IAngularEvent | BaseJQueryEventObject | null | undefined, stopPropogation?: boolean): void {
        if (typeof event !== "object" || event === null)
            return;
        if (!event.defaultPrevented)
            event.preventDefault();
        if (stopPropogation === true && !isEventPropagationStoppedFunc(event))
            event.stopPropagation();
    }

    export function stopEventPropagation(event: ng.IAngularEvent | BaseJQueryEventObject | null | undefined, preventDefault?: boolean): void {
        if (typeof event !== "object" || event === null)
            return;
        if (!isEventPropagationStoppedFunc(event))
            event.stopPropagation();
        if (preventDefault === true && !event.defaultPrevented)
            event.preventDefault();
    }

    export function makeDirectoryUrl(url: URL | string): URL | string {
        if (typeof url === "string") {
            let u: URL | null | undefined;
            try { u = new URL(url); } catch { u = null; }
            if (typeof u === "object" && u !== null)
                url = u;
            else {
                try { u = new URL(url, "http://tempuri.org"); } catch { u = null; }
                if (typeof u === "object" && u !== null)
                    return (u.pathname.endsWith('/')) ? u.pathname : u.pathname + "/";
                let index: number = url.indexOf('#');
                if (index > -1)
                    url = url.substr(0, index);
                index = url.indexOf('?');
                if (index > -1)
                    url = url.substr(0, index);
                return (url.endsWith('/')) ? url : url + '/';
            }
        } else if (typeof url !== "object" || url === null)
            return "/";

        if ((typeof url.hash !== "string" || url.hash.length == 0) && (typeof url.search !== "string" || url.search.length == 0) && url.pathname.endsWith('/'))
            return url;
        url = new URL(url.href);
        url.hash = url.search = '';
        if (!url.pathname.endsWith('/'))
            url.pathname += '/';
        return url;
    }

    /**
     * Represents status HTTP response status codes.
     *
     * @enum
     * @description These were derrived from the following authoritative source: {@link https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html}.
     */
    export enum HttpResponseStatusCode {
        /**
         * The client SHOULD continue with its request.
         * 
         * @member HttpResponseStatusCode
         * @description This interim response is used to inform the client that the initial part of the request has been received and has not yet been rejected by the server. The client SHOULD continue by sending the remainder of the request or, if the request has already been completed, ignore this response.
         */
        continue = 100,

        /**
         * The server understands and is willing to comply with the client's request for a change in the application protocol.
         *
         * @member HttpResponseStatusCode
         * @description The server understands and is willing to comply with the client's request, via the Upgrade Message Header field, for a change in the application protocol being used on this connection. The server will switch protocols to those defined by the response's Upgrade header field immediately after the empty line which terminates the 101 response.
         */
        switchingProtocols = 101,

        /**
         * The request has succeeded.
         *
         * @member HttpResponseStatusCode
         */
        ok = 200,

        /**
         * The request has been fulfilled and resulted in a new resource being created.
         *
         * @member HttpResponseStatusCode
         * @description The newly created resource can be referenced by the URI(s) returned in the entity of the response, with the most specific URI for the resource given by a Location header field. The response SHOULD include an entity containing a list of resource characteristics and location(s) from which the user or user agent can choose the one most appropriate. The entity format is specified by the media type given in the Content-Type header field.
         */
        created = 201,

        /**
         * The request has been accepted for processing, but the processing has not been completed.
         *
         * @member HttpResponseStatusCode
         * @description The request might or might not eventually be acted upon, as it might be disallowed when processing actually takes place. There is no facility for re-sending a status code from an asynchronous operation such as this.
         */
        accepted = 202,

        /**
         * The returned metainformation in the entity-header is not the definitive set as available from the origin server, but is gathered from a local or a third-party copy
         *
         * @member HttpResponseStatusCode
         * @description 
         */
        nonAuthoritativeInformation = 203,

        /**
         * The server has fulfilled the request but does not need to return an entity-body, and might want to return updated metainformation.
         *
         * @member HttpResponseStatusCode
         * @description The response MAY include new or updated metainformation in the form of entity-headers, which if present SHOULD be associated with the requested variant.
         */
        noContent = 204,

        /**
         * The server has fulfilled the request and the user agent SHOULD reset the document view which caused the request to be sent.
         *
         * @member HttpResponseStatusCode
         */
        resetContent = 205,

        /**
         * The server has fulfilled the partial GET request for the resource.
         *
         * @member HttpResponseStatusCode
         */
        partialContent = 206,

        /**
         * Multiple resources correspond to the request.
         *
         * @member HttpResponseStatusCode
         * @description  The requested resource corresponds to any one of a set of representations, each with its own specific location, and agent- driven negotiation information (section 12) is being provided so that the user (or user agent) can select a preferred representation and redirect its request to that location.
         */
        multipleChoices = 300,

        /**
         * The requested resource is permanently located at another URI, usually provided in the Location response field.
         *
         * @member HttpResponseStatusCode
         * @description The requested resource has been assigned a new permanent URI and any future references to this resource SHOULD use one of the returned URIs. Clients with link editing capabilities ought to automatically re-link references to the Request-URI to one or more of the new references returned by the server, where possible.
         */
        movedPermanently = 301,

        /**
         * The requested resource is temporarily located at another URI, usually provided in the Location response field.
         *
         * @member HttpResponseStatusCode
         * @description The requested resource resides temporarily under a different URI. Since the redirection might be altered on occasion, the client SHOULD continue to use the Request-URI for future requests. This response is only cacheable if indicated by a Cache-Control or Expires header field.
         */
        found = 302,

        /**
         * The response to the request can be found under a different URI, usually provided in the Location response field.
         *
         * @member HttpResponseStatusCode
         * @description The response to the request can be found under a different URI and SHOULD be retrieved using a GET method on that resource. This method exists primarily to allow the output of a POST-activated script to redirect the user agent to a selected resource. The new URI is not a substitute reference for the originally requested resource.
         */
        seeOther = 303,

        /**
         * The requested resource has not been modified.
         *
         * @member HttpResponseStatusCode
         * @description This response code usually results from a conditional request; otherwise, the server should not send this response.
         */
        notModified = 304,

        /**
         * The requested resource MUST be accessed through the proxy given by the Location field.
         *
         * @member HttpResponseStatusCode
         */
        useProxy = 305,

        /**
         * (unused redirection response code)
         *
         * @member HttpResponseStatusCode
         * @description This status code was used in a previous version of the specification, is no longer used, and the code is reserved.
         */
        unusedRedirection = 306,

        /**
         * The requested resource resides temporarily under a different URI.
         *
         * @member HttpResponseStatusCode
         * @description Since the redirection MAY be altered on occasion, the client SHOULD continue to use the Request-URI for future requests. This response is only cacheable if indicated by a Cache-Control or Expires header field.
         */
        temporaryRedirect = 307,

        /**
         * The request could not be understood by the server due to malformed syntax.
         *
         * @member HttpResponseStatusCode
         */
        badRequest = 400,

        /**
         * The request requires user authentication.
         *
         * @member HttpResponseStatusCode
         * @description The response MUST include a WWW-Authenticate header field (section 14.47) containing a challenge applicable to the requested resource. The client MAY repeat the request with a suitable Authorization header field (section 14.8). If the request already included Authorization credentials, then the 401 response indicates that authorization has been refused for those credentials.
         */
        unauthorized = 401,

        /**
         * This code is reserved for future use.
         *
         * @member HttpResponseStatusCode
         */
        paymentRequired = 402,

        /**
         * The server understood the request, but is refusing to fulfill it.
         *
         * @member HttpResponseStatusCode
         * @description Authorization will not help and the request SHOULD NOT be repeated.
         */
        forbidden = 403,

        /**
         * The server has not found anything matching the Request-URI.
         *
         * @member HttpResponseStatusCode
         */
        notFound = 404,

        /**
         * The method specified in the Request-Line is not allowed for the resource identified by the Request-URI.
         *
         * @member HttpResponseStatusCode
         * @description The response will include an Allow header containing a list of valid methods for the requested resource.
         */
        methodNotAllowed = 405,

        /**
         * The resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request.
         *
         * @member HttpResponseStatusCode
         */
        notAcceptable = 406,

        /**
         * This code is similar to 401 (Unauthorized), but indicates that the client must first authenticate itself with the proxy.
         *
         * @member HttpResponseStatusCode
         * @description The proxy will return a Proxy-Authenticate header field containing a challenge applicable to the proxy for the requested resource. The client MAY repeat the request with a suitable Proxy-Authorization header field.
         */
        proxyAuthenticationRequired = 407,

        /**
         * The client did not produce a request within the time that the server was prepared to wait.
         *
         * @member HttpResponseStatusCode
         */
        requestTimeout = 408,

        /**
         * The request could not be completed due to a conflict with the current state of the resource.
         *
         * @member HttpResponseStatusCode
         */
        conflict = 409,

        /**
         * The requested resource is no longer available at the server and no forwarding address is known.
         *
         * @member HttpResponseStatusCode
         */
        gone = 410,

        /**
         * The server refuses to accept the request without a defined Content-Length.
         *
         * @member HttpResponseStatusCode
         */
        lengthRequired = 411,

        /**
         * The precondition given in one or more of the request-header fields evaluated to false when it was tested on the server.
         *
         * @member HttpResponseStatusCode
         */
        preconditionFailed = 412,

        /**
         * The server is refusing to process a request because the request entity is larger than the server is willing or able to process.
         *
         * @member HttpResponseStatusCode
         * @description The server MAY close the connection to prevent the client from continuing the request.
         */
        requestEntityTooLarge = 413,

        /**
         * The server is refusing to service the request because the Request-URI is longer than the server is willing to interpret.
         *
         * @member HttpResponseStatusCode
         */
        requestUriTooLong = 414,

        /**
         * The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method.
         *
         * @member HttpResponseStatusCode
         */
        unsupportedMediaType = 415,

        /**
         * Range specified in request not viable.
         *
         * @member HttpResponseStatusCode
         * @description Request included a Range request-header field, and none of the range-specifier values in this field overlap the current extent of the selected resource, and the request did not include an If-Range request-header field.
         */
        requestedRangeNotSatisfiable = 416,

        /**
         * The expectation given in an Expect request-header field could not be met.
         *
         * @member HttpResponseStatusCode
         * @description The expectation given in an Expect request-header field could not be met by this server, or, if the server is a proxy, the server has unambiguous evidence that the request could not be met by the next-hop server.
         */
        expectationFailed = 417,

        /**
         * The server encountered an unexpected condition which prevented it from fulfilling the request.
         *
         * @member HttpResponseStatusCode
         */
        internalServerError = 500,

        /**
         * The server does not support the functionality required to fulfill the request.
         *
         * @member HttpResponseStatusCode
         */
        notImplemented = 501,

        /**
         * The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.
         *
         * @member HttpResponseStatusCode
         */
        badGateway = 502,

        /**
         * The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.
         *
         * @member HttpResponseStatusCode
         */
        serviceUnavailable = 503,

        /**
         * The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.
         *
         * @member HttpResponseStatusCode
         * @description The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server specified by the URI (e.g. HTTP, FTP, LDAP) or some other auxiliary server (e.g. DNS) it needed to access in attempting to complete the request.
         */
        gatewayTimeout = 504,

        /**
         * The server does not support, or refuses to support, the HTTP protocol version that was used in the request message.
         *
         * @member HttpResponseStatusCode
         */
        httpVersionNotSupported = 505
    }

    export enum HttpResponseStatusClass {
        informational = 1,
        successful = 2,
        redirect = 3,
        clientError = 4,
        serverError = 5,
        NOT_NUMBER = -1,
        OUT_OF_RANGE = -2
    }

    enum HttpResponseStatusRanges {
        MINRANGE = 100,
        MINRANGE_INFORMATIONAL = 100,
        MAXVALUE_INFORMATIONAL_EXCL = 102,
        MAXRANGE_INFORMATIONAL_EXCL = 200,
        MINRANGE_SUCCESSFUL = 200,
        MAXVALUE_SUCCESSFUL_EXCL = 207,
        MAXRANGE_SUCCESSFUL_EXCL = 300,
        MINRANGE_REDIRECT = 300,
        MAXVALUE_REDIRECT_EXCL = 308,
        MAXRANGE_REDIRECT_EXCL = 400,
        MINRANGE_CLIENT_ERROR = 400,
        MAXVALUE_CLIENT_ERROR_EXCL = 418,
        MAXRANGE_CLIENT_ERROR_EXCL = 500,
        MINRANGE_SERVER_ERROR = 500,
        MAXVALUE_SERVER_ERROR_EXCL = 506,
        MAXRANGE_SERVER_ERROR_EXCL = 600,
        MAXRANGE_EXCL = 600
    }

    function __toHttpResponseStatusValueInRange(response: number): number | undefined {
        if (response >= HttpResponseStatusRanges.MINRANGE && response < HttpResponseStatusRanges.MAXRANGE_EXCL)
            return Math.floor(response);
    }

    function __toHttpResponseStatusCode(response: number): HttpResponseStatusCode | undefined {
        if (!isNaN(response) && response >= HttpResponseStatusRanges.MINRANGE_INFORMATIONAL) {
            if (response < HttpResponseStatusRanges.MAXRANGE_INFORMATIONAL_EXCL)
                return <HttpResponseStatusCode>Math.floor(response);
            if (response >= HttpResponseStatusRanges.MINRANGE_SUCCESSFUL) {
                if (response < HttpResponseStatusRanges.MAXVALUE_SUCCESSFUL_EXCL)
                    return <HttpResponseStatusCode>Math.floor(response);
                if (response >= HttpResponseStatusRanges.MINRANGE_REDIRECT) {
                    if (response < HttpResponseStatusRanges.MAXVALUE_REDIRECT_EXCL)
                        return <HttpResponseStatusCode>Math.floor(response);
                    if ((response >= HttpResponseStatusRanges.MINRANGE_SERVER_ERROR) ? response < HttpResponseStatusRanges.MAXVALUE_SERVER_ERROR_EXCL :
                            response >= HttpResponseStatusRanges.MINRANGE_CLIENT_ERROR && response < HttpResponseStatusRanges.MAXVALUE_CLIENT_ERROR_EXCL)
                        return <HttpResponseStatusCode>Math.floor(response);
                }
            }
        }
    }

    export function toHttpResponseStatusClass(response: number | ng.IHttpPromiseCallbackArg<any> | null | undefined): HttpResponseStatusClass {
        if (typeof response == "number") {
            if (isNaN(response))
                return HttpResponseStatusClass.NOT_NUMBER;
            response = __toHttpResponseStatusValueInRange(response);
        }
        else if (typeof response === "object" && response !== null && typeof response.status === "number") {
            if (isNaN(response.status))
                return HttpResponseStatusClass.NOT_NUMBER;
            response = __toHttpResponseStatusValueInRange(response.status);
        } else
            return HttpResponseStatusClass.NOT_NUMBER;
        
        return (typeof response === "number") ? <HttpResponseStatusClass>Math.floor(<number>response / 100.0) : HttpResponseStatusClass.OUT_OF_RANGE;
    }

    export function toHttpResponseStatusCode(response: number | ng.IHttpPromiseCallbackArg<any> | null | undefined): HttpResponseStatusCode | undefined {
        if (typeof response == "number") {
            if (!isNaN(response))
                return <HttpResponseStatusCode>__toHttpResponseStatusCode(response);
        }
        else if (typeof response === "object" && response !== null && typeof response.status === "number") {
            if (isNaN(response.status))
                return <HttpResponseStatusCode>__toHttpResponseStatusCode(response.status);
        }
    }

    export function toHttpResponseStatusMessage(response: number | ng.IHttpPromiseCallbackArg<any> | null | undefined): string {
        if (typeof response == "number") {
            if (isNaN(response))
                return "#NaN";
        }
        else if (typeof response === "object" && response !== null) {
            if (typeof response.statusText === "string" && response.statusText.trim().length > 0)
                return response.statusText;
            if (typeof response.status !== "number")
                return "#Err";
            if (isNaN(response.status))
                return "#NaN";
            response = response.status;
        } else
            return "#Err";

        switch (Math.floor(response)) {
            case HttpResponseStatusCode.continue:
                return "Continue";
            case HttpResponseStatusCode.switchingProtocols:
                return "Switching Protocols";
            case HttpResponseStatusCode.ok:
                return "OK";
            case HttpResponseStatusCode.created:
                return "Created";
            case HttpResponseStatusCode.accepted:
                return "accepted";
            case HttpResponseStatusCode.nonAuthoritativeInformation:
                return "Non-Authoritative Information";
            case HttpResponseStatusCode.noContent:
                return "No Content";
            case HttpResponseStatusCode.resetContent:
                return "Reset Content";
            case HttpResponseStatusCode.partialContent:
                return "Partial Content";
            case HttpResponseStatusCode.multipleChoices:
                return "Multiple Choices";
            case HttpResponseStatusCode.movedPermanently:
                return "Moved Permanently";
            case HttpResponseStatusCode.found:
                return "Found";
            case HttpResponseStatusCode.seeOther:
                return "See Other";
            case HttpResponseStatusCode.notModified:
                return "Not Modified";
            case HttpResponseStatusCode.useProxy:
                return "Use Proxy";
            case HttpResponseStatusCode.unusedRedirection:
                return "Unused";
            case HttpResponseStatusCode.temporaryRedirect:
                return "Temporary Redirect";
            case HttpResponseStatusCode.badRequest:
                return "Bad Request";
            case HttpResponseStatusCode.unauthorized:
                return "Unauthorized";
            case HttpResponseStatusCode.paymentRequired:
                return "Payment Required";
            case HttpResponseStatusCode.forbidden:
                return "Forbidden";
            case HttpResponseStatusCode.notFound:
                return "Not Found";
            case HttpResponseStatusCode.methodNotAllowed:
                return "Method Not Allowed";
            case HttpResponseStatusCode.notAcceptable:
                return "Not Acceptable";
            case HttpResponseStatusCode.proxyAuthenticationRequired:
                return "Proxy Authentication Required";
            case HttpResponseStatusCode.requestTimeout:
                return "Request Timeout";
            case HttpResponseStatusCode.conflict:
                return "Conflict";
            case HttpResponseStatusCode.gone:
                return "Gone";
            case HttpResponseStatusCode.lengthRequired:
                return "Length Required";
            case HttpResponseStatusCode.preconditionFailed:
                return "Precondition Failed";
            case HttpResponseStatusCode.requestEntityTooLarge:
                return "Request Entity Too Large";
            case HttpResponseStatusCode.requestUriTooLong:
                return "Request Uri Too Long";
            case HttpResponseStatusCode.unsupportedMediaType:
                return "Unsupported Media Type";
            case HttpResponseStatusCode.requestedRangeNotSatisfiable:
                return "Requested Range Not Satisfiable";
            case HttpResponseStatusCode.expectationFailed:
                return "Expectation Failed";
            case HttpResponseStatusCode.internalServerError:
                return "Internal Server Error";
            case HttpResponseStatusCode.notImplemented:
                return "Not Implemented";
            case HttpResponseStatusCode.badGateway:
                return "Bad Gateway";
            case HttpResponseStatusCode.serviceUnavailable:
                return "Service Unavailable";
            case HttpResponseStatusCode.gatewayTimeout:
                return "Gateway Timeout";
            case HttpResponseStatusCode.httpVersionNotSupported:
                return "Http Version Not Supported";
        }
        if (response >= HttpResponseStatusRanges.MINRANGE_INFORMATIONAL) {
            if (response < HttpResponseStatusRanges.MAXRANGE_INFORMATIONAL_EXCL)
                return "Informational";
            if (response < HttpResponseStatusRanges.MAXVALUE_SUCCESSFUL_EXCL)
                return "Success";
            if (response < HttpResponseStatusRanges.MAXVALUE_REDIRECT_EXCL)
                return "Redirect";
            if (response < HttpResponseStatusRanges.MAXRANGE_CLIENT_ERROR_EXCL)
                return "Client Error";
            if (response < HttpResponseStatusRanges.MAXRANGE_SERVER_ERROR_EXCL)
                return "Server Error";
        }
        return "Unknown";
    }

    /**
     * Indicates whether the response is provisional, consisting only of the Status-Line and optional headers, and is terminated by an empty line.
     * 
     * @param {number | ng.IHttpPromiseCallbackArg<any>} response - The response code or response object.
     * @returns {boolean} True if the response is provisional; otherwise, false.
     */
    export function isInformationalHttpResponse(response: number | ng.IHttpPromiseCallbackArg<any> | null | undefined): boolean {
        return (typeof response === "number" || (typeof response == "object" && response !== null && typeof (response = response.status) === "number")) && !isNaN(response) &&
            response >= HttpResponseStatusRanges.MINRANGE_INFORMATIONAL && response < HttpResponseStatusRanges.MAXRANGE_INFORMATIONAL_EXCL;
    }

    /**
     * Indicates whether the client's request was successfully received, understood, and accepted.
     * 
     * @param {number | ng.IHttpPromiseCallbackArg<any>} response - The response code or response object.
     * @returns {boolean} True if the client's request was successful; otherwise, false.
     */
    export function isSuccessfulHttpResponse(response: number | ng.IHttpPromiseCallbackArg<any> | null | undefined): boolean {
        return (typeof response === "number" || (typeof response == "object" && response !== null && typeof (response = response.status) === "number")) && !isNaN(response) &&
            response >= HttpResponseStatusRanges.MINRANGE_SUCCESSFUL && response < HttpResponseStatusRanges.MAXRANGE_SUCCESSFUL_EXCL;
    }

    /**
     * Indicates whether further action needs to be taken by the user agent in order to fulfill the request.
     * 
     * @param {number | ng.IHttpPromiseCallbackArg<any>} response - The response code or response object.
     * @returns {boolean} True if further action needs to be taken by the user agent in order to fulfill the request; otherwise, false.
     */
    export function isRedirectionHttpResponse(response: number | ng.IHttpPromiseCallbackArg<any> | null | undefined): boolean {
        return (typeof response === "number" || (typeof response == "object" && response !== null && typeof (response = response.status) === "number")) && !isNaN(response) &&
            response >= HttpResponseStatusRanges.MINRANGE_REDIRECT && response < HttpResponseStatusRanges.MAXRANGE_REDIRECT_EXCL;
    }

    /**
     * Indicates whether there was an error in the client request.
     * 
     * @param {number | ng.IHttpPromiseCallbackArg<any>} response - The response code or response object.
     * @returns {boolean} True if there was an error in the client request; otherwise, false.
     */
    export function isClientErrorHttpResponse(response: number | ng.IHttpPromiseCallbackArg<any> | null | undefined): boolean {
        return (typeof response === "number" || (typeof response == "object" && response !== null && typeof (response = response.status) === "number")) && !isNaN(response) &&
            response >= HttpResponseStatusRanges.MINRANGE_CLIENT_ERROR && response < HttpResponseStatusRanges.MAXRANGE_CLIENT_ERROR_EXCL;
    }

    /**
     * Indicates whether the server encountered an unexpected condition which prevented it from fulfilling the request.
     * 
     * @param {number | ng.IHttpPromiseCallbackArg<any>} response - The response code or response object.
     * @returns {boolean} True if the server encountered an unexpected condition which prevented it from fulfilling the request; otherwise, false.
     */
    export function isServerErrorHttpResponse(response: number | ng.IHttpPromiseCallbackArg<any> | null | undefined): boolean {
        return (typeof response === "number" || (typeof response == "object" && response !== null && typeof (response = response.status) === "number")) && !isNaN(response) &&
            response >= HttpResponseStatusRanges.MINRANGE_SERVER_ERROR && response < HttpResponseStatusRanges.MAXRANGE_SERVER_ERROR_EXCL;
    }

    export function logResponse(response: number | ng.IHttpPromiseCallbackArg<any>, logService: ng.ILogService, message: string, force: boolean): void;
    export function logResponse(response: number | ng.IHttpPromiseCallbackArg<any>, logService: ng.ILogService, messageOrForce?: string | boolean): void;
    export function logResponse(response: number | ng.IHttpPromiseCallbackArg<any>, logService: ng.ILogService, messageOrForce?: string | boolean, force?: boolean): void {
        if (((arguments.length > 3) ? force : messageOrForce) !== true && isSuccessfulHttpResponse(response))
            return;
        let outputObj: { [key: string]: any } = {};
        if (typeof messageOrForce === "string")
            outputObj.message = messageOrForce;
        if (typeof response === "number") {
            outputObj.statusCode = response;
            outputObj.status = toHttpResponseStatusMessage(response);
        } else {
            if (typeof response !== "object" || response === null)
                return;
            outputObj.statusCode = (typeof response.status !== "number") ? NaN : response.status;
            outputObj.status = toHttpResponseStatusMessage(response);
            if (typeof response.headers === "object" && response.headers !== null)
                outputObj.headers = response.headers;
        }
        if (toHttpResponseStatusCode(outputObj.statusCode) === HttpResponseStatusCode.noContent)
            logService.warn(angular.toJson(outputObj));
        else if (isSuccessfulHttpResponse(outputObj.statusCode) || isInformationalHttpResponse(outputObj.statusCode))
            logService.info(angular.toJson(outputObj));
        else
            logService.error(angular.toJson(outputObj));
    }

    export const uriParseRegex_beforeQuery: RegExp = /^(([^\\\/@:]*)(:[\\\/]{0,2})((?=[^\\\/@:]*(?::[^\\\/@:]*)?@)([^\\\/@:]*)(:[^\\\/@:]*)?@)?([^\\\/@:]*)(?:(?=:\d*(?:[\\\/:]|$)):(\d*))?(?=[\\\/:]|$))?(.+)?$/;

    export const uriParseRegex: RegExp = /^(([^\\\/@:\?#]*)(:[\\\/]{0,2})((?=[^\\\/@:\?#]*(?::[^\\\/@:\?#]*)?@)([^\\\/@:\?#]*)(:[^\\\/@:\?#]*)?@)?([^\\\/@:\?#]*)(?:(?=:\d*(?:[\\\/:]|$)):(\d*))?(?=[\\\/:]|$))?([^\?#]+)?(\?([^#]+)?)?(#(.+)?)?$/;

    export enum uriParseGroup {
        all = 0,
        origin = 1,
        schemeName = 2,
        schemeSeparator = 3,
        userInfo = 4,
        username = 5,
        password = 6,
        hostname = 7,
        portnumber = 8,
        path = 9,
        search = 10,
        queryString = 11,
        hash = 12,
        fragment = 13
    }

    export interface IParsedUriString {
        source: string;
        origin?: {
            value: string;
            scheme: {
                name: string;
                separator: string;
            }
            userInfo?: {
                value: string;
                name: string;
                password?: string;
            }
            host: {
                value: string;
                name: string;
                portnumber?: string;
            }
        };
        path: string;
        queryString?: string;
        fragment?: string;
    }

    export function parseUriString(source: string): IParsedUriString {
        if (isNilOrEmpty(source))
            return { source: source, path: source };
        let match: RegExpExecArray = uriParseRegex.exec(source);
        let result: IParsedUriString;
        if (isNilOrEmpty(match)) {
            result = { source: source, path: source };
            let i: number = source.indexOf('#');
            if (i > -1) {
                result.fragment = source.substr(i + 1);
                result.source = source = source.substr(0, i);
            }
            i = source.indexOf('?');
            if (i > -1) {
                result.queryString = source.substr(i + 1);
                result.source = source.substr(0, i);
            }
        } else {
            result = { source: source, path: (isNil(match[uriParseGroup.path])) ? '' : match[uriParseGroup.path] };
            if (notNil(match[uriParseGroup.origin])) {
                let name: string = (isNil(match[uriParseGroup.hostname])) ? '' : match[uriParseGroup.hostname];
                result.origin = {
                    value: match[uriParseGroup.origin],
                    scheme: {
                        name: match[uriParseGroup.schemeName],
                        separator: match[uriParseGroup.schemeSeparator]
                    },
                    host: { value: name, name: name }
                };
                if (notNil(match[uriParseGroup.userInfo])) {
                    result.origin.userInfo = { value: match[uriParseGroup.userInfo], name: (isNil(match[uriParseGroup.username])) ? '' : match[uriParseGroup.username] };
                    if (notNil(match[uriParseGroup.password]))
                        result.origin.userInfo.password = match[uriParseGroup.password].substr(1);
                }
                if (notNil(match[uriParseGroup.portnumber])) {
                    result.origin.host.value += match[uriParseGroup.portnumber];
                    result.origin.host.portnumber = match[uriParseGroup.portnumber].substr(1);
                }
            }
            result.path = (isNil(match[uriParseGroup.path])) ? '' : match[uriParseGroup.path];
            if (notNil(match[uriParseGroup.search]))
                result.queryString = (isNil(match[uriParseGroup.queryString])) ? '' : match[uriParseGroup.queryString];
            if (notNil(match[uriParseGroup.hash]))
                result.fragment = (isNil(match[uriParseGroup.fragment])) ? '' : match[uriParseGroup.fragment];
        }
        return result;
    }
}
