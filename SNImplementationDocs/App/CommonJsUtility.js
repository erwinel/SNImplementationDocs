"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let urlParseRe = /^(([^@:/?#]*):(?:\/\/((?:([^@:/?#]*)(?::([^@:/?#]*))?@)?([^:/?#]*)(?::(\d+(?=[:/?#]|$)))?))?)?(([:/]+(?=(?:[^?#:/]+[:/]*)?(?:\?|\#|$))|[:/]*[^:/?#]+(?=[:/]+[^?#])(?:[:/]+[^:/?#]+(?=[:/]+[^?#]))*)?[:/]*((\.*(?:\.[^.:/?#]*(?=\.)|[^.:/?#]+)*)(?:\.([^.:/?#]*))?)[:/]*)(?:\?([^#]*))?(?:\#(.*))?$/;
let trimRightRe = /^((\s*\S+)(\s+\S+)*)\s*$/;
let trimLeftRe = /^\s*(\S.*)$/;
let identifierRe = /^[a-z_][a-z\d]*$/i;
let falseStringRe = /^(f(alse)?|no?|0+(\.0+)?)([^\w-]|$)/i;
let numberStringRe = /^\d+(\.\d+)$/i;
/**
 * Determines if a value is null or undefined.
 * @param {*} value Value to test.
 * @returns {boolean} true if value was null or undefined; otherwise, false.
 */
function isNil(value) { return typeof (value) === 'undefined' || value === null; }
exports.isNil = isNil;
/**
 * Determines if value's type is an object.
 * @param {*} value Value to test.
 * @param {boolean} [noArray=false] If value is an array, return false.
 * @returns {boolean} true if value was null or undefined; otherwise, false.
 */
function isObject(value, noArray) { return (typeof (value) == "object" && value !== null && !(noArray && Array.isArray(value))); }
exports.isObject = isObject;
/**
 * Determines if a String represents a valid identifier name.
 * @param {string} text String to test.
 * @returns {boolean} true if value was a valid identifier name; otherwise, false.
 */
