

/**
 * Typed Java array
 * @export
 * @interface IJavaArray
 * @template T
 */
declare interface IJavaArray<T> {
    length: number;
    [index: number]: T;
}

/**
 * Generic Java array
 * @export
 * @class JavaArray
 * @implements {IJavaArray<any>}
 */
declare class JavaArray implements IJavaArray<any> {
    length: number;
    [index: number]: any;
}

declare namespace Packages {
    export namespace java {
        export namespace lang {
            /**
             * Base Java object.
             * @export
             * @class Object
             */
            export class Object { constructor(); }

            /**
             * Java String object.
             * @export
             * @class String
             * @extends {Object}
             */
            export class String extends Object {
                constructor();
                constructor(original: string);
                /**
                 * Returns the char value at the specified index.
                 * @param {number} index -
                 * @returns {number}
                 * @memberof {String}
                 */
                charAt(index: number): number;
                /**
                 * Returns the character (Unicode code point) at the specified index.
                 * @param {number} index -
                 * @returns {number}
                 * @memberof {String}
                 */
                codePointAt(index: number): number;
                /**
                 * Returns the character (Unicode code point) before the specified index.
                 * @param {number} index -
                 * @returns {number}
                 * @memberof {String}
                 */
                codePointBefore(index: number): number;
                /**
                 * Returns the number of Unicode code points in the specified text range of this String.
                 * @param {number} beginIndex -
                 * @param {number} endIndex -
                 * @returns {number}
                 * @memberof {String}
                 */
                codePointCount(beginIndex: number, endIndex: number): number;
                /**
                 * Compares two strings lexicographically.
                 * @param {String} anotherString -
                 * @returns {number}
                 * @memberof {String}
                 */
                compareTo(anotherString: String): number;
                /**
                 * Compares two strings lexicographically, ignoring case differences.
                 * @param {String} str -
                 * @returns {number}
                 * @memberof {String}
                 */
                compareToIgnoreCase(str: String): number;
                /**
                 * Concatenates the specified string to the end of this string.
                 * @param {String} str -
                 * @returns {String}
                 * @memberof {String}
                 */
                concat(str: String): String;
                /**
                 * Tests if this string ends with the specified suffix.
                 * @param {String} suffix -
                 * @returns {boolean}
                 * @memberof {String}
                 */
                endsWith(suffix: String): boolean;
                /**
                 * Compares this string to the specified object.
                 * @param {Object} anObject -
                 * @returns {boolean}
                 * @memberof {String}
                 */
                equals(anObject: Object): boolean;
                /**
                 * Compares this String to another String, ignoring case considerations.
                 * @param {String} anotherString -
                 * @returns {boolean}
                 * @memberof {String}
                 */
                equalsIgnoreCase(anotherString: String): boolean;
                /**
                 * Encodes this String into a sequence of bytes using the platform's default charset, storing the result into a new byte array.
                 * @returns {IJavaArray<number>}
                 * @memberof {String}
                 */
                getBytes(): IJavaArray<number>;
                /**
                 * Encodes this String into a sequence of bytes using the named charset, storing the result into a new byte array.
                 * @param {String} charsetName -
                 * @returns {IJavaArray<number>}
                 * @memberof {String}
                 */
                getBytes(charsetName: String): IJavaArray<number>;
                /**
                 * Copies characters from this string into the destination character array.
                 * @param {number} srcBegin -
                 * @param {number} srcEnd -
                 * @param {IJavaArray<number>} dst -
                 * @param {number} dstBegin -
                 * @memberof {String}
                 */
                getChars(srcBegin: number, srcEnd: number, dst: IJavaArray<number>, dstBegin: number): void;
                /**
                 * Returns a hash code for this string.
                 * @returns {number}
                 * @memberof {String}
                 */
                hashCode(): number;
                /**
                 * Returns the index within this string of the first occurrence of the specified character.
                 * @param {number} ch -
                 * @returns {number}
                 * @memberof {String}
                 */
                indexOf(ch: number): number;
                /**
                 * Returns the index within this string of the first occurrence of the specified character, starting the search at the specified index.
                 * @param {number} ch -
                 * @param {number} fromIndex -
                 * @returns {number}
                 * @memberof {String}
                 */
                indexOf(ch: number, fromIndex: number): number;
                /**
                 * Returns the index within this string of the first occurrence of the specified substring.
                 * @param {String} str -
                 * @returns {number}
                 * @memberof {String}
                 */
                indexOf(str: String): number;
                /**
                 * Returns the index within this string of the first occurrence of the specified substring, starting at the specified index.
                 * @param {String} str -
                 * @param {number} fromIndex -
                 * @returns {number}
                 * @memberof {String}
                 */
                indexOf(str: String, fromIndex: number): number;
                /**
                 * Returns a canonical representation for the string object.
                 * @returns {String}
                 * @memberof {String}
                 */
                intern(): String;
                /**
                 * Returns true if, and only if, length() is 0.
                 * @returns {boolean}
                 * @memberof {String}
                 */
                isEmpty(): boolean;
                /**
                 * Returns the index within this string of the last occurrence of the specified character.
                 * @param {number} ch -
                 * @returns {number}
                 * @memberof {String}
                 */
                lastIndexOf(ch: number): number;
                /**
                 * Returns the index within this string of the last occurrence of the specified character, searching backward starting at the specified index.
                 * @param {number} ch -
                 * @param {number} fromIndex -
                 * @returns {number}
                 * @memberof {String}
                 */
                lastIndexOf(ch: number, fromIndex: number): number;
                /**
                 * Returns the index within this string of the last occurrence of the specified substring.
                 * @param {String} str -
                 * @returns {number}
                 * @memberof {String}
                 */
                lastIndexOf(str: String): number;
                /**
                 * Returns the index within this string of the last occurrence of the specified substring, searching backward starting at the specified index.
                 * @param {String} str -
                 * @param {number} fromIndex -
                 * @returns {number}
                 * @memberof {String}
                 */
                lastIndexOf(str: String, fromIndex: number): number;
                /**
                 * Returns the length of this string.
                 * @returns {number}
                 * @memberof {String}
                 */
                length(): number;
                /**
                 * Tells whether or not this string matches the given regular expression.
                 * @param {String} regex -
                 * @returns {boolean}
                 * @memberof {String}
                 */
                matches(regex: String): boolean;
                /**
                 * Returns the index within this String that is offset from the given index by codePointOffset code points.
                 * @param {number} index -
                 * @param {number} codePointOffset -
                 * @returns {number}
                 * @memberof {String}
                 */
                offsetByCodePoints(index: number, codePointOffset: number): number;
                /**
                 * Tests if two string regions are equal.
                 * @param {boolean} ignoreCase -
                 * @param {number} toffset -
                 * @param {String} other -
                 * @param {number} ooffset -
                 * @param {number} len -
                 * @returns {boolean}
                 * @memberof {String}
                 */
                regionMatches(ignoreCase: boolean, toffset: number, other: String, ooffset: number, len: number): boolean;
                /**
                 * Tests if two string regions are equal.
                 * @param {number} toffset -
                 * @param {String} other -
                 * @param {number} ooffset -
                 * @param {number} len -
                 * @returns {boolean}
                 * @memberof {String}
                 */
                regionMatches(toffset: number, other: String, ooffset: number, len: number): boolean;
                /**
                 * Returns a new string resulting from replacing all occurrences of oldChar in this string with newChar.
                 * @param {number} oldChar -
                 * @param {number} newChar -
                 * @returns {String}
                 * @memberof {String}
                 */
                replace(oldChar: number, newChar: number): String;
                /**
                 * Replaces each substring of this string that matches the given regular expression with the given replacement.
                 * @param {String} regex -
                 * @param {String} replacement -
                 * @returns {String}
                 * @memberof {String}
                 */
                replaceAll(regex: String, replacement: String): String;
                /**
                 * Replaces the first substring of this string that matches the given regular expression with the given replacement.
                 * @param {String} regex -
                 * @param {String} replacement -
                 * @returns {String}
                 * @memberof {String}
                 */
                replaceFirst(regex: String, replacement: String): String;
                /**
                 * Splits this string around matches of the given regular expression.
                 * @param {String} regex -
                 * @returns {IJavaArray<String>}
                 * @memberof {String}
                 */
                split(regex: String): IJavaArray<String>;
                /**
                 * Splits this string around matches of the given regular expression.
                 * @param {String} regex -
                 * @param {number} limit -
                 * @returns {IJavaArray<String>}
                 * @memberof {String}
                 */
                split(regex: String, limit: number): IJavaArray<String>;
                /**
                 * Tests if this string starts with the specified prefix.
                 * @param {String} prefix -
                 * @returns {boolean}
                 * @memberof {String}
                 */
                startsWith(prefix: String): boolean;
                /**
                 * Tests if the substring of this string beginning at the specified index starts with the specified prefix.
                 * @param {String} prefix -
                 * @param {number} toffset -
                 * @returns {boolean}
                 * @memberof {String}
                 */
                startsWith(prefix: String, toffset: number): boolean;
                /**
                 * Returns a new string that is a substring of this string.
                 * @param {number} beginIndex -
                 * @returns {String}
                 * @memberof {String}
                 */
                substring(beginIndex: number): String;
                /**
                 * Returns a new string that is a substring of this string.
                 * @param {number} beginIndex -
                 * @param {number} endIndex -
                 * @returns {String}
                 * @memberof {String}
                 */
                substring(beginIndex: number, endIndex: number): String;
                /**
                 * Converts this string to a new character array.
                 * @returns {IJavaArray<number>}
                 * @memberof {String}
                 */
                toCharArray(): IJavaArray<number>;
                /**
                 * Converts all of the characters in this String to lower case using the rules of the default locale.
                 * @returns {String}
                 * @memberof {String}
                 */
                toLowerCase(): String;
                /**
                 * This object (which is already a string!) is itself returned.
                 * @returns {String}
                 * @memberof {String}
                 */
                toString(): String;
                /**
                 * Converts all of the characters in this String to upper case using the rules of the default locale.
                 * @returns {String}
                 * @memberof {String}
                 */
                toUpperCase(): String;
                /**
                 * Returns a copy of the string, with leading and trailing whitespace omitted.
                 * @returns {String}
                 * @memberof {String}
                 */
                trim(): String;
            }

            /**
             * Java Boolean object.
             * @export
             * @class Boolean
             * @extends {Object}
             */
            export class Boolean extends Object {
                constructor(value: boolean);
                constructor(s: string);
                /**
                 * Returns the value of this Boolean object as a boolean primitive.
                 * @returns {boolean}
                 * @memberof {Boolean}
                 */
                booleanValue(): boolean;
                /**
                 * Compares this Boolean instance with another.
                 * @param {Boolean} b -
                 * @returns {number}
                 * @memberof {Boolean}
                 */
                compareTo(b: Boolean): number;
                /**
                 * Returns true if and only if the argument is not null and is a Boolean object that represents the same boolean value as this object.
                 * @param {Object} obj -
                 * @returns {boolean}
                 * @memberof {Boolean}
                 */
                equals(obj: Object): boolean;
                /**
                 * Returns a hash code for this Boolean object.
                 * @returns {number}
                 * @memberof {Boolean}
                 */
                hashCode(): number;
                /**
                 * Returns a String object representing this Boolean's value.
                 * @returns {String}
                 * @memberof {Boolean}
                 */
                toString(): String;
            }
            /**
             * Java Integer object.
             * @export
             * @class Integer
             * @extends {Object}
             */
            export class Integer extends Object {
                constructor(value: number);
                constructor(s: string);
                /**
                 * Returns the value of this Integer as a byte.
                 * @returns {number}
                 * @memberof {Integer}
                 */
                byteValue(): number;
                /**
                 * Compares two Integer objects numerically.
                 * @param {Packages.java.lang.Integer} anotherInteger -
                 * @returns {number}
                 * @memberof {Integer}
                 */
                compareTo(anotherInteger: Packages.java.lang.Integer): number;
                /**
                 * Returns the value of this Integer as a double.
                 * @returns {number}
                 * @memberof {Integer}
                 */
                doubleValue(): number;
                /**
                 * Compares this object to the specified object.
                 * @param {Object} obj -
                 * @returns {boolean}
                 * @memberof {Integer}
                 */
                equals(obj: Object): boolean;
                /**
                 * Returns the value of this Integer as a float.
                 * @returns {number}
                 * @memberof {Integer}
                 */
                floatValue(): number;
                /**
                 * Returns a hash code for this Integer.
                 * @returns {number}
                 * @memberof {Integer}
                 */
                hashCode(): number;
                /**
                 * Returns the value of this Integer as an int.
                 * @returns {number}
                 * @memberof {Integer}
                 */
                intValue(): number;
                /**
                 * Returns the value of this Integer as a long.
                 * @returns {number}
                 * @memberof {Integer}
                 */
                longValue(): number;
                /**
                 * Returns the value of this Integer as a short.
                 * @returns {number}
                 * @memberof {Integer}
                 */
                shortValue(): number;
                /**
                 * Returns a String object representing this Integer's value.
                 * @returns {String}
                 * @memberof {Integer}
                 */
                toString(): String;
            }
            /**
             * Java Long object.
             * @export
             * @class Long
             * @extends {Object}
             */
            export class Long extends Object {
                constructor(value: number);
                constructor(s: string);
                /**
                 * Returns the value of this Long as a byte.
                 * @returns {number}
                 * @memberof {Long}
                 */
                byteValue(): number;
                /**
                 * Compares two Long objects numerically.
                 * @param {Packages.java.lang.Long} anotherLong -
                 * @returns {number}
                 * @memberof {Long}
                 */
                compareTo(anotherLong: Packages.java.lang.Long): number;
                /**
                 * Returns the value of this Long as a double.
                 * @returns {number}
                 * @memberof {Long}
                 */
                doubleValue(): number;
                /**
                 * Compares this object to the specified object.
                 * @param {Object} obj -
                 * @returns {boolean}
                 * @memberof {Long}
                 */
                equals(obj: Object): boolean;
                /**
                 * Returns the value of this Long as a float.
                 * @returns {number}
                 * @memberof {Long}
                 */
                floatValue(): number;
                /**
                 * Returns a hash code for this Long.
                 * @returns {number}
                 * @memberof {Long}
                 */
                hashCode(): number;
                /**
                 * Returns the value of this Long as an int.
                 * @returns {number}
                 * @memberof {Long}
                 */
                intValue(): number;
                /**
                 * Returns the value of this Long as a long value.
                 * @returns {number}
                 * @memberof {Long}
                 */
                longValue(): number;
                /**
                 * Returns the value of this Long as a short.
                 * @returns {number}
                 * @memberof {Long}
                 */
                shortValue(): number;
                /**
                 * Returns a String object representing this Long's value.
                 * @returns {String}
                 * @memberof {Long}
                 */
                toString(): String;
            }
            /**
             * Java Double object.
             * @export
             * @class Double
             * @extends {Object}
             */
            export class Double extends Object {
                constructor(value: number);
                constructor(s: string);
                /**
                 * Returns the value of this Double as a byte (by casting to a byte).
                 * @returns {number}
                 * @memberof {Double}
                 */
                byteValue(): number;
                /**
                 * Compares two Double objects numerically.
                 * @param {Packages.java.lang.Double} anotherDouble -
                 * @returns {number}
                 * @memberof {Double}
                 */
                compareTo(anotherDouble: Packages.java.lang.Double): number;
                /**
                 * Returns the double value of this Double object.
                 * @returns {number}
                 * @memberof {Double}
                 */
                doubleValue(): number;
                /**
                 * Compares this object against the specified object.
                 * @param {Object} obj -
                 * @returns {boolean}
                 * @memberof {Double}
                 */
                equals(obj: Object): boolean;
                /**
                 * Returns the float value of this Double object.
                 * @returns {number}
                 * @memberof {Double}
                 */
                floatValue(): number;
                /**
                 * Returns a hash code for this Double object.
                 * @returns {number}
                 * @memberof {Double}
                 */
                hashCode(): number;
                /**
                 * Returns the value of this Double as an int (by casting to type int).
                 * @returns {number}
                 * @memberof {Double}
                 */
                intValue(): number;
                /**
                 * Returns true if this Double value is infinitely large in magnitude, false otherwise.
                 * @returns {boolean}
                 * @memberof {Double}
                 */
                isInfinite(): boolean;
                /**
                 * Returns true if this Double value is a Not-a-Number (NaN), false otherwise.
                 * @returns {boolean}
                 * @memberof {Double}
                 */
                isNaN(): boolean;
                /**
                 * Returns the value of this Double as a long (by casting to type long).
                 * @returns {number}
                 * @memberof {Double}
                 */
                longValue(): number;
                /**
                 * Returns the value of this Double as a short (by casting to a short).
                 * @returns {number}
                 * @memberof {Double}
                 */
                shortValue(): number;
                /**
                 * Returns a string representation of this Double object.
                 * @returns {String}
                 * @memberof {Double}
                 */
                toString(): String;
            }
            /**
             * Java Byte object.
             * @export
             * @class InteByteger
             * @extends {Object}
             */
            export class Byte extends Object {
                constructor(value: number);
                constructor(s: string);
                /**
                 * Returns the value of this Byte as a byte.
                 * @returns {number}
                 * @memberof {Byte}
                 */
                byteValue(): number;
                /**
                 * Compares two Byte objects numerically.
                 * @param {Packages.java.lang.Byte} anotherByte -
                 * @returns {number}
                 * @memberof {Byte}
                 */
                compareTo(anotherByte: Packages.java.lang.Byte): number;
                /**
                 * Returns the value of this Byte as a double.
                 * @returns {number}
                 * @memberof {Byte}
                 */
                doubleValue(): number;
                /**
                 * Compares this object to the specified object.
                 * @param {Object} obj -
                 * @returns {boolean}
                 * @memberof {Byte}
                 */
                equals(obj: Object): boolean;
                /**
                 * Returns the value of this Byte as a float.
                 * @returns {number}
                 * @memberof {Byte}
                 */
                floatValue(): number;
                /**
                 * Returns a hash code for this Byte; equal to the result of invoking intValue().
                 * @returns {number}
                 * @memberof {Byte}
                 */
                hashCode(): number;
                /**
                 * Returns the value of this Byte as an int.
                 * @returns {number}
                 * @memberof {Byte}
                 */
                intValue(): number;
                /**
                 * Returns the value of this Byte as a long.
                 * @returns {number}
                 * @memberof {Byte}
                 */
                longValue(): number;
                /**
                 * Returns the value of this Byte as a short.
                 * @returns {number}
                 * @memberof {Byte}
                 */
                shortValue(): number;
                /**
                 * Returns a String object representing this Byte's value.
                 * @returns {String}
                 * @memberof {Byte}
                 */
                toString(): String;
            }
            /**
             * Java Float object.
             * @export
             * @class Float
             * @extends {Object}
             */
            export class Float extends Object {
                constructor(value: number);
                constructor(s: string);
                /**
                 * Returns the value of this Float as a byte (by casting to a byte).
                 * @returns {number}
                 * @memberof {Float}
                 */
                byteValue(): number;
                /**
                 * Compares two Float objects numerically.
                 * @param {Packages.java.lang.Float} anotherFloat -
                 * @returns {number}
                 * @memberof {Float}
                 */
                compareTo(anotherFloat: Packages.java.lang.Float): number;
                /**
                 * Returns the double value of this Float object.
                 * @returns {number}
                 * @memberof {Float}
                 */
                doubleValue(): number;
                /**
                 * Compares this object against the specified object.
                 * @param {Object} obj -
                 * @returns {boolean}
                 * @memberof {Float}
                 */
                equals(obj: Object): boolean;
                /**
                 * Returns the float value of this Float object.
                 * @returns {number}
                 * @memberof {Float}
                 */
                floatValue(): number;
                /**
                 * Returns a hash code for this Float object.
                 * @returns {number}
                 * @memberof {Float}
                 */
                hashCode(): number;
                /**
                 * Returns the value of this Float as an int (by casting to type int).
                 * @returns {number}
                 * @memberof {Float}
                 */
                intValue(): number;
                /**
                 * Returns true if this Float value is infinitely large in magnitude, false otherwise.
                 * @returns {boolean}
                 * @memberof {Float}
                 */
                isInfinite(): boolean;
                /**
                 * Returns true if this Float value is a Not-a-Number (NaN), false otherwise.
                 * @returns {boolean}
                 * @memberof {Float}
                 */
                isNaN(): boolean;
                /**
                 * Returns value of this Float as a long (by casting to type long).
                 * @returns {number}
                 * @memberof {Float}
                 */
                longValue(): number;
                /**
                 * Returns the value of this Float as a short (by casting to a short).
                 * @returns {number}
                 * @memberof {Float}
                 */
                shortValue(): number;
                /**
                 * Returns a string representation of this Float object.
                 * @returns {String}
                 * @memberof {Float}
                 */
                toString(): String;
            }
            /**
             * Java Short object.
             * @export
             * @class Short
             * @extends {Object}
             */
            export class Short extends Object {
                constructor(value: number);
                constructor(s: string);
                /**
                 * Returns the value of this Short as a byte.
                 * @returns {number}
                 * @memberof {Short}
                 */
                byteValue(): number;
                /**
                 * Compares two Short objects numerically.
                 * @param {Packages.java.lang.Short} anotherShort -
                 * @returns {number}
                 * @memberof {Short}
                 */
                compareTo(anotherShort: Packages.java.lang.Short): number;
                /**
                 * Returns the value of this Short as a double.
                 * @returns {number}
                 * @memberof {Short}
                 */
                doubleValue(): number;
                /**
                 * Compares this object to the specified object.
                 * @param {Object} obj -
                 * @returns {boolean}
                 * @memberof {Short}
                 */
                equals(obj: Object): boolean;
                /**
                 * Returns the value of this Short as a float.
                 * @returns {number}
                 * @memberof {Short}
                 */
                floatValue(): number;
                /**
                 * Returns a hash code for this Short; equal to the result of invoking intValue().
                 * @returns {number}
                 * @memberof {Short}
                 */
                hashCode(): number;
                /**
                 * Returns the value of this Short as an int.
                 * @returns {number}
                 * @memberof {Short}
                 */
                intValue(): number;
                /**
                 * Returns the value of this Short as a long.
                 * @returns {number}
                 * @memberof {Short}
                 */
                longValue(): number;
                /**
                 * Returns the value of this Short as a short.
                 * @returns {number}
                 * @memberof {Short}
                 */
                shortValue(): number;
                /**
                 * Returns a String object representing this Short's value.
                 * @returns {String}
                 * @memberof {Short}
                 */
                toString(): String;
            }
            /**
             * Java Character object.
             * @export
             * @class Character
             * @extends {Object}
             */
            export class Character extends Object {
                constructor(value: number);
                constructor(s: string);
                /**
                 * Returns the value of this Character object.
                 * @returns {number}
                 * @memberof {Character}
                 */
                charValue(): number;
                /**
                 * Compares two Character objects numerically.
                 * @param {Packages.java.lang.util.Character} anotherCharacter -
                 * @returns {number}
                 * @memberof {Character}
                 */
                compareTo(anotherCharacter: Packages.java.lang.Character): number;
                /**
                 * Compares this object against the specified object.
                 * @param {Object} obj -
                 * @returns {boolean}
                 * @memberof {Character}
                 */
                equals(obj: Object): boolean;
                /**
                 * Returns a hash code for this Character; equal to the result of invoking charValue().
                 * @returns {number}
                 * @memberof {Character}
                 */
                hashCode(): number;
                /**
                 * Returns a String object representing this Character's value.
                 * @returns {String}
                 * @memberof {Character}
                 */
                toString(): String;
            }
            export namespace util {
                /**
                 * Java Collection interface.
                 * @export
                 * @interface Collection
                 */
                export interface Collection {
                    /**
                     * Ensures that this collection contains the specified element (optional operation).
                     * @param {*} e -
                     * @returns {boolean}
                     * @memberof {Collection}
                     */
                    add(e: any): boolean;
                    /**
                     * Adds all of the elements in the specified collection to this collection (optional operation).
                     * @param {Packages.java.lang.util.Collection} c -
                     * @returns {boolean}
                     * @memberof {Collection}
                     */
                    addAll(c: Packages.java.lang.util.Collection): boolean;
                    /**
                     * Removes all of the elements from this collection (optional operation).
                     * @memberof {Collection}
                     */
                    clear(): void;
                    /**
                     * Returns true if this collection contains the specified element.
                     * @param {Object} o -
                     * @returns {boolean}
                     * @memberof {Collection}
                     */
                    contains(o: Object): boolean;
                    /**
                     * Returns true if this collection contains all of the elements in the specified collection.
                     * @param {Collection} c -
                     * @returns {boolean}
                     * @memberof {Collection}
                     */
                    containsAll(c: Collection): boolean;
                    /**
                     * Returns true if this collection contains no elements.
                     * @returns {boolean}
                     * @memberof {Collection}
                     */
                    isEmpty(): boolean;
                    /**
                     * Removes a single instance of the specified element from this collection, if it is present (optional operation).
                     * @param {Object} o -
                     * @returns {boolean}
                     * @memberof {Collection}
                     */
                    remove(o: Object): boolean;
                    /**
                     * Removes all of this collection's elements that are also contained in the specified collection (optional operation).
                     * @param {Collection} c -
                     * @returns {boolean}
                     * @memberof {Collection}
                     */
                    removeAll(c: Collection): boolean;
                    /**
                     * Retains only the elements in this collection that are contained in the specified collection (optional operation).
                     * @param {Collection} c -
                     * @returns {boolean}
                     * @memberof {Collection}
                     */
                    retainAll(c: Collection): boolean;
                    /**
                     * Returns the number of elements in this collection.
                     * @returns {number}
                     * @memberof {Collection}
                     */
                    size(): number;
                    /**
                     * Returns an array containing all of the elements in this collection.
                     * @returns {IJavaArray<Object>}
                     * @memberof {Collection}
                     */
                    toArray(): IJavaArray<Object>;
                    /**
                     * Returns an array containing all of the elements in this collection; the runtime type of the returned array is that of the specified array.
                     * @param {JavaArray} a -
                     * @returns {JavaArray}
                     * @memberof {Collection}
                     */
                    toArray(a: JavaArray): JavaArray;
                }
                /**
                 * Java List interface.
                 * @export
                 * @interface List
                 */
                export interface List extends Collection {
                    /**
                     * Appends the specified element to the end of this list (optional operation).
                     * @param {*} e -
                     * @returns {boolean}
                     * @memberof {List}
                     */
                    add(e: any): boolean;
                    /**
                     * Inserts the specified element at the specified position in this list (optional operation).
                     * @param {number} index -
                     * @param {*} element -
                     * @memberof {List}
                     */
                    add(index: number, element: any): void;
                    /**
                     * Appends all of the elements in the specified collection to the end of this list, in the order that they are returned by the specified collection's iterator (optional operation).
                     * @param {Packages.java.lang.util.Collection} c -
                     * @returns {boolean}
                     * @memberof {List}
                     */
                    addAll(c: Packages.java.lang.util.Collection): boolean;
                    /**
                     * Inserts all of the elements in the specified collection into this list at the specified position (optional operation).
                     * @param {number} index -
                     * @param {Packages.java.lang.util.Collection} c -
                     * @returns {boolean}
                     * @memberof {List}
                     */
                    addAll(index: number, c: Packages.java.lang.util.Collection): boolean;
                    /**
                     * Removes all of the elements from this list (optional operation).
                     * @memberof {List}
                     */
                    clear(): void;
                    /**
                     * Returns true if this list contains the specified element.
                     * @param {Object} o -
                     * @returns {boolean}
                     * @memberof {List}
                     */
                    contains(o: Object): boolean;
                    /**
                     * Returns true if this list contains all of the elements of the specified collection.
                     * @param {Collection} c -
                     * @returns {boolean}
                     * @memberof {List}
                     */
                    containsAll(c: Collection): boolean;
                    /**
                     * Returns the element at the specified position in this list.
                     * @param {number} index -
                     * @returns {*}
                     * @memberof {List}
                     */
                    get(index: number): any;
                    /**
                     * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
                     * @param {Object} o -
                     * @returns {number}
                     * @memberof {List}
                     */
                    indexOf(o: Object): number;
                    /**
                     * Returns true if this list contains no elements.
                     * @returns {boolean}
                     * @memberof {List}
                     */
                    isEmpty(): boolean;
                    /**
                     * Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element.
                     * @param {Object} o -
                     * @returns {number}
                     * @memberof {List}
                     */
                    lastIndexOf(o: Object): number;
                    /**
                     * Removes the element at the specified position in this list (optional operation).
                     * @param {number} index -
                     * @returns {*}
                     * @memberof {List}
                     */
                    remove(index: number): any;
                    /**
                     * Removes the first occurrence of the specified element from this list, if it is present (optional operation).
                     * @param {Object} o -
                     * @returns {boolean}
                     * @memberof {List}
                     */
                    remove(o: Object): boolean;
                    /**
                     * Removes from this list all of its elements that are contained in the specified collection (optional operation).
                     * @param {Collection} c -
                     * @returns {boolean}
                     * @memberof {List}
                     */
                    removeAll(c: Collection): boolean;
                    /**
                     * Retains only the elements in this list that are contained in the specified collection (optional operation).
                     * @param {Collection} c -
                     * @returns {boolean}
                     * @memberof {List}
                     */
                    retainAll(c: Collection): boolean;
                    /**
                     * Replaces the element at the specified position in this list with the specified element (optional operation).
                     * @param {number} index -
                     * @param {*} element -
                     * @returns {*}
                     * @memberof {List}
                     */
                    set(index: number, element: any): any;
                    /**
                     * Returns the number of elements in this list.
                     * @returns {number}
                     * @memberof {List}
                     */
                    size(): number;
                    /**
                     * Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive.
                     * @param {number} fromIndex -
                     * @param {number} toIndex -
                     * @returns {Packages.java.lang.util.List}
                     * @memberof {List}
                     */
                    subList(fromIndex: number, toIndex: number): Packages.java.lang.util.List;
                    /**
                     * Returns an array containing all of the elements in this list in proper sequence (from first to last element).
                     * @returns {IJavaArray<Object>}
                     * @memberof {List}
                     */
                    toArray(): IJavaArray<Object>;
                    /**
                     * Returns an array containing all of the elements in this list in proper sequence (from first to last element); the runtime type of the returned array is that of the specified array.
                     * @param {JavaArray} a -
                     * @returns {JavaArray}
                     * @memberof {List}
                     */
                    toArray(a: JavaArray): JavaArray;
                }
                /**
                 * Java Set interface.
                 * @export
                 * @interface Set
                 */
                export interface Set {
                    /**
                     * Adds the specified element to this set if it is not already present (optional operation).
                     * @param {*} e -
                     * @returns {boolean}
                     * @memberof {Set}
                     */
                    add(e: any): boolean;
                    /**
                     * Adds all of the elements in the specified collection to this set if they're not already present (optional operation).
                     * @param {Packages.java.lang.util.Collection} c -
                     * @returns {boolean}
                     * @memberof {Set}
                     */
                    addAll(c: Packages.java.lang.util.Collection): boolean;
                    /**
                     * Removes all of the elements from this set (optional operation).
                     * @memberof {Set}
                     */
                    clear(): void;
                    /**
                     * Returns true if this set contains the specified element.
                     * @param {Object} o -
                     * @returns {boolean}
                     * @memberof {Set}
                     */
                    contains(o: Object): boolean;
                    /**
                     * Returns true if this set contains all of the elements of the specified collection.
                     * @param {Packages.java.lang.util.Collection} c -
                     * @returns {boolean}
                     * @memberof {Set}
                     */
                    containsAll(c: Packages.java.lang.util.Collection): boolean;
                    /**
                     * Returns true if this set contains no elements.
                     * @returns {boolean}
                     * @memberof {Set}
                     */
                    isEmpty(): boolean;
                    /**
                     * Removes the specified element from this set if it is present (optional operation).
                     * @param {Object} o -
                     * @returns {boolean}
                     * @memberof {Set}
                     */
                    remove(o: Object): boolean;
                    /**
                     * Removes from this set all of its elements that are contained in the specified collection (optional operation).
                     * @param {Packages.java.lang.util.Collection} c -
                     * @returns {boolean}
                     * @memberof {Set}
                     */
                    removeAll(c: Packages.java.lang.util.Collection): boolean;
                    /**
                     * Retains only the elements in this set that are contained in the specified collection (optional operation).
                     * @param {Packages.java.lang.util.Collection} c -
                     * @returns {boolean}
                     * @memberof {Set}
                     */
                    retainAll(c: Packages.java.lang.util.Collection): boolean;
                    /**
                     * Returns the number of elements in this set (its cardinality).
                     * @returns {number}
                     * @memberof {Set}
                     */
                    size(): number;
                    /**
                     * Returns an array containing all of the elements in this set.
                     * @returns {IJavaArray<Object>}
                     * @memberof {Set}
                     */
                    toArray(): IJavaArray<Object>;
                    /**
                     * Returns an array containing all of the elements in this set; the runtime type of the returned array is that of the specified array.
                     * @param {JavaArray} a -
                     * @returns {JavaArray}
                     * @memberof {Set}
                     */
                    toArray(a: JavaArray): JavaArray;
                }
                /**
                 * Java ArrayList class.
                 * @export
                 * @class ArrayList
                 * @extends {Object}
                 * @implements {List}
                 */
                export class ArrayList extends Object implements List {
                    constructor();
                    constructor(c: Collection);
                    constructor(initialCapacity: number);
                    /**
                     * Appends the specified element to the end of this list.
                     * @param {*} e -
                     * @returns {boolean}
                     * @memberof {ArrayList}
                     */
                    add(e: any): boolean;
                    /**
                     * Inserts the specified element at the specified position in this list.
                     * @param {number} index -
                     * @param {*} element -
                     * @memberof {ArrayList}
                     */
                    add(index: number, element: any): void;
                    /**
                     * Appends all of the elements in the specified collection to the end of this list, in the order that they are returned by the specified collection's Iterator.
                     * @param {Packages.java.lang.util.Collection<any>} c -
                     * @returns {boolean}
                     * @memberof {ArrayList}
                     */
                    addAll(c: Collection): boolean;
                    /**
                     * Inserts all of the elements in the specified collection into this list, starting at the specified position.
                     * @param {number} index -
                     * @param {Collection} c -
                     * @returns {boolean}
                     * @memberof {ArrayList}
                     */
                    addAll(index: number, c: Collection): boolean;
                    /**
                     * Removes all of the elements from this list.
                     * @memberof {ArrayList}
                     */
                    clear(): void;
                    /**
                     * Returns a shallow copy of this ArrayList instance.
                     * @returns {Object}
                     * @memberof {ArrayList}
                     */
                    clone(): Object;
                    /**
                     * Returns true if this list contains the specified element.
                     * @param {Object} o -
                     * @returns {boolean}
                     * @memberof {ArrayList}
                     */
                    contains(o: Object): boolean;
                    /**
                     * Returns true if this list contains all of the elements of the specified collection.
                     * @param {Collection} c -
                     * @returns {boolean}
                     * @memberof {ArrayList}
                     */
                    containsAll(c: Collection): boolean;
                    /**
                     * Increases the capacity of this ArrayList instance, if necessary, to ensure that it can hold at least the number of elements specified by the minimum capacity argument.
                     * @param {number} minCapacity -
                     * @memberof {ArrayList}
                     */
                    ensureCapacity(minCapacity: number): void;
                    /**
                     * Returns the element at the specified position in this list.
                     * @param {number} index -
                     * @returns {*}
                     * @memberof {ArrayList}
                     */
                    get(index: number): any;
                    /**
                     * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
                     * @param {Object} o -
                     * @returns {number}
                     * @memberof {ArrayList}
                     */
                    indexOf(o: Object): number;
                    /**
                     * Returns true if this list contains no elements.
                     * @returns {boolean}
                     * @memberof {ArrayList}
                     */
                    isEmpty(): boolean;
                    /**
                     * Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element.
                     * @param {Object} o -
                     * @returns {number}
                     * @memberof {ArrayList}
                     */
                    lastIndexOf(o: Object): number;
                    /**
                     * Removes the element at the specified position in this list.
                     * @param {number} index -
                     * @returns {*}
                     * @memberof {ArrayList}
                     */
                    remove(index: number): any;
                    /**
                     * Removes the first occurrence of the specified element from this list, if it is present.
                     * @param {Object} o -
                     * @returns {boolean}
                     * @memberof {ArrayList}
                     */
                    remove(o: Object): boolean;
                    /**
                     * Removes from this list all of its elements that are contained in the specified collection.
                     * @param {Collection} c -
                     * @returns {boolean}
                     * @memberof {ArrayList}
                     */
                    removeAll(c: Collection): boolean;
                    /**
                     * Retains only the elements in this list that are contained in the specified collection.
                     * @param {Collection} c -
                     * @returns {boolean}
                     * @memberof {ArrayList}
                     */
                    retainAll(c: Collection): boolean;
                    /**
                     * Replaces the element at the specified position in this list with the specified element.
                     * @param {number} index -
                     * @param {*} element -
                     * @returns {*}
                     * @memberof {ArrayList}
                     */
                    set(index: number, element: any): any;
                    /**
                     * Returns the number of elements in this list.
                     * @returns {number}
                     * @memberof {ArrayList}
                     */
                    size(): number;
                    /**
                     * Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive.
                     * @param {number} fromIndex -
                     * @param {number} toIndex -
                     * @returns {List}
                     * @memberof {ArrayList}
                     */
                    subList(fromIndex: number, toIndex: number): List;
                    /**
                     * Returns an array containing all of the elements in this list in proper sequence (from first to last element).
                     * @returns {IJavaArray<Object>}
                     * @memberof {ArrayList}
                     */
                    toArray(): IJavaArray<Object>;
                    /**
                     * Returns an array containing all of the elements in this list in proper sequence (from first to last element); the runtime type of the returned array is that of the specified array.
                     * @param {JavaArray} a -
                     * @returns {JavaArray}
                     * @memberof {ArrayList}
                     */
                    toArray(a: JavaArray): JavaArray;
                    /**
                     * Trims the capacity of this ArrayList instance to be the list's current size.
                     * @memberof {ArrayList}
                     */
                    trimToSize(): void;
                }
                /**
                 * Java Map interface.
                 * @export
                 * @interface Map
                 */
                export interface Map {
                    /**
                     * Removes all of the mappings from this map (optional operation).
                     * @memberof {Map}
                     */
                    clear(): void;
                    /**
                     * Returns true if this map contains a mapping for the specified key.
                     * @param {Object} key -
                     * @returns {boolean}
                     * @memberof {Map}
                     */
                    containsKey(key: Object): boolean;
                    /**
                     * Returns true if this map maps one or more keys to the specified value.
                     * @param {Object} value -
                     * @returns {boolean}
                     * @memberof {Map}
                     */
                    containsValue(value: Object): boolean;
                    /**
                     * Returns a Set view of the mappings contained in this map.
                     * @returns {Set}
                     * @memberof {Map}
                     */
                    entrySet(): Set;
                    /**
                     * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
                     * @param {Object} key -
                     * @returns {*}
                     * @memberof {Map}
                     */
                    get(key: Object): any;
                    /**
                     * Returns true if this map contains no key-value mappings.
                     * @returns {boolean}
                     * @memberof {Map}
                     */
                    isEmpty(): boolean;
                    /**
                     * Returns a Set view of the keys contained in this map.
                     * @returns {Set}
                     * @memberof {Map}
                     */
                    keySet(): Set;
                    /**
                     * Associates the specified value with the specified key in this map (optional operation).
                     * @param {*} key -
                     * @param {*} value -
                     * @returns {*}
                     * @memberof {Map}
                     */
                    put(key: any, value: any): any;
                    /**
                     * Copies all of the mappings from the specified map to this map (optional operation).
                     * @param {Packages.java.lang.util.Map} m -
                     * @memberof {Map}
                     */
                    putAll(m: Packages.java.lang.util.Map): void;
                    /**
                     * Removes the mapping for a key from this map if it is present (optional operation).
                     * @param {Object} key -
                     * @returns {*}
                     * @memberof {Map}
                     */
                    remove(key: Object): any;
                    /**
                     * Returns the number of key-value mappings in this map.
                     * @returns {number}
                     * @memberof {Map}
                     */
                    size(): number;
                    /**
                     * Returns a Collection view of the values contained in this map.
                     * @returns {Collection}
                     * @memberof {Map}
                     */
                    values(): Collection;
                }
                /**
                 * Java HashMap class.
                 * @export
                 * @class HashMap
                 * @extends {Object}
                 * @implements {Map}
                 */
                export class HashMap extends Object implements Map {
                    constructor();
                    constructor(initialCapacity: number);
                    constructor(initialCapacity: number, loadFactor: number);
                    constructor(c: Map);
                    /**
                     * Removes all of the mappings from this map.
                     * @memberof {HashMap}
                     */
                    clear(): void;
                    /**
                     * Returns a shallow copy of this HashMap instance: the keys and values themselves are not cloned.
                     * @returns {Object}
                     * @memberof {HashMap}
                     */
                    clone(): Object;
                    /**
                     * Returns true if this map contains a mapping for the specified key.
                     * @param {Object} key -
                     * @returns {boolean}
                     * @memberof {HashMap}
                     */
                    containsKey(key: Object): boolean;
                    /**
                     * Returns true if this map maps one or more keys to the specified value.
                     * @param {Object} value -
                     * @returns {boolean}
                     * @memberof {HashMap}
                     */
                    containsValue(value: Object): boolean;
                    /**
                     * Returns a Set view of the mappings contained in this map.
                     * @returns {Packages.java.lang.util.Set}
                     * @memberof {HashMap}
                     */
                    entrySet(): Packages.java.lang.util.Set;
                    /**
                     * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
                     * @param {Object} key -
                     * @returns {*}
                     * @memberof {HashMap}
                     */
                    get(key: Object): any;
                    /**
                     * Returns true if this map contains no key-value mappings.
                     * @returns {boolean}
                     * @memberof {HashMap}
                     */
                    isEmpty(): boolean;
                    /**
                     * Returns a Set view of the keys contained in this map.
                     * @returns {Packages.java.lang.util.Set}
                     * @memberof {HashMap}
                     */
                    keySet(): Packages.java.lang.util.Set;
                    /**
                     * Associates the specified value with the specified key in this map.
                     * @param {*} key -
                     * @param {*} value -
                     * @returns {*}
                     * @memberof {HashMap}
                     */
                    put(key: any, value: any): any;
                    /**
                     * Copies all of the mappings from the specified map to this map.
                     * @param {Packages.java.lang.util.Map} m -
                     * @memberof {HashMap}
                     */
                    putAll(m: Packages.java.lang.util.Map): void;
                    /**
                     * Removes the mapping for the specified key from this map if present.
                     * @param {Object} key -
                     * @returns {*}
                     * @memberof {HashMap}
                     */
                    remove(key: Object): any;
                    /**
                     * Returns the number of key-value mappings in this map.
                     * @returns {number}
                     * @memberof {HashMap}
                     */
                    size(): number;
                    /**
                     * Returns a Collection view of the values contained in this map.
                     * @returns {Packages.java.lang.util.Collection}
                     * @memberof {HashMap}
                     */
                    values(): Packages.java.lang.util.Collection;
                }
                /**
                 * Java HashSet class.
                 * @export
                 * @class HashSet
                 * @extends {Object}
                 * @implements {Collection}
                 * @implements {Set}
                 */
                export class HashSet extends Object implements Collection, Set {
                    constructor();
                    constructor(c: Collection);
                    constructor(initialCapacity: number);
                    constructor(initialCapacity: number, loadFactor: number);
                    /**
                     * Adds the specified element to this set if it is not already present.
                     * @param {*} e -
                     * @returns {boolean}
                     * @memberof {HashSet}
                     */
                    add(e: any): boolean;
                    /**
                     * Appends all of the elements in the specified collection to the end of this list, in the order that they are returned by the specified collection's iterator (optional operation).
                     * @param {Packages.java.lang.util.Collection} c -
                     * @returns {boolean}
                     * @memberof {HashSet}
                     */
                    addAll(c: Packages.java.lang.util.Collection): boolean;
                    /**
                     * Removes all of the elements from this set.
                     * @memberof {HashSet}
                     */
                    clear(): void;
                    /**
                     * Returns a shallow copy of this HashSet instance: the elements themselves are not cloned.
                     * @returns {Object}
                     * @memberof {HashSet}
                     */
                    clone(): Object;
                    /**
                     * Returns true if this set contains the specified element.
                     * @param {Object} o -
                     * @returns {boolean}
                     * @memberof {HashSet}
                     */
                    contains(o: Object): boolean;
                    /**
                     * Returns true if this collection contains all of the elements in the specified collection.
                     * @param {Collection} c -
                     * @returns {boolean}
                     * @memberof {HashSet}
                     */
                    containsAll(c: Collection): boolean;
                    /**
                     * Returns true if this set contains no elements.
                     * @returns {boolean}
                     * @memberof {HashSet}
                     */
                    isEmpty(): boolean;
                    /**
                     * Removes the specified element from this set if it is present.
                     * @param {Object} o -
                     * @returns {boolean}
                     * @memberof {HashSet}
                     */
                    remove(o: Object): boolean;
                    /**
                     * Removes all of this collection's elements that are also contained in the specified collection (optional operation).
                     * @param {Collection} c -
                     * @returns {boolean}
                     * @memberof {HashSet}
                     */
                    removeAll(c: Collection): boolean;
                    /**
                     * Retains only the elements in this collection that are contained in the specified collection (optional operation).
                     * @param {Collection} c -
                     * @returns {boolean}
                     * @memberof {HashSet}
                     */
                    retainAll(c: Collection): boolean;
                    /**
                     * Returns the number of elements in this set (its cardinality).
                     * @returns {number}
                     * @memberof {HashSet}
                     */
                    size(): number;
                    /**
                     * Returns an array containing all of the elements in this collection.
                     * @returns {IJavaArray<Object>}
                     * @memberof {HashSet}
                     */
                    toArray(): IJavaArray<Object>;
                }
            }
        }    
    }
}

