$Script:DefaultBaseUri = 'https://dev75813.service-now.com';

Function Get-SnNavUri {
    [OutputType([Uri])]
    Param(
        [Parameter(Mandatory = $true)]
        [ValidateScript({ $_.IsAbsoluteUri })]
        [Uri]$Uri
    )

    [UriBuilder]$UriBuilder = [UriBuilder]::new($Uri);

    foreach ($kvp in $UriBuilder.Query.Split('&')) {
        Write-Information -MessageData $kvp -InformationAction Continue;
        ($k, $v) = $kvp.Split('=');
        if ($k -eq 'uri' -and $null -ne $v) {
            $PathAndQUery = [Uri]::UnescapeDataString($v);
            $i = $PathAndQUery.IndexOf('#');
            if ($i -lt 0) {
                $UriBuilder.Fragment = '';
            } else {
                $UriBuilder.Fragment = $PathAndQUery.Substring($i);
                $PathAndQUery = $PathAndQUery.Substring(0, $i);
            }
            $i = $PathAndQUery.IndexOf('?');
            if ($i -lt 0) {
                $UriBuilder.Query = '';
            } else {
                $UriBuilder.Query = $PathAndQUery.Substring($i);
                $PathAndQUery = $PathAndQUery.Substring(0, $i);
            }
            $UriBuilder.Path = $PathAndQUery;
            $UriBuilder.Uri | Write-Output;
            break;
        }
    }
}

Function Get-UriQueryParam {
    [OutputType([Uri])]
    Param(
        [Parameter(Mandatory = $true)]
        [ValidateScript({ $_.IsAbsoluteUri })]
        [Uri]$Uri,

        [Parameter(Mandatory = $true)]
        [string]$Name
    )

    [UriBuilder]$UriBuilder = [UriBuilder]::new($Uri);

    $Query = $UriBuilder.Query;
    if ($Query.StartsWith('?')) { $Query = $Query.Substring(1) }
    if ($Query.Length -gt 0) {
        foreach ($kvp in $Query.Split('&')) {
            Write-Information -MessageData $kvp -InformationAction Continue;
            ($k, $v) = $kvp.Split('=');
            if ($k -eq $Name) {
                if ($null -eq $v) { return $v }
                return [Uri]::UnescapeDataString($v);
            }
        }
    }
}

Function Get-UpdateListUrl {
    [OutputType([Uri])]
    Param(
        [Parameter(Mandatory = $true)]
        [Alias('Sys_Id')]
        [string]$SysId,
        
        [ValidateScript({ $_.IsAbsoluteUri })]
        [Uri]$BaseUri = $Script:DefaultBaseUri,

        [switch]$Xml
    )

    [UriBuilder]$UriBuilder = [UriBuilder]::new($BaseUri);
    $UriBuilder.Fragment = '';
    $UriBuilder.Path = 'sys_update_xml_list.do';
    $Query = "sysparm_query=$([Uri]::EscapeDataString("remote_update_set=$SysId"))";
    if ($Xml.IsPresent) { $Query = "$($Query)&XML" }
    $UriBuilder.Query = $Query;
    $UriBuilder.Uri | Write-Output;
}

Function Get-ProblemListUrl {
    [OutputType([Uri])]
    Param(
        [Parameter(Mandatory = $true)]
        [Alias('Sys_Id')]
        [string]$UpdateSet,
        
        [ValidateScript({ $_.IsAbsoluteUri })]
        [Uri]$BaseUri = $Script:DefaultBaseUri,

        [switch]$Xml
    )

    [UriBuilder]$UriBuilder = [UriBuilder]::new($BaseUri);
    $UriBuilder.Fragment = '';
    $UriBuilder.Path = 'sys_update_preview_problem_list.do';
    $Query = "sysparm_query=$([Uri]::EscapeDataString("remote_update_set=$UpdateSet"))";
    if ($Xml.IsPresent) { $Query = "$($Query)&XML" }
    $UriBuilder.Query = $Query;
    $UriBuilder.Uri | Write-Output;
}

