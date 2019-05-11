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

export function notNil(value: any | null | undefined): value is string { return typeof (value) === 'string'; }

export function notNilOrEmpty(value: any | null | undefined): value is string { return typeof (value) === 'string' && value.length > 0; }

export function isEmptyOrNotString(value: any | null | undefined): boolean { return typeof (value) !== 'string' || value.length == 0; }

export function isWhiteSpaceOrNotString(value: any | null | undefined): boolean { return typeof (value) !== 'string' || value.trim().length == 0; }

export function asStringOrDefault(value: any | null | undefined, defaultValue: string): string { return (typeof (value) === 'string') ? value : defaultValue; }

export function asStringOrNull(value: any | null | undefined): string | null { return (typeof (value) === 'string') ? value : null; }

export function asStringOrUndefined(value: any | null | undefined): string | undefined { return (typeof (value) === 'string') ? value : undefined; }

export function isStringAndNotEmpty(value: any | null | undefined): value is string { return typeof (value) == 'string' && value.length > 0; }

export function isStringAndNotWhiteSpace(value: any | null | undefined): value is string { return typeof (value) == 'string' && value.trim().length > 0; }

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

let schemeParseRe: RegExp = /^([^\\\/:@]*:)[\\\/]{0,2}/;
let originStartValidateRe: RegExp = /^[a-z][a-z\d_\-]+:(\/\/?)?[^\\]/;
let portValidateRe: RegExp = /^0*(6(5(5(3[0-5]?|[012]\d?|[4-9]?)|([0-4]\d?|[6-9])\d?)?|([0-4]\d?|[6-9])\d{0,2})?|([1-5]\d?|[7-9])\d{0,3})$/;
let userInfoParseRe: RegExp = /^([^\\\/:@]+)?(:([^\\\/:@]+)?)?@/;
let hostAndPortParseRe: RegExp = /^([^\\\/:]+)?(:(\d+)?)?/;

class URIBuilder implements URL {
    private _href: string = '';
    private _origin: string = '';
    private _protocol: string = '';
    private _username?: string = undefined;
    private _password?: string = undefined;
    private _host: string = '';
    private _hostname: string = '';
    private _port?: string = undefined;
    private _pathname: string = '';
    private _pathSegments?: string[] = undefined;
    private _search: string = undefined;
    private _searchParams?: URLSearchParams = undefined;
    private _hash: string = '';
    private _isWellFormed?: boolean = undefined;
    private _isAbsolute: boolean = false;

