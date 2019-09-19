declare namespace Packages {
    export namespace java {
        export namespace lang {
            /**
             * Base Java object.
             * @export
             * @class Object
             */
            export class Object {
                constructor();
            }
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
                 * @interface ICollection<T>
                 */
                export interface ICollection<T> {
                    /**
                     * Ensures that this collection contains the specified element (optional operation).
                     * @param {T} e -
                     * @returns {boolean}
                     * @memberof {ICollection}
                     */
                    add(e: T): boolean;
                    /**
                     * Adds all of the elements in the specified collection to this collection (optional operation).
                     * @param {ICollection<T>} c -
                     * @returns {boolean}
                     * @memberof {ICollection}
                     */
                    addAll(c: ICollection<T>): boolean;
                    /**
                     * Removes all of the elements from this collection (optional operation).
                     * @memberof {ICollection}
                     */
                    clear(): void;
                    /**
                     * Returns true if this collection contains the specified element.
                     * @param {T} o -
                     * @returns {boolean}
                     * @memberof {ICollection}
                     */
                    contains(o: T): boolean;
                    /**
                     * Returns true if this collection contains all of the elements in the specified collection.
                     * @param {ICollection<T>} c -
                     * @returns {boolean}
                     * @memberof {ICollection}
                     */
                    containsAll(c: ICollection<T>): boolean;
                    /**
                     * Returns true if this collection contains no elements.
                     * @returns {boolean}
                     * @memberof {ICollection}
                     */
                    isEmpty(): boolean;
                    /**
                     * Removes a single instance of the specified element from this collection, if it is present (optional operation).
                     * @param {T} o -
                     * @returns {boolean}
                     * @memberof {ICollection}
                     */
                    remove(o: T): boolean;
                    /**
                     * Removes all of this collection's elements that are also contained in the specified collection (optional operation).
                     * @param {ICollection<T>} c -
                     * @returns {boolean}
                     * @memberof {ICollection}
                     */
                    removeAll(c: ICollection<T>): boolean;
                    /**
                     * Retains only the elements in this collection that are contained in the specified collection (optional operation).
                     * @param {ICollection<T>} c -
                     * @returns {boolean}
                     * @memberof {ICollection}
                     */
                    retainAll(c: ICollection<T>): boolean;
                    /**
                     * Returns the number of elements in this collection.
                     * @returns {number}
                     * @memberof {ICollection}
                     */
                    size(): number;
                    /**
                     * Returns an array containing all of the elements in this collection.
                     * @returns {IJavaArray<T>}
                     * @memberof {ICollection}
                     */
                    toArray(): IJavaArray<T>;
                    /**
                     * Returns an array containing all of the elements in this collection; the runtime type of the returned array is that of the specified array.
                     * @param {JavaArray} a -
                     * @returns {JavaArray}
                     * @memberof {ICollection}
                     */
                    toArray(a: IJavaArray<T>): IJavaArray<T>;
                }
                export interface Collection extends ICollection<any> { }
                /**
                 * Java List interface.
                 * @export
                 * @interface IList<T>
                 */
                export interface IList<T> extends ICollection<T> {
                    /**
                     * Ensures that this collection contains the specified element (optional operation).
                     * @param {T} e -
                     * @returns {boolean}
                     * @memberof {IList}
                     */
                    add(e: T): boolean;
                    /**
                     * Inserts the specified element at the specified position in this list (optional operation).
                     * @param {number} index -
                     * @param {T} element -
                     * @memberof {IList}
                     */
                    add(index: number, element: T): void;
                    /**
                     * Adds all of the elements in the specified collection to this collection (optional operation).
                     * @param {ICollection<T>} c -
                     * @returns {boolean}
                     * @memberof {IList}
                     */
                    addAll(c: ICollection<T>): boolean;
                    /**
                     * Inserts all of the elements in the specified collection into this list at the specified position (optional operation).
                     * @param {number} index -
                     * @param {ICollection<T>} c -
                     * @returns {boolean}
                     * @memberof {IList}
                     */
                    addAll(index: number, c: ICollection<T>): boolean;
                    /**
                     * Returns the element at the specified position in this list.
                     * @param {number} index -
                     * @returns {T}
                     * @memberof {IList}
                     */
                    get(index: number): T;
                    /**
                     * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
                     * @param {T} o -
                     * @returns {number}
                     * @memberof {IList}
                     */
                    indexOf(o: T): number;
                    /**
                     * Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element.
                     * @param {T} o -
                     * @returns {number}
                     * @memberof {IList}
                     */
                    lastIndexOf(o: T): number;
                    /**
                     * Removes a single instance of the specified element from this collection, if it is present (optional operation).
                     * @param {T} o -
                     * @returns {boolean}
                     * @memberof {IList}
                     */
                    remove(o: T): boolean;
                    /**
                     * Removes the element at the specified position in this list (optional operation).
                     * @param {number} index -
                     * @returns {T}
                     * @memberof {IList}
                     */
                    remove(index: number): T;
                    /**
                     * Replaces the element at the specified position in this list with the specified element (optional operation).
                     * @param {number} index -
                     * @param {T} element -
                     * @returns {T}
                     * @memberof {IList}
                     */
                    set(index: number, element: T): T;
                    /**
                     * Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive.
                     * @param {number} fromIndex -
                     * @param {number} toIndex -
                     * @returns {Packages.java.lang.util.List}
                     * @memberof {IList}
                     */
                    subList(fromIndex: number, toIndex: number): IList<T>;
                }
                export interface List extends IList<any> { }
                /**
                 * Java Set interface.
                 * @export
                 * @interface ISet<T>
                 */
                export interface ISet<T> {
                    /**
                     * Adds the specified element to this set if it is not already present (optional operation).
                     * @param {T} e -
                     * @returns {boolean}
                     * @memberof {ISet}
                     */
                    add(e: T): boolean;
                    /**
                     * Adds all of the elements in the specified collection to this set if they're not already present (optional operation).
                     * @param {ICollection<T>} c -
                     * @returns {boolean}
                     * @memberof {ISet}
                     */
                    addAll(c: ICollection<T>): boolean;
                    /**
                     * Removes all of the elements from this set (optional operation).
                     * @memberof {ISet}
                     */
                    clear(): void;
                    /**
                     * Returns true if this set contains the specified element.
                     * @param {T} o -
                     * @returns {boolean}
                     * @memberof {ISet}
                     */
                    contains(o: T): boolean;
                    /**
                     * Returns true if this set contains all of the elements of the specified collection.
                     * @param {ICollection<T>} c -
                     * @returns {boolean}
                     * @memberof {ISet}
                     */
                    containsAll(c: ICollection<T>): boolean;
                    /**
                     * Returns true if this set contains no elements.
                     * @returns {boolean}
                     * @memberof {ISet}
                     */
                    isEmpty(): boolean;
                    /**
                     * Removes the specified element from this set if it is present (optional operation).
                     * @param {T} o -
                     * @returns {boolean}
                     * @memberof {ISet}
                     */
                    remove(o: T): boolean;
                    /**
                     * Removes from this set all of its elements that are contained in the specified collection (optional operation).
                     * @param {Packages.java.lang.util.Collection} c -
                     * @returns {boolean}
                     * @memberof {ISet}
                     */
                    removeAll(c: ICollection<T>): boolean;
                    /**
                     * Retains only the elements in this set that are contained in the specified collection (optional operation).
                     * @param {Packages.java.lang.util.Collection} c -
                     * @returns {boolean}
                     * @memberof {ISet}
                     */
                    retainAll(c: ICollection<T>): boolean;
                    /**
                     * Returns the number of elements in this set (its cardinality).
                     * @returns {number}
                     * @memberof {ISet}
                     */
                    size(): number;
                    /**
                     * Returns an array containing all of the elements in this set.
                     * @returns {IJavaArray<Object>}
                     * @memberof {ISet}
                     */
                    toArray(): IJavaArray<T>;
                    /**
                     * Returns an array containing all of the elements in this set; the runtime type of the returned array is that of the specified array.
                     * @param {IJavaArray<T>} a -
                     * @returns {IJavaArray<T>}
                     * @memberof {ISet}
                     */
                    toArray(a: IJavaArray<T>): IJavaArray<T>;
                }
                export interface Set extends ISet<any> { }
                export interface IArrayList<T> extends IList<T> {
                    /**
                     * Increases the capacity of this ArrayList instance, if necessary, to ensure that it can hold at least the number of elements specified by the minimum capacity argument.
                     * @param {number} minCapacity -
                     * @memberof {ArrayList}
                     */
                    ensureCapacity(minCapacity: number): void;
                    /**
                     * Returns the number of elements in this list.
                     * @returns {number}
                     * @memberof {ArrayList}
                     */
                    size(): number;
                    /**
                     * Trims the capacity of this ArrayList instance to be the list's current size.
                     * @memberof {ArrayList}
                     */
                    trimToSize(): void;
                }
                /**
                 * Java ArrayList class.
                 * @export
                 * @class ArrayList
                 * @extends {Object}
                 * @implements {List}
                 */
                export class ArrayList extends Object implements IArrayList<any> {
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
                     * @returns {*}
                     * @memberof {ArrayList}
                     */
                    clone(): any;
                    /**
                     * Returns true if this list contains the specified element.
                     * @param {*} o -
                     * @returns {boolean}
                     * @memberof {ArrayList}
                     */
                    contains(o: any): boolean;
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
                     * @param {*} o -
                     * @returns {number}
                     * @memberof {ArrayList}
                     */
                    indexOf(o: any): number;
                    /**
                     * Returns true if this list contains no elements.
                     * @returns {boolean}
                     * @memberof {ArrayList}
                     */
                    isEmpty(): boolean;
                    /**
                     * Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element.
                     * @param {*} o -
                     * @returns {number}
                     * @memberof {ArrayList}
                     */
                    lastIndexOf(o: any): number;
                    /**
                     * Removes the element at the specified position in this list.
                     * @param {number} index -
                     * @returns {*}
                     * @memberof {ArrayList}
                     */
                    remove(index: number): any;
                    /**
                     * Removes the first occurrence of the specified element from this list, if it is present.
                     * @param {*} o -
                     * @returns {boolean}
                     * @memberof {ArrayList}
                     */
                    remove(o: any): boolean;
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
                     * @returns {IJavaArray<*>}
                     * @memberof {ArrayList}
                     */
                    toArray(): IJavaArray<any>;
                    /**
                     * Returns an array containing all of the elements in this list in proper sequence (from first to last element); the runtime type of the returned array is that of the specified array.
                     * @param {IJavaArray<*>} a -
                     * @returns {IJavaArray<*>}
                     * @memberof {ArrayList}
                     */
                    toArray(a: IJavaArray<any>): IJavaArray<any>;
                    /**
                     * Trims the capacity of this ArrayList instance to be the list's current size.
                     * @memberof {ArrayList}
                     */
                    trimToSize(): void;
                }
                /**
                 * Java Map interface.
                 * @export
                 * @interface IMap<K, V>
                 */
                export interface IMap<K, V> {
                    /**
                     * Removes all of the mappings from this map (optional operation).
                     * @memberof {IMap}
                     */
                    clear(): void;
                    /**
                     * Returns true if this map contains a mapping for the specified key.
                     * @param {K} key -
                     * @returns {boolean}
                     * @memberof {IMap}
                     */
                    containsKey(key: K): boolean;
                    /**
                     * Returns true if this map maps one or more keys to the specified value.
                     * @param {V} value -
                     * @returns {boolean}
                     * @memberof {IMap}
                     */
                    containsValue(value: V): boolean;
                    /**
                     * Returns a Set view of the mappings contained in this map.
                     * @returns {Set}
                     * @memberof {IMap}
                     */
                    entrySet(): Set;
                    /**
                     * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
                     * @param {K} key -
                     * @returns {V}
                     * @memberof {IMap}
                     */
                    get(key: K): V;
                    /**
                     * Returns true if this map contains no key-value mappings.
                     * @returns {boolean}
                     * @memberof {IMap}
                     */
                    isEmpty(): boolean;
                    /**
                     * Returns a Set view of the keys contained in this map.
                     * @returns {ISet<K>}
                     * @memberof {IMap}
                     */
                    keySet(): ISet<K>;
                    /**
                     * Associates the specified value with the specified key in this map (optional operation).
                     * @param {K} key -
                     * @param {V} value -
                     * @returns {*}
                     * @memberof {IMap}
                     */
                    put(key: K, value: V): any;
                    /**
                     * Copies all of the mappings from the specified map to this map (optional operation).
                     * @param {IMap<K, V>} m -
                     * @memberof {IMap}
                     */
                    putAll(m: IMap<K, V>): void;
                    /**
                     * Removes the mapping for a key from this map if it is present (optional operation).
                     * @param {K} key -
                     * @returns {V}
                     * @memberof {IMap}
                     */
                    remove(key: K): V;
                    /**
                     * Returns the number of key-value mappings in this map.
                     * @returns {number}
                     * @memberof {IMap}
                     */
                    size(): number;
                    /**
                     * Returns a Collection view of the values contained in this map.
                     * @returns {ICollection<V>}
                     * @memberof {IMap}
                     */
                    values(): ICollection<V>;
                }
                export interface Map extends IMap<any, any> { }
                export interface IHashMap<K, V> extends IMap<K, V> {
                    /**
                     * Returns a shallow copy of this instance: the keys and values themselves are not cloned.
                     * @returns {IHashMap<K, V>}
                     * @memberof {HashMap}
                     */
                    clone(): IHashMap<K, V>;
                }
                /**
                 * Java HashMap class.
                 * @export
                 * @class HashMap
                 * @extends {Object}
                 * @implements {Map}
                 */
                export class HashMap extends Object implements IHashMap<any, any> {
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
                    clone(): HashMap;
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
                export interface IHashSet<T> extends ICollection<T>, ISet<T> {
                    /**
                     * Returns the number of elements in this set (its cardinality).
                     * @returns {number}
                     * @memberof {IHashSet}
                     */
                    size(): number;
                }
                /**
                 * Java HashSet class.
                 * @export
                 * @class HashSet
                 * @extends {Object}
                 * @implements {Collection}
                 * @implements {Set}
                 */
                export class HashSet extends Object implements IHashSet<any> {
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
                     * @param {Collection} c -
                     * @returns {boolean}
                     * @memberof {HashSet}
                     */
                    addAll(c:Collection): boolean;
                    /**
                     * Removes all of the elements from this set.
                     * @memberof {HashSet}
                     */
                    clear(): void;
                    /**
                     * Returns a shallow copy of this HashSet instance: the elements themselves are not cloned.
                     * @returns {HashSet}
                     * @memberof {HashSet}
                     */
                    clone(): HashSet;
                    /**
                     * Returns true if this set contains the specified element.
                     * @param {*} o -
                     * @returns {boolean}
                     * @memberof {HashSet}
                     */
                    contains(o: any): boolean;
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
                     * @param {*} o -
                     * @returns {boolean}
                     * @memberof {HashSet}
                     */
                    remove(o: any): boolean;
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
                     * @returns {IJavaArray<*>}
                     * @memberof {HashSet}
                     */
                    toArray(): IJavaArray<any>;
                }
            }
        }
    }
}

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