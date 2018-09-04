Function Test-IsLinkType {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true, Position = 0)]
        [AllowEmptyString()]
        [string[]]$InputString
    )
    Begin {
        $Regex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList '^(Junction|(Hard|Symbolic)Link)$', ([System.Text.RegularExpressions.RegexOptions]([System.Text.RegularExpressions.RegexOptions]::Compiled -bor [System.Text.RegularExpressions.RegexOptions]::IgnoreCase));
    }

    Process {
        $InputString | ForEach-Object { $Regex.IsMatch($_) }
    }
}

Function Test-IsFileSystemInfoLike {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true, Position = 0)]
        [object[]]$InputObject
    )
    Begin {
        $PropertyDefinitions = @(
            @{ Name = 'BaseName'; Type = [string]; Required = $true };
            @{ Name = 'Extension'; Type = [string]; Required = $true };
            @{ Name = 'CreationTime'; Type = [DateTime]; Required = $true };
            @{ Name = 'LastWriteTime'; Type = [DateTime]; Required = $true };
            @{ Name = 'Exists'; Type = [bool]; Required = $false };
            @{ Name = 'ReadOnly'; Type = [bool]; Required = $false };
            @{ Name = 'Length'; Type = [long]; Required = $false };
        );
    }
    Process {
        foreach ($obj in $InputObject) {
            if ($obj -is [System.IO.FileInfo] -or $obj -is [System.IO.DirectoryInfo]) {
                $true | Write-Output;
            } else {
                if (@($PropertyDefinitions | Where-Object {
                    $Value = $obj[$_.Name];
                    if ($Value -eq $null) {
                        $_.Required;
                    } else {
                        if ($Value -is $_.Type) {
                            if ($_.Test -eq $null) {
                                $false | Write-Output;
                            } else {
                                if ($_.Test.Invoke($Value)) { $false | Write-Output } else { $true | Write-Output }
                            }
                        } else {
                            $true | Write-Output;
                        }
                    }
                }).Count -eq 0) {
                    $Value = $obj.LinkType;
                    if (-not [string]::IsNullOrEmpty($Value) -and ($Value | Test-IsLinkType)) {
                        $Value = $obj.DirectoryName;
                        if ($Value -ne $null -and $Value -is [string]) {
                            $true | Write-Output;
                        } else {
                            if ($obj.Length -eq $null) {
                                $Value = $obj.Directory;
                                if ($Value -ne $null -and $Value -is [System.IO.DirectoryInfo]) { $true | Write-Output } else { $false | Write-Output }
                            } else {
                                $false | Write-Output;
                            }
                        }
                    } else {
                        $false | Write-Output;
                    }
                } else {
                    $false | Write-Output;
                }
            }
        }
    }
}

