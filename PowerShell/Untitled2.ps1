Param(
    [ValidateScript({ $_.IsAbsoluteUri -and [string]::IsNullOrEmpty($_.Fragment) -and ([string]::IsNullOrEmpty($_.PathAndQuery) -or $_.PathAndQuery -eq '/') })]
    [Uri]$BaseUri = [Uri]::new('https://inscomscd.service-now.com', [UriKind]::Absolute)
)

Add-Type -TypeDefinition @'
namespace UriHelper
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using System.Management.Automation;
    using System.Management.Automation.Host;
    using System.Text;
    using System.Threading;
    public class ChoiceOption : IEquatable<ChoiceOption>
    {
        private bool _isSelected;
        private bool _isDefaultChoice;
        private ChoiceDescription _description;
        private PSObject _value;
        public bool IsDefaultChoice { get { return _isDefaultChoice; } set { _isDefaultChoice = value; } }
        public bool IsSelected { get { return _isSelected; } set { _isSelected = value; } }
        public string Label { get { return _description.Label; } }
        public PSObject Value { get { return _value; } set { _value = value; } }
        public string HelpMessage { get { return _description.HelpMessage; } set { _description.HelpMessage = value; } }
        public ChoiceOption(PSObject value) : this(value, false) { }
        public ChoiceOption(PSObject value, bool isDefaultChoice)
        {
            if (value == null)
                throw new ArgumentNullException("value");
            if (value.BaseObject is ChoiceDescription)
                _description = (ChoiceDescription)value.BaseObject;
            else if (value.BaseObject is string)
                _description = new ChoiceDescription((string)value.BaseObject);
            else
            {
                string label;
                if (!LanguagePrimitives.TryConvertTo(value, out label))
                    throw new ArgumentException("Unable to convert value to string", "value");
                _description = new ChoiceDescription(label);
            }
            _value = value;
            _isDefaultChoice = isDefaultChoice;
        }
        public ChoiceOption(string label, PSObject value) : this(label, value, false) { }
        public ChoiceOption(string label, PSObject value, bool isSelected)
        {
            _description = new ChoiceDescription(label);
            _value = value;
            _isDefaultChoice = isSelected;
        }
        public ChoiceOption(ChoiceDescription choiceDescription, PSObject value) : this(choiceDescription, value, false) { }
        public ChoiceOption(ChoiceDescription choiceDescription, PSObject value, bool isSelected)
        {
            if (choiceDescription == null)
                throw new ArgumentNullException("choiceDescription");
            if (value.BaseObject is ChoiceDescription)
                _description = choiceDescription;
            _value = value;
            _isDefaultChoice = isSelected;
        }
        public ChoiceOption(string label, PSObject value, string helpMessage) : this(label, value, helpMessage, false) { }
        public ChoiceOption(string label, PSObject value, string helpMessage, bool isSelected)
        {
            _description = new ChoiceDescription(label, helpMessage);
            _value = value;
            _isDefaultChoice = isSelected;
        }
        public static bool TryGetInstanceValue<T>(PSObject psObj, string name, out T value)
        {
            object obj;
            if (TryGetInstanceObject(psObj, name, out obj))
            {
                if (obj != null)
                    return LanguagePrimitives.TryConvertTo<T>(obj, out value);
                value = default(T);
                return ((object)value == null);
            }
            value = default(T);
            return false;
        }
        public static bool TryGetInstancePSObject(PSObject psObj, string name, out PSObject result)
        {
            object obj;
            if (TryGetInstanceObject(psObj, name, out obj))
            {
                result = (obj == null || obj is PSObject) ? (PSObject)obj : PSObject.AsPSObject(obj);
                return true;
            }
            result = null;
            return false;
        }
        public static bool TryGetInstanceObject(PSObject psObj, string name, out object obj)
        {
            PSPropertyInfo property = psObj.Properties.FirstOrDefault(p => p.IsInstance && string.Equals(p.Name, name, StringComparison.CurrentCulture));
            if (property == null)
            {
                property = psObj.Properties.FirstOrDefault(p => p.IsInstance && string.Equals(p.Name, name, StringComparison.InvariantCultureIgnoreCase));
                if (property == null)
                {
                    if (psObj.BaseObject is IDictionary)
                    {
                        IDictionary dict = (IDictionary)psObj.BaseObject;
                        string key = dict.Keys.OfType<string>().FirstOrDefault(k => string.Equals(k, name, StringComparison.CurrentCulture));
                        if (key == null)
                            key = dict.Keys.OfType<string>().FirstOrDefault(k => string.Equals(k, name, StringComparison.InvariantCultureIgnoreCase));
                        if (key != null)
                        {
                            obj = dict[key];
                            return true;
                        }
                    }
                    obj = null;
                    return false;
                }
            }

            obj = property.Value;
            return true;
        }
        public static ChoiceOption AsChoiceOption(object obj)
        {
            if (obj == null || obj is ChoiceOption)
                return (ChoiceOption)obj;
            object baseObject;
            PSObject psObj;
            if (obj is PSObject)
            {
                baseObject = (psObj = (PSObject)obj).BaseObject;
                if (baseObject is ChoiceOption)
                    return (ChoiceOption)baseObject;
            }
            else
                psObj = PSObject.AsPSObject(baseObject = obj);
            PSObject value;
            bool isDefaultChoice;
            if (!(TryGetInstanceValue<bool>(psObj, "IsSelected", out isDefaultChoice) || TryGetInstanceValue<bool>(psObj, "IsDefaultChoice", out isDefaultChoice) || TryGetInstanceValue<bool>(psObj, "DefaultChoice", out isDefaultChoice)))
                isDefaultChoice = false;
            if (!TryGetInstancePSObject(psObj, "Value", out value))
                value = psObj;
            if (baseObject is ChoiceDescription)
                return new ChoiceOption((ChoiceDescription)baseObject, value, isDefaultChoice);
            if (baseObject is string)
                return new ChoiceOption((string)baseObject, value, isDefaultChoice);
            string label;
            if (!TryGetInstanceValue<string>(psObj, "Label", out label) || (label = label.Trim()).Length == 0)
            {
                if (!LanguagePrimitives.TryConvertTo<string>(psObj, out label) || (label = label.Trim()).Length == 0)
                    throw new ArgumentException("Label cannot be empty", "obj");
            }
            string helpMessage;
            if ((TryGetInstanceValue<string>(psObj, "HelpMessage", out helpMessage) || TryGetInstanceValue<string>(psObj, "Description", out helpMessage)) && (helpMessage = helpMessage.Trim()).Length > 0)
                return new ChoiceOption(label, value, helpMessage, isDefaultChoice);
            return new ChoiceOption(label, value, isDefaultChoice);
        }
        public static IEnumerable<ChoiceOption> AsChoiceOptions(object choices)
        {
            if (choices != null)
            {
                object obj = (choices is PSObject) ? ((PSObject)choices).BaseObject : choices;
                if (obj is IEnumerable && !(obj is string || obj is IDictionary))
                {
                    foreach (object o in (IEnumerable)obj)
                        yield return AsChoiceOption(o);
                }
                else
                    yield return AsChoiceOption(choices);
            }
        }
        public static Collection<PSObject> GetSelectedValues(IEnumerable<ChoiceOption> choices, bool resetSelection)
        {
            Collection<PSObject> result = new Collection<PSObject>();
            if (choices != null)
            {
                choices = choices.Where(c => c != null).Distinct();
                foreach (ChoiceOption o in choices)
                    if (o.IsSelected)
                        result.Add(o.Value);
                if (resetSelection)
                    foreach (ChoiceOption o in choices)
                        o.IsSelected = o.IsDefaultChoice;
            }
            return result;
        }
        public static bool TryGetFirstSelectedValue(IEnumerable<ChoiceOption> choices, bool resetSelection, out PSObject result)
        {
            if (choices != null)
            {
                choices = choices.Where(c => c != null).Distinct();
                ChoiceOption selectedOption = choices.FirstOrDefault(c => c.IsSelected);
                if (resetSelection)
                    foreach (ChoiceOption o in choices)
                        if (o != null)
                            o.IsSelected = o.IsDefaultChoice;
                if (selectedOption != null)
                {
                    result = selectedOption.Value;
                    return true;
                }
            }
            result = null;
            return false;
        }
        public static bool TryPromptForMultiChoice(PSHostUserInterface ui, string caption, string message, IEnumerable<ChoiceOption> choices)
        {
            if (ui == null)
                throw new ArgumentNullException("ui");
            if (choices != null)
            {
                ChoiceOption[] options = choices.Where(c => c != null).Distinct().ToArray();
                if (options.Length > 0)
                {
                    if (ui is IHostUISupportsMultipleChoiceSelection)
                    {
                        Collection<ChoiceDescription> choiceColl = new Collection<ChoiceDescription>(options.Select(o => o._description).ToList());
                        Collection<int> selected = ((IHostUISupportsMultipleChoiceSelection)ui).PromptForChoice(caption, message, choiceColl, options.Select((c, i) => (c.IsSelected) ? i : -1).Where(i => i > -1));
                        if (selected != null && selected.Count > 0)
                        {
                            for (int i = 0; i < options.Length; i++)
                                options[i].IsSelected = selected.Contains(i);
                            return true;
                        }
                        return false;
                    }
                    ui.WriteErrorLine("Host UI does not support multiple choice selection");
                }
            }
            ui.WriteWarningLine("Nothing to select.");
            return false;
        }
        public static bool TryPromptForChoice(PSHostUserInterface ui, string caption, string message, IEnumerable<ChoiceOption> choices)
        {
            if (ui == null)
                throw new ArgumentNullException("ui");
            if (choices != null)
            {
                ChoiceOption[] options = choices.Where(c => c != null).Distinct().ToArray();
                if (options.Length > 0)
                {
                    Collection<ChoiceDescription> choiceColl = new Collection<ChoiceDescription>(options.Select(o => o._description).ToList());
                    int index = 0;
                    for (int i = 0; i < options.Length; i++)
                    {
                        if (options[i].IsSelected)
                        {
                            index = i;
                            break;
                        }
                    }
                    index = ui.PromptForChoice(caption, message, choiceColl, index);
                    if (index > -1 && index < options.Length)
                    {
                        for (int i = 0; i < options.Length; i++)
                            options[i].IsSelected = i == index;
                        return true;
                    }
                    return false;
                }
            }
            ui.WriteWarningLine("Nothing to select.");
            return false;
        }
        public bool Equals(ChoiceOption other)
        {
            if (other == null)
                return false;
            if (ReferenceEquals(this, other))
                return true;
            return _isDefaultChoice == other._isDefaultChoice && _description.Label == other._description.Label &&
                ((string.IsNullOrEmpty(other._description.HelpMessage)) ? string.IsNullOrEmpty(_description.HelpMessage) : !string.IsNullOrEmpty(_description.HelpMessage) && _description.HelpMessage == other._description.HelpMessage) &&
                ((_value == null) ? other._value != null : other._value == null || !LanguagePrimitives.Equals(_value, other._value));
        }
        public override bool Equals(object obj) { return obj != null && obj is ChoiceOption && Equals((ChoiceOption)obj); }
        public override int GetHashCode() { return ToString().GetHashCode(); }
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append((_isSelected) ? "[X]" : "[ ]").Append(" \"").Append(_description.Label.Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\r", "\\r").Replace("\n", "\\n")).Append("\"=");
            if (_value == null)
            {
                if (string.IsNullOrEmpty(_description.HelpMessage))
                    return sb.Append("null").ToString();
                return sb.AppendLine("null").Append(_description.HelpMessage).ToString();
            }
            if (_value.BaseObject is string)
            {
                sb.Append("\"").Append(_value.ToString().Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\r", "\\r").Replace("\n", "\\n"));
                if (string.IsNullOrEmpty(_description.HelpMessage))
                    return sb.Append("\"").ToString();
                return sb.AppendLine("\"").Append(_description.HelpMessage).ToString();
            }
            
            if (string.IsNullOrEmpty(_description.HelpMessage))
                return sb.Append(_value.ToString().Replace("\\", "\\\\").Replace("\r", "\\r").Replace("\n", "\\n")).ToString();
            return sb.AppendLine(_value.ToString().Replace("\\", "\\\\").Replace("\r", "\\r").Replace("\n", "\\n")).Append(_description.HelpMessage).ToString();
        }
        public static bool TestChoiceOption(object obj, PSHostUserInterface ui)
        {
            if (obj == null)
            {
                if (ui != null)
                    ui.WriteErrorLine("Value cannot be null.");
                return false;
            }

            object baseObject;
            PSObject psObj;
            if (obj is PSObject)
                baseObject = (psObj = (PSObject)obj).BaseObject;
            else
                psObj = PSObject.AsPSObject(baseObject = obj);
            if (baseObject is ChoiceDescription || baseObject is ChoiceOption)
                return true;
            if (baseObject is string)
            {
                if (((string)baseObject).Trim().Length > 0)
                    return true;
                if (ui != null)
                    ui.WriteErrorLine("String value cannot be empty.");
            }
            else
            {
                string label;
                if (TryGetInstanceValue<string>(psObj, "Label", out label))
                {
                    if ((label = label.Trim()).Length > 0 || (LanguagePrimitives.TryConvertTo<string>(psObj, out label) && (label = label.Trim()).Length > 0))
                        return true;
                    if (ui != null)
                        ui.WriteErrorLine("Label cannot be empty");
                }
                else
                {
                    if (LanguagePrimitives.TryConvertTo<string>(psObj, out label) && (label = label.Trim()).Length > 0)
                        return true;
                    if (ui != null)
                        ui.WriteErrorLine("Value cannot be empty");
                }
            }
            return false;
        }
    }
    public class UriQueryParameter : IEquatable<UriQueryParameter> {
        private object _syncRoot = new object();
        private string _key;
        private string _value;
        private UriQueryParameter _previousElement = null;
        private UriQueryParameter _nextElement = null;
        private UriQueryParameter _previousValue = null;
        private UriQueryParameter _nextValue = null;
        private KeyGroup _group = null;
        
        public string Key {
            get { return Collection.KeyGroup.GetKey(this); }
            set { Collection.KeyGroup.SetKey(this, value); }
        }

        public string Value {
            get { return _value; }
            set { Collection.KeyGroup.SetValue(this, value); }
        }

        public UriQueryParameter(string key, string value) {
            if (key == null)
                throw new ArgumentNullException("key");
            this._key = key;
            this._value = value;
        }

        public UriQueryParameter() : this("", null) { }
        
        public class Collection {
            private object _syncRoot = new object();
            private int _valueCount = 0;
            private int _keyCount = 0;
            private StringComparer _keyComparer;
            private UriQueryParameter _firstElement = null;
            private UriQueryParameter _lastElement = null;
            private KeyGroup _firstKey = null;
            private KeyGroup _lastKey = null;
            
            public class KeyGroup {
                private object _syncRoot = new object();
                private string _key = "";
                private int _valueCount = 0;
                private Collection _parent = null;
                private UriQueryParameter _firstElement = null;
                private UriQueryParameter _lastElement = null;
                private KeyGroup _previousKey = null;
                private KeyGroup _nextKey = null;
                
                internal static void SetParent(UriQueryParameter p, Collection parent) {
                    if (p == null)
                        throw new ArgumentNullException("p");
                }

                internal static void Set(UriQueryParameter p, string key, string value) {
                    if (p == null)
                        throw new ArgumentNullException("p");
                    if (key == null)
                        throw new ArgumentNullException("key");
                }

                internal static string GetKey(UriQueryParameter p) {
                    if (p == null)
                        throw new ArgumentNullException("p");
                    return (p._key == null) ? p._group._key : p._key;
                }

                internal static void SetKey(UriQueryParameter p, string key) {
                    if (p == null)
                        throw new ArgumentNullException("p");
                    if (key == null)
                        throw new ArgumentNullException("key");
                }

                internal static void SetValue(UriQueryParameter p, string value) {
                    if (p == null)
                        throw new ArgumentNullException("p");
                }
            }
        }
    }
}
'@ -ErrorAction Stop;