    get isWellFormed(): boolean {
        if (typeof (this._isWellFormed) === 'boolean')
            return this._isWellFormed;

        if (this._origin.length > 0) {
            let m: RegExpExecArray = originStartValidateRe.exec(this._origin);
            if (isNil(m) || (typeof (this._port) === 'string' && (this._port.length == 0 || this._hostname.length == 0 || !portValidateRe.test(this._port))) ||
                (this._hostname.length > 0 && encodeURIComponent(this._hostname) !== this._hostname)) {
                this._isWellFormed = false;
                return false;
            }
            if (typeof (this._username) === 'string' || typeof (this._password) === 'string') {
                if (this._hostname.length == 0) {
                    this._isWellFormed = false;
                    return false;
                }
                let i: number = this._origin.indexOf('@');
                let userInfo: string = this._origin.substr(m[0].length, i - m[0].length);
                if (typeof (this._password) === 'string') {
                    i = userInfo.indexOf(':');
                    let pw: string = userInfo.substr(i + 1);
                    if (pw.length > 0 && encodeURIComponent(this._password) !== userInfo.substr(i + 1)) {
                        this._isWellFormed = false;
                        return false;
                    }
                    userInfo = userInfo.substr(0, i);
                }
                if (typeof (this._username) === 'string' && userInfo.length > 0 && encodeURIComponent(this._username) !== userInfo) {
                    this._isWellFormed = false;
                    return false;
                }
            }
        }

        this._isWellFormed = (this._search.length == 0 || this._search.split('&').filter((s: string) => {
            if (s.length == 0)
                return true;
            let i: number = s.indexOf('=');
            if (i == 0)
                return true;
            if (i > 0) {
                if (i < s.length - 1) {
                    let v = s.substr(i + 1);
                    if (encodeURIComponent(decodeURIComponent(v)) != v)
                        return true;
                }
                s = s.substr(0, i);
            }
            return encodeURIComponent(decodeURIComponent(s)) != s;
        }).length == 0) && (this._hash.length == 0 || this._href.substr(this._href.indexOf('#') + 1) === encodeURI(this._hash.substr(1)));
        return this._isWellFormed;
    }
    get href(): string { return this._href; }
    set href(value: string) {
        value = asStringOrDefault(value, '');
        if (value === this._href)
            return;
        this._href = value;
        this._isWellFormed = undefined;
        let i: number = value.indexOf('#');
        if (i < 0)
            this._hash = '';
        else {
            this._hash = decodeURI(value.substr(i));
            value = value.substr(0, i);
        }
        i = value.indexOf('?');
        if (i < 0)
            this._search = '';
        else {
            this._search = value.substr(i);
            value = value.substr(0, i);
        }
        let m: RegExpExecArray = schemeParseRe.exec(value);
        if (isNil(m)) {
            this._origin = this._protocol = this._host = this._host = '';
            this._username = this._password = this._port = undefined;
            this._pathname = value;
            this._isAbsolute = false;
            return;
        }
        this._isAbsolute = true;
        this._protocol = m[1];
        this._origin = m[0];
        value = value.substr(m[0].length);
        m = userInfoParseRe.exec(value);
        if (!isNil(m)) {
            this._username = (isNil(m[1])) ? '' : m[1];
            this._password = (isNil(m[2])) ? undefined : ((isNil(m[3])) ? '' : m[3]);
            value = value.substr(m[0].length);
        } else
            this._username = this._password = undefined;
        m = hostAndPortParseRe.exec(value);
        if (isNil(m)) {
            this._host = this._hostname = '';
            this._port = undefined;
            this._pathname = value;
        } else {
            this._host = m[0];
            this._hostname = (isNil(m[1])) ? '' : m[1];
            this._port = (isNil(m[2])) ? undefined : ((isNil(m[3])) ? '' : m[3]);
            this._pathname = value.substr(m[0].length);
        }
    }

    get origin(): string { return this._origin; }
    set origin(value: string) {
        value = asStringOrDefault(value, '');
        if (value === this._origin)
            return;
        if (value.length == 0) {
            this._isWellFormed = undefined;
            this._origin = this._protocol = this._host = this._host = '';
            this._username = this._password = this._port = undefined;
            this._isAbsolute = false;
            return;
        }
        if (value.indexOf('#') > -1)
            throw new Error("Origin cannot contain a fragment");
        if (value.indexOf('?') > -1)
            throw new Error("Origin cannot contain a query");
        let m: RegExpExecArray = schemeParseRe.exec(value);
        if (isNil(m))
            throw new Error("Origin must contain a scheme if it is not empty");
        let protocol: string = m[1];
        let origin: string = m[0];
        value = value.substr(m[0].length);
        m = userInfoParseRe.exec(value);
        let username: string | undefined, password: string | undefined;
        if (!isNil(m)) {
            username = (isNil(m[1])) ? '' : m[1];
            password = (isNil(m[2])) ? undefined : ((isNil(m[3])) ? '' : m[3]);
            value = value.substr(m[0].length);
        } else
            username = password = undefined;
        m = hostAndPortParseRe.exec(value);
        if (isNil(m)) {
            if (value.length > 0)
                throw new Error("Origin cannot contain path references");
            this._host = this._hostname = '';
            this._port = undefined;
        } else {
            if (value.length > m[0].length)
                throw new Error("Origin cannot contain path references");
            this._host = m[0];
            this._hostname = (isNil(m[1])) ? '' : m[1];
            this._port = (isNil(m[2])) ? undefined : ((isNil(m[3])) ? '' : m[3]);
        }
        this._isWellFormed = undefined;
        this._isAbsolute = true;
        this._protocol = protocol;
        this._origin = origin;
        this._username = username;
        this._password = password;
    }

