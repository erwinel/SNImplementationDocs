$Lines = @(@'
Object	clone()
Creates a copy of this TimeZone.
static String[]	getAvailableIDs()
Gets all the available IDs supported.
static String[]	getAvailableIDs(int rawOffset)
Gets the available IDs according to the given time zone offset in milliseconds.
static TimeZone	getDefault()
Gets the default TimeZone for this host.
String	getDisplayName()
Returns a long standard time name of this TimeZone suitable for presentation to the user in the default locale.
String	getDisplayName(boolean daylight, int style)
Returns a name in the specified style of this TimeZone suitable for presentation to the user in the default locale.
String	getDisplayName(boolean daylight, int style, Locale locale)
Returns a name in the specified style of this TimeZone suitable for presentation to the user in the specified locale.
String	getDisplayName(Locale locale)
Returns a long standard time name of this TimeZone suitable for presentation to the user in the specified locale.
int	getDSTSavings()
Returns the amount of time to be added to local standard time to get local wall clock time.
String	getID()
Gets the ID of this time zone.
abstract int	getOffset(int era, int year, int month, int day, int dayOfWeek, int milliseconds)
Gets the time zone offset, for current date, modified in case of daylight savings.
int	getOffset(long date)
Returns the offset of this time zone from UTC at the specified date.
abstract int	getRawOffset()
Returns the amount of time in milliseconds to add to UTC to get standard time in this time zone.
static TimeZone	getTimeZone(String ID)
Gets the TimeZone for the given ID.
boolean	hasSameRules(TimeZone other)
Returns true if this zone has the same rule and offset as another zone.
abstract boolean	inDaylightTime(Date date)
Queries if the given date is in Daylight Saving Time in this time zone.
boolean	observesDaylightTime()
Returns true if this TimeZone is currently in Daylight Saving Time, or if a transition from Standard Time to Daylight Saving Time occurs at any future time.
static void	setDefault(TimeZone zone)
Sets the TimeZone that is returned by the getDefault method.
void	setID(String ID)
Sets the time zone ID.
abstract void	setRawOffset(int offsetMillis)
Sets the base time zone offset to GMT.
abstract boolean	useDaylightTime()
Queries if this TimeZone uses Daylight Saving Time.
'@.Trim() -split '[\r\n]+');
$WhitespaceRegex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList '\s+';
$ArgTypeRegex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList '^\s*(.+?)\s+([a-zA-Z][^,\[\]<>()]*)[,)]';
Function ConvertTo-JsType {
    Param(
        [Parameter(Mandatory = $true)]
        [string]$Type,

        [switch]$IsArg
    )

    $Type = $Type.Replace('? extends', '').Replace('?', 'any');
    $Arr = $Type.EndsWith('[]');
    if ($Arr) { $Type = $Type.Substring(0, $Type.Length - 2) }
    switch ($Type) {
        'void' { return $Type; }
        'boolean' {
            if ($IsArg) { $Type = '$$rhino.Boolean' } else { $Type = 'lang.Boolean'; }
            break;
        }
        'String' {
            if ($IsArg) { $Type = '$$rhino.String' } else { $Type = 'lang.String'; }
            break;
        }
        'Integer' {
            if ($IsArg) { $Type = '$$rhino.Number' } else { $Type = 'lang.Integer'; }
            break;
        }
        'Short' {
            if ($IsArg) { $Type = '$$rhino.Number' } else { $Type = 'lang.Short'; }
            break;
        }
        'int' {
            if ($IsArg) { $Type = '$$rhino.Number' } else { $Type = 'lang.Integer'; }
            break;
        }
        'Long' {
            if ($IsArg) { $Type = '$$rhino.Number' } else { $Type = 'lang.Long'; }
            break;
        }
        'Double' {
            if ($IsArg) { $Type = '$$rhino.Number' } else { $Type = 'lang.Double'; }
            break;
        }
        'Byte' {
            if ($IsArg) { $Type = '$$rhino.Number' } else { $Type = 'lang.Byte'; }
            break;
        }
        'Float' {
            if ($IsArg) { $Type = '$$rhino.Number' } else { $Type = 'lang.Float'; }
            break;
        }
        'char' {
            if ($IsArg) { $Type = '$$rhino.String' } else { $Type = 'lang.Character'; }
            break;
        }
        'Character' {
            if ($IsArg) { $Type = '$$rhino.String' } else { $Type = 'lang.Character'; }
            break;
        }
        'Object' {
            if ($IsArg) { $Type = 'object' }
            return 'lang.Object';
        }
    }
    if ($Arr) { return "IJavaArray<$Type>"; }
    return $Type;
}
for ($i = 0; $i -lt $Lines.Count; $i += 2) {
    ($Returns, $Line) = $WhitespaceRegex.Split($Lines[$i], 2);
    if ('protected' -ne $Returns -and 'static' -ne $Returns) {
@"
                    /**
                     * $($Lines[$i + 1].Trim())
"@
        if ($Returns -eq 'final') {
            ($Returns, $Line) = $WhitespaceRegex.Split($Line.Trim(), 2);
        }
        if ($Returns -eq 'abstract') {
            ($Returns, $Line) = $WhitespaceRegex.Split($Line.Trim(), 2);
        }
        $Returns = ConvertTo-JsType -Type $Returns;
        ($Name, $Line) = $Line.Trim().Split('(', 2);
        $Args = @();
        $m = $ArgTypeRegex.Match($Line);
        while ($m.Success) {
            $Line = $Line.Substring($m.Length);
            $Args += @("$($m.Groups[2].Value): $(ConvertTo-JsType -Type $m.Groups[1].Value -IsArg)");
            "                     * @param $($m.Groups[2].Value) {$(ConvertTo-JsType -Type $m.Groups[1].Value -IsArg)}";
            $m = $ArgTypeRegex.Match($Line);
        }
        if ('void' -ne $Returns) { "                     * @returns {$Returns}"; }
@"
                     */
                    $Name($($Args -join ', ')): $Returns;
                    
"@
    }
}