Function Test-ContentDataTable {
    Param(
        [Parameter(Mandatory = $true, Position = 0)]
        [System.Data.DataTable]$DataTable,

        [switch]$EmitWarning
    )
    if ($DataTable.TableName -eq 'Content' -and $DataTable.Namespace -eq '') {
        if ($DataTable.CaseSensitive) {
            if ($EmitWarning) {
                Write-Warning -Message "({@TableName='Content'}).CaseSensitive is not False";
            }
            $false | Write-Output;
        } else {
            if (@(@(
                @{ Name = 'ID'; Caption = 'ID'; DataType = [System.Guid]; AllowDBNull = $false; Unique = $true },
                @{ Name = 'Length'; Caption = 'Length'; DataType = [long]; AllowDBNull = $false; Unique = $false },
                @{ Name = 'MD5Checksum'; Caption = 'MD5 Checksum'; DataType = [string]; AllowDBNull = $true; Unique = $false },
                @{ Name = 'Calculated'; Caption = 'Calculated'; DataType = [System.DateTime]; AllowDBNull = $true; Unique = $false; DateTimeMode = [System.Data.DataSetDateTime]::Utc }
            ) | Where-Object {
                if ($DataTable.Columns.Contains($_.Name)) {
                    $DataColumn = $DataTable.Columns[$_.Name];
                    if ($DataColumn.Namespace -eq '') {
                        if ($DataColumn.Caption -eq $_.Caption) {
                            if ($DataColumn.DataType -eq $_.DataType) {
                                if ($DataColumn.AllowDBNull -eq $_.AllowDBNull) {
                                    if ($DataColumn.Unique -eq $_.Unique) {
                                        if ($_.DateTimeMode -eq $null -or $DataColumn.DateTimeMode -eq $_.DateTimeMode) {
                                            $false | Write-Output;
                                        } else {
                                            if ($EmitWarning) {
                                                Write-Warning -Message "({@TableName='Content'}).$($_.Name).DateTimeMode is not '$($_.DateTimeMode)'";
                                            }
                                            $true | Write-Output;
                                        }
                                    } else {
                                        if ($EmitWarning) {
                                            Write-Warning -Message "({@TableName='Content'}).$($_.Name).Unique is not '$($_.Unique)'";
                                        }
                                        $true | Write-Output;
                                    }
                                } else {
                                    if ($EmitWarning) {
                                        Write-Warning -Message "({@TableName='Content'}).$($_.Name).AllowDBNull is not '$($_.AllowDBNull)'";
                                    }
                                    $true | Write-Output;
                                }
                            } else {
                                if ($EmitWarning) {
                                    Write-Warning -Message "({@TableName='Content'}).$($_.Name).DataType is not equal to '$($_.DataType)'";
                                }
                                $true | Write-Output;
                            }
                        } else {
                            if ($EmitWarning) {
                                Write-Warning -Message "({@TableName='Content'}).$($_.Name).Caption is not equal to '$($_.Caption)'";
                            }
                            $true | Write-Output;
                        }
                    } else {
                        if ($EmitWarning) {
                            Write-Warning -Message "({@TableName='Content'}).$($_.Name).Namespace is not empty";
                        }
                        $true | Write-Output;
                    }
                } else {
                    if ($EmitWarning) {
                        Write-Warning -Message "({@TableName='Content'}) does not contain $($_.Name)";
                    }
                    $true | Write-Output;
                }
            }).Count -eq 0) {
                if ($DataTable.DataSet -ne $null) {
                    $true | Write-Output;
                } else {
                    if ($EmitWarning) {
                        Write-Warning -Message "({@TableName='Content'}) does belong to a data set";
                    }
                    $false | Write-Output;
                }
            } else {
                $false | Write-Output;
            }
        }
    } else {
        if ($EmitWarning) {
            if ($DataTable.Namespace -eq '') {
                Write-Warning -Message 'Data table name is not ''Content''';
            } else {
                Write-Warning -Message '({@TableName=''Content''}).Namespace is not empty';
            }
        }
        $false | Write-Output;
    }
}