    get protocol(): string { return this._protocol; }
    set protocol(value: string) {
        value = asStringOrDefault(value, '');
        if (value === this._protocol)
            return;
        let m: RegExpExecArray;
        if (value.length > 0) {
            if (!value.endsWith(':'))
                value += ':';
            if (value === this._protocol)
                return;
            if (value.length > 1) {
                m = schemeParseRe.exec(value);
                if (isNil(m) || m[1].length != value.length)
                    throw new Error("Invalid protocol format");
            }
        }
        this._protocol = value;
        if (value.length === 0)
            this._origin = '';
        else {
            m = schemeParseRe.exec(this._origin);
            if (m[0].length > m[1].length)
                this._origin = this._protocol + m[0].substr(m[1].length);
            else
                this._origin = this._protocol;
            this._origin = this._protocol;
            if (typeof (this._username) === 'string')
                this._origin += ((typeof (this._password) === 'string') ? encodeURIComponent(this._username) + ':' + encodeURIComponent(this._password) : encodeURIComponent(this._username)) + '@';
            else if (typeof (this._password) === 'string')
                this._origin += ':' + encodeURIComponent(this._password) + '@';
            this._origin += this._hostname;
            if (typeof (this._port) === 'string')
                this._origin += ':' + this._port;
        }
        this._href = this._origin + this._pathname + this._search + this._hash;
        this._isWellFormed = undefined;
    }

    private rebuildHref() {
        if (this._origin.length > 0) {
            let m: RegExpExecArray = schemeParseRe.exec(this._origin);
            if (m[0].length > m[1].length)
                this._origin = this._protocol + m[0].substr(m[1].length);
            else
                this._origin = this._protocol;
            this._origin = this._protocol;
            if (typeof (this._username) === 'string')
                this._origin += ((typeof (this._password) === 'string') ? encodeURIComponent(this._username) + ':' + encodeURIComponent(this._password) : encodeURIComponent(this._username)) + '@';
            else if (typeof (this._password) === 'string')
                this._origin += ':' + encodeURIComponent(this._password) + '@';
            this._origin += this._hostname;
            if (typeof (this._port) === 'string')
                this._origin += ':' + this._port;
        }
        this._href = this._origin + this._pathname + this._search + this._hash;
        this._isWellFormed = undefined;
    }
    get username(): string | undefined { return this._username; }
    set username(value: string | undefined) {
        if (isNil(value)) {
            if (typeof (this._username) !== 'string')
                return;
            this._username = undefined;
        } else {
            if (this._username === value)
                return;
            this._username = value;
        }
        this.rebuildHref();
    }

    get password(): string { return this._password; }
    set password(value: string | undefined) {
        if (isNil(value)) {
            if (typeof (this._password) !== 'string')
                return;
            this._password = undefined;
        } else {
            if (this._password === value)
                return;
            this._password = value;
        }
        this.rebuildHref();
    }

    get host(): string { return this._host; }
    set host(value: string) {
        value = asStringOrDefault(value, '');
        if (value === this._host)
            return;
        this._host = value;
        let i: number = this._host.indexOf(':');

        if (i < 0) {
            this._hostname = this._host;
            this._port = undefined;
        } else {
            this._hostname = this._host.substr(0, i);
            this._port = this._host.substr(i + 1);
        }
        this.rebuildHref();
    }

    get hostname(): string { return this._hostname; }
    set hostname(value: string) {
        value = asStringOrDefault(value, '');
        if (value === this._hostname)
            return;
        this._hostname = value;
        this.rebuildHref();
    }

    get port(): string { return this._port; }
    set port(value: string) {
        if (isNil(value)) {
            if (typeof (this._port) !== 'string')
                return;
            this._password = undefined;
        } else {
            if (this._port === value)
                return;
            this._port = value;
        }
        this.rebuildHref();
    }

    get pathname(): string { return this._pathname; }
    set pathname(value: string) {
        value = asStringOrDefault(value, '');
        if (value === this._pathname)
            return;
        if (value.length > 0 && this._isAbsolute && !(value.startsWith(':') || value.startsWith('/') || value.startsWith('\\')))
            value += '/' + value;
        this._pathname = value;
        this.rebuildHref();
    }

    get search(): string { return this._search; }
    set search(value: string) {
        value = asStringOrDefault(value, '');
        if (value === this._search)
            return;
        if (value.indexOf('#') > -1)
            throw new Error("Search cannot contain a fragment");
        if (value.length > 0 && !value.startsWith('?'))
            value += '?' + value;
        this._search = value;
        this.rebuildHref();
    }

    get searchParams(): URLSearchParams { return this._searchParams; }

    get hash(): string { return this._hash; }
    set hash(value: string) {
        value = asStringOrDefault(value, '');
        if (value === this._hash)
            return;
        if (value.length > 0 && !value.startsWith('#'))
            value += '#' + value;
        this._hash = value;
        this.rebuildHref();
    }

    toJSON(): string {
        throw new Error("Method not implemented.");
    }


}