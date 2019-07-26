Param(
    [ValidateScript({ $_.IsAbsoluteUri -and [string]::IsNullOrEmpty($_.Fragment) -and ([string]::IsNullOrEmpty($_.PathAndQuery) -or $_.PathAndQuery -eq '/') })]
    [Uri]$BaseUri = [Uri]::new('https://inscomscd.service-now.com', [UriKind]::Absolute)
)

Add-Type -TypeDefinition @'
namespace UriHelper {
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
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
[System.
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