/**
 * GlideElementDescriptor object.
 * @class GlideElementDescriptor
 */
declare abstract class GlideElementDescriptor {
    getAttachmentEncryptionType(): Packages.java.lang.String;
    getEncryptionType(): Packages.java.lang.String;
    getInternalType(): Packages.java.lang.String;
    getLabel(): Packages.java.lang.String;
    getLength(): number;
    getName(): Packages.java.lang.String;
    getPlural(): Packages.java.lang.String;
    hasAttachmentsEncrypted(): boolean;
    isAutoOrSysID(): boolean;
    isChoiceTable(): boolean;
    isEdgeEncrypted(): boolean;
    isVirtual(): boolean;
}

/**
 * Basic definition of a GlideElement.
 * @interface GlideElement
 */
declare interface IGlideElement {
    /**
     * Determines if the user's role permits the creation of new records in this field.
     * @returns {boolean} True if the field can be created, false otherwise.
     * @memberof IGlideElement
     */
    canCreate(): boolean;

    /**
     * Indicates whether the user's role permits them to read the associated GlideRecord.
     * @returns {boolean} True if the field can be read, false otherwise.
     * @memberof IGlideElement
     */
    canRead(): boolean;

    /**
     * Determines whether the user's role permits them to write to the associated GlideRecord.
     * @returns {boolean} True if the user can write to the field, false otherwise.
     * @memberof IGlideElement
     */
    canWrite(): boolean;

    /**
     * Determines if the new value of a field, after a change, matches the specified object.
     * @returns {boolean} True if the fields have been changed, false if the field has not.
     * @memberof IGlideElement
     */
    changes(): boolean;

    /**
     * Determines if the previous value of the current field matches the specified object.
     * @param {*} o An object value to check against the previous value of the current field.
     * @returns {boolean} True if the previous value matches, false if it does not.
     * @memberof IGlideElement
     */
    changesFrom(o: any): boolean;

    /**
     * Determines if the new value of a field, after a change, matches the specified object.
     * @param {*} o An object value to check against the new value of the current field.
     * @returns {boolean} True if the new value matches, false if it does not.
     * @memberof IGlideElement
     */
    changesTo(o: any): boolean;

    /**
     * Returns the value of the specified attribute from the dictionary.
     * @param {string} attributeName Attribute name
     * @returns {string} Attribute value.
     * @memberof IGlideElement
     */
    getAttribute(attributeName: string): string;

    /**
     * Returns the Boolean value of the specified attribute from the dictionary.
     * @param {string} attributeName Attribute name.
     * @returns {boolean} Boolean value of the attribute. Returns false if the attribute does not exist.
     * @memberof IGlideElement
     */
    getBooleanAttribute(attributeName: string): boolean;

    getChoiceValue(): string;
    
    getChoices(dependent?: string): any[];
    
    getDecryptedValue(): string;
    
    /**
     * Gets the formatted display value of the field.
     * @param {number} [maxCharacters] Maximum characters desired
     * @memberof IGlideElement
     */
    getDisplayValue(maxCharacters?: number): string;
    
    /**
     * Gets the current element descriptor.
     * @returns {GlideElementDescriptor}
     * @memberof IGlideElement
     */
    getED(): GlideElementDescriptor;

    getGlobalDisplayValue(): string;
    
    /**
     * Returns the HTML value of a field.
     * @param {number} [maxChars] Maximum number of characters to return.
     * @returns {string} HTML value for the field.
     * @memberof IGlideElement
     */
    getHTMLValue(maxCharacters?: number): string;

    getJournalEntry(mostRecent: number): string;

    /**
     * Gets the object label.
     * @returns {string} The object label.
     * @memberof IGlideElement
     */
    getLabel(): string;

    // getModifiedBy(): string;

    /**
     * Gets the name of the field.
     * @returns {string} The name of the field.
     * @memberof IGlideElement
     */
    getName(): string;
    
    /**
     * Gets the table name for a reference element.
     * @returns {string} The table name of the reference.
     * @memberof IGlideElement
     */
    getReferenceTable(): string;
    
    /**
     * Gets a GlideRecord object for a given reference element.
     * @returns {GlideRecord} The GlideRecord object.
     * @memberof IGlideElement
     */
    getRefRecord(): IGlideRecord;
    
    /**
     * Gets the name of the table on which the field resides.
     * @returns {string} Name of the table. The returned value may be different from the table Class that the record is in. See Tables and Classes in the product documentation.
     * @memberof IGlideElement
     */
    getTableName(): string;
    
    /**
     * Gets the value of the current element.
     * @returns {string}
     * @memberof IGlideElement
     */
    getValue(): string;

    /**
     * Determines if a field is null.
     * @returns {boolean} True if the field is null or an empty string, false if not.
     * @memberof IGlideElement
     */
    nil(): boolean;

    /**
     * Sets the value of a date/time element to the specified number of milliseconds since January 1, 1970 00:00:00 GMT.
     * @param {number} milliseconds Number of milliseconds since 1/1/1970.
     * @memberof IGlideElement
     */
    setDateNumericValue(milliseconds: number): void;

    setDisplayValue(value: any): void;
    
    setError(errorMessage: string): void;
    
    setPhoneNumber(phoneNumber: any, strict: boolean): void;

    /**
     * Sets the value of a field.
     * @param {*} value Object value to set the field to.
     * @memberof IGlideElement
     */
    setValue(value: any): void;

    /**
     * Converts the value to a string.
     * @returns {string} The value as a string
     * @memberof IGlideElement
     */
    toString(): string;
}

declare type BooleanString = "true"|"false";

declare interface IStringBasedGlideElement<T extends string> extends IGlideElement {
    /**
     * Gets the value of the current element.
     * @returns {T}
     * @memberof IStringGlideElement<T>
     */
    getValue(): T;

    /**
     * Sets the value of a field.
     * @param {T} value Object value to set the field to.
     * @memberof IStringGlideElement<T>
     */
    setValue(value: T): void;

    toString(): T;
}

type GUIDString = string & ({ length: 32 } | { length: 0 });
declare interface IGUIDGlideElement extends IStringBasedGlideElement<GUIDString> { }

declare interface IStringGlideElement extends IStringBasedGlideElement<string> { }

declare interface IBooleanGlideElement extends IStringBasedGlideElement<BooleanString> { }

/**
 * Basic definition of a GlideElement that is a reference to another record.
 * @interface IGlideRefElement
 * @extends {IGlideElement}
 * @template T The type of GlideRecord that this GlideElement references.
 */
declare interface IGlideRefElement<T extends IGlideRecord> extends IGlideElement {
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof IGlideRefElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof IGlideRefElement
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof IGlideRefElement<T>
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof IGlideRefElement
	 * @description Internal type is integer
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof IGlideRefElement
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof IGlideRefElement<T>
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
    /**
     * Gets a GlideRecord object for a given reference element.
     * @returns {T}
     * @memberof IGlideRefElement
     */
    getRefRecord(): T;
}

/**
 * GlideElement API.
 * @class GlideElement
 * @extends {IGlideElement}
 */
declare abstract class GlideElement implements IGlideElement {
    /**
     * Determines if the user's role permits the creation of new records in this field.
     * @returns {boolean} True if the field can be created, false otherwise.
     * @memberof GlideElement
     */
    canCreate(): boolean;

    /**
     * Indicates whether the user's role permits them to read the associated GlideRecord.
     * @returns {boolean} True if the field can be read, false otherwise.
     * @memberof GlideElement
     */
    canRead(): boolean;

    /**
     * Determines whether the user's role permits them to write to the associated GlideRecord.
     * @returns {boolean} True if the user can write to the field, false otherwise.
     * @memberof GlideElement
     */
    canWrite(): boolean;

    /**
     * Determines if the new value of a field, after a change, matches the specified object.
     * @returns {boolean} True if the fields have been changed, false if the field has not.
     * @memberof GlideElement
     */
    changes(): boolean;

    /**
     * Determines if the previous value of the current field matches the specified object.
     * @param {*} o An object value to check against the previous value of the current field.
     * @returns {boolean} True if the previous value matches, false if it does not.
     * @memberof GlideElement
     */
    changesFrom(o: any): boolean;

    /**
     * Determines if the new value of a field, after a change, matches the specified object.
     * @param {*} o An object value to check against the new value of the current field.
     * @returns {boolean} True if the new value matches, false if it does not.
     * @memberof GlideElement
     */
    changesTo(o: any): boolean;

    /**
     * Returns the value of the specified attribute from the dictionary.
     * @param {string} attributeName Attribute name
     * @returns {string} Attribute value
     * @memberof GlideElement
     */
    getAttribute(attributeName: string): string;

    /**
     * Returns the Boolean value of the specified attribute from the dictionary.
     * @param {string} attributeName Attribute name.
     * @returns {boolean} Boolean value of the attribute. Returns false if the attribute does not exist.
     * @memberof GlideElement
     */
    getBooleanAttribute(attributeName: string): boolean;

    getChoiceValue(): string;

    getChoices(dependent?: string): any[];

    getDecryptedValue(): string;

    /**
     * Gets the formatted display value of the field.
     * @param {number} [maxCharacters] Maximum characters desired
     * @memberof GlideElement
     */
    getDisplayValue(maxCharacters?: number): string;

    /**
     * Gets the current element descriptor.
     * @returns {GlideElementDescriptor}
     * @memberof GlideElement
     */
    getED(): GlideElementDescriptor;

    getGlobalDisplayValue(): string;

    /**
     * Returns the HTML value of a field.
     * @param {number} [maxChars] Maximum number of characters to return.
     * @returns {string} HTML value for the field.
     * @memberof GlideElement
     */
    getHTMLValue(maxCharacters?: number): string;

    getJournalEntry(mostRecent: number): string;

    /**
     * Gets the object label.
     * @returns {string} The object label.
     * @memberof GlideElement
     */
    getLabel(): string;

    // getModifiedBy(): string;

    /**
     * Gets the name of the field.
     * @returns {string} The name of the field.
     * @memberof GlideElement
     */
    getName(): string;

    /**
     * Gets the table name for a reference element.
     * @returns {string} The table name of the reference
     * @memberof GlideElement
     */
    getReferenceTable(): string;

    /**
     * Gets a GlideRecord object for a given reference element.
     * @returns {GlideRecord} The GlideRecord object
     * @memberof GlideElement
     */
    getRefRecord(): IGlideRecord;

    /**
     * Gets the name of the table on which the field resides.
     * @returns {string} Name of the table. The returned value may be different from the table Class that the record is in. See Tables and Classes in the product documentation.
     * @memberof GlideElement
     */
    getTableName(): string;

    /**
     * Gets the value of the current element.
     * @returns {string}
     * @memberof GlideElement
     */
    getValue(): string;

    /**
     * Determines if a field is null.
     * @returns {boolean} True if the field is null or an empty string, false if not.
     * @memberof GlideElement
     */
    nil(): boolean;

    /**
     * Sets the value of a date/time element to the specified number of milliseconds since January 1, 1970 00:00:00 GMT.
     * @param {number} milliseconds Number of milliseconds since 1/1/1970.
     * @memberof GlideElement
     */
    setDateNumericValue(milliseconds: number): void;

    setDisplayValue(value: any): void;

    setError(errorMessage: string): void;

    setPhoneNumber(phoneNumber: any, strict: boolean): void;

    /**
     * Sets the value of a field.
     * @param {*} value Object value to set the field to.
     * @memberof GlideElement
     */
    setValue(value: any): void;

    /**
     * Converts the value to a string.
     * @returns {string} The value as a string
     * @memberof GlideElement
     */
    toString(): string;
}

declare abstract class GlideReferenceElement extends GlideElement implements IGlideRefElement<GlideRecord> {
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof GlideReferenceElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof GlideReferenceElement
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {GlideElement}
	 * @memberof GlideReferenceElement
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof GlideReferenceElement
	 * @description Internal type is integer
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof GlideReferenceElement
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {GlideElement}
	 * @memberof GlideReferenceElement
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
    /**
     * Gets a GlideRecord object for a given reference element.
     * @returns {GlideRecord}
     * @memberof GlideReferenceElement
     */
    getRefRecord(): GlideRecord;
}

/**
 * GlideElement that references a GlideRecord from the cmn_department table.
 * @interface Icmn_departmentGlideElement
 * @extends {IGlideRefElement<Icmn_departmentGlideRecord>}
 */
declare interface Icmn_departmentGlideElement extends IGlideRefElement<Icmn_departmentGlideRecord> {
	/**
	 * Business unit
	 * @type {Ibusiness_unitGlideElement}
	 * @memberof Icmn_departmentGlideElement
	 * @description Reference to Business Unit (IGlideRefElement<Ibusiness_unitGlideRecord>)
	 */
    business_unit: Ibusiness_unitGlideElement;
	/**
	 * Code
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideElement
	 */
    code: IStringGlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement}
	 * @memberof Icmn_departmentGlideElement
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Cost center
	 * @type {GlideReferenceElement}
	 * @memberof Icmn_departmentGlideElement
	 * @description Reference to Cost Center (IGlideRefElement<Icmn_cost_centerGlideRecord>)
	 */
    cost_center: GlideReferenceElement;
	/**
	 * Department head
	 * @type {Isys_userGlideElement}
	 * @memberof Icmn_departmentGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    dept_head: Isys_userGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideElement
	 */
    description: IStringGlideElement;
	/**
	 * Head count
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideElement
	 * @description Internal type is "integer"
	 */
    head_count: IStringGlideElement;
	/**
	 * ID
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideElement
	 */
    id: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideElement
	 */
    name: IStringGlideElement;
	/**
	 * Parent
	 * @type {Icmn_departmentGlideElement}
	 * @memberof Icmn_departmentGlideElement
	 * @description Reference to Department (IGlideRefElement<Icmn_departmentGlideRecord>)
	 */
    parent: Icmn_departmentGlideElement;
	/**
	 * Primary contact
	 * @type {Isys_userGlideElement}
	 * @memberof Icmn_departmentGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    primary_contact: Isys_userGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideElement
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icmn_departmentGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideElement
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideElement
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
}

/**
 * GlideElement that references a GlideRecord from the business_unit table.
 * @interface Ibusiness_unitGlideElement
 * @extends {IGlideRefElement<Ibusiness_unitGlideRecord>}
 */
declare interface Ibusiness_unitGlideElement extends IGlideRefElement<Ibusiness_unitGlideRecord> {
	/**
	 * Business Unit Head
	 * @type {Isys_userGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    bu_head: Isys_userGlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Internal type is "wide_text"
	 */
    description: IStringGlideElement;
	/**
	 * Hierarchy level
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Internal type is "integer"
	 */
    hierarchy_level: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 */
    name: IStringGlideElement;
	/**
	 * Parent
	 * @type {Ibusiness_unitGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Reference to Business Unit (IGlideRefElement<Ibusiness_unitGlideRecord>)
	 */
    parent: Ibusiness_unitGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElement;
	/**
	 * Domain Path
	 * @type {GlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Internal type is "domain_path"
	 */
    sys_domain_path: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
}

/**
 * GlideElement that references a GlideRecord from the location table.
 * @interface IlocationGlideElement
 * @extends {IGlideRefElement<Icmn_locationGlideRecord>}
 */
declare interface Icmn_locationGlideElement extends IGlideRefElement<Icmn_locationGlideRecord> {
	/**
	 * City
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    city: IStringGlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Contact
	 * @type {Isys_userGlideElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    contact: Isys_userGlideElement;
	/**
	 * Country
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    country: IStringGlideElement;
	/**
	 * Fax phone
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    fax_phone: IStringGlideElement;
	/**
	 * Full name
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    full_name: IStringGlideElement;
	/**
	 * Latitude
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Internal type is "float"
	 */
    latitude: IStringGlideElement;
	/**
	 * Lat long error
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    lat_long_error: IStringGlideElement;
	/**
	 * Longitude
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Internal type is "float"
	 */
    longitude: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    name: IStringGlideElement;
	/**
	 * Parent
	 * @type {Icmn_locationGlideElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    parent: Icmn_locationGlideElement;
	/**
	 * Phone
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    phone: IStringGlideElement;
	/**
	 * Phone territory
	 * @type {GlideReferenceElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Reference to Sys Phone Territory (IGlideRefElement<Isys_phone_territoryGlideRecord>)
	 */
    phone_territory: GlideReferenceElement;
	/**
	 * State / Province
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    state: IStringGlideElement;
	/**
	 * Stock room
	 * @type {IBooleanGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    stock_room: IBooleanGlideElement;
	/**
	 * Street
	 * @type {GlideElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Internal type is "multi_two_lines"
	 */
    street: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Time zone
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    time_zone: IStringGlideElement;
	/**
	 * Zip / Postal Code
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideElement
	 */
    zip: IStringGlideElement;
}

/**
 * GlideElement that references a GlideRecord from the cmn_building table.
 * @interface Icmn_buildingGlideElement
 * @extends {IGlideRefElement<Icmn_buildingGlideRecord>}
 */
declare interface Icmn_buildingGlideElement extends IGlideRefElement<Icmn_buildingGlideRecord> {
	/**
	 * Contact
	 * @type {Isys_userGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    contact: Isys_userGlideElement;
	/**
	 * Floors
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 * @description Internal type is "integer"
	 */
    floors: IStringGlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 */
    name: IStringGlideElement;
	/**
	 * Notes
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 */
    notes: IStringGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
}

/**
 * GlideElement that references a GlideRecord from the sys_user table.
 * @interface Isys_userGlideElement
 * @extends {IGlideRefElement<Isys_userGlideRecord>}
 */
