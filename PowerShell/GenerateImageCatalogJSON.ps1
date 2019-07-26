Add-Type -AssemblyName 'System.Drawing';
Add-Type -AssemblyName 'System.Web.Extensions';
Add-Type -TypeDefinition @'
namespace ImageLoader
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using System.Drawing;
    using System.IO;
    using System.Xml;
    public class ImageInfo
    {
        private string _title = "";
        private string _fileName = "";
        private string _id = null;
        private int _width = 0;
        private int _height = 0;

        public string title { get { return _title; } set { _title = (value == null) ? "" : value; } }
        public string fileName { get { return _fileName; } set { _fileName = (value == null) ? "" : value; } }
        public string id { get { return _id; } set { _id = (string.IsNullOrWhiteSpace(value)) ? null : value; } }
        public int width { get { return _width; } set { _width = value; } }
        public int height { get { return _height; } set { _height = value; } }

        internal static IEnumerable<ImageInfo> Import(XmlDocument document, FileInfo file)
        {
            XmlNamespaceManager nsmgr = new XmlNamespaceManager(document.NameTable);
            nsmgr.AddNamespace("svg", "http://www.w3.org/2000/svg");
            int width = 0, height = 0;
            string s = document.DocumentElement.GetAttribute("width");
            if (s != null && (s = s.Trim()).Length > 0)
                try { width = XmlConvert.ToInt32(s); } catch { /* okay to ignore */ }
            s = document.DocumentElement.GetAttribute("height");
            if (s != null && (s = s.Trim()).Length > 0)
                try { height = XmlConvert.ToInt32(s); } catch { /* okay to ignore */ }
            XmlNodeList symbols = document.DocumentElement.SelectNodes("defs/symbol");
            if (symbols.Count == 0)
            {
                ImageInfo result = new ImageInfo();
                result.title = Path.GetFileNameWithoutExtension(file.Name);
                result.fileName = file.Name;
                result.width = width;
                result.height = height;
                yield return result;
            }
            else
            {
                foreach (XmlElement element in symbols)
                {
                    string id = element.GetAttribute("id");
                    if (!string.IsNullOrWhiteSpace(id))
                    {
                        s = element.GetAttribute("width");
                        int w = width, h = height;
                        if (s != null && (s = s.Trim()).Length > 0)
                            try
                            {
                                if ((w = XmlConvert.ToInt32(s)) < 1)
                                    w = width;
                            }
                            catch { /* okay to ignore */ }
                        s = element.GetAttribute("height");
                        if (s != null && (s = s.Trim()).Length > 0)
                            try
                            {
                                if ((h = XmlConvert.ToInt32(s)) < 1)
                                    h = height;
                            }
                            catch { /* okay to ignore */ }
                        ImageInfo result = new ImageInfo();
                        result.title = result.id = id;
                        result.fileName = file.Name;
                        result.width = width;
                        result.height = height;
                        yield return result;
                    }
                }
            }
        }

        internal static ImageInfo Import(Image image, FileInfo file)
        {
            ImageInfo result = new ImageInfo();
            result.title = Path.GetFileNameWithoutExtension(file.Name);
            result.fileName = file.Name;
            result.width = image.Width;
            result.height = image.Height;
            return result;
        }
    }

    public class ImageFolder
    {
        private string _name = "";
        private Collection<ImageFolder> _folders = null;
        private Collection<ImageInfo> _images = null;

        public string name { get { return _name; } set { _name = (value == null) ? "" : value; } }
        public Collection<ImageFolder> folders
        {
            get
            {
                Collection<ImageFolder> f = _folders;
                if (f == null)
                    _folders = f = new Collection<ImageFolder>();
                return f;
            }
            set { _folders = value; }
        }
        public Collection<ImageInfo> images
        {
            get
            {
                Collection<ImageInfo> i = _images;
                if (i == null)
                    _images = i = new Collection<ImageInfo>();
                return i;
            }
            set { _images = value; }
        }

        public bool HasImage()
        {
            return (_images != null && _images.Count > 0) || (_folders != null && _folders.Count > 0 && _folders.Any(f => f.HasImage()));
        }

        public static ImageFolder Create(DirectoryInfo directory)
        {
            ImageFolder result = new ImageFolder();
            result.name = directory.Name;
            result._folders = new Collection<ImageFolder>(directory.GetDirectories().Select(d => Create(d)).Where(d => d.HasImage()).ToList());
            foreach (FileInfo file in directory.GetFiles())
            {
                switch (file.Extension.ToLower())
                {
                    case ".svg":
                        XmlDocument document = new XmlDocument();
                        document.LoadXml(string.Join(Environment.NewLine, File.ReadAllLines(file.FullName).SkipWhile(l =>
                        {
                            string s = l.Trim();
                            return s.Length == 0 || s.StartsWith("<!DOCTYPE") || s.StartsWith("<?");
                        }).ToArray()));
                        foreach (ImageInfo i in ImageInfo.Import(document, file))
                            result.images.Add(i);
                        break;
                    case ".png":
                    case ".gif":
                    case ".ico":
                    case ".jpg":
                    case ".jpeg":
                        using (Image image = Image.FromFile(file.FullName))
                            result.images.Add(ImageInfo.Import(image, file));
                            break;
                }
            }
            return result;
        }
    }
}
'@ -ReferencedAssemblies 'System.Xml', 'System.Drawing' -ErrorAction Stop;