Function Test-LocationDataTable {
    Param(
        [Parameter(Mandatory = $true, Position = 0)]
        [System.Data.DataTable]$DataTable,

        [switch]$EmitWarning
    )
    if ($DataTable.TableName -eq 'Location' -and $DataTable.Namespace -eq '') {
        if ($DataTable.CaseSensitive) {
            if ($EmitWarning) {
                Write-Warning -Message "({@TableName='Location'}).CaseSensitive is not False";
            }
            $false | Write-Output;
        } else {
            if (@(@(
                @{ Name = 'ID'; Caption = 'ID'; DataType = [System.Guid]; AllowDBNull = $false; Unique = $true },
                @{ Name = 'ParentID'; Caption = 'Parent ID'; DataType = [System.Guid]; AllowDBNull = $true; Unique = $false },
                @{ Name = 'ContentID'; Caption = 'Content ID'; DataType = [System.Guid]; AllowDBNull = $true; Unique = $false },
                @{ Name = 'BaseName'; Caption = 'Base Name'; DataType = [string]; AllowDBNull = $false; Unique = $false },
                @{ Name = 'Extension'; Caption = 'Extension'; DataType = [string]; AllowDBNull = $false; Unique = $false },
                @{ Name = 'Created'; Caption = 'Created'; DataType = [System.DateTime]; AllowDBNull = $false; Unique = $false; DateTimeMode = [System.Data.DataSetDateTime]::Utc },
                @{ Name = 'Modified'; Caption = 'Modified'; DataType = [System.DateTime]; AllowDBNull = $false; Unique = $false; DateTimeMode = [System.Data.DataSetDateTime]::Utc },
                @{ Name = 'Accessed'; Caption = 'Accessed'; DataType = [System.DateTime]; AllowDBNull = $false; Unique = $false; DateTimeMode = [System.Data.DataSetDateTime]::Utc },
                @{ Name = 'Exists'; Caption = 'Exists'; DataType = [bool]; AllowDBNull = $false; Unique = $false },
                @{ Name = 'ReadOnly'; Caption = 'Read-Only'; DataType = [bool]; AllowDBNull = $false; Unique = $false },
                @{ Name = 'LinkType'; Caption = 'Link Type'; DataType = [string]; AllowDBNull = $true; Unique = $false }
            ) | Where-Object {
                if ($DataTable.Columns.Contains($_.Name)) {
                    $DataColumn = $DataTable.Columns[$_.Name];
                    if ($DataColumn.Namespace -eq '') {
                        if ($DataColumn.Caption -eq $_.Caption) {
                            if ($DataColumn.DataType -eq $_.DataType) {
                                if ($DataColumn.AllowDBNull -eq $_.AllowDBNull) {
                                    if ($DataColumn.Unique -eq $_.Unique) {
                                        if ($_.DateTimeMode -eq $null -or $DataColumn.DateTimeMode -eq $_.DateTimeMode) {
                                            $false | Write-Output;
                                        } else {
                                            if ($EmitWarning) {
                                                Write-Warning -Message "({@TableName='Location'}).$($_.Name).DateTimeMode is not '$($_.DateTimeMode)'";
                                            }
                                            $true | Write-Output;
                                        }
                                    } else {
                                        if ($EmitWarning) {
                                            Write-Warning -Message "({@TableName='Location'}).$($_.Name).Unique is not '$($_.Unique)'";
                                        }
                                        $true | Write-Output;
                                    }
                                } else {
                                    if ($EmitWarning) {
                                        Write-Warning -Message "({@TableName='Location'}).$($_.Name).AllowDBNull is not '$($_.AllowDBNull)'";
                                    }
                                    $true | Write-Output;
                                }
                            } else {
                                if ($EmitWarning) {
                                    Write-Warning -Message "({@TableName='Location'}).$($_.Name).DataType is not equal to '$($_.DataType)'";
                                }
                                $true | Write-Output;
                            }
                        } else {
                            if ($EmitWarning) {
                                Write-Warning -Message "({@TableName='Location'}).$($_.Name).Caption is not equal to '$($_.Caption)'";
                            }
                            $true | Write-Output;
                        }
                    } else {
                        if ($EmitWarning) {
                            Write-Warning -Message "({@TableName='Location'}).$($_.Name).Namespace is not empty";
                        }
                        $true | Write-Output;
                    }
                } else {
                    if ($EmitWarning) {
                        Write-Warning -Message "({@TableName='Location'}) does not contain $($_.Name)";
                    }
                    $true | Write-Output;
                }
            }).Count -eq 0) {
                if ($DataTable.DataSet -ne $null) {
                    $true | Write-Output;
                } else {
                    if ($EmitWarning) {
                        Write-Warning -Message "({@TableName='Location'}) does belong to a data set";
                    }
                    $false | Write-Output;
                }
            } else {
                $false | Write-Output;
            }
        }
    } else {
        if ($EmitWarning) {
            if ($DataTable.Namespace -eq '') {
                Write-Warning -Message 'Data table name is not ''Location''';
            } else {
                Write-Warning -Message '({@TableName=''Location''}).Namespace is not empty';
            }
        }
        $false | Write-Output;
    }
}

