"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let urlParseRe = /^(([^@:/?#]*):(?:\/\/((?:([^@:/?#]*)(?::([^@:/?#]*))?@)?([^:/?#]*)(?::(\d+(?=[:/?#]|$)))?))?)?(([:/]+(?=(?:[^?#:/]+[:/]*)?(?:\?|\#|$))|[:/]*[^:/?#]+(?=[:/]+[^?#])(?:[:/]+[^:/?#]+(?=[:/]+[^?#]))*)?[:/]*((\.*(?:\.[^.:/?#]*(?=\.)|[^.:/?#]+)*)(?:\.([^.:/?#]*))?)[:/]*)(?:\?([^#]*))?(?:\#(.*))?$/;
let trimRightRe = /^((\s*\S+)(\s+\S+)*)\s*$/;
let trimLeftRe = /^\s*(\S.*)$/;
let identifierRe = /^[a-z_][a-z\d]*$/i;
let falseStringRe = /^(f(alse)?|no?|0+(\.0+)?)([^\w-]|$)/i;
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