Function Set-ThumbWidth {
    Param(
        [Parameter(Mandatory = $true)]
        [System.Xml.XmlElement]$Element,

        [Parameter(Mandatory = $true)]
        [int]$Width,
        [Parameter(Mandatory = $true)]
        [int]$Height,

        [switch]$Svg
    )

    if ($Width -le 0) {
        if ($Height -le 0 -or $Height -gt 32 -or ($Svg.IsPresent -and $Height -lt 32)) {
            $Element.Attributes.Append($Element.OwnerDocument.CreateAttribute('width')).Value = '32';
            $Element.Attributes.Append($Element.OwnerDocument.CreateAttribute('height')).Value = '32';
        } else {
            $Element.Attributes.Append($Element.OwnerDocument.CreateAttribute('width')).Value = "$Height";
            $Element.Attributes.Append($Element.OwnerDocument.CreateAttribute('height')).Value = "$Height";
        }
    } else {
        if ($Height -le 0) {
            if ($Width -gt 32 -or ($Svg.IsPresent -and $Width -lt 32)) {
                $Element.Attributes.Append($Element.OwnerDocument.CreateAttribute('width')).Value = '32';
                $Element.Attributes.Append($Element.OwnerDocument.CreateAttribute('height')).Value = '32';
            } else {
                $Element.Attributes.Append($Element.OwnerDocument.CreateAttribute('width')).Value = "$Width";
                $Element.Attributes.Append($Element.OwnerDocument.CreateAttribute('height')).Value = "$Width";
            }
        } else {
            if ($Width -gt $Height) {
                $Element.Attributes.Append($Element.OwnerDocument.CreateAttribute('width')).Value = '32';
                $Element.Attributes.Append($Element.OwnerDocument.CreateAttribute('height')).Value = "$([int]([Math]::Round((32.0 / [double]$Width) * [double]$Height)))";
            } else {
                if ($Height -gt 32 -or ($Svg.IsPresent -and $Height -lt 32)) {
                    $Element.Attributes.Append($Element.OwnerDocument.CreateAttribute('width')).Value = "$([int]([Math]::Round((32.0 / [double]$Height) * [double]$Width)))";
                    $Element.Attributes.Append($Element.OwnerDocument.CreateAttribute('height')).Value = '32';
                } else {
                    $Element.Attributes.Append($Element.OwnerDocument.CreateAttribute('width')).Value = "$Width";
                    $Element.Attributes.Append($Element.OwnerDocument.CreateAttribute('height')).Value = "$Height";
                }
            }
        }
    }
}