Function Test-DataSetRelationship {
    Param(
        [Parameter(Mandatory = $true)]
        [System.Data.DataSet]$DataSet,
        
        [Parameter(Mandatory = $true)]
        [string]$Name,
        
        [Parameter(Mandatory = $true)]
        [string]$ParentTable,
        
        [Parameter(Mandatory = $true)]
        [string[]]$ParentColumn,
        
        [Parameter(Mandatory = $true)]
        [string]$ChildTable,
        
        [Parameter(Mandatory = $true)]
        [string[]]$ChildColumn,

        [switch]$EmitWarning,

        [switch]$Nested
    )

    if ($DataSet.Relations.Contains($Name)) {
        $DataRelation = $DataSet.Relations[$Name];
        if ($DataRelation.ParentTable.TableName -eq $ParentTable -and $DataRelation.ParentTable.Namespace -eq '') {
            if ($DataRelation.ChildTable.TableName -eq $ChildTable -and $DataRelation.ChildTable.Namespace -eq '') {
                if ($DataRelation.ParentColumns.Count -eq $ParentColumn.Length) {
                    if ($DataRelation.ChildColumns.Count -eq $ChildColumn.Length) {
                        $Success = $true;
                        for ($i = 0; $i -lt $ParentColumn.Length; $i++) {
                            if ($DataRelation.ParentColumns[$i].Namespace -ne '' -or $DataRelation.ParentColumns[$i].ColumnName -ne $ParentColumn[$i]) {
                                if ($EmitWarning) {
                                    Write-Warning -Message "({Name='$($DataSet.DataSetName)'}).Relations['$Name'].ParentColumns[$i].ColumnName was not $($ParentColumn[$i])";
                                }
                                $Success = $false;
                                break;
                            }
                        }
                        if ($Success) {
                            for ($i = 0; $i -lt $ChildColumn.Length; $i++) {
                                if ($DataRelation.ChildColumns[$i].Namespace -ne '' -or $DataRelation.ChildColumns[$i].ColumnName -ne $ChildColumn[$i]) {
                                    if ($EmitWarning) {
                                        Write-Warning -Message "({Name='$($DataSet.DataSetName)'}).Relations['$Name'].ChildColumns[$i].ColumnName was not $($ChildColumn[$i])";
                                    }
                                    $Success = $false;
                                    break;
                                }
                            }
                        }
                        if ($Success -and $Nested -ne $DataRelation.Nested) {
                            if ($EmitWarning) {
                                Write-Warning -Message "({Name='$($DataSet.DataSetName)'}).Relations['$Name'].Nested was not $($Nested.IsPresent)";
                            }
                            $Success = $false;
                        }
                        $success | Write-Output;
                    } else {
                        if ($EmitWarning) {
                            Write-Warning -Message "({Name='$($DataSet.DataSetName)'}).Relations['$Name'].ChildColumns.Count was not $($ChildColumn.Length)";
                        }
                        $false | Write-Output;
                    }
                } else {
                    if ($EmitWarning) {
                        Write-Warning -Message "({Name='$($DataSet.DataSetName)'}).Relations['$Name'].ParentColumns.Count was not $($ParentColumn.Length)";
                    }
                   $false | Write-Output;
                }
            } else {
                if ($EmitWarning) {
                    Write-Warning -Message "({Name='$($DataSet.DataSetName)'}).Relations['$Name'].ChildTable was not '$ChildTable'";
                }
            }
        } else {
            if ($EmitWarning) {
                Write-Warning -Message "({Name='$($DataSet.DataSetName)'}).Relations['$Name'].ParentTable was not '$ParentTable'";
            }
        }
    } else {
        if ($EmitWarning) {
            Write-Warning -Message "DataSet {Name='$($DataSet.DataSetName)'} has no relationship named '$Name'";
        }
        $false | Write-Output;
    }
}