Function Read-ServiceNowUrl {
    [CmdletBinding()]
    [OutputType([System.UriBuilder])]
    Param(
        [string]$Prompt = 'Enter ServiceNow URL'
    )
    $SourceUri = $null;
    $InputString = Read-Host -Prompt $Prompt;
    if (-not [string]::IsNullOrWhiteSpace($InputString)) {
        $SourceUri = $Script:BaseUri;
        while (-not [Uri]::TryCreate($InputString, [UriKind]::RelativeOrAbsolute, [ref]$SourceUri)) {
            $InputString = Read-Host -Prompt "Error: Invalid URI string`r`n$Prompt";
            if ([string]::IsNullOrWhiteSpace($InputString)) {
                $SourceUri = $null;
                break;
            }
        };
        if ($null -ne $SourceUri) {
            if ($SourceUri.IsAbsoluteUri) { return [System.UriBuilder]::new($SourceUri) }
            return [System.UriBuilder]::new([Uri]::new($Script:BaseUri, $SourceUri));
        }
    }
}

Function Parse-UriQueryComponents {
    [CmdletBinding()]
    [OutputType([System.Collections.Generic.Dictionary[System.String,System.String]])]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [AllowNull()]
        [AllowEmptyString()]
        [string]$Query,

        [switch]$CaseSensitive
    )

    Begin {
        [System.Collections.Generic.Dictionary[System.String,System.String]]$Dictionary = $null;
        if ($CaseSensitive.IsPresent) {
            $Dictionary = [System.Collections.Generic.Dictionary[System.String,System.String]]::new([System.StringComparer]::InvariantCulture);
        } else {
            $Dictionary = [System.Collections.Generic.Dictionary[System.String,System.String]]::new([System.StringComparer]::InvariantCultureIgnoreCase);
        }
        if ($null -ne $Query -and $Query.Length -gt 0 -and '?' -ne $Query) {
            if ($Query[0] -eq '?') { $Query -eq $Query.Substring(1) }
            $Query.Split('&') | ForEach-Object {
                ($key, $value) = $_.Split('=', 2);
                $key = [Uri]::UnescapeDataString($key);
                if ($null -ne $value) { $value = [Uri]::UnescapeDataString($value) }
                if ($Dictionary.ContainsKey($key)) { $Dictionary[$key] = $value } else { $Dictionary.Add($key, $value) }
            }
        }
        Write-Output -InputObject $Dictionary -NoEnumerate;
    }
}

