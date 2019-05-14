Add-Type -AssemblyName 'System.Drawing';

Function Sync-ImageIndex {
    [OutputType([System.Uri])]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [System.IO.DirectoryInfo]$Directory,

        [Parameter(Mandatory = $true)]
        [Uri]$BaseUri,

        [Parameter(Mandatory = $true)]
        [Uri]$ParentUri
    )

    Begin {
        if ($null -eq $Script:__Sync_ImageIndex_Extensions) {
            $Script:__Sync_ImageIndex_Extensions = '.jpg', '.jpeg', '.gif', '.png', '.svg';
        }
    }

    Process {
        $CurrentUri = New-Object -TypeName 'System.Uri' -ArgumentList $ParentUri, "$($Directory.Name)/";
        $Files = @($Directory.GetFiles() | Where-Object { $Script:__Sync_ImageIndex_Extensions -icontains $_.Extension });
        if ($Files.Count -eq 0) {
            $Directory.GetDirectories() | Sync-ImageIndex -BaseUri $BaseUri -ParentUri $CurrentUri;
        } else {
                [Xml]$XHtmlDocument = @'
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=1024, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta charset="utf-8" />
</head>
<body>
    <header class="container-fluid p-1"><h1></h1></header>
      <section class="container-fluid"></section>
</body>
</html>
'@;
            $XhtmlNsmgr = New-Object -TypeName 'System.Xml.XmlNamespaceManager' -ArgumentList $XHtmlDocument.NameTable
            $XhtmlNsmgr.AddNamespace('h', $Script:Xmlns_Xhtml);
            $SectionElement = $XHtmlDocument.DocumentElement.SelectSingleNode('h:head', $XhtmlNsmgr);
            $SectionElement.AppendChild($XHtmlDocument.CreateElement('title',  $Script:Xmlns_Xhtml)).InnerText = $XHtmlDocument.DocumentElement.SelectSingleNode('h:body/h:header/h:h1', $XhtmlNsmgr).InnerText = "$($Directory.Name) Image Catalog";
            foreach ($CssPath in @('lib/twitter-bootstrap/css/bootstrap.css', 'lib/angular.js/angular-csp.css', 'theme.css')) {
                $XmlElement = $SectionElement.AppendChild($XHtmlDocument.CreateElement('link', $Script:Xmlns_Xhtml));
                $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('rel')).Value = 'stylesheet';
                $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('type')).Value = 'text/css';
                $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('media')).Value = 'screen';
                $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('href')).Value = $CurrentUri.MakeRelative((New-Object -TypeName 'System.Uri' -ArgumentList $BaseUri, $CssPath));
            }
            foreach ($JsPath in @('lib/jquery/jquery.js', 'lib/twitter-bootstrap/js/bootstrap.bundle.js', 'lib/angular.js/angular.js', 'App/ImageCatalogModule.js')) {
                $XmlElement = $SectionElement.AppendChild($XHtmlDocument.CreateElement('script', $Script:Xmlns_Xhtml));
                $XmlElement.InnerText = '';
                $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('type')).Value = 'text/javascript';
                $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('src')).Value = $CurrentUri.MakeRelative((New-Object -TypeName 'System.Uri' -ArgumentList $BaseUri, $JsPath));
            }
            $SectionElement = $XHtmlDocument.DocumentElement.SelectSingleNode('h:body/h:section', $XhtmlNsmgr);
            $SubDirectories = @($Directory.GetDirectories() | Sync-ImageIndex -BaseUri $BaseUri -ParentUri $CurrentUri);
            if ($SubDirectories.Count -gt 0) {
                $ParentElement = $SectionElement.AppendChild($XHtmlDocument.CreateElement('div', $Script:Xmlns_Xhtml));
                $ParentElement.Attributes.Append($XHtmlDocument.CreateAttribute('class')).Value = 'card';
                $XmlElement = $ParentElement.AppendChild($XHtmlDocument.CreateElement('div', $Script:Xmlns_Xhtml));
                $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('class')).Value = 'card-header';
                $XmlElement.AppendChild($XHtmlDocument.CreateElement('h2')).InnerText = 'Subdirectories';
                $ParentElement = $ParentElement.AppendChild($XHtmlDocument.CreateElement('div', $Script:Xmlns_Xhtml));
                $ParentElement.Attributes.Append($XHtmlDocument.CreateAttribute('class')).Value = 'card-body';
                $ParentElement = $ParentElement.AppendChild($XHtmlDocument.CreateElement('ul', $Script:Xmlns_Xhtml));
                $SubDirectories | ForEach-Object {
                    $XmlElement = $ParentElement.AppendChild($XHtmlDocument.CreateElement('li', $Script:Xmlns_Xhtml)).AppendChild($XHtmlDocument.CreateElement('a', $Script:Xmlns_Xhtml));
                    $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('href')).Value = $CurrentUri.MakeRelative((New-Object -TypeName 'System.Uri' -ArgumentList $_));
                    $Name = ([Uri]$_).AbsolutePath;
                    if ($Name.EndsWith('/')) { $Name = $Name.Substring(0, $Name.Length) }
                    $i = $Name.LastIndexOf('/');
                    if ($i -gt 0) { $Name = $Name.Substring($i + 1) }
                    $XmlElement.InnerText = $Name;
                }
            }
            
            $SectionElement = $SectionElement.AppendChild($XHtmlDocument.CreateElement('table', $Script:Xmlns_Xhtml));
            $SectionElement.Attributes.Append($XHtmlDocument.CreateAttribute('class')).Value = 'table table-bordered';
            $ParentElement = $SectionElement.AppendChild($XHtmlDocument.CreateElement('thead', $Script:Xmlns_Xhtml)).AppendChild($XHtmlDocument.CreateElement('tr', $Script:Xmlns_Xhtml));
            @('Name', 'Image', 'Width', 'Height') | ForEach-Object {
                $XmlElement = $ParentElement.AppendChild($XHtmlDocument.CreateElement('th'));
                $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('scope')).Value = 'col';
                $XmlElement.InnerText = $_;
            }
            $SectionElement = $SectionElement.AppendChild($XHtmlDocument.CreateElement('tbody', $Script:Xmlns_Xhtml));
            $Files | ForEach-Object {
                $ParentElement = $SectionElement.AppendChild($XHtmlDocument.CreateElement('tr', $Script:Xmlns_Xhtml));
                $XmlElement = $ParentElement.AppendChild($XHtmlDocument.CreateElement('th', $Script:Xmlns_Xhtml));
                $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('scope')).Value = 'row';
                $XmlElement.InnerText = $_.Name;
                $FullWidth = $FullHeight = -1;
                if ($_.Extension -ieq '.svg') {
                    $XmlDocument = New-Object -TypeName 'System.Xml.XmlDocument';
                    $XmlDocument.Load($_.FullName);
                    $SvgNsmgr = New-Object -TypeName 'System.Xml.XmlNamespaceManager' -ArgumentList $XHtmlDocument.NameTable;
                    $SvgNsmgr.AddNamespace('s', $Script:Xmlns_Svg);
                    $XmlAttribute = $XmlDocument.DocumentElement.SelectSingleNode('@width');
                    if ($null -ne $XmlAttribute -and $XmlAttribute.Value.Length -gt 0) { try { $FullHeight = [System.Xml.XmlConvert]::ToInt32($XmlAttribute.Value.Trim()); } catch { } }
                    $XmlAttribute = $XmlDocument.DocumentElement.SelectSingleNode('@height');
                    if ($null -ne $XmlAttribute -and $XmlAttribute.Value.Length -gt 0) { try { $FullWidth = [System.Xml.XmlConvert]::ToInt32($XmlAttribute.Value.Trim()); } catch { } }
                    if ($FullWidth -lt 1) {
                        if ($FullHeight -lt 1) { $FullHeight = $FullWidth = 32 } else { $FullWidth = $FullHeight }
                    } else {
                        if ($FullHeight -lt 1) { $FullHeight = $FullWidth }
                    }
                } else {
                    $Image = [System.Drawing.Image]::FromFile($_.FullName);
                    $FullWidth = $Image.Width;
                    $FullHeight = $Image.Height;
                    $Image.Dispose();
                }
                $ThumbWidth = $FullWidth;
                $ThumbHeight = $FullHeight;
                if ($ThumbWidth -gt $Height) {
                    if ($ThumbWidth -gt 32 -or ($_.Extension -ieq '.svg' -and $ThumbWidth -lt 32)) {
                        [int]$ThumbHeight = [Math]::Round((32.0 / [double]$ThumbWidth) * [double]$ThumbHeight);
                        $ThumbWidth = 32;
                    }
                } else {
                    if ($ThumbHeight -gt 32 -or ($_.Extension -ieq '.svg' -and $ThumbHeight -lt 32)) {
                        [int]$ThumbWidth = [Math]::Round((32.0 / [double]$ThumbHeight) * [double]$ThumbWidth);
                        $ThumbHeight = 32;
                    }
                }
                $CellElement = $ParentElement.AppendChild($XHtmlDocument.CreateElement('td', $Script:Xmlns_Xhtml));
                $XmlElement = $CellElement.AppendChild($XHtmlDocument.CreateElement('a', $Script:Xmlns_Xhtml));
                $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('class')).Value = 'btn btn-light';
                $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('href')).Value = $_.Name;
                $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('target')).Value = '_blank';
                $XmlElement = $CellElement.AppendChild($XHtmlDocument.CreateElement('img', $Script:Xmlns_Xhtml));
                $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('src')).Value = $_.Name;
                $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('width')).Value = [System.Xml.XmlConvert]::ToString($ThumbWidth);
                $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('height')).Value = [System.Xml.XmlConvert]::ToString($ThumbHeight);
                $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('alt')).Value = "Thumbnail for $($_.Name)";
                $ParentElement.AppendChild($XHtmlDocument.CreateElement('td', $Script:Xmlns_Xhtml)).InnerText = [System.Xml.XmlConvert]::ToString($FullWidth);
                $ParentElement.AppendChild($XHtmlDocument.CreateElement('td', $Script:Xmlns_Xhtml)).InnerText = [System.Xml.XmlConvert]::ToString($FullHeight);
            }
            $XmlElement = $XHtmlDocument.DocumentElement.SelectSingleNode('h:body', $XhtmlNsmgr).AppendChild($XHtmlDocument.CreateElement('footer', $Script:Xmlns_Xhtml));
            $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('class')).Value = 'container-fluid';
            $XmlElement.InnerText = "Generated On $([System.DateTime]::Now.ToString('yyyy-mm-dd HH:mm zzzzzz'))";
            $XmlWriterSettings = New-Object -TypeName 'System.Xml.XmlWriterSettings';
            $XmlWriterSettings.Indent = $true;
            $XmlWriterSettings.Encoding = New-Object -TypeName 'System.Text.UTF8Encoding' -ArgumentList $false, $false;
            $OutputPath = $Directory.FullName | Join-Path -ChildPath 'index.html';
            $StreamWriter = New-Object -TypeName 'System.IO.StreamWriter' -ArgumentList $OutputPath, $false, $XmlWriterSettings.Encoding;
            $StreamWriter.WriteLine('<!DOCTYPE html>');
            try {
                $XmlWriter = [System.Xml.XmlWriter]::Create($StreamWriter, $XmlWriterSettings);
                try {
                    $XHtmlDocument.WriteTo($XmlWriter);
                    $XmlWriter.Flush();
                    $StreamWriter.Flush();
                } finally { $XmlWriter.Close() }
            } finally { $StreamWriter.Close() }
            Write-Information -MessageData "Saved catalog to $OutputPath" -InformationAction Continue;
            $CurrentUri | Write-Output;
        }
    }
}

$Script:Xmlns_Svg = "http://www.w3.org/2000/svg";
$Script:Xmlns_Xhtml="http://www.w3.org/1999/xhtml";
[Uri]$BaseUri = 'https://erwinel.github.io/'
Sync-ImageIndex -Directory (New-Object -TypeName 'System.IO.DirectoryInfo' -ArgumentList ($PSScriptRoot | Join-Path -ChildPath '..\gh-pages\images')) -BaseUri $BaseUri -ParentUri $BaseUri;