Function Test-FileInfoCatalog {
    Param(
        [Parameter(Mandatory = $true, Position = 0)]
        [System.Data.DataSet]$DataSet,

        [switch]$EmitWarning
    )
    
    if ($DataSet.Namespace -eq '') {
        if ($DataSet.DataSetName -eq 'FileInfoCatalog') {
            if ($DataSet.ExtendedProperties.ContainsKey('Path') -and $DataSet.ExtendedProperties['Path'] -ne $null -and $DataSet.ExtendedProperties['Path'].Length -gt 0) {
                if ($DataSet.Tables.Contains('Content', '')) {
                    if ($DataSet.Tables.Contains('Location', '')) {
                        $ContentDataTable = $DataSet.Tables['Content', ''];
                        $Success = $false;
                        if ($EmitWarning) {
                            $Success = Test-ContentDataTable -DataTable $ContentDataTable -EmitWarning;
                        } else {
                            $Success = Test-ContentDataTable -DataTable $ContentDataTable;
                        }
                        if ($Success) {
                            $LocationDataTable = $DataSet.Tables['Location', ''];
                            if ($EmitWarning) {
                                $Success = Test-LocationDataTable -DataTable $LocationDataTable -EmitWarning;
                            } else {
                                $Success = Test-LocationDataTable -DataTable $LocationDataTable;
                            }
                            if ($Success) {
                                if ($EmitWarning) {
                                    $Success = Test-DataSetRelationship -DataSet $DataSet -Name 'FK_ContentLocation' -ParentTable 'Content' -ParentColumn 'ID' -ChildTable 'Location' -ChildColumn 'ContentID' -EmitWarning;
                                } else {
                                    $Success = Test-DataSetRelationship -DataSet $DataSet -Name 'FK_ContentLocation' -ParentTable 'Content' -ParentColumn 'ID' -ChildTable 'Location' -ChildColumn 'ContentID';
                                }
                                if ($Success) {
                                    if ($EmitWarning) {
                                        $Success = Test-DataSetRelationship -DataSet $DataSet -Name 'FK_ParentLocation' -ParentTable 'Location' -ParentColumn 'ID' -ChildTable 'Location' -ChildColumn 'ParentID' -Nested -EmitWarning;
                                    } else {
                                        $Success = Test-DataSetRelationship -DataSet $DataSet -Name 'FK_ParentLocation' -ParentTable 'Location' -ParentColumn 'ID' -ChildTable 'Location' -ChildColumn 'ParentID' -Nested;
                                    }
                                }
                            }
                        }
                        $Success | Write-Output;
                    } else {
                        if ($EmitWarning) {
                            Write-Warning -Message "({Name='FileInfoCatalog'}) does not contain a table named 'Location'";
                        }
                        $false | Write-Output;
                    }
                } else {
                    if ($EmitWarning) {
                        Write-Warning -Message "({Name='FileInfoCatalog'}) does not contain a table named 'Content'";
                    }
                    $false | Write-Output;
                }
            } else {
                if ($EmitWarning) {
                    Write-Warning -Message "({Name='FileInfoCatalog'}).ExtendedProperties['Path'] was null, empty or not a string";
                }
                $false | Write-Output;
            }
        } else {
            if ($EmitWarning) {
                Write-Warning -Message "DataSet.DataSetName was not 'FileInfoCatalog'";
            }
            $false | Write-Output;
        }
    } else {
        if ($EmitWarning) {
            Write-Warning -Message 'DataSet.Namespace was not empty';
        }
        $false | Write-Output;
    }
}

Function Open-FileInfoCatalog {
    [OutputType([System.Data.DataSet])]
    Param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )
    
    [System.Data.DataSet]$FileInfoCatalog = New-Object -TypeName 'System.Data.DataSet' -ArgumentList 'FileInfoCatalog';
    $DataTable = $FileInfoCatalog.Tables.Add('Content');
    $ContentIdDataColumn = $DataTable.Columns.Add('ID', [System.Guid]);
    $ContentIdDataColumn.AllowDBNull = $false;
    $DataTable.Constraints.Add('PK_ContentID', $ContentIdDataColumn, $true) | Out-Null;
    $DataTable.Columns.Add('Length', [long]).AllowDBNull = $false;
    $DataTable.Columns.Add('MD5Checksum', [string]).Caption = 'MD5 Checksum';
    $DataTable.Columns.Add('Calculated', [System.DateTime]).DateTimeMode = [System.Data.DataSetDateTime]::Utc;
    $DataTable = $FileInfoCatalog.Tables.Add('Location');
    $LocationIdDataColumn = $DataTable.Columns.Add('ID', [System.Guid]);
    $LocationIdDataColumn.AllowDBNull = $false
    $DataTable.Constraints.Add('PK_LocationID', $LocationIdDataColumn, $true) | Out-Null;
    $DataColumn = $DataTable.Columns.Add('ParentID', [System.Guid]);
    $DataColumn.Caption = 'Parent ID';
    $FileInfoCatalog.Relations.Add('FK_ParentLocation', $LocationIdDataColumn, $DataColumn).Nested = $true;
    $DataColumn = $DataTable.Columns.Add('ContentID', [System.Guid]);
    $DataColumn.Caption = 'Content ID';
    $FileInfoCatalog.Relations.Add('FK_ContentLocation', $ContentIdDataColumn, $DataColumn) | Out-Null;
    $DataColumn = $DataTable.Columns.Add('BaseName', [string]);
    $DataColumn.AllowDBNull = $false;
    $DataColumn.Caption = 'Base Name';
    $DataTable.Columns.Add('Extension', [string]).AllowDBNull = $false;
    ('Created', 'Modified', 'Accessed') | ForEach-Object {
        $DataColumn = $DataTable.Columns.Add($_, [System.DateTime]);
        $DataColumn.AllowDBNull = $false;
        $DataColumn.DateTimeMode = [System.Data.DataSetDateTime]::Utc;
    }
    $DataTable.Columns.Add('Exists', [bool]).AllowDBNull = $false;
    $DataColumn = $DataTable.Columns.Add('ReadOnly', [bool]);
    $DataColumn.AllowDBNull = $false;
    $DataColumn.Caption = 'Read-Only';
    $DataTable.Columns.Add('LinkType', [string]).Caption = 'Link Type';
    $FileInfoCatalog.EnforceConstraints = $true;
    if ($Path | Test-Path -PathType Leaf) {
        $FileInfoCatalog.ReadXml($Path, [System.Data.XmlReadMode]::IgnoreSchema) | Out-Null;
    }
    $FileInfoCatalog.ExtendedProperties.Add('Path', $Path);
    (,$FileInfoCatalog) | Write-Output;
}