Function New-ChoiceOption {
    [CmdletBinding(DefaultParameterSetName = 'Valued')]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true, ParameterSetName = 'FromPipeline')]
        [ValidateScript({ [UriHelper.ChoiceOption]::TestChoiceOption($_) })]
        [object]$InputObject,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'ChoiceDescription')]
        [System.Management.Automation.Host.ChoiceDescription]$Description,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Labeled')]
        [string]$Label,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Valued')]
        [Parameter(ParameterSetName = 'Labeled')]
        [Parameter(ParameterSetName = 'ChoiceDescription')]
        [PSObject]$Value,
        
        [Parameter(ParameterSetName = 'Labeled')]
        [string]$HelpMessage,
        
        [Parameter(ParameterSetName = 'Labeled')]
        [Parameter(ParameterSetName = 'ChoiceDescription')]
        [Parameter(ParameterSetName = 'Valued')]
        [switch]$IsDefaultChoice

    )

    Process {
        if ($PSBoundParameters.ContainsKey('InputObject')) {
            [UriHelper.ChoiceOption]::AsChoiceOption($InputObject) | Write-Output;
        } else {
            if ($PSBoundParameters.ContainsKey('ChoiceDescription')) {
                if ($PSBoundParameters.ContainsKey('Value')) {
                    New-Object -TypeName 'UriHelper.ChoiceOption' -ArgumentList $IsDefaultChoice.IsPresent, $ChoiceDescription, $Value;
                } else {
                    New-Object -TypeName 'UriHelper.ChoiceOption' -ArgumentList $IsDefaultChoice.IsPresent, $ChoiceDescription, $ChoiceDescription;
                }
            } else {
                if ($PSBoundParameters.ContainsKey('Label')) {
                    if ($PSBoundParameters.ContainsKey('Value')) {
                        if ($PSBoundParameters.ContainsKey('HelpMessage')) {
                            New-Object -TypeName 'UriHelper.ChoiceOption' -ArgumentList $IsDefaultChoice.IsPresent, $Label, $HelpMessage, $Value;
                        } else {
                            New-Object -TypeName 'UriHelper.ChoiceOption' -ArgumentList $IsDefaultChoice.IsPresent, $Label, $Value;
                        }
                    } else {
                        if ($PSBoundParameters.ContainsKey('HelpMessage')) {
                            New-Object -TypeName 'UriHelper.ChoiceOption' -ArgumentList $IsDefaultChoice.IsPresent, $Label, $HelpMessage, $Label;
                        } else {
                            New-Object -TypeName 'UriHelper.ChoiceOption' -ArgumentList $IsDefaultChoice.IsPresent, $Label, $Label;
                        }
                    }
                } else {
                    New-Object -TypeName 'UriHelper.ChoiceOption' -ArgumentList $IsDefaultChoice.IsPresent, $Value;
                }
            }
        }
    }
}

Function Read-ChoiceOption {
    Param(
        
    )
}
[System.UriBuilder]$SourceUri = Read-ServiceNowUrl;
while ($null -ne $SourceUri) {
    $Query = $SourceUri.Query | Parse-UriQueryString;
    $Choices = [System.Collections.ObjectModel.Collection[System.Management.Automation.Host.ChoiceDescription]]::new();

    [System.Management.Automation.Host.ChoiceDescription]::new(
}
$Script:BaseUri = [Uri]::new('https://inscomscd.service-now.com', [UriKind]::Absolute);
$InputString = Read-Host -Prompt 'Enter ServiceNow URL';
$SourceUri = $BaseUri;

<#
https://inscomscd.service-now.com/nav_to.do?uri=%2F$system_properties_ui.do%3Fsysparm_title%3DSystem%2520Configuration%26sysparm_category%3DSystem%2520Configuration
https://inscomscd.service-now.com/nav_to.do?uri=%2F$system_properties_ui.do%3Fsysparm_title%3DSystem%2520Configuration%26sysparm_category%3DSystem%2520Configuration
#>

