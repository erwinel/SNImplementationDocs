/// <reference path="JavaTypes.d.ts" />
/// <reference path="GlideRecord.d.ts" />

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
     * @param {string} parm2 The name of the queue
     */
    eventQueue(name: string, instance: GlideRecord, parm1: string | null | undefined, parm2: string): void;

    /**
     * Queues an event for the event manager.
     * @param {string} name - Name of the event being queued.
     * @param {GlideRecord} instance - A GlideRecord object, such as "current".
     * @param {string} parm1 - The name of the queue
     */
    eventQueue(name: string, instance: GlideRecord, parm1: string): void;

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

declare interface ICustomClassPrototype0<TPrototype extends ICustomClassPrototype0<TPrototype, Type>, Type extends string> { initialize(this: TPrototype): void; type: Type; }
declare interface ICustomClassPrototype1<TPrototype extends ICustomClassPrototype1<TPrototype, Type, TArg>, Type extends string, TArg> { initialize(this: TPrototype, arg: TArg): void; type: Type; }
declare interface ICustomClassPrototype2<TPrototype extends ICustomClassPrototype2<TPrototype, Type, TArg0, TArg1>, Type extends string, TArg0, TArg1> { initialize(this: TPrototype, arg0: TArg0, arg1: TArg1): void; type: Type; }
declare interface ICustomClassPrototype3<TPrototype extends ICustomClassPrototype3<TPrototype, Type, TArg0, TArg1, TArg2>, Type extends string, TArg0, TArg1, TArg2> { initialize(this: TPrototype, arg0: TArg0, arg1: TArg1, arg2: TArg2): void; type: Type; }
declare interface ICustomClassPrototype4<TPrototype extends ICustomClassPrototype4<TPrototype, Type, TArg0, TArg1, TArg2, TArg3>, Type extends string, TArg0, TArg1, TArg2, TArg3> { initialize(this: TPrototype, arg0: TArg0, arg1: TArg1, arg2: TArg2, arg3: TArg3): void; type: Type; }
declare interface ICustomClassPrototypeN<TPrototype extends ICustomClassPrototypeN<TPrototype, Type>, Type extends string> { initialize(this: TPrototype, ...args: any[]): void; type: Type; }

declare interface CustomClassConstructor0<TPrototype extends ICustomClassPrototype0<TPrototype, string>, TInstance extends TPrototype> { new(): TInstance;(): TInstance; prototype: TPrototype; }
declare interface CustomClassConstructor1<TPrototype extends ICustomClassPrototype1<TPrototype, string, TArg>, TInstance extends TPrototype, TArg> { new(arg: TArg): TInstance;(arg: TArg): TInstance; prototype: TPrototype; }
declare interface CustomClassConstructor2<TPrototype extends ICustomClassPrototype2<TPrototype, string, TArg0, TArg1>, TInstance extends TPrototype, TArg0, TArg1> { new(arg0: TArg0, arg1: TArg1): TInstance;(arg0: TArg0, arg1: TArg1): TInstance; prototype: TPrototype; }
declare interface CustomClassConstructor3<TPrototype extends ICustomClassPrototype3<TPrototype, string, TArg0, TArg1, TArg2>, TInstance extends TPrototype, TArg0, TArg1, TArg2> { new(arg0: TArg0, arg1: TArg1, arg2: TArg2): TInstance;(arg0: TArg0, arg1: TArg1, arg2: TArg2): TInstance; prototype: TPrototype; }
declare interface CustomClassConstructor4<TPrototype extends ICustomClassPrototype4<TPrototype, string, TArg0, TArg1, TArg2, TArg3>, TInstance extends TPrototype, TArg0, TArg1, TArg2, TArg3> { new(arg0: TArg0, arg1: TArg1, arg2: TArg2, arg3: TArg3): TInstance;(arg0: TArg0, arg1: TArg1, arg2: TArg2, arg3: TArg3): TInstance; prototype: TPrototype; }
declare interface CustomClassConstructorN<TPrototype extends ICustomClassPrototypeN<TPrototype, string>, TInstance extends TPrototype> { new(...args: any[]): TInstance;(): TInstance; prototype: TPrototype; }

declare var Class: {
    create<TConstructor extends CustomClassConstructor0<ICustomClassPrototype0<any, string>, ICustomClassPrototype0<any, string>> |
        CustomClassConstructor1<ICustomClassPrototype1<any, string, any>, ICustomClassPrototype1<any, string, any>, any> |
        CustomClassConstructor2<ICustomClassPrototype2<any, string, any, any>, ICustomClassPrototype2<any, string, any, any>, any, any> |
        CustomClassConstructor3<ICustomClassPrototype3<any, string, any, any, any>, ICustomClassPrototype3<any, string, any, any, any>, any, any, any> |
        CustomClassConstructor4<ICustomClassPrototype4<any, string, any, any, any, any>, ICustomClassPrototype4<any, string, any, any, any, any>, any, any, any, any> |
        CustomClassConstructorN<ICustomClassPrototypeN<any, string>, ICustomClassPrototypeN<any, string>>>(): TConstructor;
};