Function Save-FileInfoCatalog {
    Param(
        [Parameter(Mandatory = $true)]
        [ValidateScript({ Test-FileInfoCatalog -DataSet $_ })]
        [System.Data.DataSet]$DataSet,

        [string]$Path
    )

    if (-not $PSBoundParameters.ContainsKey('Path')) { $Path = $DataSet.ExtendedProperties['Path']; }
    $old_ErrorActionPreference = $ErrorActionPreference;
    $ErrorActionPreference = [System.Management.Automation.ActionPreference]::Stop;
    $FailErr = $null;
    $DirName = $Path;
    try {
        while (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
            $DirName = $Path | Split-Path -Parent;
            if ([string]::IsNullOrEmpty($DirName)) {
                $Path = $DirName;
                break;
            }
            if (($Path | Split-Path -Leaf).Length -eq 0) {
                $Path = $DirName;
            } else {
                if (Test-Path -LiteralPath $DirName -PathType Container) { break }
                Write-Error -Message 'Directory does not exist' -Category ObjectNotFound -ErrorId 'DirectoryNotFound' -TargetObject $DirName;
            }
        }
        $DataSet.WriteXml($Path, [System.Data.XmlWriteMode]::IgnoreSchema);
    } catch {
        $FailErr = $_;
    } finally {
        $ErrorActionPreference = $old_ErrorActionPreference;
    }
    if ($FailErr -ne $null) {
        if ($FailErr -is [System.Management.Automation.ErrorRecord]) {
            $TargetObject = $FailErr.TargetObject;
            if ($TargetObject -eq $null -or $TargetObject -isnot [string] -or ($TargetObject -ne $DirName -and $TargetObject -ne $Path)) {
                Write-Error -Exception $FailErr.Exception -Message $FailErr.CategoryInfo.GetMessage() -Category $FailErr.CategoryInfo.Category -ErrorId $FailErr.FullyQualifiedErrorId;
            } else {
                Write-Error -ErrorRecord $FailErr;
            }
        } else {
            $Category = [System.Management.Automation.ErrorCategory]::NotSpecified;
            if ($FailErr -is [System.Management.Automation.IContainsErrorRecord]) { $Category = $FailErr.ErrorRecord.CategoryInfo.Category }
            if ($FailErr -is [System.Exception]) {
                if ([string]::IsNullOrWhiteSpace($FailErr.Message)) {
                    Write-Error -Exception $FailErr -Category $Category -ErrorId "Other.$Category" -TargetObject $Path;
                } else {
                    Write-Error -Exception $FailErr -Message $FailErr.Message -Category $Category -ErrorId "Other.$Category" -TargetObject $Path;
                }
            } else {
                $Message = '';
                if ($FailErr -is [string]) { $Message = $FailErr.Trim() } else { $Message = ($FailErr | Out-String).Trim() }
                if ($Message.Length -gt 0) {
                    Write-Error -Message $Message -Category $Category -ErrorId "Other.$Category" -TargetObject $Path;
                } else {
                    Write-Error -Message "Other $Category" -Category $Category -ErrorId "Other.$Category" -TargetObject $Path;
                }
            }
        }
    }
}

