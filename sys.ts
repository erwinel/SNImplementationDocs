namespace sys {
    let urlParseRe: RegExp = /^(([^@:/?#]*):(?:\/\/((?:([^@:/?#]*)(?::([^@:/?#]*))?@)?([^:/?#]*)(?::(\d+(?=[:/?#]|$)))?))?)?(([:/]+(?=(?:[^?#:/]+[:/]*)?(?:\?|\#|$))|[:/]*[^:/?#]+(?=[:/]+[^?#])(?:[:/]+[^:/?#]+(?=[:/]+[^?#]))*)?[:/]*((\.*(?:\.[^.:/?#]*(?=\.)|[^.:/?#]+)*)(?:\.([^.:/?#]*))?)[:/]*)(?:\?([^#]*))?(?:\#(.*))?$/;
    let trimRightRe: RegExp = /^((\s*\S+)(\s+\S+)*)\s*$/;
    let trimLeftRe: RegExp = /^\s*(\S.*)$/;
    let identifierRe: RegExp = /^[a-z_][a-z\d]*$/i;
    let falseStringRe: RegExp = /^(f(alse)?|no?|0+(\.0+)?)([^\w-]|$)/i;
    let numberStringRe: RegExp = /^\d+(\.\d+)$/i;

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
            } else if (!isNil(search)) {
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
            } else if (!isNil(search)) {
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
            } else if (!isNil(spec)) {
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
            if (!isNil(match[uriParseGroup.origin])) {
                let name: string = (isNil(match[uriParseGroup.hostname])) ? '' : match[uriParseGroup.hostname];
                result.origin = {
                    value: match[uriParseGroup.origin],
                    scheme: {
                        name: match[uriParseGroup.schemeName],
                        separator: match[uriParseGroup.schemeSeparator]
                    },
                    host: { value: name, name: name }
                };
                if (!isNil(match[uriParseGroup.userInfo])) {
                    result.origin.userInfo = { value: match[uriParseGroup.userInfo], name: (isNil(match[uriParseGroup.username])) ? '' : match[uriParseGroup.username] };
                    if (!isNil(match[uriParseGroup.password]))
                        result.origin.userInfo.password = match[uriParseGroup.password].substr(1);
                }
                if (!isNil(match[uriParseGroup.portnumber])) {
                    result.origin.host.value += match[uriParseGroup.portnumber];
                    result.origin.host.portnumber = match[uriParseGroup.portnumber].substr(1);
                }
            }
            result.path = (isNil(match[uriParseGroup.path])) ? '' : match[uriParseGroup.path];
            if (!isNil(match[uriParseGroup.search]))
                result.queryString = (isNil(match[uriParseGroup.queryString])) ? '' : match[uriParseGroup.queryString];
            if (!isNil(match[uriParseGroup.hash]))
                result.fragment = (isNil(match[uriParseGroup.fragment])) ? '' : match[uriParseGroup.fragment];
        }
        return result;
    }
}
