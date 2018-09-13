Param(
  [string]$CacheLocation = 'C:\Users\lerwi\Downloads\Transfers\Transferred',
  [string]$DownloadLocation = 'C:\Users\lerwi\Downloads\Transfers\ToTransfer',
  [string[]]$Force = @('donjayamanne.jquerysnippets', 'herrherrmann.angular-bootstrap', 'ms-mssql.mssql', 'ms-vscode.typescript-javavascript-grammar','robertohuertasm.vscode-icons', 'thekalinga.bootstrap4-vscode')
)
$DebugPreference = [System.Management.Automation.ActionPreference]::Continue;
<#
[System.IO.Directory]::EnumerateDirectories(([System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::UserProfile) | Join-Path -ChildPath '.\.vscode\extensions')) | ForEach-Object {
  $_ | Join-Path -ChildPath '.vsixmanifest';
} | Where-Object { $_ | Test-Path -PathType Leaf } | ForEach-Object {
  $XmlDocument = New-Object -TypeName 'System.Xml.XmlDocument';
  $Path = $_;
  try { $XmlDocument.Load($_) } catch { }
  $NamespaceManager = New-Object -TypeName 'System.Xml.XmlNamespaceManager' -ArgumentList $XmlDocument.NameTable;
  $NamespaceManager.AddNamespace('vsx', 'http://schemas.microsoft.com/developer/vsx-schema/2011');
  $XmlElement = $XmlDocument.SelectSingleNode('/vsx:PackageManifest/vsx:Installation/vsx:InstallationTarget[@Id="Microsoft.VisualStudio.Code"]', $NamespaceManager);
  if ($null -eq $XmlElement) {
    $XmlElement = $XmlDocument.SelectSingleNode('/vsx:PackageManifest/vsx:Installation/vsx:InstallationTarget', $NamespaceManager);
    if ($null -eq $XmlElement) {
      $XmlElement = $XmlDocument.SelectSingleNode('/vsx:PackageManifest/vsx:Installation', $NamespaceManager);
      if ($null -eq $XmlElement) {
        $XmlElement = $XmlDocument.SelectSingleNode('/vsx:PackageManifest', $NamespaceManager);
        if ($null -eq $XmlElement) {
            Write-Warning -Message "XPath '/vsx:PackageManifest' not found in $Path";
        } else {
          Write-Warning -Message "XPath '/vsx:PackageManifest/vsx:Installation' not found in $Path";
        }
      } else {
        Write-Warning -Message "XPath '/vsx:PackageManifest/vsx:Installation/vsx:InstallationTarget' not found in $Path";
      }
    } else {
      $XmlAttributeArray = @($XmlDocument.SelectNodes('/vsx:PackageManifest/vsx:Installation/vsx:InstallationTarget/@Id', $NamespaceManager));
      if ($XmlAttributeArray.Count -eq 0) {
        Write-Warning -Message "XPath '/vsx:PackageManifest/vsx:Installation/vsx:InstallationTarget/@Id' not found in $Path";
      } else {
        if ($XmlAttributeArray.Count -eq 1) {
          Write-Warning -Message "Package targeted for $($XmlAttributeArray[0].Value): $Path";
        } else {
          Write-Warning -Message "Package targeted for $((($XmlAttributeArray | Select-Object -First ($XmlAttributeArray.Count - 1)) | ForEach-Object { $_.Value }) -join "', '") and $(($XmlAttributeArray | Select-Object -Last 1).Value): $Path";}
      }
      $XmlElement = $null;
    }
  }
  if ($null -ne $XmlElement) {
    $Metadata = $XmlDocument.SelectSingleNode('/vsx:PackageManifest/vsx:Metadata', $NamespaceManager);
    if ($null -ne $Metadata) {
      $Identity = $Metadata.SelectSingleNode('vsx:Identity', $NamespaceManager);
      if ($null -ne $Identity) {
        $Properties = @{ };
        @('Id', 'Version', 'Publisher') | ForEach-Object {
          $XmlAttribute = $Identity.SelectSingleNode("@$_");
          if ($null -ne $XmlAttribute -and $XmlAttribute.Value.Length -gt 0) {
            $Properties[$_] = $XmlAttribute.Value;
          } else {
            Write-Warning -Message "XPath '/vsx:PackageManifest/vsx:Metadata/vsx:Identity/@$_' not found in $Path";
          }
        }
        if ($Properties.Count -eq 3) {
          $Version = $null;
          $Version = New-Object -TypeName 'System.Version' -ArgumentList $Properties['Version'];
          if ($null -eq $Version) {
            Write-Warning -Message "Version $($Properties['Version']) at XPath '/vsx:PackageManifest/vsx:Metadata/vsx:Identity/@Version' could not be parsed in $Path";
          } else {
            $Properties.Remove('Version');
            $Properties['Version'] = $Version;
            $XmlElement = $Metadata.SelectSingleNode('vsx:DisplayName', $NamespaceManager);
            if (-not ($null -eq $XmlElement -or $XmlElement.IsEmpty -or $XmlElement.InnerText.Trim().Length -eq 0)) {
              $Properties['DisplayName'] = $XmlElement.InnerText;
              $XmlElement = $Metadata.SelectSingleNode('vsx:Description', $NamespaceManager);
              if ($null -eq $XmlElement -or $XmlElement.IsEmpty) { $Properties['Description'] = '' } else { $Properties['Description'] = $XmlElement.InnerText }
                (New-Object -TypeName 'System.Management.Automation.PSObject' -Property $Properties) | Write-Output;
              } else {
                Write-Warning -Message "XPath '/vsx:PackageManifest/vsx:Metadata/vsx:DisplayName' not found in $Path";
              }
            }
        }
      } else {
        Write-Warning -Message "XPath '/vsx:PackageManifest/vsx:Metadata/vsx:Identity' not found in $Path";
      }
    } else {
      if ($null -eq $XmlDocument.DocumentElement) {
        Write-Warning -Message "XML not loaded from $Path";
      } else {
        Write-Warning -Message "XPath '/vsx:PackageManifest/vsx:Metadata' not found in $Path";
      }
    }
  }
} | ForEach-Object {
  $WebPage = Invoke-WebRequest -Uri "https://marketplace.visualstudio.com/items?itemName=$($_.Id)";
  $DetailsJSON = ( $WebPage.Scripts | Where-Object { $_.class -eq 'vss-extension' -and $_.type -eq 'application/json' } | Select-Object -First 1).innerHTML | Convertfrom-Json;
  if ($null -eq $DetailsJSON) {
    Write-Warning -Message "Unable to get details JSON for $($_.Publisher).$($_.Id)";
  } else {
    if ($null -eq $DetailsJSON.versions -or $null -eq $DetailsJSON.versions.version) {
      Write-Warning -Message "Unable to get version information for $($_.Publisher).$($_.Id)";
    } else {
      $Version = $null;
      $Version = New-Object -TypeName 'System.Version' -ArgumentList $DetailsJSON.versions.version;
      if ($null -eq $Version) {
        Write-Warning -Message "Version $($DetailsJSON.versions.version) could not be parsed for $($_.Publisher).$($_.Id)";
      } else {
        if ($Version -gt $_.Version) {
          if ($null -eq $DetailsJSON.versions.assetUri -or $DetailsJSON.versions.assetUri -isnot [string] -or $DetailsJSON.versions.assetUri.trim().length -eq 0) {
            Write-Warning -Message "Could not get asset URI for $($_.Publisher).$($_.Id)";
          } else {
            Invoke-WebRequest -uri "$($DetailsJSON.versions.assetUri)/Microsoft.VisualStudio.Services.VSIXPackage" `
              -OutFile "C:\Scripts\extensions\$($_.Publisher).$($_.Id).$Version.vsix";
          }
        } else {
          Write-Information -MessageData "$($_.Publisher).$($_.Id) is current at version $Version";
        }
      }
    }
  }
}
#>

Add-Type -AssemblyName 'System.Data';

Function Add-Product {
    [CmdletBinding(DefaultParameterSetName = 'NoFile')]
    Param(
        [Parameter(Mandatory = $true)]
        [string]$Name,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'File')]
        [Parameter(ParameterSetName = 'NoFile')]
        [System.Version]$Version,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'File')]
        [System.IO.FileInfo]$FileInfo,
        
        [switch]$IsInstalled,

        [Parameter(ParameterSetName = 'File')]
        [switch]$PassThru
    )

    [System.Data.DataRow]$ProductDataRow = $Script:ProductDataTable.Select("[Name]='$($Name)'") | Select-Object -First 1;
    [System.Data.DataRow]$FileDataRow = $null;
    if ($null -eq $ProductDataRow) {
        $ProductDataRow = $Script:ProductDataTable.NewRow();
        $ProductDataRow['Name'] = $Name;
        $Script:ProductDataTable.Rows.Add($ProductDataRow);
        $ProductDataRow.AcceptChanges();
        $VersionDataRow = $null;
        if ($PSBoundParameters.ContainsKey('Version')) {
            $VersionDataRow = $Script:VersionDataTable.NewRow();
            $VersionDataRow['Major'] = $Version.Major;
            $VersionDataRow['Minor'] = $Version.Minor;
            $VersionDataRow['Build'] = $Version.Build;
            $VersionDataRow['Revision'] = $Version.Revision;
            $VersionDataRow['IsInstalled'] = $IsInstalled.IsPresent;
            
            $VersionDataRow.SetParentRow($ProductDataRow, $Script:FK_ProductVersion);
            $Script:VersionDataTable.Rows.Add($VersionDataRow);
            $VersionDataRow.AcceptChanges();
        } else {
            if ($IsInstalled -or $PSBoundParameters.ContainsKey('FileInfo')) {
                $VersionDataRow = $Script:VersionDataTable.NewRow();
                $VersionDataRow['IsInstalled'] = $IsInstalled.IsPresent;
                $VersionDataRow.SetParentRow($ProductDataRow, $Script:FK_ProductVersion);
                $Script:VersionDataTable.Rows.Add($VersionDataRow);
                $VersionDataRow.AcceptChanges();
            }
        }
        if ($PSBoundParameters.ContainsKey('FileInfo')) {
            $FileDataRow = $Script:FileDataTable.NewRow();
            $FileDataRow['Name'] = $FileInfo.Name;
            $FileDataRow['Path'] = $FileInfo.FullName;
            $FileDataRow.SetParentRow($VersionDataRow, $Script:FK_VersionFile);
            $Script:FileDataTable.Rows.Add($FileDataRow);
            $FileDataRow.AcceptChanges();
        }
    } else {
        if ($PSBoundParameters.ContainsKey('FileInfo')) {
            [System.Data.DataRow]$VersionDataRow = $null;
            if (-not $PSBoundParameters.ContainsKey('Version')) { $Version = New-Object -TypeName 'System.Version' -ArgumentList 0, 0 }
            $VersionDataRow = $Script:VersionDataTable.Select("[ProductID]=$($ProductDataRow['ID']) AND [Major]=$($Version.Major) AND [Minor]=$($Version.Minor) AND [Build]=$($Version.Build) AND [Revision]=$($Version.Revision)") | Select-Object -First 1;
            if ($null -eq $VersionDataRow) {
                $VersionDataRow = $Script:VersionDataTable.NewRow();
                $VersionDataRow['Major'] = $Version.Major;
                $VersionDataRow['Minor'] = $Version.Minor;
                $VersionDataRow['Build'] = $Version.Build;
                $VersionDataRow['Revision'] = $Version.Revision;
                $VersionDataRow['IsInstalled'] = $IsInstalled.IsPresent;
                $VersionDataRow.SetParentRow($ProductDataRow, $Script:FK_ProductVersion);
                $Script:VersionDataTable.Rows.Add($VersionDataRow);
                $VersionDataRow.AcceptChanges();
                $FileDataRow = $Script:FileDataTable.NewRow();
                $FileDataRow['Name'] = $FileInfo.Name;
                $FileDataRow['Path'] = $FileInfo.FullName;
                $FileDataRow.SetParentRow($VersionDataRow, $Script:FK_VersionFile);
                $Script:FileDataTable.Rows.Add($FileDataRow);
                $FileDataRow.AcceptChanges();
            } else {
                if ($IsInstalled -and -not $VersionDataRow['IsInstalled']) {
                    $VersionDataRow.BeginEdit();
                    $VersionDataRow['IsInstalled'] = $true;
                    $VersionDataRow.EndEdit();
                    $VersionDataRow.AcceptChanges();
                }
                $FileDataRow = ($Script:FileDataTable.Select("[VersionID]=$($VersionDataRow['ID']) AND [Path]='$($FileInfo.FullName)'")) | Select-Object -First 1;
                if ($null -eq $FileDataRow) {
                    $FileDataRow = $Script:FileDataTable.NewRow();
                    $FileDataRow['Name'] = $FileInfo.Name;
                    $FileDataRow['Path'] = $FileInfo.FullName;
                    $FileDataRow.SetParentRow($VersionDataRow, $Script:FK_VersionFile);
                    $Script:FileDataTable.Rows.Add($FileDataRow);
                    $FileDataRow.AcceptChanges();
                }
            }
        } else {
            if ($IsInstalled) {
                if ($PSBoundParameters.ContainsKey('Version')) {
                    $VersionDataRow = $Script:VersionDataTable.Select("[ProductID]=$($ProductDataRow['ID']) AND [Major]=$($Version.Major) AND [Minor]=$($Version.Minor) AND [Build]=$($Version.Build) AND [Revision]=$($Version.Revision)") | Select-Object -First 1;
                    if ($null -eq $VersionDataRow) {
                        $VersionDataRow = $Script:VersionDataTable.NewRow();
                        $VersionDataRow['Major'] = $Version.Major;
                        $VersionDataRow['Minor'] = $Version.Minor;
                        $VersionDataRow['Build'] = $Version.Build;
                        $VersionDataRow['Revision'] = $Version.Revision;
                        $VersionDataRow['IsInstalled'] = $true;
                        $VersionDataRow.SetParentRow($ProductDataRow, $Script:FK_ProductVersion);
                        $Script:VersionDataTable.Rows.Add($VersionDataRow);
                        $VersionDataRow.AcceptChanges();
                    } else {
                        if (-not $VersionDataRow['IsInstalled']) {
                            $VersionDataRow.BeginEdit();
                            $VersionDataRow['IsInstalled'] = $true;
                            $VersionDataRow.EndEdit();
                            $VersionDataRow.AcceptChanges();
                        }
                    }
                } else {
                    $VersionDataRow = $Script:VersionDataTable.Select("[ProductID]=$($ProductDataRow['ID']) AND [Major]=0 AND [Minor]=0 AND [Build]=-1 AND [Revision]=-1") | Select-Object -First 1;
                    if ($null -eq $VersionDataRow) {
                        $VersionDataRow = $Script:VersionDataTable.NewRow();
                        $VersionDataRow['IsInstalled'] = $true;
                        $VersionDataRow.SetParentRow($ProductDataRow, $Script:FK_ProductVersion);
                        $Script:VersionDataTable.Rows.Add($VersionDataRow);
                        $VersionDataRow.AcceptChanges();
                    } else {
                        if (-not $VersionDataRow['IsInstalled']) {
                            $VersionDataRow.BeginEdit();
                            $VersionDataRow['IsInstalled'] = $true;
                            $VersionDataRow.EndEdit();
                            $VersionDataRow.AcceptChanges();
                        }
                    }
                }
            } else {
                if ($PSBoundParameters.ContainsKey('Version')) {
                    $VersionDataRow = $Script:VersionDataTable.Select("[ProductID]=$($ProductDataRow['ID']) AND [Major]=$($Version.Major) AND [Minor]=$($Version.Minor) AND [Build]=$($Version.Build) AND [Revision]=$($Version.Revision)") | Select-Object -First 1;
                    if ($null -eq $VersionDataRow) {
                        $VersionDataRow = $Script:VersionDataTable.NewRow();
                        $VersionDataRow['Major'] = $Version.Major;
                        $VersionDataRow['Minor'] = $Version.Minor;
                        $VersionDataRow['Build'] = $Version.Build;
                        $VersionDataRow['Revision'] = $Version.Revision;
                        $VersionDataRow.SetParentRow($ProductDataRow, $Script:FK_ProductVersion);
                        $Script:VersionDataTable.Rows.Add($VersionDataRow);
                        $VersionDataRow.AcceptChanges();
                    }
                }
            }
        }
    }

    if ($PassThru) { (,$FileDataRow) | Write-Output }
}

Function Get-VsixManifestInfo {
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [AllowEmptyCollection()]
        [System.IO.FileInfo[]]$File
    )

    Begin {
        $TempDir = (New-Item -Path ([System.IO.Path]::GetTempPath()) -ItemType Directory -Name ([System.Guid]::NewGuid().ToString('n'))).FullName;
        $TargetPath = $TempDir | Join-Path -ChildPath 'Content';
    }

    Process {
        foreach ($CurrentFile in $File) {
            Write-Progress -Activity 'Checking local installers' -Status 'Extracting content' -CurrentOperation $File.FullName;
            Write-Information -MessageData "Checking $($File.FullName)";
            $ZipPath = $TempDir | Join-Path -ChildPath "$([System.IO.Path]::GetFileNameWithoutExtension($CurrentFile.Name)).zip";
            try {
                Copy-Item -LiteralPath $File.FullName -Destination $ZipPath;
                Expand-Archive -LiteralPath $ZipPath -DestinationPath $TargetPath;
                $ManifestPath = $TargetPath | Join-Path -ChildPath 'extension.vsixmanifest';
                if ($ManifestPath | Test-Path -PathType Leaf) {
                    Write-Progress -Activity 'Checking local installers' -Status 'Reading manifest' -CurrentOperation $File.FullName;
                    $XmlDocument = New-Object -TypeName 'System.Xml.XmlDocument';
                    $XmlDocument.Load($ManifestPath);
                    $XmlNamespaceManager = New-Object -TypeName 'System.Xml.XmlNamespaceManager' -ArgumentList $XmlDocument.NameTable;
                    $XmlNamespaceManager.AddNamespace('vsx', 'http://schemas.microsoft.com/developer/vsx-schema/2011');
                    $XmlElement = $XmlDocument.SelectSingleNode('/vsx:PackageManifest/vsx:Metadata/vsx:Identity', $XmlNamespaceManager);
                    if ($null -eq $XmlElement) {
                        if ($null -eq $XmlDocument.SelectSingleNode('/vsx:PackageManifest/vsx:Metadata', $XmlNamespaceManager)) {
                            if ($null -eq $XmlDocument.SelectSingleNode('/vsx:PackageManifest', $XmlNamespaceManager)) {
                                Write-Warning -Message "Element not found at XPath '/vsx:PackageManifest' not found in $($CurrentFile.FullName)";
                            } else {
                                Write-Warning -Message "Element not found at XPath '/vsx:PackageManifest/vsx:Metadata' not found in $($CurrentFile.FullName)";
                            }
                        } else {
                            Write-Warning -Message "Element not found at XPath '/vsx:PackageManifest/vsx:Metadata/vsx:Identity' not found in manifest of $($CurrentFile.FullName)";
                        }
                    } else {
                        $Properties = @{};
                        @('Id', 'Version', 'Publisher') | ForEach-Object {
                            $XmlAttribute = $XmlElement.PSBase.SelectSingleNode("@$_");
                            if ($null -eq $XmlAttribute) {
                                Write-Warning -Message "Attribute not found at XPath '/vsx:PackageManifest/vsx:Metadata/vsx:Identity/@$_' not found in manifest of $($CurrentFile.FullName)";
                            } else {
                                if ($XmlAttribute.Value.Trim().Length -eq 0) {
                                    Write-Warning -Message "Attribute was empty at XPath '/vsx:PackageManifest/vsx:Metadata/vsx:Identity/@$_' not found in manifest of $($CurrentFile.FullName)";
                                } else {
                                    $Properties[$_] = $XmlAttribute.Value;
                                }
                            }
                        }
                        if ($Properties.Count -eq 3) {
                            $Version = $null;
                            try { $Version = [System.Version]::Parse($Properties['Version']) } catch { }
                            if ($null -eq $Version) {
                                Write-Warning -Message "Could not parse version number at XPath '/vsx:PackageManifest/vsx:Metadata/vsx:Identity/@Version' in manifest of $($CurrentFile.FullName)";
                            } else {
                                Add-Product -Name "$($Properties['Publisher']).$($Properties['Id'])" -Version $Version -FileInfo $CurrentFile;
                            }
                        }
                    }
                } else {
                    Write-Warning -Message "Manifest file not found within $($CurrentFile.FullName)";
                }
            } catch {
                Write-Warning -Message "Error checking $($CurrentFile.FullName)`: $_";
            } finally {
                if ($TargetPath | Test-Path) {
                    try { Remove-Item -LiteralPath $TargetPath -Recurse -Force -ErrorAction Stop }
                    catch {
                        try { Remove-Item -LiteralPath $TempDir -Recurse -Force -ErrorAction SilentlyContinue }
                        finally {
                            if (-not $TempDir | Test-Path) { (New-Item -Path $TempDir) | Out-Null }
                        }
                    }
                }
                if ($ZipPath | Test-Path) { try { Remove-Item -LiteralPath $ZipPath -Force } catch { } }
            }
        }
    }

    End {
        if ($TempDir | Test-Path) { Remove-Item -LiteralPath $TempDir -Recurse -Force }
    }
}
VsixManifest.
Add-Type -TypeDefinition @'
namespace VsixManifest {
    using System;
    using System.Data;
    using System.IO;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Xml;
    public sealed class VsixManifestData : ISerializable {
        private DataSet _dataSet;
        private bool _hasChanges = false;
        public bool HasChanges { get { return _hasChanges; } }
        public VsixManifestDataSet(SerializationInfo info, StreamingContext context) : base(info, context) {
            _path = (string)(info.GetValue("Path", typeof(string));
            _lastSavedPath = (_lastSavedPath)(info.GetValue("LastSavedPath", typeof(string));
            _hasChanges = info.GetBoolean("HasChanges");
        }
        void ISerializable.GetObjectData(SerializationInfo info, StreamingContext context) {
            info.AddValue("Path", _path, typeof(string));
            info.AddValue("LastSavedPath", _lastSavedPath, typeof(string));
            info.AddValue("HasChanges", _hasChanges);
            using (MemoryStream stream = new MemoryStream()) {
                using (XmlWriter writer = XmlWriter.Create(stream)) {
                }
            }
        }
        public VsixManifestDataSet(string path) : base("VsixManifestInfo") {
            if (String.IsNullOrWhiteSpace(path)) {
                
            }
        }
        public override object Clone() {
            throw new NotImplementedException();
        }
    }

    public class VsixManifestData : DataSet
    {
        public const string Default_DataSetName = "VsixManifestInfo";
        private string _currentPath = null;
        private string _lastSpecifiedPath = null;
        private string _lastSavedPath = '';
        private ProductDataTable _products;
        private VersionDataTable _versions;
        private FileDataTable _files;
        private DataRelation _fk_ProductVersion;
        private DataRelation _fk_VersionFile;
        private bool? _changesSaved = null;
        
        public string CurrentPath
        {
            get
            {
                string path = _currentPath;
                if (path != null)
                    return path;

                _lastSpecifiedPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Personal), Default_DataSetName + ".xml");
                return _lastSpecifiedPath;
            }
            set
            {
                if (String.IsNullOrWhiteSpace(value))
                {
                    _lastSpecifiedPath = '';
                    _currentPath = null;
                }
                else
                {
                    string path = Path.GetFullPath(value);
                    _lastSpecifiedPath = path;
                    if (_currentPath != null &&  path == _currentPath)
                        return;
                    _currentPath = path;
                }
                CheckChanges();
            }
        }
        public ProductDataTable Products { get { return _products; } }
        public VersionDataTable Versions { get { return _versions; } }
        public FileDataTable Files { get { return _files; } }
        public DataRelation FK_ProductVersion { get { return _fk_ProductVersion; } }
        public DataRelation FK_VersionFile { get { return _fk_VersionFile; } }
        public bool ChangesSaved { get { return CheckChanges(); } }

        internal bool CheckChanges()
        {
            if (HasChanges())
            {
                _changesSaved = false;
                return false;
            }
            bool? changesSaved = _changesSaved;
            if (!changesSaved.HasValue)
            {
                if (_currentPath == null && _lastSavedPath.Length == 0)
                {
                    _changesSaved = trrue;
                    return true;
                }
            }
            changesSaved = (!HasChanges() && _lastSavedPath == CurrentPath);
            _changesSaved = changesSaved;
            return changesSaved.Value;
        }

        public VsixManifestData(bool readDefault) : this()
        {
            if (readDefault)
                TryReadXml();
        }
        public VsixManifestData(string path) : this()
        {
            CurrentPath = path;
            if (!String.IsNullOrWhiteSpace(path))
                TryReadXml();
        }

	    public VsixManifestData() : base(Default_DataSetName)
        {
            _products = new ProductDataTable();
            _versions = new VersionDataTable();
            _files = new FileDataTable();
            Tables.Add(_products);
            Tables.Add(_versions);
            Tables.Add(_files);
            _fk_ProductVersion = Relations.Add("FK_" + ProductDataTable.Default_DataTableName + FileDataTable.Default_DataTableName, _products.IDDataColumn, _versions.ProductIDDataColumn, true);
            _fk_VersionFile = Relations.Add("FK_" + VersionDataTable.Default_DataTableName + FileDataTable.Default_DataTableName, _versions.IDDataColumn, _files.VersionIDColumn, true);
        }

	    protected VsixManifestData(SerializationInfo info, StreamingContext context)
		    : base(info, context)
	    {
            this.InitializeFromSerializationInfo(info);
	    }

	    protected VsixManifestData(SerializationInfo info, StreamingContext context, bool ConstructSchema)
		    : base(info, context, ConstructSchema)
	    {
            this.InitializeFromSerializationInfo(info);
        }
        
        private void InitializeFromSerializationInfo(SerializationInfo info)
        {
            _path = (string)(info.GetValue("Path", typeof(string));
            _lastSavedPath = (_lastSavedPath)(info.GetValue("LastSavedPath", typeof(string));
            _hasChanges = (bool?)(info.GetValue("HasChanges", typeof(bool?)));
            _products = Tables[ProductDataTable.Default_DataTableName];
            _versions = Tables[VersionDataTable.Default_DataTableName];
            _files = Tables[FileDataTable.Default_DataTableName];;
	    }

        public bool TryReadXml(string path)
        {
            if (!String.IsNullOrWhiteSpace(path))
                CurrentPath = path;
            path = CurrentPath;

            if (!File.Exists(path))
            {
                if (!Directory.Exists(path))
                    return false;
                path = Path.Combine(path, Default_DataSetName + ".xml");
                if (Directory.Exists(path))
                    return false;
                if (!File.Exists(path))
                    return false;
                CurrentPath = path;
            }

            try
            {
                ReadXml(path, XmlReadMode.IgnoreSchema);
            }
            catch { return false; }
            return true;
        }

        public bool TryReadXml() { return TryReadXml(null); }

        public bool TryWriteXml(string path)
        {
            if (!String.IsNullOrWhiteSpace(path))
                CurrentPath = path;
            path = CurrentPath;

            if (!File.Exists(path))
            {
                if (!Directory.Exists(path))
                    return false;
                path = Path.Combine(path, Default_DataSetName + ".xml");
                if (Directory.Exists(path))
                    return false;
                if (!File.Exists(path))
                    return false;
                CurrentPath = path;
            }

            try
            {
                WriteXml(path, XmlWriteMode.IgnoreSchema);
                _changesSaved = null;
            }
            catch { return false; }
            return true;
        }

        public bool TryWriteXml() { return TryWriteXml(null); }

	    // public override DataSet Clone()
	    // {
	    // 	return base.Clone();
	    // }

	    public override void GetObjectData(SerializationInfo info, StreamingContext context)
	    {
	    	base.GetObjectData(info, context);
            info.AddValue("Path", _path, typeof(string));
            info.AddValue("LastSavedPath", _lastSavedPath, typeof(string));
            info.GetValue("HasChanges", _hasChanges, typeof(bool?));
	    }

	    protected override void OnRemoveRelation(DataRelation relation) { throw new NotSupportedException(); }

	    protected override bool ShouldSerializeRelations() { return true; }

	    protected override bool ShouldSerializeTables() { return true; }
    }

    public class ProductDataTable : DataTable
    {
        public const string Default_DataTableName = "Product";
        public const string ColumnName_ID = "ID";
        public const string ColumnName_Name = "Name";
        
        private _idDataColumn;
        private _nameDataColumn;

        public IDDataColumn { get { return _idDataColumn; } }
        public NameDataColumn { get { return _nameDataColumn; } }

	    public ProductDataTable() : base(Default_DataTableName)
        {
            _idDataColumn = new DataColumn(ColumnName_ID, typeof(long));
            _nameDataColumn = new DataColumn(ColumnName_Name, typeof(bool));
            Columns.Add(_idDataColumn);
            _idDataColumn.AutoIncrement = true;
            _idDataColumn.AllowDBNull = false;
            Columns.Add(_nameDataColumn);
            _nameDataColumn.AllowDBNull = false;
            Constraints.Add('PK_ProductID', _idDataColumn, true);
        }

	    protected ProductDataTable(SerializationInfo info, StreamingContext context)
		    : base(info, context)
	    {
            _idDataColumn = Columns[ColumnName_ID];
            _nameDataColumn = Columns[ColumnName_Name];
	    }

	    // public override DataTable Clone()
	    // {
	    // 	throw new NotImplementedException();
	    // }

	    protected override DataTable CreateInstance() { return new ProductDataTable(); }

	    // public override void GetObjectData(SerializationInfo info, StreamingContext context)
	    // {
	    // 	base.GetObjectData(info, context);
	    // }

	    protected override Type GetRowType() { return typeof(ProductDataRow); }

	    // protected override DataRow NewRowFromBuilder(DataRowBuilder builder)
	    // {
	    // 	return base.NewRowFromBuilder(builder);
	    // }

	    protected override void OnRemoveColumn(DataColumn column) { throw new NotSupportedException(); }

	    protected override void OnRowChanged(DataRowChangeEventArgs e)
	    {
	    	base.OnRowChanged(e);
	    }

	    protected override void OnRowChanging(DataRowChangeEventArgs e)
	    {
	    	base.OnRowChanging(e);
	    }

	    protected override void OnRowDeleted(DataRowChangeEventArgs e)
	    {
	    	base.OnRowDeleted(e);
	    }

	    protected override void OnRowDeleting(DataRowChangeEventArgs e)
	    {
	    	base.OnRowDeleting(e);
	    }

	    protected override void OnTableCleared(DataTableClearEventArgs e)
	    {
	    	base.OnTableCleared(e);
	    }

	    protected override void OnTableClearing(DataTableClearEventArgs e)
	    {
	    	base.OnTableClearing(e);
	    }

	    protected override void OnTableNewRow(DataTableNewRowEventArgs e)
	    {
	    	base.OnTableNewRow(e);
	    }
    }
    public class VersionDataTable : DataTable
    {
        public const string Default_DataTableName = "Version";
        public const string ColumnName_ID = "ID";
        public const string ColumnName_ProductID = "ProductID";
        public const string ColumnName_Major = "Major";
        public const string ColumnName_Minor = "Minor";
        public const string ColumnName_Build = "Build";
        public const string ColumnName_Revision = "Revision";
        public const string ColumnName_IsInstalled = "IsInstalled";
        
        private _idDataColumn;
        private _productIDDataColumn;
        private _majorDataColumn;
        private _minorDataColumn;
        private _buildDataColumn;
        private _revisionDataColumn;
        private _isInstalledDataColumn;

        public IDDataColumn { get { return _idDataColumn; } }
        public ProductIDDataColumn { get { return _productIDDataColumn; } }
        public MajorDataColumn { get { return _majorDataColumn; } }
        public MinorDataColumn { get { return _minorDataColumn; } }
        public BuildDataColumn { get { return _buildDataColumn; } }
        public RevisionDataColumn { get { return _revisionDataColumn; } }
        public IsInstalledDataColumn { get { return _isInstalledDataColumn; } }

	    public VersionDataTable() : base(Default_DataTableName)
        {
            _idDataColumn = new DataColumn(ColumnName_ID, typeof(long));
            _productIDDataColumn = new DataColumn(ColumnName_ProductID, typeof(long));
            _majorDataColumn = new DataColumn(ColumnName_Major, typeof(int));
            _minorDataColumn = new DataColumn(ColumnName_Minor, typeof(int));
            _buildDataColumn = new DataColumn(ColumnName_Build, typeof(int));
            _revisionDataColumn = new DataColumn(ColumnName_Revision, typeof(int));
            _isInstalledDataColumn = new DataColumn(ColumnName_IsInstalled, typeof(bool));
            Columns.Add(_idDataColumn);
            _idDataColumn.AutoIncrement = true;
            _idDataColumn.AllowDBNull = false;
            Columns.Add(_majorDataColumn);
            _nameDataColumn.AllowDBNull = false;
             _nameDataColumn.DefaultValue = 0;
            Columns.Add(_minorDataColumn);
            _nameDataColumn.AllowDBNull = false;
             _nameDataColumn.DefaultValue = 0;
            Columns.Add(_buildDataColumn);
            _nameDataColumn.AllowDBNull = false;
             _nameDataColumn.DefaultValue = -1;
            Columns.Add(_revisionDataColumn);
            _nameDataColumn.AllowDBNull = false;
             _nameDataColumn.DefaultValue = -1;
            Columns.Add(_isInstalledDataColumn);
            _nameDataColumn.AllowDBNull = false;
             _nameDataColumn.DefaultValue = false;
            Constraints.Add('PK_VersionID', _idDataColumn, true);
        }

	    protected VersionDataTable(SerializationInfo info, StreamingContext context)
		    : base(info, context)
	    {
            _idDataColumn = Columns[ColumnName_ID];
            _productIDDataColumn = Columns[ColumnName_ProductID];
            _majorDataColumn = Columns[ColumnName_Major];
            _minorDataColumn = Columns[ColumnName_Minor];
            _buildDataColumn = Columns[ColumnName_Build];
            _revisionDataColumn = Columns[ColumnName_Revision];
            _isInstalledDataColumn = Columns[ColumnName_IsInstalled];
	    }

	    // public override DataTable Clone()
	    // {
	    // 	throw new NotImplementedException();
	    // }

	    protected override DataTable CreateInstance() { return new VersionDataTable(); }

	    // public override void GetObjectData(SerializationInfo info, StreamingContext context)
	    // {
	    // 	base.GetObjectData(info, context);
	    // }

	    protected override Type GetRowType() { return typeof(VersionDataRow); }

	    // protected override DataRow NewRowFromBuilder(DataRowBuilder builder)
	    // {
	    // 	return base.NewRowFromBuilder(builder);
	    // }

	    protected override void OnRemoveColumn(DataColumn column) { throw new NotSupportedException(); }

	    protected override void OnRowChanged(DataRowChangeEventArgs e)
	    {
	    	base.OnRowChanged(e);
	    }

	    protected override void OnRowChanging(DataRowChangeEventArgs e)
	    {
	    	base.OnRowChanging(e);
	    }

	    protected override void OnRowDeleted(DataRowChangeEventArgs e)
	    {
	    	base.OnRowDeleted(e);
	    }

	    protected override void OnRowDeleting(DataRowChangeEventArgs e)
	    {
	    	base.OnRowDeleting(e);
	    }

	    protected override void OnTableCleared(DataTableClearEventArgs e)
	    {
	    	base.OnTableCleared(e);
	    }

	    protected override void OnTableClearing(DataTableClearEventArgs e)
	    {
	    	base.OnTableClearing(e);
	    }

	    protected override void OnTableNewRow(DataTableNewRowEventArgs e)
	    {
	    	base.OnTableNewRow(e);
	    }
    }
    public class FileDataTable : DataTable
    {
        public const string Default_DataTableName = "File";
        public const string ColumnName_ID = "ID";
        public const string ColumnName_Name = "Name";
        public const string ColumnName_Path = "Path";
        public const string ColumnName_VersionID = "VersionID";
        
        private _idDataColumn;
        private _nameDataColumn;
        private _pathDataColumn;
        private _versionIDDataColumn;
        
        public IDDataColumn { get { return _idDataColumn; } }
        public NameDataColumn { get { return _nameDataColumn; } }
        public PathDataColumn { get { return _pathDataColumn; } }
        public VersionIDColumn { get { return _versionIDDataColumn; } }

	    public FileDataTable() : base(Default_DataTableName)
        {
            _idDataColumn = new DataColumn(ColumnName_ID, typeof(long));
            _nameDataColumn = new DataColumn(ColumnName_Name, typeof(string));
            _pathDataColumn = new DataColumn(ColumnName_Path, typeof(string));
            _versionIDDataColumn = new DataColumn(ColumnName_VersionID, typeof(long));
            Columns.Add(_idDataColumn);
            _idDataColumn.AutoIncrement = true;
            _idDataColumn.AllowDBNull = false;
            Columns.Add(_nameDataColumn);
            _nameDataColumn.AllowDBNull = false;
            Columns.Add(_pathDataColumn);
            _nameDataColumn.AllowDBNull = false;
            Columns.Add(_versionIDDataColumn);
            _nameDataColumn.AllowDBNull = false;
            Constraints.Add('PK_FileID', _idDataColumn, true);
        }

	    protected FileDataTable(SerializationInfo info, StreamingContext context)
		    : base(info, context)
	    {
            _idDataColumn = Columns[ColumnName_ID];
            _nameDataColumn = Columns[ColumnName_Name];
            _pathDataColumn = Columns[ColumnName_Path];
            _versionIDDataColumn = Columns[ColumnName_VersionID];
	    }

	    // public override DataTable Clone()
	    // {
	    // 	throw new NotImplementedException();
	    // }

	    protected override DataTable CreateInstance() { return new FileDataTable(); }

	    public override void GetObjectData(SerializationInfo info, StreamingContext context)
	    {
	    	base.GetObjectData(info, context);
	    }

	    protected override Type GetRowType() { return typeof(FileDataRow); }

	    // protected override DataRow NewRowFromBuilder(DataRowBuilder builder)
	    // {
	    // 	return base.NewRowFromBuilder(builder);
	    // }

	    protected override void OnRemoveColumn(DataColumn column) { throw new NotSupportedException(); }

	    protected override void OnRowChanged(DataRowChangeEventArgs e)
	    {
	    	base.OnRowChanged(e);
	    }

	    protected override void OnRowChanging(DataRowChangeEventArgs e)
	    {
	    	base.OnRowChanging(e);
	    }

	    protected override void OnRowDeleted(DataRowChangeEventArgs e)
	    {
	    	base.OnRowDeleted(e);
	    }

	    protected override void OnRowDeleting(DataRowChangeEventArgs e)
	    {
	    	base.OnRowDeleting(e);
	    }

	    protected override void OnTableCleared(DataTableClearEventArgs e)
	    {
	    	base.OnTableCleared(e);
	    }

	    protected override void OnTableClearing(DataTableClearEventArgs e)
	    {
	    	base.OnTableClearing(e);
	    }

	    protected override void OnTableNewRow(DataTableNewRowEventArgs e)
	    {
	    	base.OnTableNewRow(e);
	    }
    }
    public class ProductDataRow : DataRow, IEquatable<ProductDataRow>
    {
        public long ID
        {
            get
            {
                if (IsNUll(Product.ColumnName_ID))
                    return -1;
                return (long)(this[Product.ColumnName_ID]);
            }
        }
        public string Name
        {
            get
            {
                if (IsNUll(Product.ColumnName_Name))
                    return "";
                return (long)(this[Product.ColumnName_Name]);
            }
        }
        protected ProductDataRow(DataRowBuilder builder)
            : base(builder)
        {
        }
	    public override bool Equals(object obj)
	    {
	    	return obj != null && obj is ProductDataRow && Equals((ProductDataRow)obj);
	    }
	    public bool Equals(ProductDataRow other)
	    {
	    	return other != null && ReferenceEquals(this, other);
	    }
	    public override int GetHashCode() { return ID.GetHashCode(); }
	    public override string ToString() { return Name; }
    }
    public class VersionDataRow : DataRow, IEquatable<VersionDataRow>
    {
        private Version _value = null;
        public Version Value
        {
            get
            {
                Version value = _value;
                if (value == null)
                {
                    int build = Build;
                    if (build < 0)
                        value = new Version(Major, Minor);
                    else
                    {
                        int revision = Revision;
                        if (revision < 0)
                            value = new Version(Major, Minor, build);
                        else
                            value = new Version(Major, Minor, build, revision);
                    }
                    _value = value;
                }

                return value;
            }
        }
        public void ResetValue() { this._value = null; }
        public long ID
        {
            get
            {
                if (IsNUll(VersionDataTable.ColumnName_ID))
                    return -1;
                return (long)(this[VersionDataTable.ColumnName_ID]);
            }
        }
        public long ProductID
        {
            get
            {
                if (IsNUll(VersionDataTable.ColumnName_ProductID))
                    return -1L;
                return (long)(this[VersionDataTable.ColumnName_ProductID]);
            }
            set { this[VersionDataTable.ColumnName_ProductID] = value; }
        }
        public int Major
        {
            get
            {
                if (IsNUll(FileDataTable.ColumnName_Major))
                    return 0;
                return (int)(this[VersionDataTable.ColumnName_Major]);
            }
        }
        public int Minor
        {
            get
            {
                if (IsNUll(VersionDataTable.ColumnName_Minor))
                    return 0;
                return (int)(this[VersionDataTable.ColumnName_Minor]);
            }
        }
        public int Build
        {
            get
            {
                if (IsNUll(VersionDataTable.ColumnName_Build))
                    return -1;
                return (int)(this[VersionDataTable.ColumnName_Build]);
            }
        }
        public int Revision
        {
            get
            {
                if (IsNUll(VersionDataTable.ColumnName_Revision))
                    return -1;
                return (int)(this[VersionDataTable.ColumnName_Revision]);
            }
        }
        public bool IsInstalled
        {
            get { return (!IsNUll(FileDataTable.ColumnName_IsInstalled) && (bool)(this[VersionDataTable.ColumnName_IsInstalled])); }
            set { this[VersionDataTable.ColumnName_IsInstalled] = value; }
        }

        protected VersionDataRow(DataRowBuilder builder)
            : base(builder)
        {
        }
	    public override bool Equals(object obj)
	    {
	    	return obj != null && obj is VersionDataRow && Equals((VersionDataRow)obj);
	    }
	    public bool Equals(VersionDataRow other)
	    {
	    	return other != null && ReferenceEquals(this, other);
	    }
	    public override int GetHashCode() { return ID.GetHashCode(); }
	    public override string ToString()
	    {
            if (IsInstalled)
	    	    return Value.ToString() + " (installed)";
            return Value.ToString();
	    }
    }
    public class FileDataRow : DataRow, IEquatable<FileDataRow>
    {
        public long ID
        {
            get
            {
                if (IsNUll(FileDataTable.ColumnName_ID))
                    return -1;
                return (long)(this[FileDataTable.ColumnName_ID]);
            }
        }
        public string Name
        {
            get
            {
                if (IsNUll(FileDataTable.ColumnName_Name))
                    return "";
                return (long)(this[FileDataTable.ColumnName_Name]);
            }
        }
        public string Path
        {
            get
            {
                if (IsNUll(FileDataTable.ColumnName_Path))
                    return "";
                return (long)(this[FileDataTable.ColumnName_Path]);
            }
        }
        public long VersionID
        {
            get
            {
                if (IsNUll(FileDataTable.ColumnName_VersionID))
                    return -1L;
                return (long)(this[FileDataTable.ColumnName_VersionID]);
            }
            set { this[FileDataTable.ColumnName_VersionID] = value; }
        }

        protected FileDataRow(DataRowBuilder builder)
            : base(builder)
        {
        }
	    public override bool Equals(object obj)
	    {
	    	return obj != null && obj is FileDataRow && Equals((FileDataRow)obj);
	    }
	    public bool Equals(FileDataRow other)
	    {
	    	return other != null && ReferenceEquals(this, other);
	    }
	    public override int GetHashCode() { return ID.GetHashCode(); }
	    public override string ToString() { return Path; }
    }
}
'@ -ReferencedAssemblies 'System.Data', 'System.Xml';

Function New-VsixManifestDataSet {
    [OutputType()]
    [CmdletBinding()]
    Param(
        [string]$Path
    )

}
if ($null -eq $Script:DataSet) {
    [System.Data.DataSet]$Script:DataSet = New-Object -TypeName 'DataSet' -ArgumentList 'VsixManifestInfo';
    [System.Data.DataTable]$Script:ProductDataTable = $DataSet.Tables.Add('Product');
    [System.Data.DataColumn]$ProductIdDataColumn = $Script:ProductDataTable.Columns.Add('ID', [long]);
    $ProductIdDataColumn.AutoIncrement = $true;
    $ProductIdDataColumn.AllowDBNull = $false;
    $Script:ProductDataTable.Constraints.Add('PK_ProductID', $ProductIdDataColumn, $true) | Out-Null;
    [System.Data.DataColumn]$DataColumn = $Script:ProductDataTable.Columns.Add('Name', [string]);
    $DataColumn.AllowDBNull = $false;
    [System.Data.DataTable]$Script:VersionDataTable = $DataSet.Tables.Add('Version');
    [System.Data.DataColumn]$VersionIdDataColumn = $Script:VersionDataTable.Columns.Add('ID', [long]);
    $VersionIdDataColumn.AutoIncrement = $true;
    $VersionIdDataColumn.AllowDBNull = $false;
    $Script:VersionDataTable.Constraints.Add('PK_VersionID', $VersionIdDataColumn, $true) | Out-Null;
    $DataColumn = $Script:VersionDataTable.Columns.Add('ProductID', [long]);
    $DataColumn.AllowDBNull = $false;
    $Script:FK_ProductVersion = $DataSet.Relations.Add('FK_ProductVersion', $ProductIdDataColumn, $DataColumn, $true);
    $DataColumn = $Script:VersionDataTable.Columns.Add('Major', [int]);
    $DataColumn.AllowDBNull = $false;
    $DataColumn.DefaultValue = 0;
    $DataColumn = $Script:VersionDataTable.Columns.Add('Minor', [int]);
    $DataColumn.AllowDBNull = $false;
    $DataColumn.DefaultValue = 0;
    $DataColumn = $Script:VersionDataTable.Columns.Add('Build', [int]);
    $DataColumn.AllowDBNull = $false;
    $DataColumn.DefaultValue = -1;
    $DataColumn = $Script:VersionDataTable.Columns.Add('Revision', [int]);
    $DataColumn.AllowDBNull = $false;
    $DataColumn.DefaultValue = -1;
    $DataColumn = $Script:VersionDataTable.Columns.Add('IsInstalled', [bool]);
    $DataColumn.AllowDBNull = $false;
    $DataColumn.DefaultValue = $false;
    [System.Data.DataTable]$Script:FileDataTable = $DataSet.Tables.Add('File');
    $DataColumn = $Script:FileDataTable.Columns.Add('ID', [long]);
    $DataColumn.AutoIncrement = $true;
    $DataColumn.AllowDBNull = $false;
    $Script:FileDataTable.Constraints.Add('PK_FileID', $DataColumn, $true) | Out-Null;
    $DataColumn = $Script:FileDataTable.Columns.Add('Name', [string]);
    $DataColumn.AllowDBNull = $false;
    $DataColumn = $Script:FileDataTable.Columns.Add('Path', [string]);
    $DataColumn.AllowDBNull = $false;
    $DataColumn = $Script:FileDataTable.Columns.Add('VersionID', [long]);
    $DataColumn.AllowDBNull = $false;
    $Script:FK_VersionFile = $DataSet.Relations.Add('FK_VersionFile', $VersionIdDataColumn, $DataColumn, $true);

    ($DownloadLocation | Get-ChildItem -File -Filter '*.vsix') | Get-VsixManifestInfo;
    ($CacheLocation | Get-ChildItem -File -Filter '*.vsix') | Get-VsixManifestInfo;

    Write-Progress -Activity 'Checking current versions' -Status 'code' -CurrentOperation 'Checking Visual Studio Code' -PercentComplete 99;
    $OutputLines = @();
    <#try { $OutputLines = @(code --list-extensions --show-versions); } catch {
      Write-Warning -Message 'Failed to execute Visual Studio Code';
    }#>
                                   
$OutputLines = @(@"
abusaidm.html-snippets@0.2.1
Angular.ng-template@0.1.10
christian-kohler.npm-intellisense@1.3.0
christian-kohler.path-intellisense@1.4.2
danwahlin.angular2-snippets@1.0.20
DavidAnson.vscode-markdownlint@0.20.0
dbaeumer.jshint@0.10.20
dbaeumer.vscode-eslint@1.6.0
DotJoshJohnson.xml@2.3.2
ecmel.vscode-html-css@0.2.0
EditorConfig.EditorConfig@0.12.4
eg2.tslint@1.0.38
eg2.vscode-npm-script@0.3.5
esbenp.prettier-vscode@1.6.1
felipecaputo.git-project-manager@1.6.1
fknop.vscode-npm@3.3.0
formulahendry.auto-close-tag@0.5.6
formulahendry.dotnet@0.0.4
HookyQR.beautify@1.4.3
HookyQR.JSDocTagComplete@0.0.2
joelday.docthis@0.7.1
johnpapa.angular-essentials@0.4.0
johnpapa.Angular2@6.1.5
johnpapa.winteriscoming@0.7.1
jorgeserrano.vscode-csharp-snippets@0.3.1
k--kato.docomment@0.1.2
lolkush.quickstart@0.1.0
Mikael.Angular-BeastCode@6.2.23
mkaufman.HTMLHint@0.5.0
ms-vscode.csharp@1.16.0
ms-vscode.PowerShell@1.8.4
msjsdiag.debugger-for-chrome@4.10.0
natewallace.angular2-inline@0.0.17
PKief.material-icon-theme@3.6.0
sidthesloth.html5-boilerplate@1.0.3
xabikos.JavaScriptSnippets@1.7.0
Zignd.html-css-class-completion@1.17.1
"@ -split '\r\n?|\n');
    if ($OutputLines.Count -gt 0) {
      $Regex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList '^\s*(\S+)@(\d+(?:\.\d+)*)\s*$';
      $OutputLines | ForEach-Object { $Regex.Match($_) } | Where-Object { $_.Success } | ForEach-Object {
        $Version = $null;
        try { $Version = [System.Version]::Parse($_.Groups[2].Value) } catch { }
        if ($Version -eq $null) {
            Write-Warning -Message "Unable to parse version for extension $($_.Groups[1].Value)";
        } else {
            Add-Product -Name $_.Groups[1].Value -Version $Version -IsInstalled;
        }
      };
    }

    if ($null -ne $Force) {
      ($Force | ForEach-Object { @($Script:ProductDataTable.Select("[Name]='$($Name)'")).Count -eq 0 } | ForEach-Object { Add-Product -Name $_ });
    }
}

for ($ExtensionIndex = 0; $ExtensionIndex -lt $Script:ProductDataTable.Rows.Count; $ExtensionIndex++) {
    $PercentComplete = [System.Math]::Round(([double]$ExtensionIndex) * 100.0 / ([double]($Script:ProductDataTable.Rows.Count)), 2);
    $ProductName = $Script:ProductDataTable.Rows[$ExtensionIndex]['Name'];
    $Uri = "https://marketplace.visualstudio.com/items?itemName=$ProductName";
    Write-Progress -Activity 'Checking for updates' -Status $ProductName -CurrentOperation "Checking latest version: $Uri" -PercentComplete $PercentComplete;
    $RequestError = $null;
    $WebPage = $null;
    Write-Information -MessageData "Getting data from $Uri";
    $WebPage = Invoke-WebRequest -Uri $Uri -ErrorAction Continue -ErrorVariable 'RequestError';
    if ($null -eq $WebPage) {
        if ($null -eq $RequestError -or "$RequestError".Trim().Length -eq 0) {
            Write-Warning -Message "$ProductName`: No response from URL $Uri";
        } else {
            Write-Warning -Message "Request for $ProductName ($Uri) failed: $RequestError";
        }
    } else {
        $ScriptTag = $WebPage.Scripts | Where-Object { $_.class -eq 'vss-extension' -and $_.type -eq 'application/json' } | Select-Object -First 1;
        if ($null -eq $ScriptTag) {
            Write-Warning -Message "$ProductName`: Could not determine extension JSON data in response from $Uri";
        } else {
            $DetailsJSON = $null;
            $DetailsJSON = $ScriptTag.innerHTML | ConvertFrom-Json -ErrorAction Continue -ErrorVariable 'RequestError';
            if ($null -eq $DetailsJSON) {
                if ($null -eq $RequestError -or "$RequestError".Trim().Length -eq 0) {
                    Write-Warning -Message "$ProductName`: Could not parse JSON data in response from $Uri";
                } else {
                    Write-Warning -Message "JSON parse for $ProductName ($Uri) failed: $RequestError";
                }
            } else {
                if ($null -eq $DetailsJSON.versions -or $null -eq $DetailsJSON.versions.version) {
                    Write-Warning -Message "$ProductName`: Unable to find version information for $Uri";
                } else {
                    $Version = $null;
                    $Version = New-Object -TypeName 'System.Version' -ArgumentList $DetailsJSON.versions.version;
                    if ($null -eq $Version) {
                        Write-Warning -Message "$ProductName`: Version $($DetailsJSON.versions.version) could not be parsed for $Uri";
                    } else {
                        $FileInfo = New-Object -TypeName 'System.IO.FileInfo' -ArgumentList ($DownloadLocation | Join-Path -ChildPath "$ProductName.$($DetailsJSON.versions.version).vsix");
                        $FileDataRow = Add-Product -Name $ProductName -Version $Version -FileInfo $FileInfo;
                        $VersionDataRow = $FileDataRow.GetParentRow('FK_VersionFile');
                        $InstalledDataRow = $VersionDataRow;
                        if (-not $VersionDataRow['IsInstalled']) {
                            $InstalledDataRow = $VersionDataRow.GetParentRow('FK_ProductVersion').GetChildRows('FK_ProductVersion') | Where-Object { $_['IsInstalled'] } | Select-Object -First 1;
                        }
                        if ($FileInfo.Exists) {
                            if ($null -ne $InstalledDataRow) {
                                if ([System.Object]::ReferenceEquals($InstalledDataRow, $VersionDataRow)) {
                                    Write-Information -MessageData "Latest version of $ProductName ($Version) downloaded to $($FileInfo.FullName), and installed.";
                                } else {
                                    Write-Warning -Message "Latest version of $ProductName ($Version) downloaded to $($FileInfo.FullName), but needs to be upgraded.";
                                }
                            } else {
                                Write-Warning -Message "$ProductName@$Version downloaded to $($FileInfo.FullName), but not installed.";
                            }
                            $FileInfo = $null;
                        } else {
                            if ($FileInfo.Exists) {
                                if ($null -ne $InstalledDataRow) {
                                    if ([System.Object]::ReferenceEquals($InstalledDataRow, $VersionDataRow)) {
                                        Write-Information -MessageData "Latest version of $ProductName ($Version) downloaded to cache ($($FileInfo.FullName)), and installed.";
                                    } else {
                                        Write-Warning -Message "Latest version of $ProductName ($Version) downloaded to cache ($($FileInfo.FullName)), but needs to be upgraded.";
                                    }
                                } else {
                                    Write-Warning -Message "$ProductName@$Version downloaded to cache ($($FileInfo.FullName)), but not installed.";
                                }
                                $FileInfo = $null;
                            } else {
                                if ($null -ne $InstalledDataRow) {
                                    if ([System.Object]::ReferenceEquals($InstalledDataRow, $VersionDataRow)) {
                                        Write-Information -MessageData "Latest version of $ProductName ($Version) is installed, but not downloaded.";
                                    } else {
                                        Write-Warning -Message "Latest version of $ProductName ($Version) not downloaded and needs to be upgraded.";
                                    }
                                } else {
                                    Write-Warning -Message "$ProductName@$Version is neither downloaded, nor installed.";
                                }
                            }
                        }
                        if ($null -ne $FileInfo) {
                            if ($null -eq $DetailsJSON.versions.assetUri -or $DetailsJSON.versions.assetUri -isnot [string] -or $DetailsJSON.versions.assetUri.trim().length -eq 0) {
                                Write-Warning -Message "$ProductName`: Could not find asset URI for $Uri";
                            } else {
                                $Uri = "$($DetailsJSON.versions.assetUri)/Microsoft.VisualStudio.Services.VSIXPackage";
                                Write-Progress -Activity 'Checking for updates' -Status $ProductName -CurrentOperation "Downloading lastest version ($($FileInfo.Name)) from $Uri" -PercentComplete $PercentComplete;
                                Invoke-WebRequest -Uri $Uri -OutFile $FileInfo.FullName -ErrorAction Continue -ErrorVariable 'RequestError';
                                if ($null -ne $RequestError -and "$RequestError".trim().Length -gt 0) {
                                    Write-Warning -Message "File download for $ProductName from $Uri to $($FileInfo.Name) failed: $RequestError";
                                } else {
                                    if ($OutFile | Test-Path -PathType Leaf) {
                                        Write-Information -MessageData "$ProductName version $Version has been downloaded to $($FileInfo.Name).";
                                    } else {
                                        Write-Warning -Message "$ProductName`: Could not download file from $Uri to $($FileInfo.Name)";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
#>