Function Get-FileSystemInfoRow {
    [OutputType([System.Data.DataRow])]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [System.IO.FileSystemInfo[]]$FileSystemInfo,

        [Parameter(Mandatory = $true)]
        [ValidateScript({ Test-FileInfoCatalog -DataSet $_ })]
        [System.Data.DataSet]$DataSet
    )

    Process {
        foreach ($fsi in $FileSystemInfo) {
            $BaseName = [System.IO.Path]::GetFileNameWithoutExtension($fsi.Name).Replace("'", "''");
            $Extension = $fsi.Extension.Replace("'", "''");
            if ($Extension -eq $null) { $Extension = '' } else { if ($Extension.Length -gt 1 -and $Extension.StartsWith('.')) { $Extension = $Extension.Substring(1) } }
            $DataRow = $null;
            if ($fsi -is [System.IO.DirectoryInfo]) {
                if ($fsi.Parent -eq $null) {
                    $DataRow = @($DataSet.Tables['Location'].Select("[BaseName]='$BaseName' AND [Extension]='$Extension' AND [ParentID] IS NULL AND [Length] IS NULL")) | Select-Object -First 1;
                } else {
                    $ParentRow = Get-FileSystemInfoRow -FileSystemInfo $fsi.Parent -DataSet $DataSet;
                    if ($ParentRow -ne $null) {
                        $DataRow = @($DataSet.Tables['Location'].Select("[BaseName]='$BaseName' AND [Extension]='$Extension' AND [ParentID]='$($ParentRow['ID'].ToString())' AND [Length] IS NULL")) | Select-Object -First 1;
                    }
                }
            } else {
                $ParentRow = Get-FileSystemInfoRow -FileSystemInfo $fsi.Directory -DataSet $DataSet;
                if ($ParentRow -ne $null) {
                    $DataRow = @($DataSet.Tables['Location'].Select("[BaseName]='$BaseName' AND [Extension]='$Extension' AND [ParentID]='$($ParentRow['ID'].ToString())' AND [Length] IS NOT NULL")) | Select-Object -First 1;
                }
            }
            if ($DataRow -ne $null) { (,$DataRow) | Write-Output }
        }
    }
}

Function Get-FileRowFromContent {
    [OutputType([System.Data.DataRow[]])]
    Param(
        [Parameter(Mandatory = $true)]
        [System.Guid]$ContentID,

        [Parameter(Mandatory = $true)]
        [ValidateScript({ Test-FileInfoCatalog -DataSet $_ })]
        [System.Data.DataSet]$DataSet
    )

    $Rows = $DataSet.Tables['Location'].Select("[ContentID]='$ContentID'");
    if ($Rows.Length -gt 0) {
        $Rows | Write-Output;
    }
}