function isValidIdentifierName(text) { return typeof (text) == "string" && identifierRe.test(text); }
exports.isValidIdentifierName = isValidIdentifierName;
function asString(value, trim = false, spec = false) {
    if (isNil(value))
        return (typeof (trim) === 'string') ? trim : ((typeof (spec) === 'string') ? spec : ((spec) ? value : ""));
    if (typeof (value) != "string") {
        if (Array.isArray(value))
            value = value.join("\n");
        else {
            try {
                value = value.toString();
            }
            catch (err) { /* okay to ignnore */ }
            if (isNil(value))
                return (typeof (trim) === 'string') ? trim : ((typeof (spec) === 'string') ? spec : ((spec) ? value : ""));
            if (typeof (value) != "string") {
                try {
                    value = Object.prototype.toString.call(value);
                    if (isNil(value))
                        return (typeof (trim) === 'string') ? trim : ((typeof (spec) === 'string') ? spec : ((spec) ? value : ""));
                }
                catch (err) {
                    try {
                        value = value + "";
                    }
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
exports.asString = asString;
/**
 * Ensures that a value is a floating-point number, converting it if necessary.
 * @param value
 * @param defaultValue
 * @returns {string} Input value converted to a floating-point number.
 */
function asFloat(value, defaultValue = NaN) {
    if (typeof (value) === 'undefined' || value === null)
        return defaultValue;
    if (typeof (value) === 'number')
        return value;
    let n = parseFloat(value);
    if (isNaN(n))
        return defaultValue;
    return n;
}
exports.asFloat = asFloat;
/**
 * Ensures that a value is a whole number, converting it if necessary.
 * @param value
 * @param defaultValue
 * @returns {string} Input value converted to a whole number.
 */
function asInt(value, defaultValue = NaN) {
    if (typeof (value) === 'undefined' || value === null)
        return defaultValue;
    if (typeof (value) === 'number')
        return value;
    let n = parseInt(value);
    if (isNaN(n))
        return defaultValue;
    return n;
}
exports.asInt = asInt;
/**
 * Trims trailing whitespace from text.
 * @param {string} text Text to trim.
 * @returns {string} Text with trailing whitespace removed.
 */
function trimRight(text) {
    var m = trimRightRe.exec(asString(text));
    return (isNil(m)) ? "" : m[1];
}
exports.trimRight = trimRight;
/**
 * Trims leading whitespace from text.
 * @param {string} text Text to trim.
 * @returns {string} Text with leading whitespace removed.
 */
function trimLeft(text) {
    var m = trimLeftRe.exec(asString(text));
    return (isNil(m)) ? "" : m[1];
}
exports.trimLeft = trimLeft;
function asBoolean(value, nilIsTrue = false) {
    if (isNil(value))
        return (nilIsTrue == true);
    if (typeof (value) == "boolean")
        return value;
    if (typeof (value) == "object") {
        if (!Array.isArray(value)) {
            if (typeof (value.valueOf) == "function") {
                try {
                    value = value.valueOf();
                }
                catch (e) { }
                if (isNil(value))
                    return (nilIsTrue == true);
            }
            if (typeof (value) != "object" || !Array.isArray(value))
                value = [value];
            else if (value.length == 0)
                return false;
        }
        else if (value.length == 0)
            return false;
    }
    else
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
                    try {
                        v = v.valueOf();
                    }
                    catch (e) { }
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
    }
    else {
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
                    try {
                        v = v.valueOf();
                    }
                    catch (e) { }
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
exports.asBoolean = asBoolean;
function notString(value) { return typeof (value) !== 'string'; }
exports.notString = notString;
function notNil(value) { return typeof (value) === 'string'; }
exports.notNil = notNil;
function notNilOrEmpty(value) { return typeof (value) === 'string' && value.length > 0; }
exports.notNilOrEmpty = notNilOrEmpty;
function isEmptyOrNotString(value) { return typeof (value) !== 'string' || value.length == 0; }
exports.isEmptyOrNotString = isEmptyOrNotString;
function isWhiteSpaceOrNotString(value) { return typeof (value) !== 'string' || value.trim().length == 0; }
exports.isWhiteSpaceOrNotString = isWhiteSpaceOrNotString;
function asStringOrDefault(value, defaultValue) { return (typeof (value) === 'string') ? value : defaultValue; }
exports.asStringOrDefault = asStringOrDefault;
function asStringOrNull(value) { return (typeof (value) === 'string') ? value : null; }
exports.asStringOrNull = asStringOrNull;
function asStringOrUndefined(value) { return (typeof (value) === 'string') ? value : undefined; }
exports.asStringOrUndefined = asStringOrUndefined;
function isStringAndNotEmpty(value) { return typeof (value) == 'string' && value.length > 0; }
exports.isStringAndNotEmpty = isStringAndNotEmpty;
function isStringAndNotWhiteSpace(value) { return typeof (value) == 'string' && value.trim().length > 0; }
exports.isStringAndNotWhiteSpace = isStringAndNotWhiteSpace;
function isError(value) {
    return typeof (value) == 'object' && value !== null && typeof (value.message) == 'string' && typeof (value.name) == 'string' &&
        (typeof (value.stack) == 'undefined' || value.stack === null || typeof (value.stack) == 'string');
}
exports.isError = isError;
function compareStrings(a, b) {
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
exports.compareStrings = compareStrings;
function isIterable(value) {
    if (typeof (value) !== 'object' || value == null)
        return false;
    if (Array.isArray(value))
        return true;
    let fn = value[Symbol.iterator];
    return (typeof (fn) === 'function');
}
exports.isIterable = isIterable;
function asIterable(source, allowNull = false) {
    if (typeof (source) === 'undefined')
        return [];
    if (source === null)
        return (allowNull) ? [null] : [];
    return (Array.isArray(source)) ? source : ((isIterable(source)) ? source : [source]);
}
exports.asIterable = asIterable;
function asArray(source, allowNull = false) {
    if (typeof (source) === 'undefined')
        return [];
    if (source === null)
        return (allowNull) ? [null] : [];
    if (Array.isArray(source))
        return source;
    if (isIterable(source)) {
        let iterator;
        let fn = source[Symbol.iterator];
        try {
            iterator = fn();
        }
        catch ( /* okay to ignore */_a) { /* okay to ignore */ }
        if (typeof (iterator) === 'object' && iterator !== null) {
            let result = [];
            try {
                let ir = iterator.next();
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
            }
            catch ( /* okay to ignore */_b) { /* okay to ignore */ }
            return result;
        }
    }
    return [source];
}
exports.asArray = asArray;
function skipFirst(source, spec, thisArg) {
    let result = [];
    let iterator = source[Symbol.iterator]();
    let ir = iterator.next();
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
        let index = 0;
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
exports.skipFirst = skipFirst;
function skipLast(source, spec, thisArg) {
    let result = reverse(source);
    if (typeof (spec) === 'number') {
        while (result.length > 0 && spec-- > 0)
            result.shift();
    }
    else if (typeof (thisArg) === 'undefined') {
        while (result.length > 0 && spec(result[0], result.length - 1, source))
            result.shift();
    }
    else {
        while (result.length > 0 && spec.call(thisArg, result[0], result.length - 1, source))
            result.shift();
    }
    return result.reverse();
}
exports.skipLast = skipLast;
function takeFirst(source, spec, thisArg) {
    let result = [];
    let iterator = source[Symbol.iterator]();
    let ir = iterator.next();
    if (typeof (spec) === 'number')
        while (!ir.done && spec-- > 0) {
            result.push(ir.value);
            ir = iterator.next();
        }
    else {
        let index = 0;
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
exports.takeFirst = takeFirst;
function takeLast(source, spec, thisArg) {
    let result = reverse(source);
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
exports.takeLast = takeLast;
function filter(source, callbackfn, thisArg) {
    let result = [];
    let iterator = source[Symbol.iterator]();
    let ir = iterator.next();
    let index = 0;
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
exports.filter = filter;
function reverse(source) {
    let result = [];
    let iterator = source[Symbol.iterator]();
    let ir = iterator.next();
    let index = 0;
    while (!ir.done) {
        result.unshift(ir.value);
        ir = iterator.next();
    }
    return result;
}
exports.reverse = reverse;
function indexOfAny(value, position, ...searchString) {
    let result;
    if (typeof (position) === 'number') {
        result = -1;
        searchString.forEach((s) => {
            if (s.length > 0) {
                let i = value.indexOf(s, position);
                if (i > -1 && (result < 0 || i < result))
                    result = i;
            }
        });
    }
    else {
        searchString.forEach((s) => {
            if (s.length > 0) {
                let i = value.indexOf(s);
                if (i > -1 && (result < 0 || i < result))
                    result = i;
            }
        });
    }
    return result;
}
exports.indexOfAny = indexOfAny;
let schemeParseRe = /^([^\\\/:@]*:)[\\\/]{0,2}/;
let originStartValidateRe = /^[a-z][a-z\d_\-]+:(\/\/?)?[^\\]/;
let portValidateRe = /^0*(6(5(5(3[0-5]?|[012]\d?|[4-9]?)|([0-4]\d?|[6-9])\d?)?|([0-4]\d?|[6-9])\d{0,2})?|([1-5]\d?|[7-9])\d{0,3})$/;
let userInfoParseRe = /^([^\\\/:@]+)?(:([^\\\/:@]+)?)?@/;
let hostAndPortParseRe = /^([^\\\/:]+)?(:(\d+)?)?/;
class URIBuilder {
    constructor() {
        this._href = '';
        this._origin = '';
        this._protocol = '';
        this._username = undefined;
        this._password = undefined;
        this._host = '';
        this._hostname = '';
        this._port = undefined;
        this._pathname = '';
        this._pathSegments = undefined;
        this._search = undefined;
        this._searchParams = undefined;
        this._hash = '';
        this._isWellFormed = undefined;
        this._isAbsolute = false;
    }
    get isWellFormed() {
        if (typeof (this._isWellFormed) === 'boolean')
            return this._isWellFormed;
        if (this._origin.length > 0) {
            let m = originStartValidateRe.exec(this._origin);
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
                let i = this._origin.indexOf('@');
                let userInfo = this._origin.substr(m[0].length, i - m[0].length);
                if (typeof (this._password) === 'string') {
                    i = userInfo.indexOf(':');
                    let pw = userInfo.substr(i + 1);
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
        this._isWellFormed = (this._search.length == 0 || this._search.split('&').filter((s) => {
            if (s.length == 0)
                return true;
            let i = s.indexOf('=');
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
    get href() { return this._href; }
    set href(value) {
        value = asStringOrDefault(value, '');
        if (value === this._href)
            return;
        this._href = value;
        this._isWellFormed = undefined;
        let i = value.indexOf('#');
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
        let m = schemeParseRe.exec(value);
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
        }
        else
            this._username = this._password = undefined;
        m = hostAndPortParseRe.exec(value);
        if (isNil(m)) {
            this._host = this._hostname = '';
            this._port = undefined;
            this._pathname = value;
        }
        else {
            this._host = m[0];
            this._hostname = (isNil(m[1])) ? '' : m[1];
            this._port = (isNil(m[2])) ? undefined : ((isNil(m[3])) ? '' : m[3]);
            this._pathname = value.substr(m[0].length);
        }
    }
    get origin() { return this._origin; }
    set origin(value) {
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
        let m = schemeParseRe.exec(value);
        if (isNil(m))
            throw new Error("Origin must contain a scheme if it is not empty");
        let protocol = m[1];
        let origin = m[0];
        value = value.substr(m[0].length);
        m = userInfoParseRe.exec(value);
        let username, password;
        if (!isNil(m)) {
            username = (isNil(m[1])) ? '' : m[1];
            password = (isNil(m[2])) ? undefined : ((isNil(m[3])) ? '' : m[3]);
            value = value.substr(m[0].length);
        }
        else
            username = password = undefined;
        m = hostAndPortParseRe.exec(value);
        if (isNil(m)) {
            if (value.length > 0)
                throw new Error("Origin cannot contain path references");
            this._host = this._hostname = '';
            this._port = undefined;
        }
        else {
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
    get protocol() { return this._protocol; }
    set protocol(value) {
        value = asStringOrDefault(value, '');
        if (value === this._protocol)
            return;
        let m;
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
    rebuildHref() {
        if (this._origin.length > 0) {
            let m = schemeParseRe.exec(this._origin);
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
    get username() { return this._username; }
    set username(value) {
        if (isNil(value)) {
            if (typeof (this._username) !== 'string')
                return;
            this._username = undefined;
        }
        else {
            if (this._username === value)
                return;
            this._username = value;
        }
        this.rebuildHref();
    }
    get password() { return this._password; }
    set password(value) {
        if (isNil(value)) {
            if (typeof (this._password) !== 'string')
                return;
            this._password = undefined;
        }
        else {
            if (this._password === value)
                return;
            this._password = value;
        }
        this.rebuildHref();
    }
    get host() { return this._host; }
    set host(value) {
        value = asStringOrDefault(value, '');
        if (value === this._host)
            return;
        this._host = value;
        let i = this._host.indexOf(':');
        if (i < 0) {
            this._hostname = this._host;
            this._port = undefined;
        }
        else {
            this._hostname = this._host.substr(0, i);
            this._port = this._host.substr(i + 1);
        }
        this.rebuildHref();
    }
    get hostname() { return this._hostname; }
    set hostname(value) {
        value = asStringOrDefault(value, '');
        if (value === this._hostname)
            return;
        this._hostname = value;
        this.rebuildHref();
    }
    get port() { return this._port; }
    set port(value) {
        if (isNil(value)) {
            if (typeof (this._port) !== 'string')
                return;
            this._password = undefined;
        }
        else {
            if (this._port === value)
                return;
            this._port = value;
        }
        this.rebuildHref();
    }
    get pathname() { return this._pathname; }
    set pathname(value) {
        value = asStringOrDefault(value, '');
        if (value === this._pathname)
            return;
        if (value.length > 0 && this._isAbsolute && !(value.startsWith(':') || value.startsWith('/') || value.startsWith('\\')))
            value += '/' + value;
        this._pathname = value;
        this.rebuildHref();
    }
    get search() { return this._search; }
    set search(value) {
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
    get searchParams() { return this._searchParams; }
    get hash() { return this._hash; }
    set hash(value) {
        value = asStringOrDefault(value, '');
        if (value === this._hash)
            return;
        if (value.length > 0 && !value.startsWith('#'))
            value += '#' + value;
        this._hash = value;
        this.rebuildHref();
    }
    toJSON() {
        throw new Error("Method not implemented.");
    }
}