Function Add-FileRow {
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [System.IO.FileInfo]$File,
        
        [Parameter(Mandatory = $true)]
        [System.Xml.XmlElement]$TableBody
    )

    Process {
        $OwnerDocument = $TableBody.OwnerDocument;
        $RowElement = $TableBody.AppendChild($OwnerDocument.CreateElement('tr', $Script:Xmlns_Xhtml));
        $TdElement = $RowElement.AppendChild($OwnerDocument.CreateElement('th', $Script:Xmlns_Xhtml));
        $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('scope')).Value = 'row';

        if ($File.Extension -ieq '.svg') {
            $SvgDocument = New-Object -TypeName 'System.Xml.XmlDocument';
            try {
                $SvgDocument.Load($File.FullName);
                if ($null -eq $SvgDocument.DocumentElement) {
                    $AElement = $TdElement.AppendChild($OwnerDocument.CreateElement('a', $Script:Xmlns_Xhtml));
                    $AElement.Attributes.Append($OwnerDocument.CreateAttribute('href')).Value = $File.Name;
                    $AElement.Attributes.Append($OwnerDocument.CreateAttribute('target')).Value = '_blank';
                    $AElement.InnerText = $File.Name;
                    $TdElement = $RowElement.AppendChild($OwnerDocument.CreateElement('td', $Script:Xmlns_Xhtml));
                    $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('colspan')).Value = '3';
                    $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-danger';
                    $TdElement.InnerText = "Error loading SVG file: File has not document element";
                    $SvgDocument = $null;
                } else {
                    if ($SvgDocument.DocumentElement.NamespaceURI -cne $Script:Xmlns_Svg -or $SvgDocument.DocumentElement.LocalName -cne 'svg') {
                        $AElement = $TdElement.AppendChild($OwnerDocument.CreateElement('a', $Script:Xmlns_Xhtml));
                        $AElement.Attributes.Append($OwnerDocument.CreateAttribute('href')).Value = $File.Name;
                        $AElement.Attributes.Append($OwnerDocument.CreateAttribute('target')).Value = '_blank';
                        $AElement.InnerText = $File.Name;
                        $TdElement = $RowElement.AppendChild($OwnerDocument.CreateElement('td', $Script:Xmlns_Xhtml));
                        $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('colspan')).Value = '3';
                        $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-danger';
                        $TdElement.InnerText = "Error loading SVG file: Unexpected root element name $($SvgDocument.DocumentElement.Name)";
                        $SvgDocument = $null;
                    }
                }
            } catch {
                $AElement = $TdElement.AppendChild($OwnerDocument.CreateElement('a', $Script:Xmlns_Xhtml));
                $AElement.Attributes.Append($OwnerDocument.CreateAttribute('href')).Value = $File.Name;
                $AElement.Attributes.Append($OwnerDocument.CreateAttribute('target')).Value = '_blank';
                $AElement.InnerText = $File.Name;
                $TdElement = $RowElement.AppendChild($OwnerDocument.CreateElement('td', $Script:Xmlns_Xhtml));
                $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('colspan')).Value = '3';
                $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-danger';
                $TdElement.InnerText = "Error loading SVG file: $_";
            }
            if ($null -ne $SvgDocument) {
                $SvgNsmgr = New-Object -TypeName 'System.Xml.XmlNamespaceManager' -ArgumentList $SvgDocument.NameTable;
                $SvgNsmgr.AddNamespace('s', $Script:Xmlns_Svg);
                $XmlNodeList = $SvgDocument.DocumentElement.SelectNodes('s:defs/s:symbol[not(count(@id)=0)]', $SvgNsmgr);
                if ($XmlNodeList.Count -eq 0) {
                    $AElement = $TdElement.AppendChild($OwnerDocument.CreateElement('a', $Script:Xmlns_Xhtml));
                    $AElement.Attributes.Append($OwnerDocument.CreateAttribute('href')).Value = $File.Name;
                    $AElement.Attributes.Append($OwnerDocument.CreateAttribute('target')).Value = '_blank';
                    $AElement.InnerText = $File.Name;
                    $TdElement = $RowElement.AppendChild($OwnerDocument.CreateElement('td', $Script:Xmlns_Xhtml));
                    $ImgElement = $TdElement.AppendChild($OwnerDocument.CreateElement('img', $Script:Xmlns_Xhtml));
                    $ImgElement.Attributes.Append($OwnerDocument.CreateAttribute('src')).Value = $File.Name;
                    $ImgElement.Attributes.Append($OwnerDocument.CreateAttribute('alt')).Value = "Displayed Image for $($File.Name)";

                    $TdElement = $RowElement.AppendChild($OwnerDocument.CreateElement('td', $Script:Xmlns_Xhtml));
                    $XmlAttribute = $SvgDocument.DocumentElement.SelectSingleNode('@width');
                    $SourceWidth = -1;
                    $SourceHeight = -1;
                    if ($null -ne $XmlAttribute -and $XmlAttribute.Value.Trim().Length -gt 0) {
                        try {
                            $i = [System.Xml.XmlConvert]::ToInt32($XmlAttribute.Value.Trim());
                            if ($i -le 0) {
                                $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-danger text-sm-left';
                                $TdElement.InnerText = $XmlAttribute.Value;
                            } else {
                                $SourceWidth = $i;
                                $TdElement.InnerText = $i.ToString();
                            }
                        } catch {
                            $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-danger text-sm-left';
                            $TdElement.InnerText = "Error parsing number value for '$($XmlAttribute.Value)': $_";
                        }
                    } else {
                        $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-warning text-sm-left';
                        $TdElement.InnerText = '(not specified)';
                    }
                    $TdElement = $RowElement.AppendChild($OwnerDocument.CreateElement('td', $Script:Xmlns_Xhtml));
                    $XmlAttribute = $SvgDocument.DocumentElement.SelectSingleNode('@height');
                    if ($null -ne $XmlAttribute -and $XmlAttribute.Value.Trim().Length -gt 0) {
                        try {
                            $i = [System.Xml.XmlConvert]::ToInt32($XmlAttribute.Value.Trim());
                            if ($i -le 0) {
                                $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-danger text-sm-left';
                                $TdElement.InnerText = $XmlAttribute.Value;
                            } else {
                                $SourceHeight = $i;
                                $TdElement.InnerText = $i.ToString();
                            }
                        } catch {
                            $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-danger text-sm-left';
                            $TdElement.InnerText = "Error parsing number value for '$($XmlAttribute.Value)': $_";
                        }
                    } else {
                        $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-warning text-sm-left';
                        $TdElement.InnerText = '(not specified)';
                    }
                    Set-ThumbWidth -Element $ImgElement -Width $SourceWidth -Height $SourceHeight -Svg;
                } else {
                    $TdElement.InnerText = $File.Name;
                    $TdElement = $RowElement.AppendChild($OwnerDocument.CreateElement('td', $Script:Xmlns_Xhtml));
                    $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('colspan')).Value = '3';
            
                    $TableElement = $SectionElement.AppendChild($OwnerDocument.CreateElement('table', $Script:Xmlns_Xhtml));
                    $TableElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'table table-bordered';
                    $RowElement = $TableElement.AppendChild($OwnerDocument.CreateElement('thead', $Script:Xmlns_Xhtml)).AppendChild($OwnerDocument.CreateElement('tr', $Script:Xmlns_Xhtml));
                    @('ID', 'Image', 'Width', 'Height') | ForEach-Object {
                        $XmlElement = $RowElement.AppendChild($OwnerDocument.CreateElement('th', $Script:Xmlns_Xhtml));
                        $XmlElement.Attributes.Append($OwnerDocument.CreateAttribute('scope')).Value = 'col';
                        $XmlElement.InnerText = $_;
                    }
                    $BodyElement = $TableBody.AppendChild($OwnerDocument.CreateElement('tbody', $Script:Xmlns_Xhtml));
                    @($XmlNodeList) | ForEach-Object {
                        $id = $_.SelectSingleNode('@id').Value;
                        $RowElement = $BodyElement.AppendChild($OwnerDocument.CreateElement('tr', $Script:Xmlns_Xhtml));
                        $TdElement = $RowElement.AppendChild($OwnerDocument.CreateElement('th', $Script:Xmlns_Xhtml));
                        $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('scope')).Value = 'row';
                        $AElement = $TdElement.AppendChild($OwnerDocument.CreateElement('a', $Script:Xmlns_Xhtml));
                        $AElement.Attributes.Append($OwnerDocument.CreateAttribute('href')).Value = "$($File.Name)#$id";
                        $AElement.InnerText = $id;
                        $TdElement = $RowElement.AppendChild($OwnerDocument.CreateElement('td', $Script:Xmlns_Xhtml));
                        $ImgElement = $TdElement.AppendChild($OwnerDocument.CreateElement('svg', $Script:Xmlns_Xhtml));
                        $ImgElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'fill-light stroke-dark';
                        $XmlELement = $ImgElement.AppendChild($OwnerDocument.CreateElement('use', $Script:Xmlns_Xhtml));
                        $XmlELement.Attributes.Append($OwnerDocument.CreateAttribute('href', $Script:Xmlns_xlink)).Value = "$($File.Name)#$id";
                        $XmlELement.InnerText = '';
                        $TdElement = $RowElement.AppendChild($OwnerDocument.CreateElement('td', $Script:Xmlns_Xhtml));
                        $XmlAttribute = $_.SelectSingleNode('@width');
                        $SourceWidth = -1;
                        $SourceHeight = -1;
                        if ($null -ne $XmlAttribute -and $XmlAttribute.Value.Trim().Length -gt 0) {
                            try {
                                $i = [System.Xml.XmlConvert]::ToInt32($XmlAttribute.Value.Trim());
                                if ($i -le 0) {
                                    $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-danger text-sm-left';
                                    $TdElement.InnerText = $XmlAttribute.Value;
                                } else {
                                    $SourceWidth = $i;
                                    $TdElement.InnerText = $i.ToString();
                                }
                            } catch {
                                $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-danger text-sm-left';
                                $TdElement.InnerText = "Error parsing number value for '$($XmlAttribute.Value)': $_";
                            }
                        } else {
                            $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-warning text-sm-left';
                            $TdElement.InnerText = '(not specified)';
                        }
                        $TdElement = $RowElement.AppendChild($OwnerDocument.CreateElement('td', $Script:Xmlns_Xhtml));
                        $XmlAttribute = $_.SelectSingleNode('@height');
                        if ($null -ne $XmlAttribute -and $XmlAttribute.Value.Trim().Length -gt 0) {
                            try {
                                $i = [System.Xml.XmlConvert]::ToInt32($XmlAttribute.Value.Trim());
                                if ($i -le 0) {
                                    $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-danger text-sm-left';
                                    $TdElement.InnerText = $XmlAttribute.Value;
                                } else {
                                    $SourceHeight = $i;
                                    $TdElement.InnerText = $i.ToString();
                                }
                            } catch {
                                $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-danger text-sm-left';
                                $TdElement.InnerText = "Error parsing number value for '$($XmlAttribute.Value)': $_";
                            }
                        } else {
                            $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-warning text-sm-left';
                            $TdElement.InnerText = '(not specified)';
                        }
                        Set-ThumbWidth -Element $ImgElement -Width $SourceWidth -Height $SourceHeight -Svg;
                    }
                }
            }
        } else {
            $AElement = $TdElement.AppendChild($OwnerDocument.CreateElement('a', $Script:Xmlns_Xhtml));
            $AElement.Attributes.Append($OwnerDocument.CreateAttribute('href')).Value = $File.Name;
            $AElement.InnerText = $File.Name;
            $TdElement = $RowElement.AppendChild($OwnerDocument.CreateElement('td', $Script:Xmlns_Xhtml));
            $Image = $null;
            try { $Image = [System.Drawing.Image]::FromFile($File.FullName); }
            catch {
                $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('colspan')).Value = '3';
                $TdElement.Attributes.Append($OwnerDocument.CreateAttribute('class')).Value = 'text-danger';
                $TdElement.InnerText = "Error loading image file: $_";
            }
            if ($null -ne $Image) {
                $ImgElement = $TdElement.AppendChild($OwnerDocument.CreateElement('img', $Script:Xmlns_Xhtml));
                $ImgElement.Attributes.Append($OwnerDocument.CreateAttribute('src')).Value = $File.Name;
                $ImgElement.Attributes.Append($OwnerDocument.CreateAttribute('alt')).Value = "Displayed Image for $($File.Name)";
                Set-ThumbWidth -Element $ImgElement -Width $Image.Width -Height $Image.Height;
                $RowElement.AppendChild($OwnerDocument.CreateElement('td', $Script:Xmlns_Xhtml)).InnerText = "$($Image.Width)";
                $RowElement.AppendChild($OwnerDocument.CreateElement('td', $Script:Xmlns_Xhtml)).InnerText = "$($Image.Height)";
            }
        }
    }
}

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
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:xlink="http://www.w3.org/1999/xlink">
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
                $XmlElement = $ParentElement.AppendChild($XHtmlDocument.CreateElement('th', $Script:Xmlns_Xhtml));
                $XmlElement.Attributes.Append($XHtmlDocument.CreateAttribute('scope')).Value = 'col';
                $XmlElement.InnerText = $_;
            }

            $Files | Add-FileRow -TableBody $SectionElement.AppendChild($XHtmlDocument.CreateElement('tbody', $Script:Xmlns_Xhtml));
            
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

<#
$Script:Xmlns_Svg = "http://www.w3.org/2000/svg";
$Script:Xmlns_Xhtml="http://www.w3.org/1999/xhtml";
$Script:Xmlns_xlink="http://www.w3.org/1999/xlink";
[Uri]$BaseUri = 'https://erwinel.github.io/'
Sync-ImageIndex -Directory (New-Object -TypeName 'System.IO.DirectoryInfo' -ArgumentList ($PSScriptRoot | Join-Path -ChildPath '..\gh-pages\images')) -BaseUri $BaseUri -ParentUri $BaseUri;
#>
$ImageFolder = [ImageLoader.ImageFolder]::Create('C:\Users\lerwi\source\repos\SNImplementationDocs\gh-pages\images');
$JSON = [System.Web.Script.Serialization.JavaScriptSerializer]::new().Serialize($ImageFolder);
[System.Windows.Clipboard]::SetText($JSON);
"Copied to clipboard" | Write-Host;