declare interface Isys_userGlideElement extends IGlideRefElement<Isys_userGlideRecord> {
	/**
	 * Accumulated roles
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    accumulated_roles: IStringGlideElement;
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    active: IBooleanGlideElement;
	/**
	 * Work agent status
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is choice
	 */
    agent_status: GlideElement;
	/**
	 * Average Daily FTE Hours/Hours Per Person Day
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is decimal
	 */
    average_daily_fte: GlideElement;
	/**
	 * Building
	 * @type {Icmn_buildingGlideElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to Building (IGlideRefElement<Icmn_buildingGlideRecord>)
	 */
    building: Icmn_buildingGlideElement;
	/**
	 * Business impact
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is integer
	 */
    business_criticality: IStringGlideElement;
	/**
	 * Calendar integration
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is integer
	 */
    calendar_integration: IStringGlideElement;
	/**
	 * City
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    city: IStringGlideElement;
	/**
	 * Company
	 * @type {GlideReferenceElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: GlideReferenceElement;
	/**
	 * Cost center
	 * @type {GlideReferenceElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to Cost Center (IGlideRefElement<Icmn_cost_centerGlideRecord>)
	 */
    cost_center: GlideReferenceElement;
	/**
	 * Country code
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    country: IStringGlideElement;
	/**
	 * Date format
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    date_format: IStringGlideElement;
	/**
	 * Default perspective
	 * @type {GlideReferenceElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to Menu List (IGlideRefElement<Isys_perspectiveGlideRecord>)
	 */
    default_perspective: GlideReferenceElement;
	/**
	 * Department
	 * @type {Icmn_departmentGlideElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to Department (IGlideRefElement<Icmn_departmentGlideRecord>)
	 */
    department: Icmn_departmentGlideElement;
	/**
	 * EDU Status
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    edu_status: IStringGlideElement;
	/**
	 * Email
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is email
	 */
    email: GlideElement;
	/**
	 * Employee number
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    employee_number: IStringGlideElement;
	/**
	 * Enable Multifactor Authentication
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    enable_multifactor_authn: IBooleanGlideElement;
	/**
	 * Failed login attempts
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is integer
	 */
    failed_attempts: IStringGlideElement;
	/**
	 * First name
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    first_name: IStringGlideElement;
	/**
	 * Gender
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    gender: IStringGlideElement;
	/**
	 * Geolocation tracked
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    geolocation_tracked: IBooleanGlideElement;
	/**
	 * Home phone
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is ph_number
	 */
    home_phone: GlideElement;
	/**
	 * Internal Integration User
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    internal_integration_user: IBooleanGlideElement;
	/**
	 * Prefix
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    introduction: IStringGlideElement;
	/**
	 * Last login
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is glide_date
	 */
    last_login: GlideElement;
	/**
	 * Last login device
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    last_login_device: IStringGlideElement;
	/**
	 * Last login time
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is glide_date_time
	 */
    last_login_time: GlideElement;
	/**
	 * Last name
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    last_name: IStringGlideElement;
	/**
	 * Last password
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    last_password: IStringGlideElement;
	/**
	 * Last position update
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is glide_date_time
	 */
    last_position_update: GlideElement;
	/**
	 * Latitude
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is float
	 */
    latitude: GlideElement;
	/**
	 * LDAP server
	 * @type {GlideReferenceElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to LDAP Server (IGlideRefElement<Ildap_server_configGlideRecord>)
	 */
    ldap_server: GlideReferenceElement;
	/**
	 * Location
	 * @type {GlideReferenceElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: GlideReferenceElement;
	/**
	 * Locked out
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    locked_out: IBooleanGlideElement;
	/**
	 * Longitude
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is float
	 */
    longitude: GlideElement;
	/**
	 * Manager
	 * @type {Isys_userGlideElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    manager: Isys_userGlideElement;
	/**
	 * Middle name
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    middle_name: IStringGlideElement;
	/**
	 * Mobile phone
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is ph_number
	 */
    mobile_phone: GlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    name: IStringGlideElement;
	/**
	 * Notification
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is integer
	 */
    notification: IStringGlideElement;
	/**
	 * On schedule
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is choice
	 */
    on_schedule: GlideElement;
	/**
	 * Password needs reset
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    password_needs_reset: IBooleanGlideElement;
	/**
	 * Black phone
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is ph_number
	 */
    phone: GlideElement;
	/**
	 * Photo
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is user_image
	 */
    photo: GlideElement;
	/**
	 * Language
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    preferred_language: IStringGlideElement;
	/**
	 * Roles
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is user_roles
	 */
    roles: GlideElement;
	/**
	 * Schedule
	 * @type {GlideReferenceElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to Schedule (IGlideRefElement<Icmn_scheduleGlideRecord>)
	 */
    schedule: GlideReferenceElement;
	/**
	 * Source
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    source: IStringGlideElement;
	/**
	 * State / Province
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    state: IStringGlideElement;
	/**
	 * Street
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is multi_two_lines
	 */
    street: GlideElement;
	/**
	 * Class
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is sys_class_name
	 */
    sys_class_name: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: GlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is domain_id
	 */
    sys_domain: GlideElement;
	/**
	 * Domain Path
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is domain_path
	 */
    sys_domain_path: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is integer
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: GlideElement;
	/**
	 * Time format
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    time_format: IStringGlideElement;
	/**
	 * Time sheet policy
	 * @type {GlideReferenceElement>}
	 * @memberof Isys_userGlideElement
	 * @description Reference to Time Sheet Policy (IGlideRefElement<Itime_sheet_policyGlideRecord>)
	 */
    time_sheet_policy: GlideReferenceElement;
	/**
	 * Time zone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    time_zone: IStringGlideElement;
	/**
	 * Title
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    title: IStringGlideElement;
	/**
	 * User ID
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    user_name: IStringGlideElement;
	/**
	 * Password
	 * @type {GlideElement}
	 * @memberof Isys_userGlideElement
	 * @description Internal type is password
	 */
    user_password: GlideElement;
	/**
	 * Grey Phone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    u_grey_phone: IStringGlideElement;
	/**
	 * Rank
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    u_rank: IStringGlideElement;
	/**
	 * Red Phone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    u_red_phone: IStringGlideElement;
	/**
	 * VIP
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    vip: IBooleanGlideElement;
	/**
	 * Web service access only
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    web_service_access_only: IBooleanGlideElement;
	/**
	 * Zip / Postal code
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideElement
	 */
    zip: IStringGlideElement;
}

/**
 * Basic definition of a GlideElement that is a reference to a GlideRecord whose table is derrived from the task table.
 * @interface ITaskGlideElementBase
 * @extends {IGlideRefElement<T>}
 * @template T The type of GlideRecord, whose table derrives from the task table, that this GlideElement references.
 */
declare interface ItaskGlideElementBase<T extends ItaskGlideRecordBase> extends IGlideRefElement<T> {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 *  @memberof ItaskGlideElementBase
	 */
    active: IBooleanGlideElement;
	/**
	 * Activity due
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "due_date"
	 */
    activity_due: IStringGlideElement;
	/**
	 * Additional assignee list
	 * @type {GlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "glide_list"
	 */
    additional_assignee_list: GlideElement;
	/**
	 * Approval
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 */
    approval: IStringGlideElement;
	/**
	 * Approval history
	 * @type {GlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "journal"
	 */
    approval_history: GlideElement;
	/**
	 * Approval set
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "glide_date_time"
	 */
    approval_set: IStringGlideElement;
	/**
	 * Assigned to
	 * @type {Isys_userGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    assigned_to: Isys_userGlideElement;
	/**
	 * Assignment group
	 * @type {Isys_user_groupGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    assignment_group: Isys_user_groupGlideElement;
	/**
	 * Business duration
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "glide_duration"
	 */
    business_duration: IStringGlideElement;
	/**
	 * Business service
	 * @type {GlideReferenceElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Reference to Business Service (IGlideRefElement<Icmdb_ci_serviceGlideRecord>)
	 */
    business_service: GlideReferenceElement;
	/**
	 * Duration
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "glide_duration"
	 */
    calendar_duration: IStringGlideElement;
	/**
	 * Closed
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "glide_date_time"
	 */
    closed_at: IStringGlideElement;
	/**
	 * Closed by
	 * @type {Isys_userGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    closed_by: Isys_userGlideElement;
	/**
	 * Close notes
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 */
    close_notes: IStringGlideElement;
	/**
	 * Configuration item
	 * @type {GlideReferenceElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Reference to Configuration Item (IGlideRefElement<Icmdb_ciGlideRecord>)
	 */
    cmdb_ci: GlideReferenceElement;
	/**
	 * Additional comments
	 * @type {GlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "journal_input"
	 */
    comments: GlideElement;
	/**
	 * Comments and Work notes
	 * @type {GlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "journal_list"
	 */
    comments_and_work_notes: GlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Contact type
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 */
    contact_type: IStringGlideElement;
	/**
	 * Contract
	 * @type {GlideReferenceElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Reference to Contract (IGlideRefElement<Iast_contractGlideRecord>)
	 */
    contract: GlideReferenceElement;
	/**
	 * Correlation display
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 */
    correlation_display: IStringGlideElement;
	/**
	 * Correlation ID
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 */
    correlation_id: IStringGlideElement;
	/**
	 * Delivery plan
	 * @type {GlideReferenceElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Reference to Execution Plan (IGlideRefElement<Isc_cat_item_delivery_planGlideRecord>)
	 */
    delivery_plan: GlideReferenceElement;
	/**
	 * Delivery task
	 * @type {GlideReferenceElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Reference to Execution Plan Task (IGlideRefElement<Isc_cat_item_delivery_taskGlideRecord>)
	 */
    delivery_task: GlideReferenceElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 */
    description: IStringGlideElement;
	/**
	 * Due date
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "glide_date_time"
	 */
    due_date: IStringGlideElement;
	/**
	 * Escalation
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "integer"
	 */
    escalation: IStringGlideElement;
	/**
	 * Expected start
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "glide_date_time"
	 */
    expected_start: IStringGlideElement;
	/**
	 * Follow up
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "glide_date_time"
	 */
    follow_up: IStringGlideElement;
	/**
	 * Group list
	 * @type {GlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "glide_list"
	 */
    group_list: GlideElement;
	/**
	 * Impact
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "integer"
	 */
    impact: IStringGlideElement;
	/**
	 * Knowledge
	 * @type {IBooleanGlideElement}
	 *  @memberof ItaskGlideElementBase
	 */
    knowledge: IBooleanGlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Made SLA
	 * @type {IBooleanGlideElement}
	 *  @memberof ItaskGlideElementBase
	 */
    made_sla: IBooleanGlideElement;
	/**
	 * Number
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 */
    number: IStringGlideElement;
	/**
	 * Opened
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "glide_date_time"
	 */
    opened_at: IStringGlideElement;
	/**
	 * Opened by
	 * @type {Isys_userGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    opened_by: Isys_userGlideElement;
	/**
	 * Order
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "integer"
	 */
    order: IStringGlideElement;
	/**
	 * Parent
	 * @type {ItaskGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Reference to Task (IGlideRefElement<ItaskGlideRecord>)
	 */
    parent: ItaskGlideElement;
	/**
	 * Priority
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "integer"
	 */
    priority: IStringGlideElement;
	/**
	 * Reassignment count
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "integer"
	 */
    reassignment_count: IStringGlideElement;
	/**
	 * Rejection goto
	 * @type {ItaskGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Reference to Task (IGlideRefElement<ItaskGlideRecord>)
	 */
    rejection_goto: ItaskGlideElement;
	/**
	 * Service offering
	 * @type {GlideReferenceElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Reference to Service Offering (IGlideRefElement<Iservice_offeringGlideRecord>)
	 */
    service_offering: GlideReferenceElement;
	/**
	 * Short description
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 */
    short_description: IStringGlideElement;
	/**
	 * Skills
	 * @type {GlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "glide_list"
	 */
    skills: GlideElement;
	/**
	 * SLA due
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "due_date"
	 */
    sla_due: IStringGlideElement;
	/**
	 * State
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "integer"
	 */
    state: IStringGlideElement;
	/**
	 * Task type
	 * @type {GlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "sys_class_name"
	 */
    sys_class_name: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElement;
	/**
	 * Domain Path
	 * @type {GlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "domain_path"
	 */
    sys_domain_path: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 *  @memberof ItaskGlideElementBase
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Time worked
	 * @type {GlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "timer"
	 */
    time_worked: GlideElement;
	/**
	 * Upon approval
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 */
    upon_approval: IStringGlideElement;
	/**
	 * Upon reject
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 */
    upon_reject: IStringGlideElement;
	/**
	 * Urgency
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "integer"
	 */
    urgency: IStringGlideElement;
	/**
	 * User input
	 * @type {GlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "user_input"
	 */
    user_input: GlideElement;
	/**
	 * Variables
	 * @type {GlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "variables"
	 */
    variables: GlideElement;
	/**
	 * Watch list
	 * @type {GlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "glide_list"
	 */
    watch_list: GlideElement;
	/**
	 * Workflow activity
	 * @type {GlideReferenceElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Reference to Workflow Activity (IGlideRefElement<Iwf_activityGlideRecord>)
	 */
    wf_activity: GlideReferenceElement;
	/**
	 * Actual end
	 * @type {IStringGlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "glide_date_time"
	 */
    work_end: IStringGlideElement;
	/**
	 * Work notes
	 * @type {GlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "journal_input"
	 */
    work_notes: GlideElement;
	/**
	 * Work notes list
	 * @type {GlideElement}
	 *  @memberof ItaskGlideElementBase
	 * @description Internal type is "glide_list"
	 */
    work_notes_list: GlideElement;
	/**
	 * Actual start
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideElementBase
	 * @description Internal type is "glide_date_time"
	 */
    work_start: IStringGlideElement;
}

/**
 * Generic GlideElement insatnce that references a GlideRecord whose table derrives from the task table.
 * @interface ITaskGlideElement
 * @extends {ItaskGlideElementBase<ItaskGlideRecord>}
 */
declare interface ItaskGlideElement extends ItaskGlideElementBase<ItaskGlideRecord> { }

/**
 * Basic definition of a GlideElement that is a reference to a GlideRecord whose table is derrived from the sys_metadata (Application File) table.
 * @interface Isys_metadataGlideElementBase
 * @extends {IGlideRefElement<T>}
 * @template T The type of GlideRecord, whose table derrives from the sys_metadata (Application File) table, that this GlideElement references.
 */
declare interface Isys_metadataGlideElementBase<T extends Isys_metadataGlideRecordBase> extends IGlideRefElement<T> {
	/**
	 * Class
	 * @type {GlideElement}
	 * @memberof Isys_metadataGlideElementBase
	 * @description Internal type is sys_class_name
	 */
    sys_class_name: GlideElement;
	/**
	 * Display name
	 * @type {IStringGlideElement}
	 * @memberof Isys_metadataGlideElementBase
	 */
    sys_name: IStringGlideElement;
	/**
	 * Package
	 * @type {GlideElement>}
	 * @memberof Isys_metadataGlideElementBase
	 * @description Reference to Package (IGlideRefElement<Isys_packageGlideRecord>)
	 */
    sys_package: GlideElement;
	/**
	 * Protection policy
	 * @type {IStringGlideElement}
	 * @memberof Isys_metadataGlideElementBase
	 */
    sys_policy: IStringGlideElement;
	/**
	 * Application
	 * @type {GlideElement>}
	 * @memberof Isys_metadataGlideElementBase
	 * @description Reference to Application (IGlideRefElement<Isys_scopeGlideRecord>)
	 */
    sys_scope: GlideElement;
	/**
	 * Update name
	 * @type {IStringGlideElement}
	 * @memberof Isys_metadataGlideElementBase
	 */
    sys_update_name: IStringGlideElement;
}

/**
 * Generic GlideElement that references a GlideRecord whose table derrives from the sys_metadata (Application File) table.
 * @interface Isys_metadataGlideElement
 * @extends {Isys_metadataGlideElementBase<Isys_metadataGlideRecord>}
 */
declare interface Isys_metadataGlideElement extends Isys_metadataGlideElementBase<Isys_metadataGlideRecord> { }

declare interface Isys_db_objectGlideElement extends Isys_metadataGlideElementBase<Isys_db_objectGlideRecord> {
	/**
	 * Accessible from
	 * @type {IStringGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 */
    access: IStringGlideElement;
	/**
	 * Allow UI actions
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 */
    actions_access: IBooleanGlideElement;
	/**
	 * Allow new fields
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 */
    alter_access: IBooleanGlideElement;
	/**
	 * Caller Access
	 * @type {IStringGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 */
    caller_access: IStringGlideElement;
	/**
	 * Allow client scripts
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 */
    client_scripts_access: IBooleanGlideElement;
	/**
	 * Allow configuration
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 */
    configuration_access: IBooleanGlideElement;
	/**
	 * Can create
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 */
    create_access: IBooleanGlideElement;
	/**
	 * Create access controls
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 */
    create_access_controls: IBooleanGlideElement;
	/**
	 * Can delete
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 */
    delete_access: IBooleanGlideElement;
	/**
	 * Extension model
	 * @type {IStringGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 */
    extension_model: IStringGlideElement;
	/**
	 * Extensible
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 */
    is_extendable: IBooleanGlideElement;
	/**
	 * Label
	 * @type {GlideElement}
	 * @memberof Isys_db_objectGlideElement
	 * @description Internal type is "documentation_field"
	 */
    label: GlideElement;
	/**
	 * Live feed
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 */
    live_feed_enabled: IBooleanGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 */
    name: IStringGlideElement;
	/**
	 * Auto number
	 * @type {GlideReferenceElement}
	 * @memberof Isys_db_objectGlideElement
	 * @description Reference to Number (IGlideRefElement<Isys_numberGlideRecord>)
	 */
    number_ref: GlideReferenceElement;
	/**
	 * Provider class
	 * @type {IStringGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 */
    provider_class: IStringGlideElement;
	/**
	 * Can read
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 */
    read_access: IBooleanGlideElement;
	/**
	 * Extends table
	 * @type {Isys_db_objectGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 * @description Reference to Table (IGlideRefElement<Isys_db_objectGlideRecord>)
	 */
    super_class: Isys_db_objectGlideElement;
	/**
	 * Sys class code
	 * @type {GlideElement}
	 * @memberof Isys_db_objectGlideElement
	 * @description Internal type is "sys_class_code"
	 */
    sys_class_code: GlideElement;
	/**
	 * Sys class path
	 * @type {GlideElement}
	 * @memberof Isys_db_objectGlideElement
	 * @description Internal type is "sys_class_path"
	 */
    sys_class_path: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Can update
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 */
    update_access: IBooleanGlideElement;
	/**
	 * User role
	 * @type {GlideReferenceElement}
	 * @memberof Isys_db_objectGlideElement
	 * @description Reference to Role (IGlideRefElement<Isys_user_roleGlideRecord>)
	 */
    user_role: GlideReferenceElement;
	/**
	 * Allow access to this table via web services
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideElement
	 */
    ws_access: IBooleanGlideElement;
}

/**
 * GlideElement that references a GlideRecord from the sc_cat_item table.
 * @interface Isc_cat_itemGlideElement
 * @extends {Isys_metadataGlideElementBase<Isc_cat_itemGlideRecord>}
 */
declare interface Isc_cat_itemGlideElement extends Isys_metadataGlideElementBase<Isc_cat_itemGlideRecord> {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    active: IBooleanGlideElement;
	/**
	 * Availability
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    availability: IStringGlideElement;
	/**
	 * Billable
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    billable: IBooleanGlideElement;
	/**
	 * Category
	 * @type {Isc_categoryGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Category (IGlideRefElement<Isc_categoryGlideRecord>)
	 */
    category: Isc_categoryGlideElement;
	/**
	 * Cost
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "decimal"
	 */
    cost: IStringGlideElement;
	/**
	 * Cart
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Macro (IGlideRefElement<Isys_ui_macroGlideRecord>)
	 */
    custom_cart: GlideReferenceElement;
	/**
	 * Execution Plan
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Execution Plan (IGlideRefElement<Isc_cat_item_delivery_planGlideRecord>)
	 */
    delivery_plan: GlideReferenceElement;
	/**
	 * Delivery plan script
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "script_plain"
	 */
    delivery_plan_script: GlideElement;
	/**
	 * Delivery time
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "glide_duration"
	 */
    delivery_time: IStringGlideElement;
	/**
	 * Description
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "translated_html"
	 */
    description: GlideElement;
	/**
	 * Entitlement script
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "script_plain"
	 */
    entitlement_script: GlideElement;
	/**
	 * Fulfillment group
	 * @type {Isys_user_groupGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    group: Isys_user_groupGlideElement;
	/**
	 * Hide on Service Portal
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    hide_sp: IBooleanGlideElement;
	/**
	 * Icon
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "user_image"
	 */
    icon: GlideElement;
	/**
	 * Ignore price
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    ignore_price: IBooleanGlideElement;
	/**
	 * Image
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "image"
	 */
    image: GlideElement;
	/**
	 * List Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "currency"
	 */
    list_price: IStringGlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Meta
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    meta: IStringGlideElement;
	/**
	 * Hide price (mobile listings)
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    mobile_hide_price: IBooleanGlideElement;
	/**
	 * Mobile Picture
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "user_image"
	 */
    mobile_picture: GlideElement;
	/**
	 * Mobile Picture Type
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    mobile_picture_type: IStringGlideElement;
	/**
	 * Model
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Product Model (IGlideRefElement<Icmdb_modelGlideRecord>)
	 */
    model: GlideReferenceElement;
	/**
	 * Name
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "translated_text"
	 */
    name: GlideElement;
	/**
	 * No cart
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    no_cart: IBooleanGlideElement;
	/**
	 * No order
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    no_order: IBooleanGlideElement;
	/**
	 * No order now
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    no_order_now: IBooleanGlideElement;
	/**
	 * No proceed checkout
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    no_proceed_checkout: IBooleanGlideElement;
	/**
	 * No quantity
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    no_quantity: IBooleanGlideElement;
	/**
	 * No search
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    no_search: IBooleanGlideElement;
	/**
	 * Omit price in cart
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    omit_price: IBooleanGlideElement;
	/**
	 * Order
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "integer"
	 */
    order: IStringGlideElement;
	/**
	 * Ordered item link
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Ordered Item Link (IGlideRefElement<Isc_ordered_item_linkGlideRecord>)
	 */
    ordered_item_link: GlideReferenceElement;
	/**
	 * Picture
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "user_image"
	 */
    picture: GlideElement;
	/**
	 * Preview link
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "catalog_preview"
	 */
    preview: GlideElement;
	/**
	 * Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "price"
	 */
    price: IStringGlideElement;
	/**
	 * Recurring Price Frequency
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "choice"
	 */
    recurring_frequency: GlideElement;
	/**
	 * Recurring price
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "price"
	 */
    recurring_price: IStringGlideElement;
	/**
	 * Roles
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "user_roles"
	 */
    roles: GlideElement;
	/**
	 * Catalogs
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "glide_list"
	 */
    sc_catalogs: GlideElement;
	/**
	 * Created from item design
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Item (IGlideRefElement<Isc_ic_item_stagingGlideRecord>)
	 */
    sc_ic_item_staging: GlideReferenceElement;
	/**
	 * Published version
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "integer"
	 */
    sc_ic_version: IStringGlideElement;
	/**
	 * Short description
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Internal type is "translated_text"
	 */
    short_description: GlideElement;
	/**
	 * Expand help for all questions
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    show_variable_help_on_load: IBooleanGlideElement;
	/**
	 * Start closed
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    start_closed: IBooleanGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Template
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Template (IGlideRefElement<Isys_templateGlideRecord>)
	 */
    template: GlideReferenceElement;
	/**
	 * Type
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    type: IStringGlideElement;
	/**
	 * Use cart layout
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    use_sc_layout: IBooleanGlideElement;
	/**
	 * Vendor
	 * @type {Icore_companyGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    vendor: Icore_companyGlideElement;
	/**
	 * Visible on Bundles
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    visible_bundle: IBooleanGlideElement;
	/**
	 * Visible on Guides
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    visible_guide: IBooleanGlideElement;
	/**
	 * Visible elsewhere
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideElement
	 */
    visible_standalone: IBooleanGlideElement;
	/**
	 * Workflow
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideElement
	 * @description Reference to Workflow (IGlideRefElement<Iwf_workflowGlideRecord>)
	 */
    workflow: GlideReferenceElement;
}

/**
 * GlideElement that references a GlideRecord from the sc_request table.
 * @interface Isc_requestGlideElement
 * @extends {ItaskGlideElementBase<Isc_requestGlideRecord>}
 */
declare interface Isc_requestGlideElement extends ItaskGlideElementBase<Isc_requestGlideRecord> {
	/**
	 * Resolve Time
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideElement
	 * @description Internal type is "integer"
	 */
    calendar_stc: IStringGlideElement;
	/**
	 * Delivery address
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideElement
	 */
    delivery_address: IStringGlideElement;
	/**
	 * Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideElement
	 * @description Internal type is "currency"
	 */
    price: IStringGlideElement;
	/**
	 * Requested for date
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideElement
	 * @description Internal type is "glide_date"
	 */
    requested_date: IStringGlideElement;
	/**
	 * Requested for
	 * @type {Isys_userGlideElement}
	 * @memberof Isc_requestGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    requested_for: Isys_userGlideElement;
	/**
	 * Request state
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideElement
	 */
    request_state: IStringGlideElement;
	/**
	 * Sourceable
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_requestGlideElement
	 */
    sourceable: IBooleanGlideElement;
	/**
	 * Sourced
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_requestGlideElement
	 */
    sourced: IBooleanGlideElement;
	/**
	 * Special instructions
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideElement
	 */
    special_instructions: IStringGlideElement;
	/**
	 * Stage
	 * @type {GlideElement}
	 * @memberof Isc_requestGlideElement
	 * @description Internal type is "workflow"
	 */
    stage: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_requestGlideElement
	 */
    sys_id: IGUIDGlideElement;
}

/**
 * GlideElement that references a GlideRecord from the sc_req_item table.
 * @interface Isc_req_itemGlideElement
 * @extends {ItaskGlideElementBase<Isc_req_itemGlideRecord>}
 */
declare interface Isc_req_itemGlideElement extends ItaskGlideElementBase<Isc_req_itemGlideRecord> {
	/**
	 * Backordered
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 */
    backordered: IBooleanGlideElement;
	/**
	 * Billable
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 */
    billable: IBooleanGlideElement;
	/**
	 * Item
	 * @type {Isc_cat_itemGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Reference to Catalog Item (IGlideRefElement<Isc_cat_itemGlideRecord>)
	 */
    cat_item: Isc_cat_itemGlideElement;
	/**
	 * Configuration item
	 * @type {GlideReferenceElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Reference to Configuration Item (IGlideRefElement<Icmdb_ciGlideRecord>)
	 */
    configuration_item: GlideReferenceElement;
	/**
	 * Context
	 * @type {GlideReferenceElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Reference to Workflow context (IGlideRefElement<Iwf_contextGlideRecord>)
	 */
    context: GlideReferenceElement;
	/**
	 * Estimated delivery
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    estimated_delivery: IStringGlideElement;
	/**
	 * Order Guide
	 * @type {GlideReferenceElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Reference to Order guide (IGlideRefElement<Isc_cat_item_guideGlideRecord>)
	 */
    order_guide: GlideReferenceElement;
	/**
	 * Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Internal type is "currency"
	 */
    price: IStringGlideElement;
	/**
	 * Quantity
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Internal type is "integer"
	 */
    quantity: IStringGlideElement;
	/**
	 * Quantity Sourced
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Internal type is "integer"
	 */
    quantity_sourced: IStringGlideElement;
	/**
	 * Received
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 */
    received: IBooleanGlideElement;
	/**
	 * Recurring Price Frequency
	 * @type {GlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Internal type is "choice"
	 */
    recurring_frequency: GlideElement;
	/**
	 * Recurring Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Internal type is "price"
	 */
    recurring_price: IStringGlideElement;
	/**
	 * Request
	 * @type {Isc_requestGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Reference to Request (IGlideRefElement<Isc_requestGlideRecord>)
	 */
    request: Isc_requestGlideElement;
	/**
	 * Catalog
	 * @type {Isc_catalogGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Reference to Catalog (IGlideRefElement<Isc_catalogGlideRecord>)
	 */
    sc_catalog: Isc_catalogGlideElement;
	/**
	 * Sourced
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 */
    sourced: IBooleanGlideElement;
	/**
	 * Stage
	 * @type {GlideElement}
	 * @memberof Isc_req_itemGlideElement
	 * @description Internal type is "workflow"
	 */
    stage: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_req_itemGlideElement
	 */
    sys_id: IGUIDGlideElement;
}

/**
 * GlideElement that references a GlideRecord from the incident table.
 * @interface IincidentGlidElement
 * @extends {ItaskGlideElementBase<IincidentGlideRecord>}
 */
declare interface IincidentGlideElement extends ItaskGlideElementBase<IincidentGlideRecord>  {
	/**
	 * Business resolve time
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlidElement
	 * @description Internal type is "integer"
	 */
    business_stc: IStringGlideElement;
	/**
	 * Resolve time
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlidElement
	 * @description Internal type is "integer"
	 */
    calendar_stc: IStringGlideElement;
	/**
	 * Caller
	 * @type {Isys_userGlideElement}
	 * @memberof IincidentGlidElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    caller_id: Isys_userGlideElement;
	/**
	 * Category
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlidElement
	 */
    category: IStringGlideElement;
	/**
	 * Caused by Change
	 * @type {Ichange_requestGlideElement}
	 * @memberof IincidentGlidElement
	 * @description Reference to Change Request (IGlideRefElement<Ichange_requestGlideRecord>)
	 */
    caused_by: Ichange_requestGlideElement;
	/**
	 * Child Incidents
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlidElement
	 * @description Internal type is "integer"
	 */
    child_incidents: IStringGlideElement;
	/**
	 * Close code
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlidElement
	 */
    close_code: IStringGlideElement;
	/**
	 * On hold reason
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlidElement
	 * @description Internal type is "integer"
	 */
    hold_reason: IStringGlideElement;
	/**
	 * Incident state
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlidElement
	 * @description Internal type is "integer"
	 */
    incident_state: IStringGlideElement;
	/**
	 * Notify
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlidElement
	 * @description Internal type is "integer"
	 */
    notify: IStringGlideElement;
	/**
	 * Parent Incident
	 * @type {IincidentGlideElement}
	 * @memberof IincidentGlidElement
	 * @description Reference to Incident (IGlideRefElement<IincidentGlideRecord>)
	 */
    parent_incident: IincidentGlideElement;
	/**
	 * Problem
	 * @type {IproblemGlideElement}
	 * @memberof IincidentGlidElement
	 * @description Reference to Problem (IGlideRefElement<IproblemGlideRecord>)
	 */
    problem_id: IproblemGlideElement;
	/**
	 * Last reopened by
	 * @type {Isys_userGlideElement}
	 * @memberof IincidentGlidElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    reopened_by: Isys_userGlideElement;
	/**
	 * Last reopened at
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlidElement
	 * @description Internal type is "glide_date_time"
	 */
    reopened_time: IStringGlideElement;
	/**
	 * Reopen count
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlidElement
	 * @description Internal type is "integer"
	 */
    reopen_count: IStringGlideElement;
	/**
	 * Resolved
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlidElement
	 * @description Internal type is "glide_date_time"
	 */
    resolved_at: IStringGlideElement;
	/**
	 * Resolved by
	 * @type {Isys_userGlideElement}
	 * @memberof IincidentGlidElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    resolved_by: Isys_userGlideElement;
	/**
	 * Change Request
	 * @type {Ichange_requestGlideElement}
	 * @memberof IincidentGlidElement
	 * @description Reference to Change Request (IGlideRefElement<Ichange_requestGlideRecord>)
	 */
    rfc: Ichange_requestGlideElement;
	/**
	 * Severity
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlidElement
	 * @description Internal type is "integer"
	 */
    severity: IStringGlideElement;
	/**
	 * Subcategory
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlidElement
	 */
    subcategory: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof IincidentGlidElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Is Mission Related
	 * @type {IBooleanGlideElement}
	 * @memberof IincidentGlidElement
	 */
    u_is_mission_related: IBooleanGlideElement;
	/**
	 * Network
	 * @type {Ix_44813_phys_net_networkGlideElement}
	 * @memberof IincidentGlidElement
	 * @description Reference to Physical Network (IGlideRefElement<Ix_44813_phys_net_networkGlideRecord>)
	 */
    u_network: Ix_44813_phys_net_networkGlideElement;
	/**
	 * VIP Priority
	 * @type {IBooleanGlideElement}
	 * @memberof IincidentGlidElement
	 */
    u_vip_priority: IBooleanGlideElement;
}

/**
 * GlideElement that references a GlideRecord from the sc_catalog table.
 * @interface Isc_catalogGlideElement
 * @extends {Isys_metadataGlideElementBase<Isc_catalogGlideRecord>}
 */
declare interface Isc_catalogGlideElement extends Isys_metadataGlideElementBase<Isc_catalogGlideRecord> {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_catalogGlideElement
	 */
    active: IBooleanGlideElement;
	/**
	 * Background Color
	 * @type {GlideElement}
	 * @memberof Isc_catalogGlideElement
	 * @description Internal type is "color"
	 */
    background_color: GlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogGlideElement
	 * @description Internal type is "translated_text"
	 */
    description: IStringGlideElement;
	/**
	 * 'Continue Shopping' page
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogGlideElement
	 */
    desktop_continue_shopping: IStringGlideElement;
	/**
	 * 'Catalog Home' Page
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogGlideElement
	 */
    desktop_home_page: IStringGlideElement;
	/**
	 * Desktop image
	 * @type {GlideElement}
	 * @memberof Isc_catalogGlideElement
	 * @description Internal type is "user_image"
	 */
    desktop_image: GlideElement;
	/**
	 * Editors
	 * @type {GlideElement}
	 * @memberof Isc_catalogGlideElement
	 * @description Internal type is "glide_list"
	 */
    editors: GlideElement;
	/**
	 * Enable Wish List
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_catalogGlideElement
	 */
    enable_wish_list: IBooleanGlideElement;
	/**
	 * Manager
	 * @type {Isys_userGlideElement}
	 * @memberof Isc_catalogGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    manager: Isys_userGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_catalogGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Title
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogGlideElement
	 * @description Internal type is "translated_field"
	 */
    title: IStringGlideElement;
}

/**
 * GlideElement that references a GlideRecord from the sc_category table.
 * @interface Isc_categoryGlideElement
 * @extends {Isys_metadataGlideElementBase<Isc_categoryGlideRecord>}
 */
declare interface Isc_categoryGlideElement extends Isys_metadataGlideElementBase<Isc_categoryGlideRecord> {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_categoryGlideElement
	 */
    active: IBooleanGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "translated_text"
	 */
    description: IStringGlideElement;
	/**
	 * Entitlement script
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "script_plain"
	 */
    entitlement_script: GlideElement;
	/**
	 * Header icon
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "user_image"
	 */
    header_icon: GlideElement;
	/**
	 * Homepage image
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "user_image"
	 */
    homepage_image: GlideElement;
	/**
	 * Homepage renderer
	 * @type {GlideReferenceElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Reference to Homepage Category Renderer (IGlideRefElement<Isc_homepage_rendererGlideRecord>)
	 */
    homepage_renderer: GlideReferenceElement;
	/**
	 * Icon
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "user_image"
	 */
    icon: GlideElement;
	/**
	 * Image
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "image"
	 */
    image: GlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Hide description (mobile browsing)
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_categoryGlideElement
	 */
    mobile_hide_description: IBooleanGlideElement;
	/**
	 * Mobile Picture
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "user_image"
	 */
    mobile_picture: GlideElement;
	/**
	 * Mobile Subcategory Render Type
	 * @type {IStringGlideElement}
	 * @memberof Isc_categoryGlideElement
	 */
    mobile_subcategory_render_type: IStringGlideElement;
	/**
	 * Module link
	 * @type {GlideReferenceElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Reference to Module (IGlideRefElement<Isys_app_moduleGlideRecord>)
	 */
    module: GlideReferenceElement;
	/**
	 * Order
	 * @type {IStringGlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "integer"
	 */
    order: IStringGlideElement;
	/**
	 * Parent
	 * @type {Isc_categoryGlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Reference to Category (IGlideRefElement<Isc_categoryGlideRecord>)
	 */
    parent: Isc_categoryGlideElement;
	/**
	 * Roles
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "user_roles"
	 */
    roles: GlideElement;
	/**
	 * Catalog
	 * @type {Isc_catalogGlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Reference to Catalog (IGlideRefElement<Isc_catalogGlideRecord>)
	 */
    sc_catalog: Isc_catalogGlideElement;
	/**
	 * Show in CMS
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_categoryGlideElement
	 */
    show_in_cms: IBooleanGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_categoryGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Title
	 * @type {IStringGlideElement}
	 * @memberof Isc_categoryGlideElement
	 * @description Internal type is "translated_text"
	 */
    title: IStringGlideElement;
}

/**
 * Query operator values that can be used for string value comparisons.
 */
declare type StringQueryOperator = "=" | "!=" | "IN" | "NOT IN" | "STARTSWITH" | "ENDSWITH" | "CONTAINS" | "DOES NOT CONTAIN" | "INSTANCEOF";

/**
 * Query operator values that can be used for numerical operations.
 */
declare type NumberQueryOperator = "=" | "!=" | ">" | ">=" | "<" | "<=";

/**
 * Query operator values.
 */
declare type QueryOperator = StringQueryOperator | NumberQueryOperator;

/**
 * GlideQueryCondition object.
 * @class GlideQueryCondition
 */
declare abstract class GlideQueryCondition {
    /**
     * Adds an AND condition to the current condition.
     * @param {string} name The name of a field.
     * @param {QueryOperator} oper The operator for the query (=,!=,>,>=,<,<=,IN,NOT IN,STARTSWITH,ENDSWITH,CONTAINS,DOES NOT CONTAIN,INSTANCEOF).
     * @param {*} value The value to query on.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addCondition(name: string, oper: QueryOperator, value: any) : GlideQueryCondition;
    /**
     * Adds an AND condition to the current condition. Assumes the equals operator.
     * @param {string} name The name of a field.
     * @param {*} value The value of a field.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addCondition(name: string, value: any) : GlideQueryCondition;
    /**
     * Adds an AND condition to the current condition.
     * @param {GlideQueryCondition} queryCondition Condition to add.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addCondition(queryCondition: GlideQueryCondition) : GlideQueryCondition
    /**
     * Adds an OR condition to the current condition.
     * @param {string} name The name of a field.
     * @param {QueryOperator} oper The operator for the query (=,!=,>,>=,<,<=,IN,NOT IN,STARTSWITH,ENDSWITH,CONTAINS,DOES NOT CONTAIN,INSTANCEOF).
     * @param {*} value The value to query on.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addOrCondition(name: string, oper: QueryOperator, value: any) : GlideQueryCondition;
    /**
     * Adds an OR condition to the current condition. Assumes the equals operator.
     * @param {string} name The name of a field.
     * @param {*} value The value to query on.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
	addOrCondition(name: string, value: any): GlideQueryCondition;
    /**
     * Adds an OR condition to the current condition. Assumes the equals operator.
     * @param {GlideQueryCondition} queryCondition Condition to add.
     * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
	addOrCondition(queryCondition: GlideQueryCondition): GlideQueryCondition;
}

/**
 * Basic defintion of a GlideRecord
 * @interface IGlideRecord
 */
declare interface IGlideRecord {
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof IGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof IGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof IGlideRecord
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof IGlideRecord
	 * @description Internal type is integer
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof IGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof IGlideRecord
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
    /**

    /**
     * Adds a filter to return active records.
     * @returns {GlideQueryCondition} Filter to return active records.
     */
    addActiveQuery(): GlideQueryCondition;