$SysId = Read-Host -Prompt 'Update Set Sys ID';
$Uri = Get-UpdateListUrl -SysId $SysId -Xml;
$SysIdRegex = [System.Text.RegularExpressions.Regex]::new('^[a-f\d]{32}$')
if ($null -ne $Uri) {
    [System.Windows.Clipboard]::SetText($Uri.AbsoluteUri);
    (Read-Host -Prompt 'URI copied to clipboard. Hit enter when ready to save XML.') | Out-Null;
    $UpdateSetTempFileName = [System.IO.Path]::GetTempFileName();
    Remove-Item -Path $UpdateSetTempFileName;
    $UpdateSetTempFileName = ($UpdateSetTempFileName | Split-Path -Parent) | Join-Path -ChildPath "$([System.IO.Path]::GetFileNameWithoutExtension($UpdateSetTempFileName)).xml";
    try {
        
        [System.Windows.Clipboard]::SetText($UpdateSetTempFileName);
        (Read-Host -Prompt 'Temp path copied to clipboard. Hit enter when XML saved.') | Out-Null;
        [Xml]$UpdateSetXml = ((Get-Content -Path $UpdateSetTempFileName) | Out-String).Trim();
        if ($null -ne $UpdateSetXml) {
            $Uri = $null;
            $Uri = Get-ProblemListUrl -UpdateSet $SysId -Xml;
            if ($null -ne $Uri) {
                [System.Windows.Clipboard]::SetText($Uri.AbsoluteUri);
                (Read-Host -Prompt 'URI copied to clipboard. Hit enter when ready to save XML.') | Out-Null;
                $TempFileName = [System.IO.Path]::GetTempFileName();
                Remove-Item -Path $TempFileName;
                $TempFileName = ($TempFileName | Split-Path -Parent) | Join-Path -ChildPath "$([System.IO.Path]::GetFileNameWithoutExtension($TempFileName)).xml";
                try {
                    [System.Windows.Clipboard]::SetText($TempFileName);
                    (Read-Host -Prompt 'Temp path copied to clipboard. Hit enter when XML saved.') | Out-Null;
                    [Xml]$ProblemListXml = ((Get-Content -Path $TempFileName) | Out-String).Trim();
                    if ($null -ne $ProblemListXml) {
                        [Xml]$Html = @'
<table class="table table-bordered" ng-controller="targetSysConfigEditController">
    <thead>
        <tr>
            <th scope="col">Remote Update</th>
            <th scope="col">Description</th>
            <th scope="col">Recommended Action</th>
            <th scope="col">Missing Item</th>
            <th scope="col">Missing Item Table</th>
        </tr>
    </thead>
</table>
'@;
                        $TBody = $Html.DocumentElement.AppendChild($Html.CreateElement('tbody'));
                        @($ProblemListXml.DocumentElement.SelectNodes('sys_update_preview_problem')) | ForEach-Object {
                            Write-Information -MessageData "sys_id: $($_.sys_id)" -InformationAction Continue;
                            $Tr = $TBody.AppendChild($Html.CreateElement('tr'));
                            $Td = $Tr.AppendChild($Html.CreateElement('th'));
                            $Td.Attributes.Append($Html.CreateAttribute('scope')).Value = 'row';
                            $XmlElement = $UpdateSetXml.DocumentElement.SelectSingleNode("sys_update_xml[sys_id=`"$($_.remote_update)`"]/name");
                            if ($null -eq $XmlElement -or $XmlElement.IsEmpty -or $XmlElement.InnerText.Trim().Length -eq 0) { $Td.InnerText = $_.remote_update } else { $Td.InnerText = "$($XmlElement.InnerText) ($($_.remote_update))" }
                            if ($null -eq $_.description) { $Tr.AppendChild($Html.CreateElement('td')).InnerText = '' } else { $Tr.AppendChild($Html.CreateElement('td')).InnerText = $_.description }
                            $status = $_.status;
                            if ($null -eq $status) { $status = '' }
                            switch ($status.Trim()) {
                                'skipped' {
                                    $Tr.AppendChild($Html.CreateElement('td')).InnerText = 'Skip remote update';
                                    break;
                                }
                                'ignored' {
                                    $Tr.AppendChild($Html.CreateElement('td')).InnerText = 'Accept remote update';
                                    break;
                                }
                                '' {
                                    $Td = $Tr.AppendChild($Html.CreateElement('td'));
                                    $Td.Attributes.Append($Html.CreateAttribute('class')).Value = 'alert-danger';
                                    $Td.InnerText = 'Not Specified';
                                    break;
                                }
                                default {
                                    $Tr.AppendChild($Html.CreateElement('td')).InnerText = $status;
                                    break;
                                }
                            }
                            
                            $missing_item = $_.missing_item;
                            if ([string]::IsNullOrWhiteSpace($missing_item)) {
                                $missing_item = '';
                            } else {
                                if ($SysIdRegex.IsMatch(($missing_item = $missing_item.Trim())) -and -not [string]::IsNullOrWhiteSpace($_.missing_item_table)) {
                                    $missing_item = "/$($_.missing_item_table).do?sys_id=$missing_item";
                                }
                            }
                            if ([string]::IsNullOrWhiteSpace($_.missing_item_update)) {
                                $Tr.AppendChild($Html.CreateElement('td')).InnerText = $missing_item;
                            } else {
                                $Td = $Tr.AppendChild($Html.CreateElement('td'));
                                $Anchor = $Td.AppendChild($Html.CreateElement('a'));
                                $Anchor.Attributes.Append($Html.CreateAttribute('ng-href')).Value = "serviceNowUrl + '/sys_update_xml.do?sys_id=$($_.missing_item_update)'";
                                $Anchor.Attributes.Append($Html.CreateAttribute('target')).Value = '_blank';
                                $XmlElement = $UpdateSetXml.DocumentElement.SelectSingleNode("sys_update_xml[sys_id=`"$($_.missing_item_update)`"]/name");
                                if ($null -eq $XmlElement -or $XmlElement.IsEmpty -or $XmlElement.InnerText.Trim().Length -eq 0) { $Anchor.InnerText = $missing_item } else { $Anchor.InnerText = "$missing_item ($($XmlElement.InnerText))" }
                            }
                            if ([string]::IsNullOrWhiteSpace($_.missing_item_table)) {
                                $Tr.AppendChild($Html.CreateElement('td')).InnerText = '';
                            } else {
                                $Td = $Tr.AppendChild($Html.CreateElement('td'));
                                $Anchor = $Td.AppendChild($Html.CreateElement('a'));
                                $Anchor.Attributes.Append($Html.CreateAttribute('ng-href')).Value = "serviceNowUrl + '/$($_.missing_item_table)_list.do'";
                                $Anchor.Attributes.Append($Html.CreateAttribute('target')).Value = '_blank';
                                $Anchor.InnerText = $_.missing_item_table;
                            }
                        }
                        $XmlWriterSettings = [System.Xml.XmlWriterSettings]::new();
                        $XmlWriterSettings.Indent = $true;
                        $XmlWriterSettings.CheckCharacters = $false;
                        $XmlWriterSettings.OmitXmlDeclaration = $true;
                        $StringWriter = [System.IO.StringWriter]::new();
                        $XmlWriter = [System.Xml.XmlWriter]::Create($StringWriter, $XmlWriterSettings);
                        $Html.WriteTo($XmlWriter);
                        $XmlWriter.Flush();
                        [System.Windows.Clipboard]::SetText($StringWriter.ToString());
                        Write-Information -MessageData 'Table copied to clipboard' -InformationAction Continue;
                        $XmlWriter.Close();
                        $StringWriter.Dispose();
                    }
                } finally {
                    if ($TempFileName | Test-Path) { Remove-Item -Path $TempFileName }
                }
            }
        }
    } finally {
        if ($UpdateSetTempFileName | Test-Path) { Remove-Item -Path $UpdateSetTempFileName }
    }
}
<#
$Path = 'C:\Users\lerwi\source\repos\SNImplementationDocs\gh-pages\downloads\sys_remote_update_set_Service_Catalog.xml';
$Update_set_Sys_Id = 'b19531fddb62f740b53f341f7c9619d8';
[Uri]$ProblemUrl = 'https://dev75813.service-now.com/nav_to.do?uri=sys_update_preview_problem.do?sys_id=0d16753d1b223300362ffc88cc4bcb36';
Get-ProblemListUrl -UpdateSet 'b19531fddb62f740b53f341f7c9619d8' -Xml;
#Get-UriQueryParam -Name 'sysparm_query' -Uri 'https://dev75813.service-now.com/sys_update_preview_problem_list.do?sysparm_query=remote_update_set%3Db19531fddb62f740b53f341f7c9619d8&sysparm_first_row=1&sysparm_view=';
#>