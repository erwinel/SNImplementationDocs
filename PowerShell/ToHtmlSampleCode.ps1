Add-Type -AssemblyName 'System.Drawing' -ErrorAction Stop;
Add-Type -AssemblyName 'System.Web' -ErrorAction Stop;
Add-Type -AssemblyName 'System.Web.Abstractions' -ErrorAction Stop;
Add-Type -AssemblyName 'System.Web.Extensions' -ErrorAction Stop;

Function Add-SourceNode {
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [System.Xml.XmlNode]$Source,
        [Parameter(Mandatory = $true)]
        [System.Xml.XmlNode]$Target
    )

    Begin { $OwnerDocument = $Target.OwnerDocument }
    Process {
        if ($Source -is [System.Xml.XmlElement]) {
            if ($OwnerDocument.PreserveWhitespace) {
                $XmlElement = $Target.AppendChild($OwnerDocument.CreateElement('span'));
                $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlMarkupSymbol';
                $XmlElement.InnerText = '<';
                $XmlElement = $Target.AppendChild($OwnerDocument.CreateElement('span'));
                $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlElementName';
                $XmlElement.InnerText = $Source.Name;
                $Source.Attributes | ForEach-Object {
                    $Target.AppendChild($OwnerDocument.CreateTextNode(' ')) | Out-Null;
                    $XmlElement = $Target.AppendChild($OwnerDocument.CreateElement('span'));
                    $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlAttributeName';
                    $XmlElement.InnerText = $_.Name;
                    $XmlElement = $Target.AppendChild($OwnerDocument.CreateElement('span'));
                    $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlMarkupSymbol';
                    $XmlElement.InnerText = '=';
                    $XmlElement = $Target.AppendChild($OwnerDocument.CreateElement('span'));
                    $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlAttributeValue';
                    $XmlElement.InnerText = $_.Value;
                    $XmlElement.InnerText = '"' + $XmlElement.InnerXml + '"';
                }
                $XmlElement = $Target.AppendChild($OwnerDocument.CreateElement('span'));
                $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlMarkupSymbol';
                if ($Source.IsEmpty) {
                    $XmlElement.InnerText = ' />';
                } else {
                    if ($Source.ChildNodes.Count -gt 1 -or $Source.InnerText.Length -gt 0) {
                        $XmlElement.InnerText = '>';
                        @($Source.ChildNodes) | Add-SourceNode -Target $Target;
                        $XmlElement = $Target.AppendChild($OwnerDocument.CreateElement('span'));
                        $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlMarkupSymbol';
                        $XmlElement.InnerText = '</';
                    } else {
                        $XmlElement.InnerText = '></';
                    }
                    $XmlElement = $Target.AppendChild($OwnerDocument.CreateElement('span'));
                    $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlElementName';
                    $XmlElement.InnerText = $Source.Name;
                    $XmlElement = $Target.AppendChild($OwnerDocument.CreateElement('span'));
                    $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlMarkupSymbol';
                    $XmlElement.InnerText = '>';
                }
            } else {
                $ParentElement = $Target.AppendChild($OwnerDocument.CreateElement('span'));
                $ParentElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-nowrap';
                $XmlElement = $ParentElement.AppendChild($OwnerDocument.CreateElement('span'));
                $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlMarkupSymbol';
                $XmlElement.InnerText = '<';
                $XmlElement = $ParentElement.AppendChild($OwnerDocument.CreateElement('span'));
                $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlElementName';
                $XmlElement.InnerText = $Source.Name;
                $Source.Attributes | ForEach-Object {
                    $Target.AppendChild($OwnerDocument.CreateTextNode(' ')) | Out-Null;
                    $ParentElement = $Target.AppendChild($OwnerDocument.CreateElement('span'));
                    $ParentElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-nowrap';
                    $XmlElement = $ParentElement.AppendChild($OwnerDocument.CreateElement('span'));
                    $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlAttributeName';
                    $XmlElement.InnerText = $_.Name;
                    $XmlElement = $ParentElement.AppendChild($OwnerDocument.CreateElement('span'));
                    $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlMarkupSymbol';
                    $XmlElement.InnerText = '=';
                    $XmlElement = $ParentElement.AppendChild($OwnerDocument.CreateElement('span'));
                    $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlAttributeValue';
                    $XmlElement.InnerText = $_.Value;
                    $XmlElement.InnerText = '"' + $XmlElement.InnerXml + '"';
                }
                $ParentElement = $Target.AppendChild($OwnerDocument.CreateElement('span'));
                $ParentElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-nowrap';
                $XmlElement = $ParentElement.AppendChild($OwnerDocument.CreateElement('span'));
                $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlMarkupSymbol';
                if ($Source.IsEmpty) {
                    $XmlElement.InnerText = ' />';
                } else {
                    if ($Source.ChildNodes.Count -gt 1 -or $Source.InnerText.Length -gt 0) {
                        $XmlElement.InnerText = '>';
                        @($Source.ChildNodes) | Add-SourceNode -Target $Target;
                        $ParentElement = $Target.AppendChild($OwnerDocument.CreateElement('span'));
                        $ParentElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-nowrap';
                        $XmlElement = $ParentElement.AppendChild($OwnerDocument.CreateElement('span'));
                        $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlMarkupSymbol';
                        $XmlElement.InnerText = '</';
                    } else {
                        $XmlElement.InnerText = '></';
                    }
                    $XmlElement = $ParentElement.AppendChild($OwnerDocument.CreateElement('span'));
                    $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlElementName';
                    $XmlElement.InnerText = $Source.Name;
                    $XmlElement = $ParentElement.AppendChild($OwnerDocument.CreateElement('span'));
                    $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlMarkupSymbol';
                    $XmlElement.InnerText = '>';
                }
            }
        } else {
            if ($Source -is [System.Xml.XmlCDataSection]) {
                $XmlElement = $Target.AppendChild($OwnerDocument.CreateElement('span'));
                $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlCDataSection';
                $XmlElement.InnerText = $Source.OuterXml;
            } else {
                if ($Source -is [System.Xml.XmlComment]) {
                    $XmlElement = $Target.AppendChild($OwnerDocument.CreateElement('span'));
                    $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlComment';
                    $XmlElement.InnerText = $Source.OuterXml;
                } else {
                    if ($Source -is [System.Xml.XmlCharacterData]) {
                        $Target.AppendChild($OwnerDocument.CreateTextNode($Source.InnerText)) | Out-Null;
                    } else {
                        $XmlElement = $Target.AppendChild($OwnerDocument.CreateElement('span'));
                        $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'xmlElementName';
                        $XmlElement.InnerText = $Source.OuterXml;
                    }
                }
            }
        }
    }
}
$Code = [System.Windows.Clipboard]::GetText();
[Xml]$XmlDocument = '<code />';
$XmlDocument.PreserveWhitespace = $false;
$Fragment = $XmlDocument.CreateDocumentFragment();
$Fragment.InnerXml = $Code;
$Fragment.ChildNodes | Add-SourceNode -Target $XmlDocument.DocumentElement;
$XmlWriterSettings = [System.Xml.XmlWriterSettings]::new();
$XmlWriterSettings.OmitXmlDeclaration = $true;
$XmlWriterSettings.CheckCharacters = $false;
$XmlWriterSettings.Encoding = [System.Text.UTF8Encoding]::new($false, $false);
$XmlWriterSettings.Indent = -not $XmlDocument.PreserveWhitespace;
$StringWriter = [System.IO.StringWriter]::new();
$XmlWriter = [System.Xml.XmlWriter]::Create($StringWriter, $XmlWriterSettings);
try {
    $XmlDocument.WriteTo($XmlWriter);
    $XmlWriter.Flush();
    [System.Windows.Clipboard]::SetText($StringWriter.ToString());
} finally { $XmlWriter.Close() }