    /**
     * Adds an encoded query to other queries that may have been set.
     * @param {string} query An encoded query string.
     */
    addEncodedQuery(query: string): void;

    /**
     * Adds a filter to return records based on a relationship in a related table.
     * @param {string} joinTable Table name
     * @param {*} [primaryField] If other than sys_id, the primary field
     * @param {*} [joinTableField] If other than sys_id, the field that joins the tables
     * @returns {GlideQueryCondition} A filter that lists records where the relationships match.
     */
    addJoinQuery(joinTable: string, primaryField?: any, joinTableField?: any): GlideQueryCondition;

    /**
     * A filter that specifies records where the value of the field passed in the parameter is not null.
     * @param {string} fieldName The name of the field to be checked.
     * @returns {GlideQueryCondition} A filter that specifies records where the value of the field passed in the parameter is not null.
     */
    addNotNullQuery(fieldName: string): GlideQueryCondition;
    /**
     * Adds a filter to return records where the value of the specified field is null.
     * @param {string} fieldName The name of the field to be checked.
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addNullQuery(fieldName: string): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @param {string} query An encoded query string.
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(query: string): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @param {string} name Table field name.
     * @param {*} value Value on which to query (not case-sensitive).
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(name: string, value: any): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @param {string} name Table field name.
     * @param {string} operator Query operator (=,!=,>,>=,<,<=,IN,NOT IN,STARTSWITH,ENDSWITH,CONTAINS,DOES NOT CONTAIN,INSTANCEOF).
     * @param {*} value Value on which to query (not case-sensitive).
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(name: string, operator: QueryOperator, value: any): GlideQueryCondition;
    /**
     * Determines if the Access Control Rules, which include the user's roles, permit inserting new records in this table.
     * @returns {boolean} True if the user's roles permit creation of new records in this table.
     */
    canCreate(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit deleting records in this table.
     * @returns {boolean} True if the user's roles permit deletions of records in this table.
     */
    canDelete(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit reading records in this table.
     * @returns {boolean} True if the user's roles permit reading records from this table.
     */
    canRead(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit editing records in this table.
     * @returns {boolean} True if the user's roles permit writing to records from this table.
     */
    canWrite(): boolean;

    /**
     * Sets a range of rows to be returned by subsequent queries.
     * @param {number} firstRow The first row to include.
     * @param {number} lastRow The last row to include.
     * @param {boolean} forceCount If true, the getRowCount() method will return all possible records.
     */
    chooseWindow(firstRow: number, lastRow: number, forceCount: boolean): void;

    /**
     * Deletes multiple records that satisfy the query condition.
     */
    deleteMultiple(): void;

    /**
     * Deletes the current record.
     * @returns {boolean} True if the record was deleted; false if no record was found to delete.
     */
    deleteRecord(): boolean;
    /**
     * Defines a GlideRecord based on the specified expression of 'name = value'.
     * @param {string} name Column name
     * @param {*} [value] Value to match. If value is not specified, then the expression used is 'sys_id = name'.
     * @returns {boolean} True if one or more matching records was found. False if no matches found.
     */
    get(name: string, value?: any): boolean;

    /**
     * Returns the dictionary attributes for the specified field.
     * @param {string} fieldName Field name for which to return the dictionary attributes
     * @returns {string|null|undefined} Dictionary attributes
     */
    getAttribute(fieldName: string): string | null | undefined;

    /**
     * Returns the table's label.
     * @returns {string} Table's label
     */
    getClassDisplayValue(): string;

    /**
     * Retrieves the display value for the current record.
     * @returns {string|null|undefined} The display value for the current record.
     */
    getDisplayValue(): string | null | undefined;
    getED(): GlideElementDescriptor;

    /**
     * Retrieves the GlideElement object for the specified field.
     * @param {string} columnName Name of the column to get the element from.
     * @returns {GlideElement} The GlideElement for the specified column of the current record.
     */
    getElement(columnName: string): GlideElement;

    /**
     * Retrieves the query condition of the current result set as an encoded query string.
     * @returns {string} The encoded query as a string.
     */
    getEncodedQuery(): string;

    /**
     * Returns the field's label.
     * @returns {string} Field's label.
     */
    getLabel(): string;

    /**
     * Retrieves the last error message. If there is no last error message, null is returned.
     * @returns {string|null|undefined} The last error message as a string.
     */
    getLastErrorMessage(): string | null | undefined;

    /**
     * Retrieves a link to the current record.
     * @param {boolean} noStack If true, the sysparm_stack parameter is not appended to the link. The parameter sysparm_stack specifies the page to visit after closing the current link.
     * @returns {string} A link to the current record as a string.
     */
    getLink(noStack: boolean): string;
    /**
     * Retrieves the class name for the current record.
     * @returns {string} The class name.
     */
    getRecordClassName(): string;

    /**
     * Retrieves the number of rows in the query result.
     * @returns {number} The number of rows.
     */
    getRowCount(): number;

    /**
     * Retrieves the name of the table associated with the GlideRecord.
     * @returns {string} The table name.
     */
    getTableName(): string;
    /**
     * Gets the primary key of the record, which is usually the sys_id unless otherwise specified.
     * @returns {string|null|undefined} The unique primary key as a String, or null if the key is null.
     */
    getUniqueValue(): string | null | undefined;

    /**
     * Retrieves the string value of an underlying element in a field.
     * @param {string} name The name of the field to get the value from.
     * @returns {string|null|undefined} The value of the field.
     */
    getValue(name: string): string | null | undefined;

    /**
     * Determines if there are any more records in the GlideRecord object.
     * @returns {boolean} True if there are more records in the query result set.
     */
    hasNext(): boolean;
    /**
     * Inserts a new record using the field values that have been set for the current record.
     * @returns {string} Unique ID of the inserted record, or null if the record is not inserted.
     */
    insert(): string;

    /**
     * Creates an empty record suitable for population before an insert.
     */
    initialize(): void;

    /**
     * Checks to see if the current database action is to be aborted.
     * @returns {boolean} True if the current database action is to be aborted.
     */
    isActionAborted(): boolean;
    /**
     * Checks if the current record is a new record that has not yet been inserted into the database.
     * @returns {boolean} True if the record is new and has not been inserted into the database.
     */
    isNewRecord(): boolean;

    /**
     * Determines if the table exists.
     * @returns {boolean} True if table is valid or if record was successfully retrieved. False if table is invalid or record was not successfully retrieved.
     */
    isValid(): boolean;

    /**
     * Determines if the specified field is defined in the current table.
     * @param {string} columnName The name of the the field.
     * @returns {boolean} True if the field is defined for the current table.
     */
    isValidField(columnName: string): boolean;

    /**
     * Determines if current record is a valid record.
     * @returns {boolean} True if the current record is valid. False if past the end of the record set.
     */
    isValidRecord(): boolean;
    /**
     * Creates a new GlideRecord record, sets the default values for the fields, and assigns a unique ID to the record.
     */
    newRecord(): void;

    /**
     * Moves to the next record in the GlideRecord object.
     * @returns {boolean} True if moving to the next record is successful. False if there are no more records in the result set.
     */
    next(): boolean;

    /**
     * Moves to the next record in the GlideRecord object.
     * @returns {boolean} True if moving to the next record is successful. False if there are no more records in the result set.
     */
    _next(): boolean;
    /**
     * Retrieves the current operation being performed, such as insert, update, or delete.
     * @returns {string} The current operation.
     */
    operation(): string;

    /**
     * Specifies an orderBy column.
     * @param {string} name The column name used to order the records in this GlideRecord object.
     */
    orderBy(name: string): void;

    query(): void;
    _query(): void;

    /**
     * Runs the query against the table based on the filters specified by addQuery, addEncodedQuery, etc.
     * @param {string} [name] The column name to query on.
     * @param {*} [value] The value to query for.
     */
    query(field?: string, value?: any): void;

    /**
     * Runs the query against the table based on the filters specified by addQuery, addEncodedQuery, etc.
     * @param {string} [name] The column name to query on.
     * @param {*} [value] The value to query for.
     */
    _query(field: string, value: any): void;

    /**
     * Specifies a decending orderBy column.
     * @param {string} name The column name used to order the records in this GlideRecord object.
     */
    orderByDesc(name: string): void;
    /**
     * Sets a flag to indicate if the next database action (insert, update, delete) is to be aborted. This is often used in business rules.
     * @param b True to abort the next action. False if the action is to be allowed.
     */
    setAbortAction(b: boolean): void;

    /**
     * Sets the limit for number of records are fetched by the GlideRecord query.
     * @param {number} maxNumRecords The maximum number of records to fetch.
     */
    setLimit(maxNumRecords: number): void;
    /**
     * Sets sys_id value for the current record.
     * @param {string} guid The GUID to be assigned to the current record.
     */
    setNewGuidValue(guid: string): void;

    /**
     * Sets the value of the field with the specified name to the specified value.
     * @param {string} name Name of the field.
     * @param {*} value The value to assign to the field.
     */
    setValue(name: string, value: any): void;

    /**
     * Enables or disables the running of business rules, script engines, and audit.
     * @param {boolean} enable If true (default), enables business rules. If false, disables business rules.
     */
    setWorkflow(enable: boolean): void;

    /**
     * Updates the GlideRecord with any changes that have been made. If the record does not already exist, it is inserted.
     * @param {string} [reason] The reason for the update. The reason is displayed in the audit record.
     * @returns {string|null} Unique ID of the new or updated record. Returns null if the update fails.
     */
    update(reason?: string): string | null;

    /**
     * Updates each GlideRecord in the list with any changes that have been made.
     */
    updateMultiple(): void;
}

/**
 * GlideRecord that contains values from a record in the sys_user table.
 * @interface Isys_userGlideRecord
 * @extends {IGlideRecord}
 */
declare interface Isys_userGlideRecord extends IGlideRecord {
	/**
	 * Accumulated roles
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    accumulated_roles: IStringGlideElement;
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    active: IBooleanGlideElement;
	/**
	 * Work agent status
	 * @type {GlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is choice
	 */
    agent_status: GlideElement;
	/**
	 * Average Daily FTE Hours/Hours Per Person Day
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is decimal
	 */
    average_daily_fte: IStringGlideElement;
	/**
	 * Building
	 * @type {Icmn_buildingGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to Building (IGlideRefElement<Icmn_buildingGlideRecord>)
	 */
    building: Icmn_buildingGlideElement;
	/**
	 * Business impact
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is integer
	 */
    business_criticality: IStringGlideElement;
	/**
	 * Calendar integration
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is integer
	 */
    calendar_integration: IStringGlideElement;
	/**
	 * City
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    city: IStringGlideElement;
	/**
	 * Company
	 * @type {GlideReferenceElement}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: GlideReferenceElement;
	/**
	 * Cost center
	 * @type {GlideReferenceElement}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to Cost Center (IGlideRefElement<Icmn_cost_centerGlideRecord>)
	 */
    cost_center: GlideReferenceElement;
	/**
	 * Country code
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    country: IStringGlideElement;
	/**
	 * Date format
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    date_format: IStringGlideElement;
	/**
	 * Default perspective
	 * @type {GlideReferenceElement}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to Menu List (IGlideRefElement<Isys_perspectiveGlideRecord>)
	 */
    default_perspective: GlideReferenceElement;
	/**
	 * Department
	 * @type {Icmn_departmentGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to Department (IGlideRefElement<Icmn_departmentGlideRecord>)
	 */
    department: Icmn_departmentGlideElement;
	/**
	 * EDU Status
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    edu_status: IStringGlideElement;
	/**
	 * Email
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is email
	 */
    email: IStringGlideElement;
	/**
	 * Employee number
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    employee_number: IStringGlideElement;
	/**
	 * Enable Multifactor Authentication
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    enable_multifactor_authn: IBooleanGlideElement;
	/**
	 * Failed login attempts
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is integer
	 */
    failed_attempts: IStringGlideElement;
	/**
	 * First name
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    first_name: IStringGlideElement;
	/**
	 * Gender
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    gender: IStringGlideElement;
	/**
	 * Geolocation tracked
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    geolocation_tracked: IBooleanGlideElement;
	/**
	 * Home phone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is ph_number
	 */
    home_phone: IStringGlideElement;
	/**
	 * Internal Integration User
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    internal_integration_user: IBooleanGlideElement;
	/**
	 * Prefix
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    introduction: IStringGlideElement;
	/**
	 * Last login
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is glide_date
	 */
    last_login: IStringGlideElement;
	/**
	 * Last login device
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    last_login_device: IStringGlideElement;
	/**
	 * Last login time
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is glide_date_time
	 */
    last_login_time: IStringGlideElement;
	/**
	 * Last name
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    last_name: IStringGlideElement;
	/**
	 * Last password
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    last_password: IStringGlideElement;
	/**
	 * Last position update
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is glide_date_time
	 */
    last_position_update: IStringGlideElement;
	/**
	 * Latitude
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is float
	 */
    latitude: IStringGlideElement;
	/**
	 * LDAP server
	 * @type {GlideReferenceElement}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to LDAP Server (IGlideRefElement<Ildap_server_configGlideRecord>)
	 */
    ldap_server: GlideReferenceElement;
	/**
	 * Location
	 * @type {GlideReferenceElement}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: GlideReferenceElement;
	/**
	 * Locked out
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    locked_out: IBooleanGlideElement;
	/**
	 * Longitude
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is float
	 */
    longitude: IStringGlideElement;
	/**
	 * Manager
	 * @type {Isys_userGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    manager: Isys_userGlideElement;
	/**
	 * Middle name
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    middle_name: IStringGlideElement;
	/**
	 * Mobile phone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is ph_number
	 */
    mobile_phone: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Notification
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is integer
	 */
    notification: IStringGlideElement;
	/**
	 * On schedule
	 * @type {GlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is choice
	 */
    on_schedule: GlideElement;
	/**
	 * Password needs reset
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    password_needs_reset: IBooleanGlideElement;
	/**
	 * Black phone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is ph_number
	 */
    phone: IStringGlideElement;
	/**
	 * Photo
	 * @type {GlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is user_image
	 */
    photo: GlideElement;
	/**
	 * Language
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    preferred_language: IStringGlideElement;
	/**
	 * Roles
	 * @type {GlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is user_roles
	 */
    roles: GlideElement;
	/**
	 * Schedule
	 * @type {GlideReferenceElement>}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to Schedule (IGlideRefElement<Icmn_scheduleGlideRecord>)
	 */
    schedule: GlideReferenceElement;
	/**
	 * Source
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    source: IStringGlideElement;
	/**
	 * State / Province
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    state: IStringGlideElement;
	/**
	 * Street
	 * @type {GlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is multi_two_lines
	 */
    street: GlideElement;
	/**
	 * Class
	 * @type {GlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is sys_class_name
	 */
    sys_class_name: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is domain_id
	 */
    sys_domain: GlideElement;
	/**
	 * Domain Path
	 * @type {GlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is domain_path
	 */
    sys_domain_path: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is integer
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Time format
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    time_format: IStringGlideElement;
	/**
	 * Time sheet policy
	 * @type {GlideReferenceElement>}
	 * @memberof Isys_userGlideRecord
	 * @description Reference to Time Sheet Policy (IGlideRefElement<Itime_sheet_policyGlideRecord>)
	 */
    time_sheet_policy: GlideReferenceElement;
	/**
	 * Time zone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    time_zone: IStringGlideElement;
	/**
	 * Title
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    title: IStringGlideElement;
	/**
	 * User ID
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    user_name: IStringGlideElement;
	/**
	 * Password
	 * @type {GlideElement}
	 * @memberof Isys_userGlideRecord
	 * @description Internal type is password
	 */
    user_password: GlideElement;
	/**
	 * Grey Phone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    u_grey_phone: IStringGlideElement;
	/**
	 * Rank
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    u_rank: IStringGlideElement;
	/**
	 * Red Phone
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    u_red_phone: IStringGlideElement;
	/**
	 * VIP
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    vip: IBooleanGlideElement;
	/**
	 * Web service access only
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    web_service_access_only: IBooleanGlideElement;
	/**
	 * Zip / Postal code
	 * @type {IStringGlideElement}
	 * @memberof Isys_userGlideRecord
	 */
    zip: IStringGlideElement;
}

declare interface Isys_user_groupGlideElement extends IGlideRefElement<Isys_user_groupGlideRecord> {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 */
    active: IBooleanGlideElement;
	/**
	 * Average Daily FTE Hours/Hours Per Person Day
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "decimal"
	 */
    average_daily_fte: IStringGlideElement;
	/**
	 * Cost center
	 * @type {GlideReferenceElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Reference to Cost Center (IGlideRefElement<Icmn_cost_centerGlideRecord>)
	 */
    cost_center: GlideReferenceElement;
	/**
	 * Default assignee
	 * @type {Isys_userGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    default_assignee: Isys_userGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 */
    description: IStringGlideElement;
	/**
	 * Group email
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "email"
	 */
    email: IStringGlideElement;
	/**
	 * Exclude manager
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 */
    exclude_manager: IBooleanGlideElement;
	/**
	 * Hourly rate
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "currency"
	 */
    hourly_rate: IStringGlideElement;
	/**
	 * Include members
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 */
    include_members: IBooleanGlideElement;
	/**
	 * Manager
	 * @type {Isys_userGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    manager: Isys_userGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 */
    name: IStringGlideElement;
	/**
	 * Parent
	 * @type {Isys_user_groupGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    parent: Isys_user_groupGlideElement;
	/**
	 * Points
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "integer"
	 */
    points: IStringGlideElement;
	/**
	 * Roles
	 * @type {GlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "user_roles"
	 */
    roles: GlideElement;
	/**
	 * Source
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 */
    source: IStringGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Type
	 * @type {GlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "glide_list"
	 */
    type: GlideElement;
	/**
	 * Vendors
	 * @type {GlideElement}
	 * @memberof Isys_user_groupGlideElement
	 * @description Internal type is "glide_list"
	 */
    vendors: GlideElement;
}

/**
 * GlideRecord that contains values from a record in the Group table.
 * @interface Isys_user_groupGlideRecord
 * @extends {IGlideRecord}
 */
declare interface Isys_user_groupGlideRecord extends IGlideRecord {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 */
    active: IBooleanGlideElement;
	/**
	 * Average Daily FTE Hours/Hours Per Person Day
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "decimal"
	 */
    average_daily_fte: IStringGlideElement;
	/**
	 * Cost center
	 * @type {GlideReferenceElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Reference to Cost Center (IGlideRefElement<Icmn_cost_centerGlideRecord>)
	 */
    cost_center: GlideReferenceElement;
	/**
	 * Default assignee
	 * @type {Isys_userGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    default_assignee: Isys_userGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 */
    description: IStringGlideElement;
	/**
	 * Group email
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "email"
	 */
    email: IStringGlideElement;
	/**
	 * Exclude manager
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 */
    exclude_manager: IBooleanGlideElement;
	/**
	 * Hourly rate
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "currency"
	 */
    hourly_rate: IStringGlideElement;
	/**
	 * Include members
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 */
    include_members: IBooleanGlideElement;
	/**
	 * Manager
	 * @type {Isys_userGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    manager: Isys_userGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Parent
	 * @type {Isys_user_groupGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    parent: Isys_user_groupGlideElement;
	/**
	 * Points
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "integer"
	 */
    points: IStringGlideElement;
	/**
	 * Roles
	 * @type {GlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "user_roles"
	 */
    roles: GlideElement;
	/**
	 * Source
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 */
    source: IStringGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Type
	 * @type {GlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "glide_list"
	 */
    type: GlideElement;
	/**
	 * Vendors
	 * @type {GlideElement}
	 * @memberof Isys_user_groupGlideRecord
	 * @description Internal type is "glide_list"
	 */
    vendors: GlideElement;
}

declare interface Icore_companyGlideElement extends IGlideRefElement<Icore_companyGlideRecord> {
	/**
	 * Apple icon
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "user_image"
	 */
    apple_icon: GlideElement;
	/**
	 * Banner image
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "user_image"
	 */
    banner_image: GlideElement;
	/**
	 * UI16 Banner Image
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "user_image"
	 */
    banner_image_light: GlideElement;
	/**
	 * Banner text
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    banner_text: IStringGlideElement;
	/**
	 * City
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    city: IStringGlideElement;
	/**
	 * Contact
	 * @type {Isys_userGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    contact: Isys_userGlideElement;
	/**
	 * Country
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    country: IStringGlideElement;
	/**
	 * Customer
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    customer: IBooleanGlideElement;
	/**
	 * Discount
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "decimal"
	 */
    discount: IStringGlideElement;
	/**
	 * Fax phone
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "ph_number"
	 */
    fax_phone: IStringGlideElement;
	/**
	 * Fiscal year
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "glide_date"
	 */
    fiscal_year: IStringGlideElement;
	/**
	 * Latitude
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "float"
	 */
    latitude: IStringGlideElement;
	/**
	 * Lat long error
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    lat_long_error: IStringGlideElement;
	/**
	 * Longitude
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "float"
	 */
    longitude: IStringGlideElement;
	/**
	 * Manufacturer
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    manufacturer: IBooleanGlideElement;
	/**
	 * Market cap
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "currency"
	 */
    market_cap: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    name: IStringGlideElement;
	/**
	 * Notes
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    notes: IStringGlideElement;
	/**
	 * Number of employees
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "integer"
	 */
    num_employees: IStringGlideElement;
	/**
	 * Parent
	 * @type {Icore_companyGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    parent: Icore_companyGlideElement;
	/**
	 * Phone
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "ph_number"
	 */
    phone: IStringGlideElement;
	/**
	 * Primary
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    primary: IBooleanGlideElement;
	/**
	 * Profits
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "currency"
	 */
    profits: IStringGlideElement;
	/**
	 * Publicly traded
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    publicly_traded: IBooleanGlideElement;
	/**
	 * Rank tier
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    rank_tier: IStringGlideElement;
	/**
	 * Revenue per year
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "currency"
	 */
    revenue_per_year: IStringGlideElement;
	/**
	 * State / Province
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    state: IStringGlideElement;
	/**
	 * Stock price
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    stock_price: IStringGlideElement;
	/**
	 * Stock symbol
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    stock_symbol: IStringGlideElement;
	/**
	 * Street
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "multi_two_lines"
	 */
    street: GlideElement;
	/**
	 * Class
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "sys_class_name"
	 */
    sys_class_name: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Theme
	 * @type {GlideReferenceElement}
	 * @memberof Icore_companyGlideElement
	 * @description Reference to Theme (IGlideRefElement<Isys_ui_themeGlideRecord>)
	 */
    theme: GlideReferenceElement;
	/**
	 * Vendor
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    vendor: IBooleanGlideElement;
	/**
	 * Vendor manager
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "glide_list"
	 */
    vendor_manager: GlideElement;
	/**
	 * Vendor type
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "glide_list"
	 */
    vendor_type: GlideElement;
	/**
	 * Website
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 * @description Internal type is "url"
	 */
    website: IStringGlideElement;
	/**
	 * Zip / Postal code
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideElement
	 */
    zip: IStringGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Company table.
 * @interface Icore_companyGlideRecord
 * @extends {IGlideRecord}
 */
declare interface Icore_companyGlideRecord extends IGlideRecord {
	/**
	 * Apple icon
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "user_image"
	 */
    apple_icon: GlideElement;
	/**
	 * Banner image
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "user_image"
	 */
    banner_image: GlideElement;
	/**
	 * UI16 Banner Image
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "user_image"
	 */
    banner_image_light: GlideElement;
	/**
	 * Banner text
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    banner_text: IStringGlideElement;
	/**
	 * City
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    city: IStringGlideElement;
	/**
	 * Contact
	 * @type {Isys_userGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    contact: Isys_userGlideElement;
	/**
	 * Country
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    country: IStringGlideElement;
	/**
	 * Customer
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    customer: IBooleanGlideElement;
	/**
	 * Discount
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "decimal"
	 */
    discount: IStringGlideElement;
	/**
	 * Fax phone
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "ph_number"
	 */
    fax_phone: IStringGlideElement;
	/**
	 * Fiscal year
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "glide_date"
	 */
    fiscal_year: IStringGlideElement;
	/**
	 * Latitude
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "float"
	 */
    latitude: IStringGlideElement;
	/**
	 * Lat long error
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    lat_long_error: IStringGlideElement;
	/**
	 * Longitude
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "float"
	 */
    longitude: IStringGlideElement;
	/**
	 * Manufacturer
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    manufacturer: IBooleanGlideElement;
	/**
	 * Market cap
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "currency"
	 */
    market_cap: GlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Notes
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    notes: IStringGlideElement;
	/**
	 * Number of employees
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "integer"
	 */
    num_employees: IStringGlideElement;
	/**
	 * Parent
	 * @type {Icore_companyGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    parent: Icore_companyGlideElement;
	/**
	 * Phone
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "ph_number"
	 */
    phone: IStringGlideElement;
	/**
	 * Primary
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    primary: IBooleanGlideElement;
	/**
	 * Profits
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "currency"
	 */
    profits: GlideElement;
	/**
	 * Publicly traded
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    publicly_traded: IBooleanGlideElement;
	/**
	 * Rank tier
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    rank_tier: IStringGlideElement;
	/**
	 * Revenue per year
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "currency"
	 */
    revenue_per_year: GlideElement;
	/**
	 * State / Province
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    state: IStringGlideElement;
	/**
	 * Stock price
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    stock_price: IStringGlideElement;
	/**
	 * Stock symbol
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    stock_symbol: IStringGlideElement;
	/**
	 * Street
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "multi_two_lines"
	 */
    street: GlideElement;
	/**
	 * Class
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "sys_class_name"
	 */
    sys_class_name: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Theme
	 * @type {GlideReferenceElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Reference to Theme (IGlideRefElement<Isys_ui_themeGlideRecord>)
	 */
    theme: GlideReferenceElement;
	/**
	 * Vendor
	 * @type {IBooleanGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    vendor: IBooleanGlideElement;
	/**
	 * Vendor manager
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "glide_list"
	 */
    vendor_manager: GlideElement;
	/**
	 * Vendor type
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "glide_list"
	 */
    vendor_type: GlideElement;
	/**
	 * Website
	 * @type {GlideElement}
	 * @memberof Icore_companyGlideRecord
	 * @description Internal type is "url"
	 */
    website: GlideElement;
	/**
	 * Zip / Postal code
	 * @type {IStringGlideElement}
	 * @memberof Icore_companyGlideRecord
	 */
    zip: IStringGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Department table.
 * @interface Icmn_departmentGlideRecord
 * @extends {IGlideRecord}
 */
declare interface Icmn_departmentGlideRecord extends IGlideRecord {
	/**
	 * Business unit
	 * @type {Ibusiness_unitGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Reference to Business Unit (IGlideRefElement<Ibusiness_unitGlideRecord>)
	 */
    business_unit: Ibusiness_unitGlideElement;
	/**
	 * Code
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 */
    code: IStringGlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Cost center
	 * @type {GlideReferenceElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Reference to Cost Center (IGlideRefElement<Icmn_cost_centerGlideRecord>)
	 */
    cost_center: GlideReferenceElement;
	/**
	 * Department head
	 * @type {Isys_userGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    dept_head: Isys_userGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 */
    description: IStringGlideElement;
	/**
	 * Head count
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Internal type is "integer"
	 */
    head_count: IStringGlideElement;
	/**
	 * ID
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 */
    id: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Parent
	 * @type {Icmn_departmentGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Reference to Department (IGlideRefElement<Icmn_departmentGlideRecord>)
	 */
    parent: Icmn_departmentGlideElement;
	/**
	 * Primary contact
	 * @type {Isys_userGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    primary_contact: Isys_userGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icmn_departmentGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Business Unit table.
 * @interface Ibusiness_unitGlideRecord
 * @extends {IGlideRecord}
 */
declare interface Ibusiness_unitGlideRecord extends IGlideRecord {
	/**
	 * Business Unit Head
	 * @type {Isys_userGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    bu_head: Isys_userGlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Internal type is "wide_text"
	 */
    description: IStringGlideElement;
	/**
	 * Hierarchy level
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Internal type is "integer"
	 */
    hierarchy_level: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Parent
	 * @type {Ibusiness_unitGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Reference to Business Unit (IGlideRefElement<Ibusiness_unitGlideRecord>)
	 */
    parent: Ibusiness_unitGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElement;
	/**
	 * Domain Path
	 * @type {GlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Internal type is "domain_path"
	 */
    sys_domain_path: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Ibusiness_unitGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Location table.
 * @interface Icmn_locationGlideRecord
 * @extends {IGlideRecord}
 */
declare interface Icmn_locationGlideRecord extends IGlideRecord {
	/**
	 * City
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    city: IStringGlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Contact
	 * @type {Isys_userGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    contact: Isys_userGlideElement;
	/**
	 * Country
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    country: IStringGlideElement;
	/**
	 * Fax phone
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    fax_phone: IStringGlideElement;
	/**
	 * Full name
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    full_name: IStringGlideElement;
	/**
	 * Latitude
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Internal type is "float"
	 */
    latitude: IStringGlideElement;
	/**
	 * Lat long error
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    lat_long_error: IStringGlideElement;
	/**
	 * Longitude
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Internal type is "float"
	 */
    longitude: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Parent
	 * @type {Icmn_locationGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    parent: Icmn_locationGlideElement;
	/**
	 * Phone
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    phone: IStringGlideElement;
	/**
	 * Phone territory
	 * @type {GlideReferenceElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Reference to Sys Phone Territory (IGlideRefElement<Isys_phone_territoryGlideRecord>)
	 */
    phone_territory: GlideReferenceElement;
	/**
	 * State / Province
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    state: IStringGlideElement;
	/**
	 * Stock room
	 * @type {IBooleanGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    stock_room: IBooleanGlideElement;
	/**
	 * Street
	 * @type {GlideElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Internal type is "multi_two_lines"
	 */
    street: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Time zone
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    time_zone: IStringGlideElement;
	/**
	 * Zip / Postal Code
	 * @type {IStringGlideElement}
	 * @memberof Icmn_locationGlideRecord
	 */
    zip: IStringGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Building table.
 * @interface Icmn_buildingGlideRecord
 * @extends {IGlideRecord}
 */
declare interface Icmn_buildingGlideRecord extends IGlideRecord {
	/**
	 * Contact
	 * @type {Isys_userGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    contact: Isys_userGlideElement;
	/**
	 * Floors
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 * @description Internal type is "integer"
	 */
    floors: IStringGlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Notes
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 */
    notes: IStringGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Icmn_buildingGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Task table.
 * @interface ItaskGlideRecordBase
 * @extends {IGlideRecord}
 */
declare interface ItaskGlideRecordBase extends IGlideRecord {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof ItaskGlideRecordBase
	 */
    active: IBooleanGlideElement;
	/**
	 * Activity due
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "due_date"
	 */
    activity_due: IStringGlideElement;
	/**
	 * Additional assignee list
	 * @type {GlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "glide_list"
	 */
    additional_assignee_list: GlideElement;
	/**
	 * Approval
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 */
    approval: IStringGlideElement;
	/**
	 * Approval history
	 * @type {GlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "journal"
	 */
    approval_history: GlideElement;
	/**
	 * Approval set
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "glide_date_time"
	 */
    approval_set: IStringGlideElement;
	/**
	 * Assigned to
	 * @type {Isys_userGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    assigned_to: Isys_userGlideElement;
	/**
	 * Assignment group
	 * @type {Isys_user_groupGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    assignment_group: Isys_user_groupGlideElement;
	/**
	 * Business duration
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "glide_duration"
	 */
    business_duration: IStringGlideElement;
	/**
	 * Business service
	 * @type {GlideReferenceElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Reference to Business Service (IGlideRefElement<Icmdb_ci_serviceGlideRecord>)
	 */
    business_service: GlideReferenceElement;
	/**
	 * Duration
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "glide_duration"
	 */
    calendar_duration: IStringGlideElement;
	/**
	 * Closed
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "glide_date_time"
	 */
    closed_at: IStringGlideElement;
	/**
	 * Closed by
	 * @type {Isys_userGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    closed_by: Isys_userGlideElement;
	/**
	 * Close notes
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 */
    close_notes: IStringGlideElement;
	/**
	 * Configuration item
	 * @type {GlideReferenceElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Reference to Configuration Item (IGlideRefElement<Icmdb_ciGlideRecord>)
	 */
    cmdb_ci: GlideReferenceElement;
	/**
	 * Additional comments
	 * @type {GlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "journal_input"
	 */
    comments: GlideElement;
	/**
	 * Comments and Work notes
	 * @type {GlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "journal_list"
	 */
    comments_and_work_notes: GlideElement;
	/**
	 * Company
	 * @type {Icore_companyGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    company: Icore_companyGlideElement;
	/**
	 * Contact type
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 */
    contact_type: IStringGlideElement;
	/**
	 * Contract
	 * @type {GlideReferenceElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Reference to Contract (IGlideRefElement<Iast_contractGlideRecord>)
	 */
    contract: GlideReferenceElement;
	/**
	 * Correlation display
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 */
    correlation_display: IStringGlideElement;
	/**
	 * Correlation ID
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 */
    correlation_id: IStringGlideElement;
	/**
	 * Delivery plan
	 * @type {GlideReferenceElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Reference to Execution Plan (IGlideRefElement<Isc_cat_item_delivery_planGlideRecord>)
	 */
    delivery_plan: GlideReferenceElement;
	/**
	 * Delivery task
	 * @type {GlideReferenceElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Reference to Execution Plan Task (IGlideRefElement<Isc_cat_item_delivery_taskGlideRecord>)
	 */
    delivery_task: GlideReferenceElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 */
    description: IStringGlideElement;
	/**
	 * Due date
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "glide_date_time"
	 */
    due_date: IStringGlideElement;
	/**
	 * Escalation
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "integer"
	 */
    escalation: IStringGlideElement;
	/**
	 * Expected start
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "glide_date_time"
	 */
    expected_start: IStringGlideElement;
	/**
	 * Follow up
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "glide_date_time"
	 */
    follow_up: IStringGlideElement;
	/**
	 * Group list
	 * @type {GlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "glide_list"
	 */
    group_list: GlideElement;
	/**
	 * Impact
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "integer"
	 */
    impact: IStringGlideElement;
	/**
	 * Knowledge
	 * @type {IBooleanGlideElement}
	 * @memberof ItaskGlideRecordBase
	 */
    knowledge: IBooleanGlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Made SLA
	 * @type {IBooleanGlideElement}
	 * @memberof ItaskGlideRecordBase
	 */
    made_sla: IBooleanGlideElement;
	/**
	 * Number
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 */
    number: IStringGlideElement;
	/**
	 * Opened
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "glide_date_time"
	 */
    opened_at: IStringGlideElement;
	/**
	 * Opened by
	 * @type {Isys_userGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    opened_by: Isys_userGlideElement;
	/**
	 * Order
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "integer"
	 */
    order: IStringGlideElement;
	/**
	 * Parent
	 * @type {ItaskGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Reference to Task (IGlideRefElement<ItaskGlideRecord>)
	 */
    parent: ItaskGlideElement;
	/**
	 * Priority
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "integer"
	 */
    priority: IStringGlideElement;
	/**
	 * Reassignment count
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "integer"
	 */
    reassignment_count: IStringGlideElement;
	/**
	 * Rejection goto
	 * @type {ItaskGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Reference to Task (IGlideRefElement<ItaskGlideRecord>)
	 */
    rejection_goto: ItaskGlideElement;
	/**
	 * Service offering
	 * @type {GlideReferenceElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Reference to Service Offering (IGlideRefElement<Iservice_offeringGlideRecord>)
	 */
    service_offering: GlideReferenceElement;
	/**
	 * Short description
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 */
    short_description: IStringGlideElement;
	/**
	 * Skills
	 * @type {GlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "glide_list"
	 */
    skills: GlideElement;
	/**
	 * SLA due
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "due_date"
	 */
    sla_due: IStringGlideElement;
	/**
	 * State
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "integer"
	 */
    state: IStringGlideElement;
	/**
	 * Task type
	 * @type {GlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "sys_class_name"
	 */
    sys_class_name: GlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Domain
	 * @type {GlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "domain_id"
	 */
    sys_domain: GlideElement;
	/**
	 * Domain Path
	 * @type {GlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "domain_path"
	 */
    sys_domain_path: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof ItaskGlideRecordBase
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Time worked
	 * @type {GlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "timer"
	 */
    time_worked: GlideElement;
	/**
	 * Upon approval
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 */
    upon_approval: IStringGlideElement;
	/**
	 * Upon reject
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 */
    upon_reject: IStringGlideElement;
	/**
	 * Urgency
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "integer"
	 */
    urgency: IStringGlideElement;
	/**
	 * User input
	 * @type {GlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "user_input"
	 */
    user_input: GlideElement;
	/**
	 * Variables
	 * @type {GlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "variables"
	 */
    variables: GlideElement;
	/**
	 * Watch list
	 * @type {GlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "glide_list"
	 */
    watch_list: GlideElement;
	/**
	 * Workflow activity
	 * @type {GlideReferenceElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Reference to Workflow Activity (IGlideRefElement<Iwf_activityGlideRecord>)
	 */
    wf_activity: GlideReferenceElement;
	/**
	 * Actual end
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "glide_date_time"
	 */
    work_end: IStringGlideElement;
	/**
	 * Work notes
	 * @type {GlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "journal_input"
	 */
    work_notes: GlideElement;
	/**
	 * Work notes list
	 * @type {GlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "glide_list"
	 */
    work_notes_list: GlideElement;
	/**
	 * Actual start
	 * @type {IStringGlideElement}
	 * @memberof ItaskGlideRecordBase
	 * @description Internal type is "glide_date_time"
	 */
    work_start: IStringGlideElement;
}

/**
 * Generic GlideRecord whose table derrives from the task table.
 * @interface ItaskGlideRecord
 * @extends {ItaskGlideRecordBase}
 * @extends {IGenericGlideRecord}
 */
declare interface ItaskGlideRecord extends ItaskGlideRecordBase, IGenericGlideRecord { }

/**
 * GlideRecord that contains values from a record in the Request table.
 * @interface Isc_requestGlideRecord
 * @extends {Isc_requestGlideRecord extends ItaskGlideRecord}
 */
declare interface Isc_requestGlideRecord extends ItaskGlideRecordBase {
	/**
	 * Resolve Time
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideRecord
	 * @description Internal type is "integer"
	 */
    calendar_stc: IStringGlideElement;
	/**
	 * Delivery address
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideRecord
	 */
    delivery_address: IStringGlideElement;
	/**
	 * Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideRecord
	 * @description Internal type is "currency"
	 */
    price: IStringGlideElement;
	/**
	 * Requested for date
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideRecord
	 * @description Internal type is "glide_date"
	 */
    requested_date: IStringGlideElement;
	/**
	 * Requested for
	 * @type {Isys_userGlideElement}
	 * @memberof Isc_requestGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    requested_for: Isys_userGlideElement;
	/**
	 * Request state
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideRecord
	 */
    request_state: IStringGlideElement;
	/**
	 * Sourceable
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_requestGlideRecord
	 */
    sourceable: IBooleanGlideElement;
	/**
	 * Sourced
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_requestGlideRecord
	 */
    sourced: IBooleanGlideElement;
	/**
	 * Special instructions
	 * @type {IStringGlideElement}
	 * @memberof Isc_requestGlideRecord
	 */
    special_instructions: IStringGlideElement;
	/**
	 * Stage
	 * @type {GlideElement}
	 * @memberof Isc_requestGlideRecord
	 * @description Internal type is "workflow"
	 */
    stage: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_requestGlideRecord
	 */
    sys_id: IGUIDGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Requested Item table.
 * @interface Isc_req_itemGlideRecord
 * @extends {Isc_req_itemGlideRecord extends ItaskGlideRecord}
 */
declare interface Isc_req_itemGlideRecord extends ItaskGlideRecordBase {
	/**
	 * Backordered
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 */
    backordered: IBooleanGlideElement;
	/**
	 * Billable
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 */
    billable: IBooleanGlideElement;
	/**
	 * Item
	 * @type {Isc_cat_itemGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Reference to Catalog Item (IGlideRefElement<Isc_cat_itemGlideRecord>)
	 */
    cat_item: Isc_cat_itemGlideElement;
	/**
	 * Configuration item
	 * @type {GlideReferenceElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Reference to Configuration Item (IGlideRefElement<Icmdb_ciGlideRecord>)
	 */
    configuration_item: GlideReferenceElement;
	/**
	 * Context
	 * @type {GlideReferenceElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Reference to Workflow context (IGlideRefElement<Iwf_contextGlideRecord>)
	 */
    context: GlideReferenceElement;
	/**
	 * Estimated delivery
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    estimated_delivery: IStringGlideElement;
	/**
	 * Order Guide
	 * @type {GlideReferenceElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Reference to Order guide (IGlideRefElement<Isc_cat_item_guideGlideRecord>)
	 */
    order_guide: GlideReferenceElement;
	/**
	 * Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Internal type is "currency"
	 */
    price: IStringGlideElement;
	/**
	 * Quantity
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Internal type is "integer"
	 */
    quantity: IStringGlideElement;
	/**
	 * Quantity Sourced
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Internal type is "integer"
	 */
    quantity_sourced: IStringGlideElement;
	/**
	 * Received
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 */
    received: IBooleanGlideElement;
	/**
	 * Recurring Price Frequency
	 * @type {GlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Internal type is "choice"
	 */
    recurring_frequency: GlideElement;
	/**
	 * Recurring Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Internal type is "price"
	 */
    recurring_price: IStringGlideElement;
	/**
	 * Request
	 * @type {Isc_requestGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Reference to Request (IGlideRefElement<Isc_requestGlideRecord>)
	 */
    request: Isc_requestGlideElement;
	/**
	 * Catalog
	 * @type {Isc_catalogGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Reference to Catalog (IGlideRefElement<Isc_catalogGlideRecord>)
	 */
    sc_catalog: Isc_catalogGlideElement;
	/**
	 * Sourced
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 */
    sourced: IBooleanGlideElement;
	/**
	 * Stage
	 * @type {GlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 * @description Internal type is "workflow"
	 */
    stage: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_req_itemGlideRecord
	 */
    sys_id: IGUIDGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Incident table.
 * @interface IincidentGlideRecord
 * @extends {ItaskGlideRecord}
 */
declare interface IincidentGlideRecord extends ItaskGlideRecordBase {
	/**
	 * Business resolve time
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlideRecord
	 * @description Internal type is "integer"
	 */
    business_stc: IStringGlideElement;
	/**
	 * Resolve time
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlideRecord
	 * @description Internal type is "integer"
	 */
    calendar_stc: IStringGlideElement;
	/**
	 * Caller
	 * @type {Isys_userGlideElement}
	 * @memberof IincidentGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    caller_id: Isys_userGlideElement;
	/**
	 * Category
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlideRecord
	 */
    category: IStringGlideElement;
	/**
	 * Caused by Change
	 * @type {Ichange_requestGlideElement}
	 * @memberof IincidentGlideRecord
	 * @description Reference to Change Request (IGlideRefElement<Ichange_requestGlideRecord>)
	 */
    caused_by: Ichange_requestGlideElement;
	/**
	 * Child Incidents
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlideRecord
	 * @description Internal type is "integer"
	 */
    child_incidents: IStringGlideElement;
	/**
	 * Close code
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlideRecord
	 */
    close_code: IStringGlideElement;
	/**
	 * On hold reason
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlideRecord
	 * @description Internal type is "integer"
	 */
    hold_reason: IStringGlideElement;
	/**
	 * Incident state
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlideRecord
	 * @description Internal type is "integer"
	 */
    incident_state: IStringGlideElement;
	/**
	 * Notify
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlideRecord
	 * @description Internal type is "integer"
	 */
    notify: IStringGlideElement;
	/**
	 * Parent Incident
	 * @type {IincidentGlideElement}
	 * @memberof IincidentGlideRecord
	 * @description Reference to Incident (IGlideRefElement<IincidentGlideRecord>)
	 */
    parent_incident: IincidentGlideElement;
	/**
	 * Problem
	 * @type {IproblemGlideElement}
	 * @memberof IincidentGlideRecord
	 * @description Reference to Problem (IGlideRefElement<IproblemGlideRecord>)
	 */
    problem_id: IproblemGlideElement;
	/**
	 * Last reopened by
	 * @type {Isys_userGlideElement}
	 * @memberof IincidentGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    reopened_by: Isys_userGlideElement;
	/**
	 * Last reopened at
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    reopened_time: IStringGlideElement;
	/**
	 * Reopen count
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlideRecord
	 * @description Internal type is "integer"
	 */
    reopen_count: IStringGlideElement;
	/**
	 * Resolved
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    resolved_at: IStringGlideElement;
	/**
	 * Resolved by
	 * @type {Isys_userGlideElement}
	 * @memberof IincidentGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    resolved_by: Isys_userGlideElement;
	/**
	 * Change Request
	 * @type {Ichange_requestGlideElement}
	 * @memberof IincidentGlideRecord
	 * @description Reference to Change Request (IGlideRefElement<Ichange_requestGlideRecord>)
	 */
    rfc: Ichange_requestGlideElement;
	/**
	 * Severity
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlideRecord
	 * @description Internal type is "integer"
	 */
    severity: IStringGlideElement;
	/**
	 * Subcategory
	 * @type {IStringGlideElement}
	 * @memberof IincidentGlideRecord
	 */
    subcategory: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof IincidentGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Is Mission Related
	 * @type {IBooleanGlideElement}
	 * @memberof IincidentGlideRecord
	 */
    u_is_mission_related: IBooleanGlideElement;
	/**
	 * Network
	 * @type {Ix_44813_phys_net_networkGlideElement}
	 * @memberof IincidentGlideRecord
	 * @description Reference to Physical Network (IGlideRefElement<Ix_44813_phys_net_networkGlideRecord>)
	 */
    u_network: Ix_44813_phys_net_networkGlideElement;
	/**
	 * VIP Priority
	 * @type {IBooleanGlideElement}
	 * @memberof IincidentGlideRecord
	 */
    u_vip_priority: IBooleanGlideElement;
}

declare interface Ichange_requestGlideElement extends ItaskGlideRecordBase {

}

declare interface IproblemGlideElement extends ItaskGlideRecordBase {
}

declare interface Ix_44813_phys_net_networkGlideRecord extends Isys_metadataGlideRecordBase {

}

declare interface Ix_44813_phys_net_networkGlideElement extends Isys_metadataGlideElementBase<Ix_44813_phys_net_networkGlideRecord> {

}
/**
 * Basic definition of a GlideRecord whose table derrives from the sys_metadata (Application File) table.
 * @interface Isys_metadataGlideRecordBase
 * @extends {IGlideRecord}
 */
declare interface Isys_metadataGlideRecordBase extends IGlideRecord {
	/**
	 * Class
	 * @type {GlideElement}
	 * @memberof Isys_metadataGlideRecord
	 * @description Internal type is sys_class_name
	 */
    sys_class_name: GlideElement;
	/**
	 * Display name
	 * @type {IStringGlideElement}
	 * @memberof Isys_metadataGlideRecord
	 */
    sys_name: IStringGlideElement;
	/**
	 * Package
	 * @type {GlideElement>}
	 * @memberof Isys_metadataGlideRecord
	 * @description Reference to Package (IGlideRefElement<Isys_packageGlideRecord>)
	 */
    sys_package: GlideElement;
	/**
	 * Protection policy
	 * @type {IStringGlideElement}
	 * @memberof Isys_metadataGlideRecord
	 */
    sys_policy: IStringGlideElement;
	/**
	 * Application
	 * @type {GlideElement>}
	 * @memberof Isys_metadataGlideRecord
	 * @description Reference to Application (IGlideRefElement<Isys_scopeGlideRecord>)
	 */
    sys_scope: GlideElement;
	/**
	 * Update name
	 * @type {IStringGlideElement}
	 * @memberof Isys_metadataGlideRecord
	 */
    sys_update_name: IStringGlideElement;
}

/**
 * Generic GlideRecord whose table derrives from the sys_metadata (Application File) table.
 * @interface Isys_metadataGlideRecord
 * @extends {Isys_metadataGlideRecordBase}
 * @extends {IGenericGlideRecord}
 */
declare interface Isys_metadataGlideRecord extends Isys_metadataGlideRecordBase, IGenericGlideRecord { }

/**
 * GlideRecord that contains values from a record in the Table table.
 * @interface Isys_db_objectGlideRecord
 * @extends {Isys_metadataGlideRecordBase}
 */
declare interface Isys_db_objectGlideRecord extends Isys_metadataGlideRecordBase {
	/**
	 * Accessible from
	 * @type {IStringGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 */
    access: IStringGlideElement;
	/**
	 * Allow UI actions
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 */
    actions_access: IBooleanGlideElement;
	/**
	 * Allow new fields
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 */
    alter_access: IBooleanGlideElement;
	/**
	 * Caller Access
	 * @type {IStringGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 */
    caller_access: IStringGlideElement;
	/**
	 * Allow client scripts
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 */
    client_scripts_access: IBooleanGlideElement;
	/**
	 * Allow configuration
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 */
    configuration_access: IBooleanGlideElement;
	/**
	 * Can create
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 */
    create_access: IBooleanGlideElement;
	/**
	 * Create access controls
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 */
    create_access_controls: IBooleanGlideElement;
	/**
	 * Can delete
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 */
    delete_access: IBooleanGlideElement;
	/**
	 * Extension model
	 * @type {IStringGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 */
    extension_model: IStringGlideElement;
	/**
	 * Extensible
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 */
    is_extendable: IBooleanGlideElement;
	/**
	 * Label
	 * @type {GlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 * @description Internal type is "documentation_field"
	 */
    label: GlideElement;
	/**
	 * Live feed
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 */
    live_feed_enabled: IBooleanGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Auto number
	 * @type {GlideReferenceElement}
	 * @memberof Isys_db_objectGlideRecord
	 * @description Reference to Number (IGlideRefElement<Isys_numberGlideRecord>)
	 */
    number_ref: GlideReferenceElement;
	/**
	 * Provider class
	 * @type {IStringGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 */
    provider_class: IStringGlideElement;
	/**
	 * Can read
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 */
    read_access: IBooleanGlideElement;
	/**
	 * Extends table
	 * @type {Isys_db_objectGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 * @description Reference to Table (IGlideRefElement<Isys_db_objectGlideRecord>)
	 */
    super_class: Isys_db_objectGlideElement;
	/**
	 * Sys class code
	 * @type {GlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 * @description Internal type is "sys_class_code"
	 */
    sys_class_code: GlideElement;
	/**
	 * Sys class path
	 * @type {GlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 * @description Internal type is "sys_class_path"
	 */
    sys_class_path: GlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Can update
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 */
    update_access: IBooleanGlideElement;
	/**
	 * User role
	 * @type {GlideReferenceElement}
	 * @memberof Isys_db_objectGlideRecord
	 * @description Reference to Role (IGlideRefElement<Isys_user_roleGlideRecord>)
	 */
    user_role: GlideReferenceElement;
	/**
	 * Allow access to this table via web services
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_db_objectGlideRecord
	 */
    ws_access: IBooleanGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Dictionary Entry table.
 * @interface Isys_dictionaryGlideRecord
 * @extends {Isys_metadataGlideRecord}
 */
declare interface Isys_dictionaryGlideRecord extends Isys_metadataGlideRecordBase {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    active: IBooleanGlideElement;
	/**
	 * Array
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    array: IBooleanGlideElement;
	/**
	 * Array denormalized
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    array_denormalized: IBooleanGlideElement;
	/**
	 * Attributes
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    attributes: IStringGlideElement;
	/**
	 * Audit
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    audit: IBooleanGlideElement;
	/**
	 * Calculation
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "script"
	 */
    calculation: GlideElement;
	/**
	 * Choice
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "integer"
	 */
    choice: IStringGlideElement;
	/**
	 * Choice field
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "field_name"
	 */
    choice_field: GlideElement;
	/**
	 * Choice table
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "table_name"
	 */
    choice_table: GlideElement;
	/**
	 * Column label
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "documentation_field"
	 */
    column_label: GlideElement;
	/**
	 * Comments
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    comments: IStringGlideElement;
	/**
	 * Create roles
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "user_roles"
	 */
    create_roles: GlideElement;
	/**
	 * Defaultsort
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "integer"
	 */
    defaultsort: IStringGlideElement;
	/**
	 * Default value
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    default_value: IStringGlideElement;
	/**
	 * Delete roles
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "user_roles"
	 */
    delete_roles: GlideElement;
	/**
	 * Dependent
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    dependent: IStringGlideElement;
	/**
	 * Dependent on field
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "field_name"
	 */
    dependent_on_field: GlideElement;
	/**
	 * Display
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    display: IBooleanGlideElement;
	/**
	 * Dynamic creation
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    dynamic_creation: IBooleanGlideElement;
	/**
	 * Dynamic creation script
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    dynamic_creation_script: IStringGlideElement;
	/**
	 * Dynamic default value
	 * @type {GlideReferenceElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Reference to Dynamic Filter Options (IGlideRefElement<Isys_filter_option_dynamicGlideRecord>)
	 */
    dynamic_default_value: GlideReferenceElement;
	/**
	 * Dynamic ref qual
	 * @type {GlideReferenceElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Reference to Dynamic Filter Options (IGlideRefElement<Isys_filter_option_dynamicGlideRecord>)
	 */
    dynamic_ref_qual: GlideReferenceElement;
	/**
	 * Column name
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    element: IStringGlideElement;
	/**
	 * Element reference
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    element_reference: IBooleanGlideElement;
	/**
	 * Foreign database
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    foreign_database: IStringGlideElement;
	/**
	 * Function definition
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    function_definition: IStringGlideElement;
	/**
	 * Function field
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    function_field: IBooleanGlideElement;
	/**
	 * Type
	 * @type {GlideReferenceElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Reference to Field class (IGlideRefElement<Isys_glide_objectGlideRecord>)
	 */
    internal_type: GlideReferenceElement;
	/**
	 * Mandatory
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    mandatory: IBooleanGlideElement;
	/**
	 * Max length
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "integer"
	 */
    max_length: IStringGlideElement;
	/**
	 * Table
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "table_name"
	 */
    name: GlideElement;
	/**
	 * Next element
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    next_element: IStringGlideElement;
	/**
	 * Primary
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    primary: IBooleanGlideElement;
	/**
	 * Read only
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    read_only: IBooleanGlideElement;
	/**
	 * Read roles
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "user_roles"
	 */
    read_roles: GlideElement;
	/**
	 * Reference
	 * @type {Isys_db_objectGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Reference to Table (IGlideRefElement<Isys_db_objectGlideRecord>)
	 */
    reference: Isys_db_objectGlideElement;
	/**
	 * Reference cascade rule
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    reference_cascade_rule: IStringGlideElement;
	/**
	 * Reference floats
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    reference_floats: IBooleanGlideElement;
	/**
	 * Reference key
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    reference_key: IStringGlideElement;
	/**
	 * Reference qual
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    reference_qual: IStringGlideElement;
	/**
	 * Reference qual condition
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "conditions"
	 */
    reference_qual_condition: GlideElement;
	/**
	 * Reference type
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    reference_type: IStringGlideElement;
	/**
	 * Sizeclass
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "integer"
	 */
    sizeclass: IStringGlideElement;
	/**
	 * Spell check
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    spell_check: IBooleanGlideElement;
	/**
	 * Staged
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    staged: IBooleanGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Table reference
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    table_reference: IBooleanGlideElement;
	/**
	 * Text index
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    text_index: IBooleanGlideElement;
	/**
	 * Unique
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    unique: IBooleanGlideElement;
	/**
	 * Use dependent field
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    use_dependent_field: IBooleanGlideElement;
	/**
	 * Use dynamic default
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    use_dynamic_default: IBooleanGlideElement;
	/**
	 * Use reference qualifier
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    use_reference_qualifier: IStringGlideElement;
	/**
	 * Calculated
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    virtual: IBooleanGlideElement;
	/**
	 * Widget
	 * @type {IStringGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    widget: IStringGlideElement;
	/**
	 * Write roles
	 * @type {GlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 * @description Internal type is "user_roles"
	 */
    write_roles: GlideElement;
	/**
	 * XML view
	 * @type {IBooleanGlideElement}
	 * @memberof Isys_dictionaryGlideRecord
	 */
    xml_view: IBooleanGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Catalog Item table.
 * @interface Isc_cat_itemGlideRecord
 * @extends {Isys_metadataGlideRecord}
 */
declare interface Isc_cat_itemGlideRecord extends Isys_metadataGlideRecordBase {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    active: IBooleanGlideElement;
	/**
	 * Availability
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    availability: IStringGlideElement;
	/**
	 * Billable
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    billable: IBooleanGlideElement;
	/**
	 * Category
	 * @type {Isc_categoryGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Category (IGlideRefElement<Isc_categoryGlideRecord>)
	 */
    category: Isc_categoryGlideElement;
	/**
	 * Cost
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "decimal"
	 */
    cost: IStringGlideElement;
	/**
	 * Cart
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Macro (IGlideRefElement<Isys_ui_macroGlideRecord>)
	 */
    custom_cart: GlideReferenceElement;
	/**
	 * Execution Plan
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Execution Plan (IGlideRefElement<Isc_cat_item_delivery_planGlideRecord>)
	 */
    delivery_plan: GlideReferenceElement;
	/**
	 * Delivery plan script
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "script_plain"
	 */
    delivery_plan_script: GlideElement;
	/**
	 * Delivery time
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "glide_duration"
	 */
    delivery_time: IStringGlideElement;
	/**
	 * Description
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "translated_html"
	 */
    description: GlideElement;
	/**
	 * Entitlement script
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "script_plain"
	 */
    entitlement_script: GlideElement;
	/**
	 * Fulfillment group
	 * @type {Isys_user_groupGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Group (IGlideRefElement<Isys_user_groupGlideRecord>)
	 */
    group: Isys_user_groupGlideElement;
	/**
	 * Hide on Service Portal
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    hide_sp: IBooleanGlideElement;
	/**
	 * Icon
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "user_image"
	 */
    icon: GlideElement;
	/**
	 * Ignore price
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    ignore_price: IBooleanGlideElement;
	/**
	 * Image
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "image"
	 */
    image: GlideElement;
	/**
	 * List Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "currency"
	 */
    list_price: IStringGlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Meta
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    meta: IStringGlideElement;
	/**
	 * Hide price (mobile listings)
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    mobile_hide_price: IBooleanGlideElement;
	/**
	 * Mobile Picture
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "user_image"
	 */
    mobile_picture: GlideElement;
	/**
	 * Mobile Picture Type
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    mobile_picture_type: IStringGlideElement;
	/**
	 * Model
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Product Model (IGlideRefElement<Icmdb_modelGlideRecord>)
	 */
    model: GlideReferenceElement;
	/**
	 * Name
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "translated_text"
	 */
    name: GlideElement;
	/**
	 * No cart
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    no_cart: IBooleanGlideElement;
	/**
	 * No order
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    no_order: IBooleanGlideElement;
	/**
	 * No order now
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    no_order_now: IBooleanGlideElement;
	/**
	 * No proceed checkout
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    no_proceed_checkout: IBooleanGlideElement;
	/**
	 * No quantity
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    no_quantity: IBooleanGlideElement;
	/**
	 * No search
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    no_search: IBooleanGlideElement;
	/**
	 * Omit price in cart
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    omit_price: IBooleanGlideElement;
	/**
	 * Order
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "integer"
	 */
    order: IStringGlideElement;
	/**
	 * Ordered item link
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Ordered Item Link (IGlideRefElement<Isc_ordered_item_linkGlideRecord>)
	 */
    ordered_item_link: GlideReferenceElement;
	/**
	 * Picture
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "user_image"
	 */
    picture: GlideElement;
	/**
	 * Preview link
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "catalog_preview"
	 */
    preview: GlideElement;
	/**
	 * Price
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "price"
	 */
    price: IStringGlideElement;
	/**
	 * Recurring Price Frequency
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "choice"
	 */
    recurring_frequency: GlideElement;
	/**
	 * Recurring price
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "price"
	 */
    recurring_price: IStringGlideElement;
	/**
	 * Roles
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "user_roles"
	 */
    roles: GlideElement;
	/**
	 * Catalogs
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "glide_list"
	 */
    sc_catalogs: GlideElement;
	/**
	 * Created from item design
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Item (IGlideRefElement<Isc_ic_item_stagingGlideRecord>)
	 */
    sc_ic_item_staging: GlideReferenceElement;
	/**
	 * Published version
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "integer"
	 */
    sc_ic_version: IStringGlideElement;
	/**
	 * Short description
	 * @type {GlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Internal type is "translated_text"
	 */
    short_description: GlideElement;
	/**
	 * Expand help for all questions
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    show_variable_help_on_load: IBooleanGlideElement;
	/**
	 * Start closed
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    start_closed: IBooleanGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Template
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Template (IGlideRefElement<Isys_templateGlideRecord>)
	 */
    template: GlideReferenceElement;
	/**
	 * Type
	 * @type {IStringGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    type: IStringGlideElement;
	/**
	 * Use cart layout
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    use_sc_layout: IBooleanGlideElement;
	/**
	 * Vendor
	 * @type {Icore_companyGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Company (IGlideRefElement<Icore_companyGlideRecord>)
	 */
    vendor: Icore_companyGlideElement;
	/**
	 * Visible on Bundles
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    visible_bundle: IBooleanGlideElement;
	/**
	 * Visible on Guides
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    visible_guide: IBooleanGlideElement;
	/**
	 * Visible elsewhere
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_cat_itemGlideRecord
	 */
    visible_standalone: IBooleanGlideElement;
	/**
	 * Workflow
	 * @type {GlideReferenceElement}
	 * @memberof Isc_cat_itemGlideRecord
	 * @description Reference to Workflow (IGlideRefElement<Iwf_workflowGlideRecord>)
	 */
    workflow: GlideReferenceElement;
}

/**
 * GlideRecord that contains values from a record in the Catalog table.
 * @interface Isc_catalogGlideRecord
 * @extends {Isys_metadataGlideRecord}
 */
declare interface Isc_catalogGlideRecord extends Isys_metadataGlideRecordBase {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_catalogGlideRecord
	 */
    active: IBooleanGlideElement;
	/**
	 * Background Color
	 * @type {GlideElement}
	 * @memberof Isc_catalogGlideRecord
	 * @description Internal type is "color"
	 */
    background_color: GlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogGlideRecord
	 * @description Internal type is "translated_text"
	 */
    description: IStringGlideElement;
	/**
	 * 'Continue Shopping' page
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogGlideRecord
	 */
    desktop_continue_shopping: IStringGlideElement;
	/**
	 * 'Catalog Home' Page
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogGlideRecord
	 */
    desktop_home_page: IStringGlideElement;
	/**
	 * Desktop image
	 * @type {GlideElement}
	 * @memberof Isc_catalogGlideRecord
	 * @description Internal type is "user_image"
	 */
    desktop_image: GlideElement;
	/**
	 * Editors
	 * @type {GlideElement}
	 * @memberof Isc_catalogGlideRecord
	 * @description Internal type is "glide_list"
	 */
    editors: GlideElement;
	/**
	 * Enable Wish List
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_catalogGlideRecord
	 */
    enable_wish_list: IBooleanGlideElement;
	/**
	 * Manager
	 * @type {Isys_userGlideElement}
	 * @memberof Isc_catalogGlideRecord
	 * @description Reference to User (IGlideRefElement<Isys_userGlideRecord>)
	 */
    manager: Isys_userGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_catalogGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Title
	 * @type {IStringGlideElement}
	 * @memberof Isc_catalogGlideRecord
	 * @description Internal type is "translated_field"
	 */
    title: IStringGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Category table.
 * @interface Isc_categoryGlideRecord
 * @extends {Isys_metadataGlideRecord}
 */
declare interface Isc_categoryGlideRecord extends Isys_metadataGlideRecordBase {
	/**
	 * Active
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 */
    active: IBooleanGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "translated_text"
	 */
    description: IStringGlideElement;
	/**
	 * Entitlement script
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "script_plain"
	 */
    entitlement_script: GlideElement;
	/**
	 * Header icon
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "user_image"
	 */
    header_icon: GlideElement;
	/**
	 * Homepage image
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "user_image"
	 */
    homepage_image: GlideElement;
	/**
	 * Homepage renderer
	 * @type {GlideReferenceElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Reference to Homepage Category Renderer (IGlideRefElement<Isc_homepage_rendererGlideRecord>)
	 */
    homepage_renderer: GlideReferenceElement;
	/**
	 * Icon
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "user_image"
	 */
    icon: GlideElement;
	/**
	 * Image
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "image"
	 */
    image: GlideElement;
	/**
	 * Location
	 * @type {Icmn_locationGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Reference to Location (IGlideRefElement<Icmn_locationGlideRecord>)
	 */
    location: Icmn_locationGlideElement;
	/**
	 * Hide description (mobile browsing)
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 */
    mobile_hide_description: IBooleanGlideElement;
	/**
	 * Mobile Picture
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "user_image"
	 */
    mobile_picture: GlideElement;
	/**
	 * Mobile Subcategory Render Type
	 * @type {IStringGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 */
    mobile_subcategory_render_type: IStringGlideElement;
	/**
	 * Module link
	 * @type {GlideReferenceElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Reference to Module (IGlideRefElement<Isys_app_moduleGlideRecord>)
	 */
    module: GlideReferenceElement;
	/**
	 * Order
	 * @type {IStringGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "integer"
	 */
    order: IStringGlideElement;
	/**
	 * Parent
	 * @type {Isc_categoryGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Reference to Category (IGlideRefElement<Isc_categoryGlideRecord>)
	 */
    parent: Isc_categoryGlideElement;
	/**
	 * Roles
	 * @type {GlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "user_roles"
	 */
    roles: GlideElement;
	/**
	 * Catalog
	 * @type {Isc_catalogGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Reference to Catalog (IGlideRefElement<Isc_catalogGlideRecord>)
	 */
    sc_catalog: Isc_catalogGlideElement;
	/**
	 * Show in CMS
	 * @type {IBooleanGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 */
    show_in_cms: IBooleanGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Title
	 * @type {IStringGlideElement}
	 * @memberof Isc_categoryGlideRecord
	 * @description Internal type is "translated_text"
	 */
    title: IStringGlideElement;
}

/**
 * GlideRecord that contains values from a record in the Progress Worker table.
 * @interface Isys_progress_workerGlideRecord
 * @extends {IGlideRecord}
 */
declare interface Isys_progress_workerGlideRecord extends IGlideRecord {
	/**
	 * Error message
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    error_message: IStringGlideElement;
	/**
	 * Message
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    message: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Output summary
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    output_summary: IStringGlideElement;
	/**
	 * Queued Time
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 * @description Internal type is "glide_duration"
	 */
    queued_time: IStringGlideElement;
	/**
	 * Run in background
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    run_in_background: IStringBasedGlideElement<BooleanString>;
	/**
	 * State
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    state: IStringBasedGlideElement<GlideProgressWorkerState>;
	/**
	 * Completion code
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    state_code: IStringBasedGlideElement<GlideProgressWorkerCompletionCode>;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Total Execute Time
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 * @description Internal type is "glide_duration"
	 */
    total_execute_time: IStringGlideElement;
	/**
	 * Total Run Time
	 * @type {IStringGlideElement}
	 * @memberof Isys_progress_workerGlideRecord
	 * @description Internal type is "glide_duration"
	 */
    total_run_time: IStringGlideElement;
}
/**
 * GlideRecord that contains values from a record in the System Plugin table.
 * @interface Iv_pluginGlideRecord
 * @extends {IGlideRecord}
 */
declare interface Iv_pluginGlideRecord extends IGlideRecord {
	/**
	 * Status
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    active: IStringGlideElement;
	/**
	 * Available version
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    available_version: IStringGlideElement;
	/**
	 * Definition
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    definition: IStringGlideElement;
	/**
	 * Description
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    description: IStringGlideElement;
	/**
	 * Entitled
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    entitled: IStringGlideElement;
	/**
	 * Has demo data
	 * @type {IBooleanGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    has_demo_data: IBooleanGlideElement;
	/**
	 * Help
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 * @description Internal type is "url"
	 */
    help: IStringGlideElement;
	/**
	 * ID
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    id: IStringGlideElement;
	/**
	 * Licensable
	 * @type {IBooleanGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    licensable: IBooleanGlideElement;
	/**
	 * Subscription Category
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    license_category: IStringGlideElement;
	/**
	 * Subscription Model
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    license_model: IStringGlideElement;
	/**
	 * Name
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    name: IStringGlideElement;
	/**
	 * Path
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    path: IStringGlideElement;
	/**
	 * Provider
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    provider: IStringGlideElement;
	/**
	 * Requires
	 * @type {GlideElement}
	 * @memberof Iv_pluginGlideRecord
	 * @description Internal type is "glide_list"
	 */
    requires: GlideElement;
	/**
	 * Scope
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    scope: IStringGlideElement;
	/**
	 * State
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    state: IStringGlideElement;
	/**
	 * Supports Rollback
	 * @type {IBooleanGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    supports_rollback: IBooleanGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 * @description Internal type is "integer"
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 * @description Internal type is "glide_date_time"
	 */
    sys_updated_on: IStringGlideElement;
	/**
	 * Trackable
	 * @type {IBooleanGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    trackable: IBooleanGlideElement;
	/**
	 * Type
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    type: IStringGlideElement;
	/**
	 * Version
	 * @type {IStringGlideElement}
	 * @memberof Iv_pluginGlideRecord
	 */
    version: IStringGlideElement;
}
/**
 * Generic GlideRecord object.
 * @interface IGenericGlideRecord
 * @extends {IGlideRecord}
 */
declare interface IGenericGlideRecord extends IGlideRecord {
    [key: string]: any;
    getFields(): Packages.java.lang.util.ArrayList;
}

/**
 * GlideRecord API.
 * @class GlideRecord
 * @implements {IGenericGlideRecord}
 */
declare class GlideRecord implements IGenericGlideRecord {
	/**
	 * Sys ID
	 * @type {IGUIDGlideElement}
	 * @memberof GlideRecord
	 */
    sys_id: IGUIDGlideElement;
	/**
	 * Created by
	 * @type {IStringGlideElement}
	 * @memberof GlideRecord
	 */
    sys_created_by: IStringGlideElement;
	/**
	 * Created
	 * @type {GlideElement}
	 * @memberof GlideRecord
	 * @description Internal type is glide_date_time
	 */
    sys_created_on: IStringGlideElement;
	/**
	 * Updates
	 * @type {IStringGlideElement}
	 * @memberof GlideRecord
	 * @description Internal type is integer
	 */
    sys_mod_count: IStringGlideElement;
	/**
	 * Updated by
	 * @type {IStringGlideElement}
	 * @memberof GlideRecord
	 */
    sys_updated_by: IStringGlideElement;
	/**
	 * Updated
	 * @type {GlideElement}
	 * @memberof GlideRecord
	 * @description Internal type is glide_date_time
	 */
    sys_updated_on: IStringGlideElement;
    
    [key: string]: any;
    getFields(): Packages.java.lang.util.ArrayList;
    constructor(tableName: string);

    /**
     * Adds a filter to return active records.
     * @returns {GlideQueryCondition} Filter to return active records.
     */
    addActiveQuery(): GlideQueryCondition;

    /**
     * Adds an encoded query to other queries that may have been set.
     * @param {string} query An encoded query string.
     */
    addEncodedQuery(query: string): void;

    /**
     * Adds a filter to return records based on a relationship in a related table.
     * @param {string} joinTable Table name
     * @param {*} [primaryField] If other than sys_id, the primary field
     * @param {*} [joinTableField] If other than sys_id, the field that joins the tables
     * @returns {GlideQueryCondition} A filter that lists records where the relationships match.
     */
    addJoinQuery(joinTable: string, primaryField?: any, joinTableField?: any): GlideQueryCondition;

    /**
     * A filter that specifies records where the value of the field passed in the parameter is not null.
     * @param {string} fieldName The name of the field to be checked.
     * @returns {GlideQueryCondition} A filter that specifies records where the value of the field passed in the parameter is not null.
     */
    addNotNullQuery(fieldName: string): GlideQueryCondition;
    /**
     * Adds a filter to return records where the value of the specified field is null.
     * @param {string} fieldName The name of the field to be checked.
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addNullQuery(fieldName: string): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @param {string} query An encoded query string.
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(query: string): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @param {string} name Table field name.
     * @param {*} value Value on which to query (not case-sensitive).
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(name: string, value: any): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.
     * @param {string} name Table field name.
     * @param {string} operator Query operator (=,!=,>,>=,<,<=,IN,NOT IN,STARTSWITH,ENDSWITH,CONTAINS,DOES NOT CONTAIN,INSTANCEOF).
     * @param {*} value Value on which to query (not case-sensitive).
     * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
     */
    addQuery(name: string, operator: QueryOperator, value: any): GlideQueryCondition;
    /**
     * Determines if the Access Control Rules, which include the user's roles, permit inserting new records in this table.
     * @returns {boolean} True if the user's roles permit creation of new records in this table.
     */
    canCreate(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit deleting records in this table.
     * @returns {boolean} True if the user's roles permit deletions of records in this table.
     */
    canDelete(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit reading records in this table.
     * @returns {boolean} True if the user's roles permit reading records from this table.
     */
    canRead(): boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit editing records in this table.
     * @returns {boolean} True if the user's roles permit writing to records from this table.
     */
    canWrite(): boolean;

    /**
     * Sets a range of rows to be returned by subsequent queries.
     * @param {number} firstRow The first row to include.
     * @param {number} lastRow The last row to include.
     * @param {boolean} forceCount If true, the getRowCount() method will return all possible records.
     */
    chooseWindow(firstRow: number, lastRow: number, forceCount: boolean): void;

    /**
     * Deletes multiple records that satisfy the query condition.
     */
    deleteMultiple(): void;

    /**
     * Deletes the current record.
     * @returns {boolean} True if the record was deleted; false if no record was found to delete.
     */
    deleteRecord(): boolean;
    /**
     * Defines a GlideRecord based on the specified expression of 'name = value'.
     * @param {string} name Column name
     * @param {*} [value] Value to match. If value is not specified, then the expression used is 'sys_id = name'.
     * @returns {boolean} True if one or more matching records was found. False if no matches found.
     */
    get(name: string, value?: any): boolean;

    /**
     * Returns the dictionary attributes for the specified field.
     * @param {string} fieldName Field name for which to return the dictionary attributes
     * @returns {string|null|undefined} Dictionary attributes
     */
    getAttribute(fieldName: string): string | null | undefined;

    /**
     * Returns the table's label.
     * @returns {string} Table's label
     */
    getClassDisplayValue(): string;

    /**
     * Retrieves the display value for the current record.
     * @returns {string|null|undefined} The display value for the current record.
     */
    getDisplayValue(): string | null | undefined;
    getED(): GlideElementDescriptor;

    /**
     * Retrieves the GlideElement object for the specified field.
     * @param {string} columnName Name of the column to get the element from.
     * @returns {GlideElement} The GlideElement for the specified column of the current record.
     */
    getElement(columnName: string): GlideElement;

    /**
     * Retrieves the query condition of the current result set as an encoded query string.
     * @returns {string} The encoded query as a string.
     */
    getEncodedQuery(): string;

    /**
     * Returns the field's label.
     * @returns {string} Field's label.
     */
    getLabel(): string;

    /**
     * Retrieves the last error message. If there is no last error message, null is returned.
     * @returns {string|null|undefined} The last error message as a string.
     */
    getLastErrorMessage(): string | null | undefined;

    /**
     * Retrieves a link to the current record.
     * @param {boolean} noStack If true, the sysparm_stack parameter is not appended to the link. The parameter sysparm_stack specifies the page to visit after closing the current link.
     * @returns {string} A link to the current record as a string.
     */
    getLink(noStack: boolean): string;
    /**
     * Retrieves the class name for the current record.
     * @returns {string} The class name.
     */
    getRecordClassName(): string;

    /**
     * Retrieves the number of rows in the query result.
     * @returns {number} The number of rows.
     */
    getRowCount(): number;

    /**
     * Retrieves the name of the table associated with the GlideRecord.
     * @returns {string} The table name.
     */
    getTableName(): string;
    /**
     * Gets the primary key of the record, which is usually the sys_id unless otherwise specified.
     * @returns {string|null|undefined} The unique primary key as a String, or null if the key is null.
     */
    getUniqueValue(): string | null | undefined;

    /**
     * Retrieves the string value of an underlying element in a field.
     * @param {string} name The name of the field to get the value from.
     * @returns {string|null|undefined} The value of the field.
     */
    getValue(name: string): string | null | undefined;

    /**
     * Determines if there are any more records in the GlideRecord object.
     * @returns {boolean} True if there are more records in the query result set.
     */
    hasNext(): boolean;
    /**
     * Inserts a new record using the field values that have been set for the current record.
     * @returns {string} Unique ID of the inserted record, or null if the record is not inserted.
     */
    insert(): string;

    /**
     * Creates an empty record suitable for population before an insert.
     */
    initialize(): void;

    /**
     * Checks to see if the current database action is to be aborted.
     * @returns {boolean} True if the current database action is to be aborted.
     */
    isActionAborted(): boolean;
    /**
     * Checks if the current record is a new record that has not yet been inserted into the database.
     * @returns {boolean} True if the record is new and has not been inserted into the database.
     */
    isNewRecord(): boolean;

    /**
     * Determines if the table exists.
     * @returns {boolean} True if table is valid or if record was successfully retrieved. False if table is invalid or record was not successfully retrieved.
     */
    isValid(): boolean;

    /**
     * Determines if the specified field is defined in the current table.
     * @param {string} columnName The name of the the field.
     * @returns {boolean} True if the field is defined for the current table.
     */
    isValidField(columnName: string): boolean;

    /**
     * Determines if current record is a valid record.
     * @returns {boolean} True if the current record is valid. False if past the end of the record set.
     */
    isValidRecord(): boolean;
    /**
     * Creates a new GlideRecord record, sets the default values for the fields, and assigns a unique ID to the record.
     */
    newRecord(): void;

    /**
     * Moves to the next record in the GlideRecord object.
     * @returns {boolean} True if moving to the next record is successful. False if there are no more records in the result set.
     */
    next(): boolean;

    /**
     * Moves to the next record in the GlideRecord object.
     * @returns {boolean} True if moving to the next record is successful. False if there are no more records in the result set.
     */
    _next(): boolean;
    /**
     * Retrieves the current operation being performed, such as insert, update, or delete.
     * @returns {string} The current operation.
     */
    operation(): string;

    /**
     * Specifies an orderBy column.
     * @param {string} name The column name used to order the records in this GlideRecord object.
     */
    orderBy(name: string): void;

    query(): void;
    _query(): void;

    /**
     * Runs the query against the table based on the filters specified by addQuery, addEncodedQuery, etc.
     * @param {string} [name] The column name to query on.
     * @param {*} [value] The value to query for.
     */
    query(field?: string, value?: any): void;

    /**
     * Runs the query against the table based on the filters specified by addQuery, addEncodedQuery, etc.
     * @param {string} [name] The column name to query on.
     * @param {*} [value] The value to query for.
     */
    _query(field: string, value: any): void;

    /**
     * Specifies a decending orderBy column.
     * @param {string} name The column name used to order the records in this GlideRecord object.
     */
    orderByDesc(name: string): void;
    /**
     * Sets a flag to indicate if the next database action (insert, update, delete) is to be aborted. This is often used in business rules.
     * @param b True to abort the next action. False if the action is to be allowed.
     */
    setAbortAction(b: boolean): void;

    /**
     * Sets the limit for number of records are fetched by the GlideRecord query.
     * @param {number} maxNumRecords The maximum number of records to fetch.
     */
    setLimit(maxNumRecords: number): void;
    /**
     * Sets sys_id value for the current record.
     * @param {string} guid The GUID to be assigned to the current record.
     */
    setNewGuidValue(guid: string): void;

    /**
     * Sets the value of the field with the specified name to the specified value.
     * @param {string} name Name of the field.
     * @param {*} value The value to assign to the field.
     */
    setValue(name: string, value: any): void;

    /**
     * Enables or disables the running of business rules, script engines, and audit.
     * @param {boolean} enable If true (default), enables business rules. If false, disables business rules.
     */
    setWorkflow(enable: boolean): void;

    /**
     * Updates the GlideRecord with any changes that have been made. If the record does not already exist, it is inserted.
     * @param {string} [reason] The reason for the update. The reason is displayed in the audit record.
     * @returns {string|null} Unique ID of the new or updated record. Returns null if the update fails.
     */
    update(reason?: string): string | null;

    /**
     * Updates each GlideRecord in the list with any changes that have been made.
     */
    updateMultiple(): void;
}

/**
 * GlideSession API.
 * @class GlideSession
 */
declare abstract class GlideSession {
    getClientData(paramName: string): string;
    getClientIP(): string;
    getCurrentApplicationId(): string;
    getLanguage(): string;
    getSessionToken(): string;
    getTimeZoneName(): string;
    getUrlOnStack(): string;
    isImpersonating(): boolean;
    isInteractive(): boolean;
    isLoggedIn(): boolean;
    putClientData(paramName: string, paramValue: string): void;
}

/**
 * GlideUser API.
 * @class GlideUser
 */
declare abstract class GlideUser {
    /**
     * Returns the current user's company sys_id.
     * @returns {string} Company sys_id.
     */
    getCompanyID(): string;

    /**
     * Returns the current user's display name.
     * @returns {string} User's display name
     */
    getDisplayName(): string;
    getDomainID(): string;
    /**
     * Returns the user's email address.
     * @returns {string} User's email address
     */
    getEmail(): string;
    /**
     * Returns the user's first name.
     * @returns {string} User's first name
     */
    getFirstName(): string;
    /**
     * Gets the sys_id of the current user.
     * @returns {string} User's sys_id
     */
    getID(): string;
    /**
     * Returns the user's last name.
     * @returns {string} User's last name
     */
    getLastName(): string;

    /**
     * Returns the user ID, or login name, of the current user.
     * @returns {string} User ID
     */
    getName(): string;
    /**
     * Gets the specified user preference value for the current user.
     * @param name The name of the preference.
     * @returns {string} The preference value.
     */
    getPreference(name: string): string;

    /**
     * Returns a list of roles that includes explicitly granted roles, inherited roles, and roles acquired by group membership.
     * @returns {string[]} List of all roles available to the user.
     */
    getRoles(): string[];
    /**
     * Returns the list of roles explicitly granted to the user.
     * @returns {string[]} List of roles explicitly assigned to the user.
     */
    getUserRoles(): string[];
    /**
     * Returns true if the current user belongs to any of the specified roles.
     * @param {string} role - The name of a role or a comma-separated string containing role names.
     * @returns {boolean}
     * @memberof GlideUser
     */
    hasRole(role: string): boolean;
    /**
     * Returns true if the current user belongs to all of the specified roles.
     * @param {string} roles - Names of all required roles.
     * @returns {boolean}
     * @memberof GlideUser
     */
    hasRole(roles: string[]): boolean;
    /**
     * Returns true if the current user has any roles.
     * @returns {boolean}
     * @memberof GlideUser
     */
    hasRoles(): boolean;

    /**
     * Determines if the current user is a member of the specified group.
     * @param group Group to check
     * @returns {boolean} True if the user is a member of the group.
     */
    isMemberOf(group: string): boolean;

    /**
     * Saves a user preference value to the database.
     * @param name The preference to save.
     * @param value The preference value.
     */
    savePreference(name: string, value: string): void;
}

/**
 * GlideUri API.
 * @class GlideURI
 */
declare class GlideURI {
    constructor();
    /**
     * Returns the specified parameter.
     * @param name The parameter name.
     * @returns {string} The value for the specified parameter.
     */
    get(name: string): string;

    /**
     * Returns the file name portion of the URI.
     * @returns {string} The file name portion of the URI.
     */
    getFileFromPath(): string;

    /**
     * Sets the specified parameter to the specified value.
     * @param name The parameter name.
     * @param value The value.
     */
    set(name: string, value: string): void;

    /**
     * Reconstructs the URI string and performs the proper URL encoding by converting non-valid characters to their URL code. For example, converting & to '%26'.
     * @param path The base portion of the system URL to which the URI is appended.
     * @returns {string} The URL.
     */
    toString(path: string): string;
}


declare interface IEmailWatermark  {
	getWatermark(): string;
}

/**
 * GlideEmail API.
 * @class GlideEmail
 */
declare abstract class GlideEmail  {
	/**
	 * Adds the recipient to either the cc or bcc list
	 * @param {"cc"|"bcc"} type Either cc or bcc, determines the list to which the address is added.
	 * @param {string} address The recipient's email address.
	 * @param {string} [displayName] The name to be shown instead of the email address.
	 */
	addAddress(type: "cc"|"bcc", address: string, displayName?: string): void;

	/**
	 * 
	 * @param address 
	 */
	addRecipient(address: string): void;

	/**
	 * Instantiates a scoped GlideEmailOutbound object.
	 * @param {string} [body] Body of message
	 */
	constructor(body?: string);

	/**
	 * 
	 */
	getSMSText(): string;

	/**
	 * Returns the email's subject line.
	 * @returns {string} The email's subject line.
	 */
	getSubject(): string;
	getTextBody(): string;
	getWatermark(): IEmailWatermark;

	/**
	 * Sets the body of the email.
	 * @param body The body of the email.
	 */
	setBody(body: string): void;

	/**
	 * Sets the sender's address.
	 * @param from The sender's email address.
	 */
	setFrom(address: string): void;
	setRecipients(recipients: string): void;

	/**
	 * Sets the reply to address.
	 * @param replyTo The reply to email address.
	 */
	setReplyTo(address: string): void;

	/**
	 * Sets the email's subject line.
	 * @param subject Text for the subject line.
	 */
	setSubject(subject: string): void;
}

declare class GlideEmailOutbound extends GlideEmail {
	// constructor(actionType: string);
	// constructor();
	// constructor(action: GlideRecord);
	// constructor(action: GlideRecord, m: IEmailWatermark);
	constructor(actionType_OR_action?: string|GlideRecord, m?: IEmailWatermark);
	save(): void;
}

declare abstract class JSUtil {
    static doesNotHave(item: any): boolean;
    static escapeAttr(text: string): string;
    static escapeText(text: string): string;
    static getBooleanValue(gr: GlideRecord, field: string);
    static has(item: any): boolean;
    static instance_of(item: any, className: string): boolean;
    static isJavaObject(value: any): boolean;
    static logObject(value: any, name: string): void;
    static nil(value: any): boolean;
    static notNil(value: any): boolean;
    static toBoolean(value: any): boolean;
    static type_of(value: any): string;
    static unescapeAttr(vtext: string): string;
    static unescapeText(vtext: string): string;
}

declare class ArrayUtil {
    concat<T>(parent: T[], child: T[]): T[];
    contains<T>(array: T[], element: T): boolean;
    convertArray(a: any): any[];
    diff<T>(parent: T[], child: T[]): T[];
    ensureArray(o: Packages.java.lang.util.Collection | Packages.java.lang.util.Set | any[]): any[];
    indexOf<T>(array: T[], element: T, startIndex?: number): number;
    intersect<T>(a: T[], b: T[]): T[];
    union<T>(a: T[], b: T[]): T[];
    unique<T>(parent: T[]): T[];
}

declare interface GlidePlugin {
    getDescription(): any;
    getDisplayName(): string;
    getName(): string;
    getPath(): string;
    refreshArtifacts(): void;
}

declare interface GlideExtensionPoint {
    getAttribute(name: string): string;
}

/**
 * GlidePluginManager API.
 * @class GlidePluginManager
 */
declare class GlidePluginManager {
    constructor();

    /**
     * Determines if the specified plugin has been activated.
     * @param plugin_id - The plugin ID
     * @returns {boolean} True if the plugin has been activated.
     */
    isActive(plugin_id: string): boolean;
}

declare interface ScriptedProgressWorkerCallback {
    process(...args: any[]): void;
}

declare interface IServerClass {
    intialize(...args: (any | null | undefined)[]): void;
    type: string;
}

declare interface IBackgroundProgressWorkerHandler extends IServerClass {
    process(...args: (any | null | undefined)[]): void;
}

declare type GlideProgressWorkerState = "starting" | "running" | "complete" | "cancelled" | "unknown";

declare type GlideProgressWorkerCompletionCode = "success" | "cancelled" | "error";

/**
 * GlideProgressWorker API.
 * @class GlideProgressWorker
 */
declare class GlideProgressWorker {
    constructor();
    getProgressID(): string;
    setOutputSummary(msg: string): void;
    setProgressErrorState(): void;
    setProgressMessage(m: string): void;
    setProgressName(name: string): void;
    setProgressState(status: GlideProgressWorkerState): void;
    setProgressStateCode(stateCode: GlideProgressWorkerCompletionCode): void;
    setBackground(isBackground: boolean): void;
    start(): void;
}

/**
 * GlideScriptedProgressWorker API.
 * @class GlideScriptedProgressWorker
 */
declare class GlideScriptedProgressWorker extends GlideProgressWorker {
    addMessage(message: string): void;
    addNonEscapedParameter(parm: string): void;
    addParameter(parm: string): void;
    constructor();
    setName(name: string): void;
}

/**
 * GlidePluginManagerWorker API.
 * @class GlidePluginManagerWorker
 */
declare class GlidePluginManagerWorker extends GlideProgressWorker {
    setPluginId(id: string): void;
    setIncludeDemoData(includeDemoData: boolean): void;
}

declare class GlideChoice {
    // constructor(value: string, label: string);
    // constructor(value: string, label: string, sysId: string);
    constructor(value: string, label: string, sysId?: string);
    getId(): string;
    getImage(): string;
    getLabel(): string;
    getParameter(name: string): any;
    getSelected(): boolean;
    getValue(): string;
    setId(sysId: string): void;
    setImage(image: string): void;
    setLabel(string_1: string): void;
    setParameter(name: string, value: any): void;
    setSelected(selected: boolean): void;
    setValue(string_1: string): void;
}

declare class GlideScriptEvaluator {
    constructor();
    evaluateGeneratedString(expression: string, returnError: boolean): any;
    // evaluateString(expression: string, returnError: boolean): any;
    // evaluateString(expression: string, identifierKey: string, returnError: boolean): any;
    evaluateString(expression: string, returnError_OR_identifierKey: boolean | string, returnError?: boolean): any;
    haveError(): boolean;
    setEnforceSecurity(enforce: boolean): void;
}

declare class GlideEvaluator extends GlideScriptEvaluator {
    // constructor();
    // constructor(inter: boolean);
    // constructor(inter: boolean, strict: boolean);
    constructor(inter?: boolean, strict?: boolean);
    static evaluateCondition(condition: string): boolean;
    // evaluateString(expression: string, returnError: boolean): any;
    // evaluateString(expression: string, identifierKey: string, returnError: boolean): any;
    // static evaluateString(expression: string): any;
    evaluateString(expression: string, returnError_OR_identifierKey?: boolean | string, returnError?: boolean): any;
    static evaluateStringWithGlobals(expression: string, globals: { [key: string]: any; }): any;
    // static interpretGeneratedString(expression: string): any;
    // static interpretGeneratedString(expression: string, returnError: boolean): any;
    static interpretGeneratedString(expression: string, returnError?: boolean): any;
    // static interpretString(expression: string): any;
    // static interpretString(expression: string, returnError: boolean): any;
    static interpretString(expression: string, returnError?: boolean): any;
}

declare class GlideLRUCache {
    // constructor();
    // constructor(initialCapacity: number, loadFactor: number);
    // constructor(initialCapacity: number);
    constructor(initialCapacity?: number, loadFactor?: number);
    get(key: any): any;
}

declare class GlideController extends GlideEvaluator {
    // constructor();
    // constructor(global: any);
    constructor(global?: any);
    // evaluateAsObject(expression: string): any;
    // evaluateAsObject(expression: string, ed: GlideElementDescriptor): any;
    evaluateAsObject(expression: string, ed?: GlideElementDescriptor): any;
    static exists(name: string): any;
    static getCache(): GlideLRUCache;
    static getGlobal(name: string): any;
    static getSandboxGlobal(name: string): any;
    static putGlobal(name: string, value: any): void;
    static removeGlobal(string_1: string): void;
}

declare class GlideXMLDocument {
    // constructor();
    // constructor(d: any);
    // constructor(rootName: string);
    // constructor(file: any);
    constructor(d_OR_rootName_OR_file?: any | string);
    createCDATAElement(name: string, value: string): any;
    createComment(msg: string): any;
    // createElement(name: string, value: string): any;
    // createElement(name: string): any;
    createElement(name: string, value?: string): any;
    getChildTextByTagName(parent: any, tagName: string): string;
    getDocument(): any;
    getDocumentElement(): any;
    getElementByTagName(tagName: string): any;
    getElementValueByTagName(tagName: string): string;
    importElement(e: any): any;
    importElementToParent(e: any, parent: any): any;
    isNamespaceAware(): boolean;
    isValid(): boolean;
    parse(xml: string): boolean;
    pop(): void;
    selectNodes(xpath: string): any;
    // selectSingleNode(xpath: string): any;
    // selectSingleNode(currentNode: any, xpath: string): any;
    selectSingleNode(xpath_OR_currentNode: string | any, xpath?: string): any;
    selectSingleNodeText(xpath: string): string;
    setAttribute(name: string, value: string): void;
    setCurrent(e: any): void;
    // setDocument(document: any): void;
    // setDocument(document: string): void;
    setDocument(document: any | string): void;
    setNamespaceAware(nsAware: boolean): void;
    setText(e: any, text: string): void;
    toIndentedString(): string;
    toString(): string;
}

declare class GlideChoiceList {
    // add(choice: GlideChoice): boolean;
    // add(value: string, label: string): GlideChoice;
    add(choice_OR_value: GlideChoice | string, label?: string): boolean;
    addAll(cl: GlideChoiceList): void;
    addFirst(value: string, label: string): void;
    addNone(): GlideChoice;
    constructor();
    // getChoice(index: number): GlideChoice;
    // getChoice(value: string): GlideChoice;
    getChoice(index_OR_value: number | string): GlideChoice;
    static getChoiceList(tableName: string, fieldName: string): GlideChoiceList;
    getChoiceNoTrim(value: string): GlideChoice;
    getLabelOf(value: string): string;
    getNullOverride(gc: GlideController): string;
    getSelectedIndex(): number;
    getSize(): number;
    getValueOf(label: string): string;
    // removeChoice(value: string): GlideChoice;
    // removeChoice(i: number): GlideChoice;
    removeChoice(value_OR_i: string | number): GlideChoice;
    removeNone(): void;
    sort(): void;
    toJSON(): any;
    toXML(x: GlideXMLDocument): void;
}

declare class GlideSysForm {
    // constructor(tableName: string);
    // constructor(tableName: string, viewName: string);
    // constructor();
    constructor(tableName?: string, viewName?: string);
    createDefaultBaselineVersion(record: GlideRecord): void;
    static generateDefaultForm(tableName: string): string;
    static getRelatedTables(tableName: string): GlideChoiceList;
    getSuggestedFields(): Array<string>;
    getTableName(): string;
    save(): void;
    setAvailable(available: string): void;
    setCollection(s: string): void;
    setForm(form: string): void;
    setName(name: string): void;
    setPackageID(packageID: string): void;
    setScopeID(scopeID: string): void;
    setSelected(selected: string): void;
    setTablePackageID(): void;
    setTableScopeID(): void;
    setView(viewName: string): void;
    setViewName(viewName: string): void;
}

declare class GlideChoiceListSet {
    constructor();
    getColumns(): GlideChoiceList;
    getSelected(): GlideChoiceList;
    setColumns(clColumns: GlideChoiceList): void;
    setSelected(clSelected: GlideChoiceList): void;
    sortColumns(): void;
    toXML(): any;
}

declare class GlideSysList extends GlideSysForm {
    InsertListElements(fields: Array<any>): void;
    // constructor(tableName: string);
    // constructor(tableName: string, parentName: string);
    constructor(tableName: string, parentName?: string);
    createDefaultBaseline(): void;
    getAccessList(collectionKey: string): Array<string>;
    getListColumns(): GlideChoiceList;
    getListRecords(): Array<string>;
    getListSet(): GlideChoiceListSet;
    getRecordSet(): GlideRecord;
    getStandardListID(): string;
    isUserList(): boolean;
    // save(): void;
    // save(fields: string): void;
    save(fields?: string): void;
    saveForUser(fields: string): void;
    setIncludeFormatting(b: boolean): void;
    setReconcileList(b: boolean): void;
    setRelatedParentID(parentID: string): void;
    setRelatedParentName(parentName: string): void;
    setRelationshipID(relationshipID: string): void;
    setUserApplies(b: boolean): void;
}

declare class GlideUpdateManager2 {
    allowBackout(sysId: string): boolean;
    allowVersionBackout(sysId: string): boolean;
    // constructor();
    // constructor(updateSetId: string);
    constructor(updateSetId?: string);
    getDefaultUpdateName(tableName: string, uniqueValue: string): string;
    getUpdateName(gr: GlideRecord): string;
    // load(updateName: string): void;
    // load(updateName: string, directory: string): void;
    load(updateName: string, directory?: string): void;
    loadFile(filePath: string): void;
    // loadFixes(updateName: string, before: boolean): void;
    // loadFixes(updateName: string): void;
    loadFixes(updateName: string, before?: boolean): void;
    loadFromDatabase(category: string): void;
    loadIntoDatabase(category: string): boolean;
    // loadXML(xml: string): void;
    // loadXML(xml: string, writeVersion: boolean, revertedFrom: string, sourceTable: string, sourceId: string): void;
    loadXML(xml: string, writeVersion?: boolean, revertedFrom?: string, sourceTable?: string, sourceId?: string): void;
    removeUpdateSet(setID: string): void;
    saveBaselineChoiceListElements(tableName: string, fieldName: string): void;
    saveChoiceListElements(tableName: string, fieldName: string): void;
    saveListElements(sl: GlideSysList): void;
    saveRecord(gr: GlideRecord): boolean;
    setInstalling(b: boolean): void;
}

declare class GlideActionURL {
    setRedirectURL(o: any): void;
}

/**
 * Class for performing date operators and working with GlideDate fields.
 * @class GlideDate
 */
declare class GlideDate {
    /**
     * Creates a GlideDate object with the current date time.
     */
    constructor();

    /**
     * Gets the date in the specified date format.
     * @param {string} format The desired date format.
     * @returns {string} The date in the specified format.
     */
    getByFormat(format: string): string;

    /**
     * Gets the day of the month stored by the {@link GlideDate} object, expressed in the UTC time zone.
     * @returns {number} The day of the month in the UTC time zone, from 1 to 31.
     */
    getDayOfMonthNoTZ(): number;

    /**
     * Gets the date in the current user's display format and time zone.
     * @returns {string} The date in the user's format and time zone.
     * @description Keep in mind when designing business rules or script includes that this method may return values in different formats for different users.
     */
    getDisplayValue(): string;

    /**
     * Gets the display value in the internal format (yyyy-MM-dd).
     * @returns {string} The date values for the {@link GlideDate} object in the current user's time zone and the internal time format of yyyy-MM-dd.
     */
    getDisplayValueInternal(): string;

    /**
     * Gets the month stored by the {@link GlideDate} object, expressed in the UTC time zone.
     * @returns {number} The numerical value of the month from 1 to 12.
     */
    getMonthNoTZ(): number;

    /**
     * Gets the date value stored in the database by the {@link GlideDate} object in the internal format, yyyy-MM-dd, and the system time zone, UTC by default.
     * @returns {string} The date value in the internal format and system time zone.
     */
    getValue(): string;

    /**
     * Gets the year stored by the {@link GlideDate} object, expressed in the UTC time zone.
     * @returns {number} The numerical value of the year.
     */
    getYearNoTZ(): number;

    /**
     * Sets a date value using the current user's display format and time zone.
     * @param {string} asDisplayed The date in the current user's display format and time zone.
     * @description The parameter must be formatted using the current user's preferred display format, such as yyyy-MM-dd.
     */
    setDisplayValue(asDisplayed: string): void;

    /**
     * Sets the date of the {@link GlideDate} object.
     * @param {string} o The date and time to use.
     */
    setValue(o: string): void;

    /**
     * Gets the duration difference between two {@link GlideDate} values.
     * @param {GlideDate} start The start value.
     * @param {GlideDate} end The end value.
     * @returns {GlideDate} The {@link GlideDate|duration} between the two values.
     */
    static subtract(start: GlideDate, end: GlideDate): GlideDate;
}

/**
 * Class for performing time operations and working with GlideTime fields.
 * @class GlideTime
 */
declare class GlideTime {
    /**
     * Instantiates a GlideTime object
     * @param {number|GlideTime} [milliseconds] The time in milliseconds.
     * @description If a parameter is passed, the object is initialized with the specified number of seconds.
     * If a {@link GlideTime} object is passed, then that object will be cloned. Otherwise, it is initiated with the current time.
     */
    constructor(milliseconds?: number | GlideTime);

    /**
     * Gets the time in the specified format.
     * @param {string} format The time format.
     * @returns {string} The time in the specified format.
     */
    getByFormat(format: string): string;

    /**
     * Gets the time in the current user's display format and time zone.
     * @returns {string} The time in the user's format and time zone.
     * @description When designing business rules or script includes remember that this method may return values in different formats for different users.
     */
    getDisplayValue(): string;

    /**
     * Gets the display value in the current user's time zone and the internal format (HH:mm:ss).
     * @returns {string} The time value for the GlideTime object in the current user's time zone and the internal time format of HH:mm:ss.
     */
    getDisplayValueInternal(): string;

    /**
     * Returns the hours part of the time using the local time zone.
     * @returns {number} The hours using the local time zone.
     */
    getHourLocalTime(): number;

    /**
     * Returns the hours part of the time using the local time zone.
     * @returns {number} The hours using the local time zone.
     * @description The number of hours is based on a 24 hour clock.
     */
    getHourOfDayLocalTime(): number;

    /**
     * Returns the hours part of the time using the UTC time zone.
     * @returns {number} The hours using the UTC time zone.
     * @description The number of hours is based on a 24 hour clock.
     */
    getHourOfDayUTC(): number;

    /**
     * Returns the hours part of the time using the UTC time zone.
     * @returns {number} The hours using the UTC time zone.
     * @description The number of hours is based on a 12 hour clock. Noon and midnight are represented by 0, not 12.
     */
    getHourUTC(): number;

    /**
     * Returns the number of minutes using the local time zone.
     * @returns {number} The number of minutes using the local time zone.
     */
    getMinutesLocalTime(): number;

    /**
     * Returns the number of minutes in the hour based on the UTC time zone.
     * @returns {number} The number of minutes in the hour using the UTC time zone.
     */
    getMinutesUTC(): number;

    /**
     * Returns the number of seconds in the current minute.
     * @returns {number} The number of seconds in the minute.
     */
    getSeconds(): number;

    /**
     * Gets the time value stored in the database by the {@link GlideTime} object in the internal format, HH:mm:ss, and the system time zone.
     * @returns {string} The time value in the internal fomat and system time zone.
     */
    getValue(): string;

    getXMLValue(): string;

    setXMLValue(xml: string): void;

    /**
     * Sets a time value using the current user's display format and time zone.
     * @param {string} asDisplayed The time in the current user's display format and time zone.
     * @description The parameter must be formatted using the current user's preferred display format, such as HH:mm:ss.
     */
    setDisplayValue(asDisplayed: string): void;

    /**
     * Sets the time of the {@link GlideTime} object in the internal time zone.
     * @param {string | GlideElement} o The time in hh:mm:ss format.
     */
    setValue(o: string | GlideElement): void;

    /**
     * Gets the duration difference between two {@link GlideTime} object values.
     * @param {GlideTime} startTime The start value.
     * @param {GlideTime} endTime The end value.
     * @returns {GlideTime} The duration between the two values.
     */
    static subtract(startTime: GlideTime, endTime: GlideTime): GlideTime;
}

/**
 * Class for working with spans of time or durations.
 * @description GlideDuration objects store the duration as a date and time from January 1, 1970, 00:00:00.
 * As a result, {@link GlideDuration#setValue|setValue()} and {@link GlideDuration#getValue|getValue()} use the scoped GlideDateTime object for parameters and return values.
 * @class GlideDuration
 */
declare class GlideDuration extends GlideTime {
    /**
     * Instantiates a {@link GlideDuration} object. by cloning the value of another {@link GlideDuration} object.
     * @param {number|string|GlideDuration} [value] If a number is passed, then this is instantiated with the specified duration in milliseconds.
     * If a string is passed, then this is initialized with the specified display value. If a {@link GlideDuration} object is passed, then this is cloned from that object.
     */
    constructor(value?: number | string | GlideDuration);

    /**
     * Add the specified duration to the object.
     * @param {GlideDuration} other The value to add to the object.
     * @returns {GlideDuration} The sum of the current and the added duration.
     */
    add(other: GlideDuration): GlideDuration;

    /**
     * Gets the number of days.
     * @returns {number} The number of days.
     */
    getDayPart(): number;

    /**
     * Gets the duration value in "d HH:mm:ss" format.
     * @returns {string} The duration value.
     */
    getDurationValue(): string;

    /**
     * Gets the rounded number of days.
     * @returns {number} The day part, rounded.
     * @description If the time part is more than 12 hours, the return value is rounded up. Otherwise, it is rounded down.
     */
    getRoundedDayPart(): number;

    /**
     * Subtracts the specified duration from the current duration.
     * @param {GlideDuration} duration The duration to subtract.
     */
    subtract(duration: GlideDuration): void;
}

/**
 * Class for performing date/time operations and working with glide_date_time fields.
 * @description Methods in this class perform date-time operations, such as instantiating a GlideDateTime object, performing date-time calculations, formatting a date-time,
 * or converting between date-time formats.
 * @class GlideDateTime
 */
declare class GlideDateTime {
    /**
     * Instantiates a new {@link GlideDateTime} object.
     * @param {string|GlideDateTime} [value] {@link GlideDateTime} to initialize from or string representation of date and time value in the UTC time zone specified with the
     * format yyyy-MM-dd HH:mm:ss. If omitted, then it is initialized with the current date and time in Greenwich Mean Time (GMT).
     */
    constructor(value?: string | GlideDateTime);

    /**
     * Adds a {@link GlideTime} object or milliseconds to the current {@link GlideDateTime} object
     * @param {GlideTime|number} value The {@link GlideTime|time} or milliseconds to add.
     */
    add(value: GlideTime | number): void;

    /**
     * Adds a specified number of days to the current {@link GlideDateTime} object. A negative parameter subtracts days.
     * @param {number} days The number of days to add. Use a negative value to subtract.
     * @deprecated Use {@link GlideDateTime#addDaysLocalTime|addDaysLocalTime()} and {@link GlideDateTime#addDaysUTC|addDaysUTC()} instead of this method.
     */
    addDays(days: number): void;

    /**
     * Adds a specified number of days to the current {@link GlideDateTime} object.
     * @param {number} days The number of days to add. Use a negative value to subtract.
     * @description A negative parameter subtracts days. The method determines the local date and time equivalent to the value stored by the {@link GlideDateTime} object,
     * then adds or subtracts days using the local date and time values.
     */
    addDaysLocalTime(days: number): void;

    /**
     * Adds a specified number of days to the current {@link GlideDateTime} object.
     * @param {number} days The number of days to add. Use a negative number to subtract.
     * @description A negative parameter subtracts days. The method determines the UTC date and time equivalent to the value stored by the {@link GlideDateTime} object,
     * then adds or subtracts days using the UTC date and time values.
     */
    addDaysUTC(days: number): void;

    /**
     * Adds a specified number of months to the current {@link GlideDateTime} object.
     * @param {number} months The number of months to add. Use a negative number to subtract.
     * @deprecated Use {@link GlideDateTime#addMonthsLocalTime|addMonthsLocalTime()} and {@link GlideDateTime#addMonthsUTC|addMonthsUTC()} instead of this method.
     */
    addMonths(months: number): void;

    /**
     * Adds a specified number of months to the current {@link GlideDateTime} object.
     * @param {number} months The number of months to add. Use a negative value to subtract.
     * @description A negative parameter subtracts months. The method determines the local date and time equivalent to the value stored by the {@link GlideDateTime} object,
     * then adds or subtracts months using the local date and time values.
     */
    addMonthsLocalTime(months: number): void;

    /**
     * Adds a specified number of months to the current {@link GlideDateTime} object.
     * @param {number} months The number of months to add. Use a negative value to subtract.
     * @description A negative parameter subtracts months. The method determines the UTC date and time equivalent to the value stored by the {@link GlideDateTime} object,
     * then adds or subtracts months using the UTC date and time values.
     */
    addMonthsUTC(months: number): void;

    /**
     * Adds the specified number of seconds to the current {@link GlideDateTime} object.
     * @param {number} seconds The number of seconds to add.
     */
    addSeconds(seconds: number): void;

    /**
     * Adds a specified number of weeks to the current {@link GlideDateTime} object.
     * @param {number} weeks The number of weeks to add. Use a negative number to subtract.
     * @deprecated Use {@link GlideDateTime#addWeeksLocalTime|addWeeksLocalTime()} and {@link GlideDateTime#addWeeksUTC|addWeeksUTC()} instead of this method.
     */
    addWeeks(weeks: number): void;

    /**
     * dds a specified number of weeks to the current {@link GlideDateTime} object.
     * @param {number} weeks The number of weeks to add. Use a negative value to subtract.
     * @description The method determines the local date and time equivalent to the value stored by the {@link GlideDateTime} object, then adds or subtracts weeks using the
     * local date and time values.
     */
    addWeeksLocalTime(weeks: number): void;

    /**
     * Adds a specified number of weeks to the current {@link GlideDateTime} object.
     * @param {number} weeks The number of weeks to add. Use a negative value to subtract.
     * @description A negative parameter subtracts weeks. The method determines the UTC date and time equivalent to the value stored by the {@link GlideDateTime} object,
     * then adds or subtracts weeks using the UTC date and time values.
     */
    addWeeksUTC(weeks: number): void;

    /**
     * Adds a specified number of years to the current {@link GlideDateTime} object.
     * @param {number} years The number of years to add. Use a negative number to subtract.
     * @deprecated Use {@link GlideDateTime#addYearsLocalTime|addYearsLocalTime()} and {@link GlideDateTime#addYearsUTC|addYearsUTC()} instead of this method.
     */
    addYears(years: number): void;

    /**
     * Adds a specified number of years to the current {@link GlideDateTime} object.
     * @param {number} years The number of years to add. Use a negative value to subtract.
     * @description The method determines the local date and time equivalent to the value stored by the {@link GlideDateTime} object, then adds or subtracts years using the
     * local date and time values.
     */
    addYearsLocalTime(years: number): void;

    /**
     * Adds a specified number of years to the current {@link GlideDateTime} object.
     * @param {number} years The number of years to add. Use a negative value to subtract.
     * @description A negative parameter subtracts years. The date and time value stored by {@link GlideDateTime} object is interpreted as being in the UTC time zone.
     */
    addYearsUTC(years: number): void;

    /**
     * Determines if the {@link GlideDateTime} object occurs after the specified {@link GlideDateTime}.
     * @param {GlideDateTime} gdt The time to check against.
     * @returns {boolean} Returns true if the {@link GlideDateTime} object's time is after the time specified by the parameter.
     */
    after(gdt: GlideDateTime): boolean;

    /**
     * Determines if the {@link GlideDateTime} object occurs before the specified {@link GlideDateTime}.
     * @param {GlideDateTime} gdt The time to check against.
     * @returns {boolean} Returns true if the {@link GlideDateTime} object's time is before the time specified by the parameter.
     */
    before(gdt: GlideDateTime): boolean;

    /**
     * Compares two date and time objects to determine whether they are equivalent or one occurs before or after the other.
     * @param {*} o Date and time object in {@link GlideDateTime} format.
     * @returns {number} 0 = Dates are equal; 1 = The object's date is after the date specified in the parameter; -1 = The object's date is before the date specified in the
     * parameter.
     */
    compareTo(o: any): number;

    /**
     * Compares a datetime with an existing value for equality.
     * @param {GlideDateTime|string} o The datetime to compare.
     * @returns {boolean} Returns true if they are equal; otherwise, false.
     */
    equals(o: any): boolean;

    /**
     * Gets the {@link GlideDate|date} stored by the {@link GlideDateTime} object, expressed in the standard format, yyyy-MM-dd, and the system time zone, UTC by default.
     * @returns {GlideDate} The {@link GlideDate|date} in the system time zone.
     */
    getDate(): GlideDate;

    /**
     * Returns the current day of the month in the UTC time zone.
     * @returns {number} The day of the month in the UTC time zone, from 1 to 31.
     * @deprecated Use {@link GlideDateTime#getDayOfMonthLocalTime|getDayOfMonthLocalTime()} and {@link GlideDateTime#getDayOfMonthUTC|getDayOfMonthUTC()} instead of this method.
     */
    getDayOfMonth(): number;

    /**
     * Gets the day of the month stored by the {@link GlideDateTime} object, expressed in the current user's time zone.
     * @returns {number} The day of the month in the user's time zone, from 1 to 31.
     */
    getDayOfMonthLocalTime(): number;

    /**
     * Gets the day of the month stored by the {@link GlideDateTime} object, expressed in the UTC time zone.
     * @returns {number} The day of the month in the UTC time zone, from 1 to 31.
     */
    getDayOfMonthUTC(): number;

    /**
     * Returns the day of the week stored by the {@link GlideDateTime} object, expressed in the user's time zone.
     * @returns {number} The day of the week value - Monday = 1, ... Sunday = 7.
     * @deprecated Use {@link GlideDateTime#getDayOfWeekLocalTime|getDayOfWeekLocalTime()} and {@link GlideDateTime#getDayOfWeekUTC|getDayOfWeekUTC()} instead of this method.
     */
    getDayOfWeek(): number;

    /**
     * Gets the day of the week stored by the {@link GlideDateTime} object, expressed in the user's time zone.
     * @returns {number} The day of week value, in the user's time zone, from 1 to 7. Monday equals 1, Sunday equals 7.
     */
    getDayOfWeekLocalTime(): number;

    /**
     * Gets the day of the week stored by the {@link GlideDateTime} object, expressed in the UTC time zone.
     * @returns {number} The day of week value from 1 to 7. Monday equals 1, Sunday equals 7.
     */
    getDayOfWeekUTC(): number;

    /**
     * Returns the number of days in the month stored by the {@link GlideDateTime} object, expressed in the Java Virtual Machine time zone.
     * @returns {number} The number of days in the current month in the Java Virtual Machine time zone.
     * @deprecated Use {@link GlideDateTime#getDaysInMonthLocalTime|getDaysInMonthLocalTime()} and {@link GlideDateTime#getDaysInMonthUTC|getDaysInMonthUTC()} instead of this method.
     */
    getDaysInMonth(): number;

    /**
     * Gets the number of days in the month stored by the {@link GlideDateTime} object, expressed in the current user's time zone.
     * @returns {number} The number of days in the current month in the user's time zone.
     */
    getDaysInMonthLocalTime(): number;

    /**
     * Gets the number of days in the month stored by the {@link GlideDateTime} object, expressed in the UTC time zone.
     * @returns {number} The number of days in the month stored by the {@link GlideDateTime} object, expressed in the UTC time zone.
     */
    getDaysInMonthUTC(): number;

    /**
     * Gets the date and time value in the current user's display format and time zone.
     * @returns {string} The date and time in the user's format and time zone.
     * @description Keep in mind when designing business rules or script includes that this method may return values in different formats for different users.
     */
    getDisplayValue(): string;

    /**
     * Gets the display value in the internal format (yyyy-MM-dd HH:mm:ss).
     * @returns {string} The date and time values for the {@link GlideDateTime} object in the current user's time zone and the internal date and time format of
     * yyyy-MM-dd HH:mm:ss.
     */
    getDisplayValueInternal(): string;

    /**
     * Gets the amount of time that daylight saving time is offset.
     * @returns {number} Amount of time, in milliseconds, that daylight saving is offset. Returns 0 if there is no offset or if the time is not during daylight saving time.
     */
    getDSTOffset(): number;

    /**
     * Gets the current error message.
     * @returns {string} The error message.
     */
    getErrorMsg(): string | null | undefined;

    /**
     * Returns the object's time in the local time zone and in the internal format.
     * @returns {string} The object's time in the local time zone and the internal format.
     */
    getInternalFormattedLocalTime(): string;

    /**
     * Returns a date and time object set to midnight of a specified day using UTC.
     * @param dayOfTheWeek The day of the week for which to return the date/time object.
     * @returns {GlideDateTime} A {@link GlideDateTime} object set to midnight.
     */
    getInternalMidnight(dayOfTheWeek: number): GlideDateTime;

    /**
     * Gets the {@link GlideDate|date} stored by the {@link GlideDateTime} object, expressed in the standard format, yyyy-MM-dd, and the current user's time zone.
     * @returns {GlideDate} The {@link GlideDate|date} in the user's time zone.
     */
    getLocalDate(): GlideDate;

    /**
     * Returns a {@link GlideTime} object that represents the time portion of the {@link GlideDateTime} object in the user's time zone.
     * @returns {GlideTime} The {@link GlideTime|time} in the user's time zone.
     */
    getLocalTime(): GlideTime;

    /**
     * Returns the month stored by the {@link GlideDateTime} object, expressed in Java Virtual Machine time zone.
     * @returns {number} The numerical value of the month, Jan=1, Dec=12.
     * @deprecated Use {@link GlideDateTime#getMonthLocalTime|getMonthLocalTime()} and {@link GlideDateTime#getMonthUTC|getMonthUTC()} instead of this method.
     */
    getMonth(): number;

    /**
     * Gets the month stored by the {@link GlideDateTime} object, expressed in the current user's time zone.
     * @returns {number} The numerical value of the month.
     */
    getMonthLocalTime(): number;

    /**
     * Gets the month stored by the {@link GlideDateTime} object, expressed in the UTC time zone.
     * @returns {number} The numerical value of the month.
     */
    getMonthUTC(): number;

    /**
     * Gets the number of milliseconds since January 1, 1970, 00:00:00 GMT.
     * @returns {number} The number of milliseconds since January 1, 1970, 00:00:00 GMT.
     */
    getNumericValue(): number;

    /**
     * Returns the amount of time elapsed since the midnight of a specified day to the current time.
     * @param dayOfTheWeek Day of week value from 1 to 7. 1 = Monday, 7=Sunday.
     * @returns {GlideDateTime} The amount of time elapsed since midnight of the specified day.
     * @description To display the result in user-friendly terms, set the value to {@link GlideDuration}.
     */
    getSpanTime(dayOfTheWeek: number): GlideDateTime;

    /**
     * Returns the Unix duration stamp.
     * @returns {GlideTime} The Unix duration stamp in system format based on GMT time.
     */
    getTime(): GlideTime;

    /**
     * Gets the time zone offset in milliseconds.
     * @returns {number} The number of milliseconds of time zone offset.
     */
    getTZOffset(): number;

    /**
     * Returns the object's time in the local time zone and in the user's format.
     * @returns {string} The object's time in the local time zone and in the user's format.
     */
    getUserFormattedLocalTime(): string;

    /**
     * Returns the time zone for the current user session.
     * @returns {string} The {@link TimeZone} object for the current user.
     */
    getUserTimeZone(): TimeZone;

    /**
     * Returns a {@link GlideDateTime} object with the time set to midnight using the UTC time zone.
     * @param dayOfTheWeek The day of the week, from 1 to 7. Monday=1, Sunday=7. Do not enter 0 in this parameter.
     * @returns {GlideDateTime} A new {@link GlideDateTime} object set to midnight.
     */
    getUTCMidnight(dayOfTheWeek: number): GlideDateTime;

    /**
     * Gets the date and time value stored by the {@link GlideDateTime} object in the internal format, yyyy-MM-dd HH:mm:ss, and the system time zone, UTC by default.
     * @returns {string} The date and time value in the internal format and system time zone.
     */
    getValue(): string;

    /**
     * Gets the number of the week stored by the {@link GlideDateTime} object, expressed in the current user's time zone.
     * @returns {number} The number of the current week in local time. The highest week number in a year is either 52 or 53.
     * @description All weeks begin on Sunday. The first week of the year is the week that contains at least one day of the new year. The week beginning Sunday
     * 2015-12-27 is considered the first week of 2016 as that week contains January 1 and 2.
     */
    getWeekOfYearLocalTime(): number;

    /**
     * Gets the number of the week stored by the {@link GlideDateTime} object, expressed in the UTC time zone.
     * @returns {number} The number of the current week in UTC time. The highest week number in a year is either 52 or 53.
     * @description All weeks begin on Sunday. The first week of the year is the week that contains at least one day of the new year. The week beginning Sunday 2015-12-27
     * is considered the first week of 2016 as that week contains January 1 and 2.
     */
    getWeekOfYearUTC(): number;

    /**
     * Returns the year stored by the {@link GlideDateTime} object, expressed in the Java Virtual Machine time zone.
     * @returns {number} The 4-digit year value in the Java Virtual Machine time zone.
     * @deprecated Use {@link GlideDateTime#getYearLocalTime|getYearLocalTime()} and {@link GlideDateTime#getYearUTC|getYearUTC()} instead of this method.
     */
    getYear(): number;

    /**
     * Gets the year stored by the {@link GlideDateTime} object, expressed in the current user's time zone.
     * @returns {number} Four-digit year value in the user's time zone.
     */
    getYearLocalTime(): number;

    /**
     * Gets the year stored by the {@link GlideDateTime} object, expressed in the UTC time zone.
     * @returns {number} 4-digit year value in the UTC time zone.
     */
    getYearUTC(): number;

    /**
     * Determines if an object's date is set.
     * @returns {boolean} True if the object date is set; otherwise, returns false.
     */
    hasDate(): boolean;

    /**
     * Determines if an object's time uses a daylight saving offset.
     * @returns {boolean} True if the time is daylight saving; otherwise, returns false.
     */
    isDST(): boolean;

    /**
     * Determines if a value is a valid date and time.
     * @returns {boolean} True if value is valid; otherwise, returns false.
     */
    isValid(): boolean;

    /**
     * Determines if the {@link GlideDateTime} object occurs on or after the specified {@link GlideDateTime}.
     * @param {GlideDateTime} gdt The time to check against.
     * @returns {boolean} Returns true if the {@link GlideDateTime} object's time is on or after the time specified by the parameter.
     */
    onOrAfter(gdt: GlideDateTime): boolean;

    /**
     * Determines if the {@link GlideDateTime} object occurs on or before the specified {@link GlideDateTime}.
     * @param {GlideDateTime} gdt The time to check against.
     * @returns {boolean} Returns true if the {@link GlideDateTime} object's time is on or before the time specified by the parameter.
     */
    onOrBefore(gdt: GlideDateTime): boolean;

    /**
     * Sets the day of the month to a specified value.
     * @param {number} day Day of the month, from 1 to 31.
     * @deprecated Use {@link GlideDateTime#setDayOfMonthLocalTime|setDayOfMonthLocalTime()} and {@link GlideDateTime#setDayOfMonthUTC|setDayOfMonthUTC()} instead of this method.
     */
    setDayOfMonth(day: number): void;

    /**
     * Sets the day of the month to a specified value.
     * @param {number} day The day of month to change to, from 1 to 31. If this value is greater than the maximum number of days in the month, the value is set to the last
     * day of the month.
     */
    setDayOfMonthLocalTime(day: number): void;

    /**
     * Sets the day of the month to a specified value in the UTC time zone.
     * @param {number} day The day of month to change to, from 1 to 31. If this value is greater than the maximum number of days in the month, the value is set to the last
     * day of the month.
     */
    setDayOfMonthUTC(day: number): void;

    /**
     * Sets a date and time value using the current user's display format and time zone.
     * @param {string} asDisplayed The date and time in the current user's display format and time zone.
     * @param {string} [format] The date and time format to use to parse the value parameter.
     * @description If the 'format' parameter is used, this method throws a runtime exception if the date and time format used in the value parameter does not match the
     * format parameter. You can retrieve the error message by calling {@link GlideDateTime#getErrorMsg|getErrorMsg()} on the {@link GlideDateTime} object after the
     * exception is caught.
     * If the 'format' parameter is not used, then the 'asDisplayed' parameter must be formatted using the current user's preferred display format, such as
     * MM-dd-yyyy HH:mm:ss. To assign the current date and time to a variable in a workflow script, use
     * variable.setDisplayValue({@link GlideSystem#nowDateTime|gs.nowDateTime});.
     */
    setDisplayValue(asDisplayed: string, format?: string): void;

    /**
     * Sets a date and time value using the internal format (yyyy-MM-dd HH:mm:ss) and the current user's time zone.
     * @param {string} asDisplayed The date and time in internal format.
     */
    setDisplayValueInternal(asDisplayed: string): void;

    /**
     * Sets a date and time value using the internal format (yyyy-MM-dd HH:mm:ss) and the current user's time zone.
     * @param {string} dateTime The date and time in internal format.
     * @description This method attempts to parse incomplete date and time values.
     */
    setDisplayValueInternalWithAlternates(dateTime: string): void;

    /**
     * Sets the date and time of the current object using an existing {@link GlideDateTime} object.
     * @param {GlideDateTime} gdt The object to use for setting the datetime value.
     * @description This method is equivalent to instantiating a new object with a {@link GlideDateTime} parameter.
     */
    setGlideDateTime(gdt: GlideDateTime): void;

    /**
     * Sets the date and time.
     * @param {string|GlideDateTime} dateTime The date and time to use.
     * @description This method is equivalent to {@link GlideDateTime#setValue|setValue(Object)}.
     */
    setInitialValue(dateTime: string): void;

    /**
     * Sets the month stored by the {@link GlideDateTime} object to a specified value using the Java Virtual Machine time zone.
     * @param {number} month The month to change to.
     * @deprecated Use {@link GlideDateTime#setMonthLocalTime|setMonthLocalTime()} and {@link GlideDateTime#setMonthUTC|setMonthUTC()} instead of this method.
     */
    setMonth(month: number): void;

    /**
     * Sets the month stored by the {@link GlideDateTime} object to the specified value using the current user's time zone.
     * @param {number} month The month to change to.
     */
    setMonthLocalTime(month: number): void;

    /**
     * Sets the month stored by the {@link GlideDateTime} object to the specified value using the UTC time zone.
     * @param {number} month The month to change to.
     */
    setMonthUTC(month: number): void;

    /**
     * Sets the date and time to the number of milliseconds since January 1, 1970 00:00:00 GMT.
     * @param {number} milliseconds Number of milliseconds.
     */
    setNumericValue(milliseconds: number): void;

    /**
     * Sets the time zone of the GlideDateTime object to be the specified time zone.
     * @param {TimeZone} timeZone A time zone object.
     */
    setTZ(timeZone: TimeZone): void;

    /**
     * Sets the date and time of the {@link GlideDateTime} object.
     * @param {string | GlideElement} o The date and time to use.
     * This parameter may be one of several types: 
     * A string in the UTC time zone and the internal format of yyyy-MM-dd HH:mm:ss: Sets the value of the object to the specified date and time.
     * Using the method this way is equivalent to instantiating a new {@link GlideDateTime} object using the {@link GlideDateTime|GlideDateTime(String value)} constructor.
     * If the date and time format used does not match the internal format, the method attempts to set the date and time using other available formats.
     * Resolving the date and time this way can lead to inaccurate data due to ambiguity in the day and month values. When using a non-standard date and time format,
     * use {@link GlideDateTime#setValueUTC|setValueUTC(String dt, String format)} instead.
     * -- or --
     * A {@link GlideDateTime} object. Sets the value of the object to the date and time stored by the {@link GlideDateTime} passed in the parameter.
     * Using the method this way is equivalent to instantiating a new {@link GlideDateTime} object using the {@link GlideDateTime|GlideDateTime(GlideDateTime g)} constructor.
     * -- or --
     * A JavaScript Number. Sets the value of the object using the Number value as milliseconds past January 1, 1970 00:00:00 GMT.
     */
    setValue(o: string | GlideElement): void;

    /**
     * Sets a date and time value using the UTC time zone and the specified date and time format.
     * @param {string} dt The date and time to use.
     * @param {string} format The date and time format to use.
     * @description This method throws a runtime exception if the date and time format used in the dt parameter does not match the format parameter.
     * You can retrieve the error message by calling {@link GlideDateTime#getErrorMsg|getErrorMsg()} on the {@link GlideDateTime} object after the exception is caught.
     */
    setValueUTC(dt: string, format: string): void;

    /**
     * Sets the year stored by the {@link GlideDateTime} object to a specified value using the Java Virtual Machine time zone.
     * @param {number} year The year to change to.
     * @deprecated Use {@link GlideDateTime#setYearLocalTime|setYearLocalTime()} and {@link GlideDateTime#setYearUTC|setYearUTC()} instead of this method.
     */
    setYear(year: number): void;

    /**
     * Sets the year stored by the {@link GlideDateTime} object to the specified value using the current user's time zone.
     * @param {number} year The year to change to.
     */
    setYearLocalTime(year: number): void;

    /**
     * Sets the year stored by the {@link GlideDateTime} object to the specified value using the UTC time zone.
     * @param {number} year The year to change to.
     */
    setYearUTC(year: number): void;

    /**
     * Gets the duration difference between two {@link GlideDateTime} values.
     * @param {GlideDateTime} start The start value.
     * @param {GlideDateTime} end The end value.
     * @returns {GlideDuration} The {@link GlideDuration|duration} between the two values
     */
    static subtract(start: GlideDateTime, end: GlideDateTime): GlideDuration;

    /**
     * Subtracts a specified amount of time from the current {@link GlideDateTime} object.
     * @param {GlideTime|number} value The {@link GlideTime|time} value or milliseconds to subtract.
     */
    subtract(value: GlideTime | number): void;

    /**
     * Gets the date and time value stored by the {@link GlideDateTime} object in the internal format, yyyy-MM-dd HH:mm:ss, and the system time zone, UTC by default.
     * @returns {string} The date and time stored by the {@link GlideDateTime} object in the system time zone and format.
     * @description This method is equivalent to {@link GlideDateTime#getValue|getValue()}.
     */
    toString(): string;
}

/**
 * Represents a time zone offset, and also figures out daylight savings.
 * @class TimeZone
 */
declare class TimeZone {
    /**
     * Creates a copy of this TimeZone.
     * @returns {TimeZone}
     * @memberof TimeZone
     */
    clone(): TimeZone;

    /**
     * Returns the amount of time to be added to local standard time to get local wall clock time.
     * @returns {number}
     * @memberof TimeZone
     */
    getDSTSavings(): number;

    /**
     * Returns a long standard time name of this TimeZone suitable for presentation to the user in the default locale.
     * @returns {string}
     * @memberof TimeZone
     */
    getDisplayName(): string;

    /**
     * Returns a name in the specified style of this TimeZone suitable for presentation to the user in the default locale. If the specified daylight is true, a Daylight Saving Time name is returned (even if this TimeZone doesn't observe Daylight Saving Time). Otherwise, a Standard Time name is returned.
     * @param {boolean} daylight
     * @param {number} style
     * @memberof TimeZone
     */
    getDisplayName(daylight: boolean, style: number);

    /**
     * Gets the ID of this time zone.
     * @returns {string}
     * @memberof TimeZone
     */
    getID(): string;

    /**
     * Returns the offset of this time zone from UTC at the specified date. If Daylight Saving Time is in effect at the specified date, the offset value is adjusted with the amount of daylight saving.
     * @param {number} date
     * @returns {number}
     * @memberof TimeZone
     */
    getOffset(date: number): number;

    /**
     * Gets the time zone offset, for current date, modified in case of daylight savings. This is the offset to add to UTC to get local time.
     * @param {number} era
     * @param {number} year
     * @param {number} month
     * @param {number} day
     * @param {number} dayOfWeek
     * @param {number} milliseconds
     * @returns {number}
     * @memberof TimeZone
     */
    getOffset(era: number, year: number, month: number, day: number, dayOfWeek: number, milliseconds: number): number;

    /**
     * Gets the raw GMT offset and the amount of daylight saving of this time zone at the given time.
     * @param {number} date
     * @param {number[]} offsets
     * @returns {number}
     * @memberof TimeZone
     */
    getOffsets(date: number, offsets: number[]): number;

    /**
     * Returns true if this zone has the same rule and offset as another zone. That is, if this zone differs only in ID, if at all. Returns false if the other zone is null.
     * @param {TimeZone} other
     * @memberof TimeZone
     */
    hasSameRules(other: TimeZone);

    /**
     * Returns true if this TimeZone is currently in Daylight Saving Time, or if a transition from Standard Time to Daylight Saving Time occurs at any future time.
     * @returns {boolean}
     * @memberof TimeZone
     */
    observesDaylightTime(): boolean;

    /**
     * Sets the time zone ID. This does not change any other data in the time zone object.
     * @param {string} id
     * @memberof TimeZone
     */
    setID(id: string);

    /**
     * Queries if this TimeZone uses Daylight Saving Time.
     * @returns {boolean}
     * @memberof TimeZone
     */
    useDaylightTime(): boolean;
}

//declare function j2js(javaObject: Boolean): boolean;
//declare function j2js(javaObject: String): string;
//declare function j2js(javaObject: Packages.java.lang.Integer): number
//declare function j2js(javaObject: Packages.java.lang.Long): number
//declare function j2js(javaObject: Packages.java.lang.Double): number
//declare function j2js(javaObject: Packages.java.lang.Byte): number
//declare function j2js(javaObject: Packages.java.lang.Float): number
//declare function j2js(javaObject: Packages.java.lang.Short): number
//declare function j2js(javaObject: Packages.java.lang.Character): number
//declare function j2js(javaObject: Packages.java.lang.util.List): any[];
//declare function j2js(javaObject: Packages.java.lang.util.Map): { [key: string]: any; };
//declare function j2js(javaObject: Packages.java.lang.util.Set): any[];
//declare function j2js(javaObject: Object): any;

/**
 * GlideSystem API.
 * @class GlideSystem
 */
declare abstract class GlideSystem {
    /**
     * Directly calling the constructor is not supported.
     * @memberof GlideSystem
     * @protected
     */
    constructor();
    isInteractive(): boolean;
    isLoggedIn(): boolean;

    /**
     * Adds an error message for the current session.
     * @param {*} message The message to add.
     */
    addErrorMessage(message: any): void;

    /**
     * Adds an info message for the current session. This method is not supported for asynchronous business rules.
     * @param {*} message An info message object.
     */
    addInfoMessage(message: any): void;

    /**
     * Returns the date and time for the beginning of last month in GMT.
     * @returns {string} GMT beginning of last month, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfLastMonth(): string;

    /**
     * Returns the date and time for the beginning of next month in GMT.
     * @returns {string} GMT beginning of next month, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfNextMonth(): string;

    /**
     * Returns the date and time for the beginning of next week in GMT.
     * @returns {string} The GMT beginning of next week, in the format yyyy-mm-dd hh:mm:ss.
     */
    beginningOfNextWeek(): string;

    /**
     * Returns the date and time for the beginning of next year in GMT.
     * @returns {string} GMT beginning of next year, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfNextYear(): string;

    /**
     * Returns the date and time for the beginning of this month in GMT.
     * @returns {string} GMT beginning of this month, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfThisMonth(): string;

    /**
     * Returns the date and time for the beginning of this quarter in GMT.
     * @returns {string} GMT beginning of this quarter, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfThisQuarter(): string;

    /**
     * Returns the date and time for the beginning of this week in GMT.
     * @returns {string} GMT beginning of this week, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfThisWeek(): string;

    /**
     * Returns the date and time for the beginning of this year in GMT.
     * @returns {string} GMT beginning of this year, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfThisYear(): string;

    /**
     * Returns the date and time for the beginning of last week in GMT.
     * @returns {string} GMT beginning of this year, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfLastWeek(): string;

    /**
     * Generates a date and time for the specified date in GMT.
     * @param {string} date Format: yyyy-mm-dd
     * @param {string} range Start, end, or a time in the 24 hour format hh:mm:ss.
     * @returns {string} A date and time in the format yyyy-mm-dd hh:mm:ss. If range is start, the returned value is yyyy-mm-dd 00:00:00; If range is end the return value is yyyy-mm-dd 23:59:59.
     */
    dateGenerate(date: string, range: string): string;

    /**
     * Returns the date and time for a specified number of days ago.
     * @param {number} days Integer number of days
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    daysAgo(days: number): string;

    /**
     * Returns the date and time for the end of the day a specified number of days ago.
     * @param {number} days Integer number of days
     * @returns {string} GMT end of the day in the format yyyy-mm-dd hh:mm:ss
     */
    daysAgoEnd(days: number): string;

    /**
     * Returns the date and time for the beginning of the day a specified number of days ago.
     * @param {number} days Integer number of days
     * @returns {string} GMT end of the day in the format yyyy-mm-dd hh:mm:ss
     */
    daysAgoStart(days: number): string;

    /**
     * Adds an info message for the current session. This method is not supported for asynchronous business rules.
     * @param {string} message The log message with place holders for any variable arguments.
     * @param {*} [parm1] First variable argument.
     * @param {*} [parm2] Second variable argument.
     * @param {*} [parm3] Third variable argument.
     * @param {*} [parm4] Fourth variable argument.
     * @param {*} [parm5] Fifth variable argument.
     */
    debug(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;

    /**
     * Returns the date and time for the end of last month in GMT.
     * @returns {string} GMT end of last month, in the format yyyy-mm-dd hh:mm:ss
     */
    endOfLastMonth(): string;

    /**
     * Returns the date and time for the end of last week in GMT.
     * @returns {string} GMT end of last week, in the format yyyy-mm-dd hh:mm:ss
     */
    endOfLastWeek(): string;

    /**
     * Returns the date and time for the end of last year in GMT.
     * @returns {string} GMT in format yyyy-mm-dd hh:mm:ss
     */
    endOfLastYear(): string;

    /**
     * Returns the date and time for the end of next month in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfNextMonth(): string;

    /**
     * Returns the date and time for the end of next week in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfNextWeek(): string;

    /**
     * Returns the date and time for the end of next year in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfNextYear(): string;

    /**
     * Returns the date and time for the end of this month in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfThisMonth(): string;

    /**
     * Returns the date and time for the end of this quarter in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfThisQuarter(): string;

    /**
     * Returns the date and time for the end of this week in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfThisWeek(): string;

    /**
     * Returns the date and time for the end of this year in GMT.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfThisYear(): string;

    /**
     * Writes an error message to the system log.
     * @param {string} message The log message with place holders for any variable arguments.
     * @param {*} [parm1] First variable argument.
     * @param {*} [parm2] Second variable argument.
     * @param {*} [parm3] Third variable argument.
     * @param {*} [parm4] Fourth variable argument.
     * @param {*} [parm5] Fifth variable argument.
     */
    error(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;

    /**
     * Writes a warning message to the system log.
     * @param {string} message The log message with place holders for any variable arguments.
     * @param {*} [parm1] First variable argument.
     * @param {*} [parm2] Second variable argument.
     * @param {*} [parm3] Third variable argument.
     * @param {*} [parm4] Fourth variable argument.
     * @param {*} [parm5] Fifth variable argument.
     */
    warn(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;

    /**
     * Writes an info message to the system log.
     * @param {string} message The log message with place holders for any variable arguments.
     * @param {*} [parm1] First variable argument.
     * @param {*} [parm2] Second variable argument.
     * @param {*} [parm3] Third variable argument.
     * @param {*} [parm4] Fourth variable argument.
     * @param {*} [parm5] Fifth variable argument.
     */
    info(message: string, parm1?: any, parm2?: any, parm3?: any, parm4?: any, parm5?: any): void;

    /**
     * Creates a base64 string from the specified string.
     * @param {string} source The string to be encoded.
     * @returns {string} The base64 string.
     */
    base64Encode(source: string): string;

    /**
     * Returns an ASCII string from the specified base64 string..
     * @param {string} source A base64 encoded string.
     * @returns {string} The decoded string.
     */
    base64Decode(source: string): string;

    /**
     * Queues an event for the event manager.
     * @param {string} name Name of the event being queued.
     * @param {GlideRecord} instance A GlideRecord object, such as "current".
     * @param {string|null|undefined} parm1 Saved with the instance if specified.
     * @param {string|null|undefined} parm2 Saved with the instance if specified.
     * @param {string} parm3 The name of the queue
     */
    eventQueue(name: string, instance: GlideRecord, parm1: string | null | undefined, parm2: string | null | undefined, parm3: string): void;

    /**
     * Queues an event for the event manager.
     * @param {string} name Name of the event being queued.
     * @param {GlideRecord} instance A GlideRecord object, such as "current".
     * @param {string|null|undefined} parm1 Saved with the instance if specified.
     * @param {string} parm3 The name of the queue
     */
    eventQueue(name: string, instance: GlideRecord, parm1: string | null | undefined, parm3: string): void;

    /**
     * Queues an event for the event manager.
     * @param {string} name - Name of the event being queued.
     * @param {GlideRecord} instance - A GlideRecord object, such as "current".
     * @param {string} parm3 - The name of the queue
     */
    eventQueue(name: string, instance: GlideRecord, parm3: string): void;

    /**
     * Alerts the user if event was not scheduled. Does nothing if the event is scheduled.
     * @param {string} name - Name of the event being queued.
     * @param {GlideRecord} instance - A GlideRecord object, such as "current".
     * @param {string} [parm1] - Saved with the instance if specified.
     * @param {string} [parm2] - Saved with the instance if specified.
     * @param {object} [expiration] - When the event expires.
     */
    eventQueueScheduled(name: string, instance: GlideRecord, parm1?: string, parm2?: string, expiration?: Object): void;

    /**
     * Executes a job for a scoped application.
     * @param job The job to be run.
     * @description You can only use this method on a job in the same application as the script calling this method.
     * @returns {string} Returns the sysID of the scheduled job. Returns null if the job is global.
     */
    executeNow(job: GlideRecord): string;

    /**
     * Generates a GUID that can be used when a unique identifier is required.
     * @returns {string} A 32-character hexadecimal GUID.
     */
    generateGUID(): string;

    /**
     * Gets the caller scope name; returns null if there is no caller.
     * @returns {string|null} The caller's scope name, or null if there is no caller.
     */
    getCallerScopeName(): string | null;

    /**
     * Gets a string representing the cache version for a CSS file.
     * @returns {string} The CSS cache version.
     */
    getCssCacheVersionString(): string;

    /**
     * Generates a GUID that can be used when a unique identifier is required.
     * @returns {string} A 32-character hexadecimal GUID.
     */
    generateGUID(): string;

    /**
     * Gets the caller scope name; returns null if there is no caller.
     * @returns {string|null} The caller's scope name, or null if there is no caller.
     */
    getCallerScopeName(): string | null;

    /**
     * Gets a string representing the cache version for a CSS file.
     * @returns {string} The CSS cache version.
     */
    getCssCacheVersionString(): string;

    /**
     * Returns the list of error messages for the session that were added by addErrorMessage().
     * @returns {string[]} List of error messages.
     */
    getErrorMessages(): string[];

    /**
     * Retrieves a message from UI messages with HTML special characters replaced with escape sequences, for example, & becomes &amp;.
     * @param id The ID of the message.
     * @param {*[]} [args] A list of strings or other values defined by java.text.MessageFormat, which allows you to produce language-neutral messages for display to users.
     * @returns {string} The UI message with HTML special characters replaced with escape sequences.
     */
    getEscapedMessage(id: string, args?: any[]): string;

    /**
     * Retrieves a message from UI messages.
     * @param id The ID of the message.
     * @param {*[]} [args] A list of strings or other values defined by java.text.MessageFormat, which allows you to produce language-neutral messages for display to users.
     * @returns {string} The UI message.
     */
    getMessage(id: string, args?: any[]): string;

    getProperty(key: string): string;

    /**
     * Gets the value of a Glide property. If the property is not found, returns an alternate value.
     * @param {string} id The key for the property whose value should be returned.
     * @param {string} alt Alternate object to return if the property is not found.
     * @returns {string | T} The value of the Glide property, or the alternate object defined above.
     */
    getProperty<T>(key: string, alt: T): string | T;

    /**
     * Gets a reference to the current Glide session.
     * @returns {GlideSession} A reference for the current session.
     */
    getSession(): GlideSession;

    /**
     * Retrieves the GlideSession session ID.
     * @returns {string} The session ID.
     */
    getSessionID(): string;

    getSessionToken(): string;

    /**
     * Returns the name of the time zone associated with the current user.
     * @returns {string} The time zone name.
     */
    getTimeZoneName(): string;

    /**
     * Gets the current URI for the session.
     * @returns {string} The URI.
     */
    getUrlOnStack(): string;

    /**
     * Returns a reference to the scoped GlideUser object for the current user.
     * @returns {GlideUser} Reference to a scoped user object.
     */
    getUser(): GlideUser;

    /**
     * Gets the display name of the current user.
     * @returns {string} The name field of the current user. Returns Abel Tuter, as opposed to abel.tuter.
     */
    getUserDisplayName(): string;

    /**
     * Gets the sys_id of the current user.
     * @returns {string} The sys_id of the current user.
     */
    getUserID(): string;


    /**
     * Gets the user name, or user id, of the current user.
     * @returns {string} The user name of the current user.
     */
    getUserName(): string;

    /**
     * Determines if the current user has the specified role.
     * @param {string} role The role to check.
     * @returns {boolean} True if the user had the role. Returns true for users with the administrator role.
     */
    hasRole(role: string): boolean;

    /**
     * Returns the date and time for a specified number of hours ago.
     * @param {number} hours Integer number of hours
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    hoursAgo(hours: number): string;

    /**
     * Returns the date and time for the end of the hour a specified number of hours ago.
     * @param {number} hours Integer number of hours
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    hoursAgoEnd(hours: number): string;

    /**
     * Returns the date and time for the start of the hour a specified number of hours ago.
     * @param {number} hours Integer number of hours
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
     */
    hoursAgoStart(hours: number): string;

    /**
     * Provides a safe way to call from the sandbox, allowing only trusted scripts to be included.
     * @param {string} name The name fo the script to include.
     * @returns {boolean} True if the include worked.
     */
    include(name: string): boolean;

    /**
     * Determines if debugging is active for a specific scope.
     * @returns {boolean} True if either session debugging is active or the log level is set to debug for the specified scope.
     */
    isDebugging(): boolean;

    /**
     * Checks if the current session is interactive. An example of an interactive session is when a user logs in normally. An example of a non-interactive session is using a SOAP request to retrieve data.
     * @returns {boolean} True if the session is interactive.
     */
    isInteractive(): boolean;


    /**
     * Determines if the current user is currently logged in.
     * @returns {boolean} True if the current user is logged in.
     */
    isLoggedIn(): boolean;

    /**
     * You can determine if a request comes from a mobile device.
     * @returns {boolean} True if the request comes from a mobile device; otherwise, false.
     */
    isMobile(): boolean;

    /**
     * Returns the date and time for the end of the minute a specified number of minutes ago.
     * @param {number} minutes Integer number of minutes.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    minutesAgoEnd(minutes: number): string;

    /**
     * Returns the date and time for the start of the minute a specified number of minutes ago.
     * @param {number} minutes Integer number of minutes.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    minutesAgoStart(minutes: number): string;

    /**
     * Returns the date and time for a specified number of months ago.
     * @param {number} months Integer number of months.
     * @returns {string} GMT on today's date of the specified month, in the format yyyy-mm-dd hh:mm:ss.
     */
    monthsAgo(months: number): string;

    /**
     * Returns the date and time for the end of the minute a specified number of minutes ago.
     * @param {number} minutes Integer number of minutes.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    minutesAgoEnd(minutes: number): string;

    /**
     * Returns the date and time for the start of the minute a specified number of minutes ago.
     * @param {number} minutes Integer number of minutes.
     * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss.
     */
    minutesAgoStart(minutes: number): string;

    /**
     * Returns the date and time for the start of the month a specified number of months ago.
     * @param {number} months Integer number of months.
     * @returns {string} GMT start of the month the specified number of months ago, in the format yyyy-mm-dd hh:mm:ss.
     */
    monthsAgoStart(months: number): string;

    /**
     * Queries an object and returns true if the object is null, undefined, or contains an empty string.
     * @param {*} o The object to be checked.
     * @returns {boolean} True if the object is null, undefined, or contains an empty string; otherwise, returns false.
     */
    nil(o: any | null | undefined): o is "" | null | undefined;

    /**
     * Returns the date and time for the last day of the quarter for a specified number of quarters ago.
     * @param {number} quarters Integer number of quarters.
     * @returns {string} GMT end of the quarter that was the specified number of quarters ago, in the format yyyy-mm-dd hh:mm:ss.
     */
    quartersAgoEnd(quarters: number): string;

    /**
     * Returns the date and time for the first day of the quarter for a specified number of quarters ago.
     * @param {number} quarters Integer number of quarters.
     * @returns {string} GMT end of the month that was the specified number of quarters ago, in the format yyyy-mm-dd hh:mm:ss.
     */
    quartersAgoStart(quarters: number): string;

    /**
     * Sets the specified key to the specified value if the property is within the script's scope.
     * @param {string} id The key for the property to be set.
     * @param {string} value The value of the property to be set.
     * @param {string} [description] A description of the property.
     */
    setProperty(key: string, value: string, description?: string): void;

    /**
     * Sets the redirect URI for this transaction, which then determines the next page the user will see.
     * @param {string|GlideURI} o URI object or URI string to set as the redirect.
     */
    setRedirect(o: string | GlideURI): void;

    /**
     * Determines if a database table exists.
     * @param {string} name Name of the table to check for existence.
     * @returns {boolean} True if the table exists. False if the table was not found.
     */
    tableExists(name: string): boolean;

    /**
     * Encodes non-ASCII characters, unsafe ASCII characters, and spaces so the returned string can be used on the Internet. Uses UTF-8 encoding. Uses percent (%) encoding.
     * @param {string} url The string to be encoded.
     * @returns {string} A string with non-ASCII characters, unsafe ASCII characters, and spaces encoded.
     */
    urlEncode(url: string): string;

    /**
     * Replaces UTF-8 encoded characters with ASCII characters.
     * @param {string} url A string with UTF-8 percent (%) encoded characters.
     * @returns {string} A string with encoded characters replaced with ASCII characters.
     */
    urlDecode(url: string): string;

    /**
     * Takes an XML string and returns a JSON object.
     * @param {string} xmlString The XML string to be converted.
     * @returns {object|null} A JSON object representing the XML string. Null if unable to process the XML string.
     */
    xmlToJSON(xmlString: string): { [key: string]: any } | null;

    /**
     * Returns a date and time for a certain number of years ago.
     * @param {number} years Integer number of years.
     * @returns {string} GMT beginning of the year that is the specified number of years ago, in the format yyyy-mm-dd hh:mm:ss.
     */
    yearsAgo(years: number): string;

    /**
     * Returns yesterday's time (24 hours ago).
     * @returns {string} GMT for 24 hours ago, in the format yyyy-mm-dd hh:mm:ss
     */
    yesterday(): string;
}

/**
 * Global GlideSystem instance.
 */
declare let gs: GlideSystem;