Function Import-FileSystemInfo {
    [OutputType([System.Data.DataRow])]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [System.IO.FileSystemInfo[]]$FileSystemInfo,

        [Parameter(Mandatory = $true)]
        [ValidateScript({ Test-FileInfoCatalog -DataSet $_ })]
        [System.Data.DataSet]$DataSet,

        [switch]$AcceptChanges
    )
    Process {
        foreach ($fsi in $FileSystemInfo) {
            $BaseName = [System.IO.Path]::GetFileNameWithoutExtension($fsi.Name);
            $LinkType = $fsi.LinkType;
            if ($LinkType -ne $null -and $LinkType.Trim().Length -eq 0) { $LinkType = $null }
            $Extension = $fsi.Extension;
            if ($Extension -eq $null) { $Extension = '' } else { if ($Extension.Length -gt 1 -and $Extension.StartsWith('.')) { $Extension = $Extension.Substring(1) } }
            [System.Data.DataRow]$ParentRow = $null;
            [System.Data.DataRow]$DataRow = $null;
            if ($fsi -is [System.IO.DirectoryInfo]) {
                if ($fsi.Parent -eq $null) {
                    $DataRow = @($DataSet.Tables['Location'].Select("[BaseName]='$($BaseName.Replace("'", "''"))' AND [Extension]='$($Extension.Replace("'", "''"))' AND [ParentID] IS NULL AND [Length] IS NULL")) | Select-Object -First 1;
                } else {
                    $ParentRow = Import-FileSystemInfoRow -FileSystemInfo $fsi.Parent -DataSet $DataSet;
                    $DataRow = @($DataSet.Tables['Location'].Select("[BaseName]='$($BaseName.Replace("'", "''"))' AND [Extension]='$($Extension.Replace("'", "''"))' AND [ParentID]='$($ParentRow['ID'].ToString())' AND [Length] IS NULL")) | Select-Object -First 1;
                }
            } else {
                $ParentRow = Import-FileSystemInfoRow -FileSystemInfo $fsi.Directory -DataSet $DataSet;
                $DataRow = @($DataSet.Tables['Location'].Select("[BaseName]='$($BaseName.Replace("'", "''"))' AND [Extension]='$($Extension.Replace("'", "''"))' AND [ParentID]='$($ParentRow['ID'].ToString())' AND [Length] IS NOT NULL")) | Select-Object -First 1;
            }
            if ($DataRow -ne $null) {
                $HasChanges = $false;
                $UnlinkContent = $false;
                if ($DataRow['BaseName'] -cne $BaseName) {
                    if (-not $HasChanges) { $DataRow.BeginEdit(); $HasChanges = $true; }
                    $DataRow['BaseName'] = $BaseName;
                    $HasChanges = $true;
                }
                if ($DataRow['Extension'] -cne $Extension) {
                    if (-not $HasChanges) { $DataRow.BeginEdit(); $HasChanges = $true; }
                    $DataRow['Extension'] = $Extension;
                }
                if ($DataRow['Created'] -ne $fsi.CreationTimeUtc) {
                    if (-not $HasChanges) { $DataRow.BeginEdit(); $HasChanges = $true; }
                    $DataRow['Created'] = $fsi.CreationTimeUtc;
                    $UnlinkContent = $true;
                }
                if ($DataRow['Modified'] -ne $fsi.LastWriteTimeUtc) {
                    if (-not $HasChanges) { $DataRow.BeginEdit(); $HasChanges = $true; }
                    $DataRow['Modified'] = $fsi.LastWriteTimeUtc;
                    $UnlinkContent = $true;
                }
                if ($DataRow['Exists'] -ne $fsi.Exists) {
                    if (-not $HasChanges) { $DataRow.BeginEdit(); $HasChanges = $true; }
                    $DataRow['Exists'] = $fsi.Exists;
                    $UnlinkContent = $true;
                }
                if ($DataRow.IsNull('LinkType')) {
                    if ($LinkType -ne $null) {
                        if (-not $HasChanges) { $DataRow.BeginEdit(); $HasChanges = $true; }
                        $DataRow['LinkType'] = $LinkType;
                        $UnlinkContent = $true;
                    }
                } else {
                    if ($LinkType -eq $null) {
                        if (-not $HasChanges) { $DataRow.BeginEdit(); $HasChanges = $true; }
                        $DataRow['LinkType'] = [System.DBNull]::Value;
                        $UnlinkContent = $true;
                    } else {
                        if ($LinkType -cne $DataRow['LinkType']) {
                            if (-not $HasChanges) { $DataRow.BeginEdit(); $HasChanges = $true; }
                            $DataRow['LinkType'] = $LinkType;
                            $UnlinkContent = $true;
                        }
                    }
                }
                if ($fsi -is [System.IO.FileInfo]) {
                    if ($DataRow['ReadOnly'] -ne $fsi.ReadOnly) {
                        if (-not $HasChanges) { $DataRow.BeginEdit(); $HasChanges = $true; }
                        $DataRow['ReadOnly'] = $fsi.ReadOnly;
                    }
                } else {
                    $UnlinkContent = $true;
                    if ($DataRow['ReadOnly']) {
                        if (-not $HasChanges) { $DataRow.BeginEdit(); $HasChanges = $true; }
                        $DataRow['ReadOnly'] = $false;
                    }
                }
            } else {
                $DataRow = $DataSet.Tables['Location'].NewRow();
                $DataRow.BeginEdit();
                $DataRow['ID'] = [System.Guid]::NewGuid();
                if ($ParentRow -ne $null) {
                    $DataRow.SetParentRow($ParentRow, $FileInfoCatalog.Relations['FK_ParentLocation']);
                }
            }
            (,$DataRow) | Write-Output;
        }
    }
}
$FileInfoCatalog = Open-FileInfoCatalog -Path ($PSScriptRoot | Join-Path -ChildPath 'FileInfoCatalog.xml');
Save-FileInfoCatalog -DataSet $FileInfoCatalog;
$D = New-Object -TypeName 'System.IO.DirectoryInfo' -ArgumentList 'C:\'