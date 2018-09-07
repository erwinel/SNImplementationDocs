Function Test-IsLinkType {
    [OutputType([bool])]
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true, Position = 0)]
        [AllowEmptyString()]
        [AllowNull()]
        [string[]]$InputString
    )
    Begin {
        $Regex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList '^(Junction|(Hard|Symbolic)Link)$', ([System.Text.RegularExpressions.RegexOptions]([System.Text.RegularExpressions.RegexOptions]::Compiled -bor [System.Text.RegularExpressions.RegexOptions]::IgnoreCase));
    }

    Process {
        if ($null -eq $InputString) {
            $false | Write-Output;
        } else {
            foreach ($LinkType in $InputString) {
                ($null -ne $LinkType -and $Regex.IsMatch($LinkType)) | Write-Output;
            }
        }
    }
}

Function Test-IsValidMD5ChecksumString {
    [OutputType([bool])]
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true, Position = 0)]
        [AllowEmptyString()]
        [AllowNull()]
        [string[]]$InputString
    )
    Begin {
        $Regex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList '^[a-f\d]{32}$', ([System.Text.RegularExpressions.RegexOptions]([System.Text.RegularExpressions.RegexOptions]::Compiled -bor [System.Text.RegularExpressions.RegexOptions]::IgnoreCase));
    }

    Process {
        if ($null -eq $InputString) {
            $false | Write-Output;
        } else {
            foreach ($MD5Checksum in $InputString) {
                ($null -ne $MD5Checksum -and $Regex.IsMatch($MD5Checksum)) | Write-Output;
            }
        }
    }
}

Function Test-IsFileSystemInfoLike {
    [OutputType([bool])]
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
                    if ($null -eq $Value) {
                        $_.Required;
                    } else {
                        if ($Value -is $_.Type) {
                            if ($null -eq $_.Test) {
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
                        if ($null -ne $Value -and $Value -is [string]) {
                            $true | Write-Output;
                        } else {
                            if ($null -eq $obj.Length) {
                                $Value = $obj.Directory;
                                if ($null -ne $Value -and $Value -is [System.IO.DirectoryInfo]) { $true | Write-Output } else { $false | Write-Output }
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

Function Get-FileInfoCatalogSchemaInfo {
    [CmdletBinding(DefaultParameterSetName = 'Table')]
    Param(
        [Parameter(Mandatory = $true, ParameterSetName = 'DataSetName')]
        # Gets name of dataset as a string.
        [switch]$DataSetName,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'TableNames')]
        [switch]$TableNames,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Table')]
        [Parameter(Mandatory = $true, ParameterSetName = 'PKConstraintName')]
        [Parameter(Mandatory = $true, ParameterSetName = 'PKColName')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Caption')]
        [Parameter(Mandatory = $true, ParameterSetName = 'DataType')]
        [Parameter(Mandatory = $true, ParameterSetName = 'AllowNull')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Source')]
        [Parameter(Mandatory = $true, ParameterSetName = 'RelationshipName')]
        [Parameter(Mandatory = $true, ParameterSetName = 'ParentTable')]
        [Parameter(Mandatory = $true, ParameterSetName = 'ParentColumn')]
        [Parameter(Mandatory = $true, ParameterSetName = 'IsPrimaryKey')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Order')]
        [string]$Table,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'PKConstraintName')]
        [switch]$PKConstraintName,

        [Parameter(Mandatory = $true, ParameterSetName = 'PKColName')]
        [switch]$PKColName,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'RelationshipNames')]
        [switch]$RelationshipNames,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'ChildTable')]
        [Parameter(Mandatory = $true, ParameterSetName = 'ChildColumn')]
        [Parameter(Mandatory = $true, ParameterSetName = 'ParentRelatedTable')]
        [Parameter(Mandatory = $true, ParameterSetName = 'ParentRelatedColumn')]
        [string]$Relationship,
        
        [Parameter(ParameterSetName = 'ChildTable')]
        [switch]$ChildTable,

        [Parameter(ParameterSetName = 'ChildColumn')]
        [switch]$ChildColumn,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Caption')]
        [Parameter(Mandatory = $true, ParameterSetName = 'DataType')]
        [Parameter(Mandatory = $true, ParameterSetName = 'AllowNull')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Source')]
        [Parameter(Mandatory = $true, ParameterSetName = 'RelationshipName')]
        [Parameter(Mandatory = $true, ParameterSetName = 'ParentTable')]
        [Parameter(Mandatory = $true, ParameterSetName = 'ParentColumn')]
        [Parameter(Mandatory = $true, ParameterSetName = 'IsPrimaryKey')]
        [Parameter(Mandatory = $true, ParameterSetName = 'Order')]
        [string]$Column,
        
        [Parameter(ParameterSetName = 'Table')]
        [switch]$Ordered,
        
        [Parameter(ParameterSetName = 'Table')]
        [switch]$All,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Caption')]
        [switch]$Caption,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'DataType')]
        [switch]$DataType,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'AllowNull')]
        [switch]$AllowNull,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'SourceColumn')]
        [switch]$Source,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'RelationshipName')]
        [switch]$Relation,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'ParentTable')]
        [Parameter(Mandatory = $true, ParameterSetName = 'ParentRelatedTable')]
        [switch]$ParentTable,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'ParentColumn')]
        [Parameter(Mandatory = $true, ParameterSetName = 'ParentRelatedColumn')]
        [switch]$ParentColumn,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'ParentObjectName')]
        [switch]$ParentObjectName,

        [Parameter(Mandatory = $true, ParameterSetName = 'ParentRowName')]
        [switch]$ParentRowName,

        [Parameter(Mandatory = $true, ParameterSetName = 'IsPrimaryKey')]
        [switch]$IsPrimaryKey,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Order')]
        [switch]$Order
    )
    
    $ConsoleWidth = $Host.UI.RawUI.BufferSize.Width;
    if ($ConsoleWidth -lt 80) { $ConsoleWidth = 80 }
    Write-Debug -Message '';
    $CurrentLine = "Invoking Get-FileInfoCatalogSchemaInfo";
    $PSBoundParameters.Keys | ForEach-Object {
        if ($PSBoundParameters[$_] -is [string]) {
            "-$_ '$($PSBoundParameters[$_])'";
        } else {
            if ($PSBoundParameters[$_] -is [System.Type]) {
                "-$_ $([System.Management.Automation.LanguagePrimitives]::ConvertTypeNameToPSTypeName($PSBoundParameters[$_]))";
            } else {
                if ($PSBoundParameters[$_] -is [System.Management.Automation.SwitchParameter]) {
                    "-$_";
                } else {
                    "-$_ $($PSBoundParameters[$_])";
                }
            }
        }
    } | ForEach-Object {
        if ($CurrentLine.Length -eq 0) {
            $CurrentLine = "  $_";
        } else {
            if (($CurrentLine.Length + $_.Length + 2) -gt $ConsoleWidth) {
                Write-Debug -Message "$CurrentLine ``" | Write-Output;
                $CurrentLine = "    $_";
            } else {
                $CurrentLine = "$CurrentLine $_";
            }
        }
    }
    Write-Debug -Message $CurrentLine;

    if ($Script:__Get_FileInfoCatalogSchemaInfo -eq $null) {
        Write-Debug -Message 'Creating FileInfoCatalogSchemaInfo';
        $Schema = @{
            Location = @(
                @{ Name = 'ParentID'; Caption = 'Parent ID'; DataType = [System.Guid]; AllowNull = $true; ParentTable = 'Content' },
                @{ Name = 'ContentID'; Caption = 'Content ID'; DataType = [System.Guid]; AllowNull = $true; ParentTable = 'Location' },
                @{ Name = 'BaseName'; Caption = 'Base Name'; DataType = [string]; AllowNull = $false },
                @{ Name = 'Extension'; Caption = 'Extension'; DataType = [string]; AllowNull = $false },
                @{ Name = 'Created'; Caption = 'Created'; DataType = [System.DateTime]; AllowNull = $false },
                @{ Name = 'Modified'; Caption = 'Modified'; DataType = [System.DateTime]; AllowNull = $false },
                @{ Name = 'Accessed'; Caption = 'Accessed'; DataType = [System.DateTime]; AllowNull = $false },
                @{ Name = 'Exists'; Caption = 'Exists'; DataType = [bool]; AllowNull = $false },
                @{ Name = 'ReadOnly'; Caption = 'Read-Only'; DataType = [bool]; AllowNull = $false },
                @{ Name = 'LinkType'; Caption = 'Link Type'; DataType = [string]; AllowNull = $true }
            );
            Content = @(
                @{ Name = 'Length'; Caption = 'Length'; DataType = [long]; AllowNull = $false },
                @{ Name = 'MD5Checksum'; Caption = 'MD5 Checksum'; DataType = [string]; AllowNull = $true },
                @{ Name = 'CalculatedOn'; Caption = 'Calculated On'; DataType = [System.DateTime]; AllowNull = $true }
            );
        };
        $FkConstraints = @{ }
        foreach ($TableName in @($Schema.Keys)) {
            Write-Debug -Message "Initializing Table $TableName";
            $ColumnDefinitions = @{
                ID = @{ Name = 'ID'; Caption = 'ID'; DataType = [System.Guid]; AllowNull = $false; IsPrimaryKey = $true; Order = 0 };
            };
            for ($Index = 0; $Index -lt $Schema[$TableName].Count; $Index++) {
                $ColumnName = $Schema[$TableName][$Index]['Name'];
                Write-Debug -Message "Schema $TableName[$Index]['Name'] is '$ColumnName'";
                Write-Debug -Message "Setting Order = $($Index + 1); IsPrimaryKey = False";
                $Schema[$TableName][$Index]['Order'] = $Index + 1;
                $Schema[$TableName][$Index]['IsPrimaryKey'] = $false;
                $ColumnDefinitions[$ColumnName] = $Schema[$TableName][$Index];
            }
            foreach ($ColumnName in @($ColumnDefinitions.Keys)) {
                $Properties = $ColumnDefinitions[$ColumnName];
                if ($Properties.ContainsKey('ParentTable')) {
                    Write-Debug -Message "`tInitializing Column Parent '$ColumnName'";
                    if (-not $Schema.ContainsKey($Properties.ParentTable)) {
                        throw "Undefined parent table '$($Properties.ParentTable)' referenced at $TableName.$ColumnName";
                    }
                    if ($Properties.ParentColumn -eq $null) { $Properties['ParentColumn'] = 'ID' }
                    $ParentName = $Properties.ParentTable;
                    $IsNested = $ParentName -eq $TableName;
                    if ($IsNested) {
                        $ParentName = $ColumnName;
                        if ($ParentName.Length -gt 2 -and $ParentName.EndsWith('ID')) { $ParentName = $ParentName.Substring(0, $ParentName.Length - 2) }
                    }
                    if ($ColumnDefinitions.ContainsKey($ParentName)) {
                        $i = 1;
                        while ($ColumnDefinitions.ContainsKey("$ParentName`_$i")) { $i++ }
                        $ParentName = "$ParentName`_$i";
                    }
                    $Properties['ParentObjectName'] = $ParentName;
                    $RowParentName = "$($ParentName)Row";
                    if ($ColumnDefinitions.ContainsKey($RowParentName)) {
                        $i = 1;
                        while ($ColumnDefinitions.ContainsKey("$($ParentName)_$($i)Row")) { $i++ }
                        $RowParentName = "$($ParentName)_$($i)Row";
                    }
                    $Properties['ParentRowName'] = $RowParentName;
                    $FKey = "FK_$($ParentName)$TableName";
                    if ($FkConstraints.ContainsKey($FKey)) {
                        $i = 1;
                        while ($FkConstraints.ContainsKey("$FKey`_$i")) { $i++ }
                        $FKey = "$FKey`_$i";
                    }
                    $Properties['RelationshipName'] = $FKey;
                    $cp = @{
                        Name = $RowParentName;
                        Caption = $Properties['Caption'];
                        DataType = [System.Management.Automation.PSObject];
                        AllowNull = $true;
                        Order = $ColumnDefinitions.Count;
                        IsPrimaryKey = $false;
                        SourceColumn = $ColumnName;
                        RelationshipName = $FKey;
                        ParentTable = $Properties.ParentTable;
                        ParentColumn = $Properties.ParentColumn;
                    };
                    Write-Debug -Message "  Adding column '$RowParentName'";
                    $CurrentLine = '';
                    $cp.Keys | ForEach-Object {
                        if ($cp[$_] -is [string]) {
                            "$_ = '$($cp[$_])'";
                        } else {
                            if ($cp[$_] -is [System.Type]) {
                                "$_ = $([System.Management.Automation.LanguagePrimitives]::ConvertTypeNameToPSTypeName($cp[$_]))";
                            } else {
                                "$_ = $($cp[$_])";
                            }
                        }
                    } | ForEach-Object {
                        if ($CurrentLine.Length -eq 0) {
                            $CurrentLine = "    $_";
                        } else {
                            if (($CurrentLine.Length + $_.Length + 2) -gt $ConsoleWidth) {
                                Write-Debug -Message "$CurrentLine;" | Write-Output;
                                $CurrentLine = "      $_";
                            } else {
                                $CurrentLine = "$CurrentLine; $_";
                            }
                        }
                    }
                    Write-Debug -Message $CurrentLine;
                    $ColumnDefinitions[$RowParentName] = New-Object -TypeName 'System.Management.Automation.PSObject' -Property $cp;
                    $cp = @{
                        Name = $ParentName;
                        Caption = $Properties['Caption'];
                        DataType = [System.Management.Automation.PSObject];
                        AllowNull = $true;
                        Order = $ColumnDefinitions.Count;
                        IsPrimaryKey = $false;
                        SourceColumn = $ColumnName;
                        RelationshipName = $FKey;
                        ParentTable = $Properties.ParentTable;
                        ParentColumn = $Properties.ParentColumn;
                    };
                    Write-Debug -Message "  Adding column '$ParentName'";
                    $CurrentLine = '';
                    $cp.Keys | ForEach-Object {
                        if ($cp[$_] -is [string]) {
                            "$_ = '$($cp[$_])'";
                        } else {
                            if ($cp[$_] -is [System.Type]) {
                                "$_ = $([System.Management.Automation.LanguagePrimitives]::ConvertTypeNameToPSTypeName($cp[$_]))";
                            } else {
                                "$_ = $($cp[$_])";
                            }
                        }
                    } | ForEach-Object {
                        if ($CurrentLine.Length -eq 0) {
                            $CurrentLine = "    $_";
                        } else {
                            if (($CurrentLine.Length + $_.Length + 2) -gt $ConsoleWidth) {
                                Write-Debug -Message "$CurrentLine;" | Write-Output;
                                $CurrentLine = "      $_";
                            } else {
                                $CurrentLine = "$CurrentLine; $_";
                            }
                        }
                    }
                    Write-Debug -Message $CurrentLine;
                    $ColumnDefinitions[$ParentName] = New-Object -TypeName 'System.Management.Automation.PSObject' -Property $cp;
                    $cp = @{
                        Name = $FKey;
                        ChildTable = $TableName;
                        ChildColumn = $ColumnName;
                        ParentTable = $Properties.ParentTable;
                        ParentColumn = $Properties.ParentColumn;
                        IsNested = $IsNested;
                    };
                    Write-Debug -Message "  Adding relationship '$ParentName'";
                    $CurrentLine = '';
                    $cp.Keys | ForEach-Object {
                        if ($cp[$_] -is [string]) {
                            "$_ = '$($cp[$_])'";
                        } else {
                            if ($cp[$_] -is [System.Type]) {
                                "$_ = $([System.Management.Automation.LanguagePrimitives]::ConvertTypeNameToPSTypeName($cp[$_]))";
                            } else {
                                "$_ = $($cp[$_])";
                            }
                        }
                    } | ForEach-Object {
                        if ($CurrentLine.Length -eq 0) {
                            $CurrentLine = "    $_";
                        } else {
                            if (($CurrentLine.Length + $_.Length + 2) -gt $ConsoleWidth) {
                                Write-Debug -Message "$CurrentLine;" | Write-Output;
                                $CurrentLine = "      $_";
                            } else {
                                $CurrentLine = "$CurrentLine; $_";
                            }
                        }
                    }
                    Write-Debug -Message $CurrentLine;
                    $FkConstraints[$FKey] = New-Object -TypeName 'System.Management.Automation.PSObject' -Property $cp;
                }
                Write-Debug -Message "  Initialized Column '$ColumnName'";
                $CurrentLine = '';
                $Properties.Keys | ForEach-Object {
                    if ($Properties[$_] -is [string]) {
                        "$_ = '$($Properties[$_])'";
                    } else {
                        if ($Properties[$_] -is [System.Type]) {
                            "$_ = $([System.Management.Automation.LanguagePrimitives]::ConvertTypeNameToPSTypeName($Properties[$_]))";
                        } else {
                            "$_ = $($Properties[$_])";
                        }
                    }
                } | ForEach-Object {
                    if ($CurrentLine.Length -eq 0) {
                        $CurrentLine = "  $_";
                    } else {
                        if (($CurrentLine.Length + $_.Length + 2) -gt $ConsoleWidth) {
                            Write-Debug -Message "$CurrentLine;" | Write-Output;
                            $CurrentLine = "    $_";
                        } else {
                            $CurrentLine = "$CurrentLine; $_";
                        }
                    }
                }
                Write-Debug -Message $CurrentLine;
                $ColumnDefinitions.Remove($ColumnName);
                $ColumnDefinitions[$ColumnName] = New-Object -TypeName 'System.Management.Automation.PSObject' -Property $Properties;
            }
            $Schema.Remove($TableName);
            $Schema[$TableName] = New-Object -TypeName 'System.Management.Automation.PSObject' -Property @{
                Name = $TableName;
                Column = New-Object -TypeName 'System.Management.Automation.PSObject' -Property $ColumnDefinitions;
                PK_Constraint = New-Object -TypeName 'System.Management.Automation.PSObject' -Property @{
                    Name = "PK_$TableName";
                    Columns = New-Object -TypeName 'System.Collections.ObjectModel.ReadOnlyCollection[System.String]' -ArgumentList (,([string[]]@(@($ColumnDefinitions.Keys) | Where-Object { $ColumnDefinitions[$_].IsPrimaryKey })));
                };
            }
        }
        $Script:__Get_FileInfoCatalogSchemaInfo = New-Object -TypeName 'System.Management.Automation.PSObject' -Property @{
            DataSetName = 'FileInfoCatalog';
            Relationships = New-Object -TypeName 'System.Management.Automation.PSObject' -Property $FkConstraints;
            Table = New-Object -TypeName 'System.Management.Automation.PSObject' -Property $Schema;
        };
    }
    switch ($PSCmdlet.ParameterSetName) {
        'DataSetName' {
            Write-Debug -Message "  Returning DataSetName '$($Script:__Get_FileInfoCatalogSchemaInfo.DataSetName)'";
            $Script:__Get_FileInfoCatalogSchemaInfo.DataSetName | Write-Output;
            break;
        }
        'TableNames' {
            $v = @(($Script:__Get_FileInfoCatalogSchemaInfo.Table | Get-Member -MemberType NoteProperty) | ForEach-Object { $_.Name }) | Write-Output;
            Write-Debug -Message "  Returning @('$($v -join "', '")')";
            $v | Write-Output;
            break;
        }
        'PKConstraintName' {
            $TableSchema = $Script:__Get_FileInfoCatalogSchemaInfo.Table.($Table);
            if ($null -ne $TableSchema) {
                Write-Debug -Message "  Returning '$($TableSchema.PK_Constraint.Name)'";
                $TableSchema.PK_Constraint.Name | Write-Output;
            } else {
                Write-Debug -Message '  Returning nothing';
            }
            break;
        }
        'PKColName' {
            $TableSchema = $Script:__Get_FileInfoCatalogSchemaInfo.Table.($Table);
            if ($null -ne $TableSchema) {
                Write-Debug -Message "  Returning '$($TableSchema.PK_Constraint.Columns -join "', '")'";
                $TableSchema.PK_Constraint.Columns | Write-Output;
            } else {
                Write-Debug -Message '  Returning nothing';
            }
            break;
        }
        'RelationshipNames' {
            $v = @(($Script:__Get_FileInfoCatalogSchemaInfo.Relationships | Get-Member -MemberType NoteProperty) | ForEach-Object { $_.Name });
            Write-Debug -Message "  Returning @('$($v -join "', '")')";
            $v | Write-Output;
            break;
        }
        'ParentRelatedTable' {
            $RelationshipSchema = $Script:__Get_FileInfoCatalogSchemaInfo.Relationships.($Relationship);
            if ($null -ne $RelationshipSchema) {
                Write-Debug -Message "  Returning '$($RelationshipSchema.ParentTable)'";
                $RelationshipSchema.ParentTable | Write-Output;
            } else {
                Write-Debug -Message '  Returning nothing';
            }
            break;
        }
        'ParentRelatedColumn' {
            $RelationshipSchema = $Script:__Get_FileInfoCatalogSchemaInfo.Relationships.($Relationship);
            if ($null -ne $RelationshipSchema) {
                Write-Debug -Message "  Returning '$($RelationshipSchema.ParentColumn)'";
                $RelationshipSchema.ParentColumn | Write-Output;
            } else {
                Write-Debug -Message '  Returning nothing';
            }
            break;
        }
        'ChildTable' {
            $RelationshipSchema = $Script:__Get_FileInfoCatalogSchemaInfo.Relationships.($Relationship);
            if ($null -ne $RelationshipSchema) {
                Write-Debug -Message "  Returning '$($RelationshipSchema.ChildTable)'";
                $RelationshipSchema.ChildTable | Write-Output;
            } else {
                Write-Debug -Message '  Returning nothing';
            }
            break;
        }
        'ChildColumn' {
            $RelationshipSchema = $Script:__Get_FileInfoCatalogSchemaInfo.Relationships.($Relationship);
            if ($null -ne $RelationshipSchema) {
                Write-Debug -Message "  Returning '$($RelationshipSchema.ChildColumn)'";
                $RelationshipSchema.ChildColumn | Write-Output;
            } else {
                Write-Debug -Message '  Returning nothing';
            }
            break;
        }
        'IsNested' {
            $RelationshipSchema = $Script:__Get_FileInfoCatalogSchemaInfo.Relationships.($Relationship);
            if ($null -ne $RelationshipSchema) {
                Write-Debug -Message "  Returning $($RelationshipSchema.IsNested)";
                $RelationshipSchema.IsNested | Write-Output;
            } else {
                Write-Debug -Message '  Returning nothing';
            }
            break;
        }
        'Table' {
            $TableSchema = $Script:__Get_FileInfoCatalogSchemaInfo.Table.($Table);
            if ($null -ne $TableSchema) {
                $v = @();
                if ($All) {
                    if ($Ordered) {
                        $v = @((($TableSchema.Column | Get-Member -MemberType NoteProperty) | ForEach-Object { $TableSchema.Column.($_.Name) } | Sort-Object -Property 'Order') | ForEach-Object { $_.Name });
                    } else {
                        $v = @(($TableSchema.Column | Get-Member -MemberType NoteProperty) | ForEach-Object { $TableSchema.Column.($_.Name) });
                    }
                } else {
                    if ($Ordered) {
                        $v = @((($TableSchema.Column | Get-Member -MemberType NoteProperty) | ForEach-Object { $TableSchema.Column.($_.Name) } | Where-Object { $null -eq $_.SourceColumn } | Sort-Object -Property 'Order') | ForEach-Object { $_.Name });
                    } else {
                        $v = @(($TableSchema.Column | Get-Member -MemberType NoteProperty) | ForEach-Object { $TableSchema.Column.($_.Name) } | Where-Object { $null -eq $_.SourceColumn } | ForEach-Object { $_.Name });
                    }
                }
                Write-Debug -Message "  Returning @('$($v -join "', '")')";
                $v | Write-Output;
            } else {
                Write-Debug -Message '  Returning nothing';
            }
            break;
        }
        default {
            $TableSchema = $Script:__Get_FileInfoCatalogSchemaInfo.Table.($Table);
            if ($null -ne $TableSchema) {
                $ColumSchema = $TableSchema.Column.($Column);
                if ($null -ne $ColumSchema) {
                    $Value = $ColumSchema.$($_);
                    if ($null -eq $Value) {
                        Write-Debug -Message '  Returning null';
                    } else {
                        if ($Value -is [string]) {
                            Write-Debug -Message "  Returning '$Value'";
                        } else {
                            if ($Value -is [System.Type]) {
                                Write-Debug -Message "  Returning $([System.Management.Automation.LanguagePrimitives]::ConvertTypeNameToPSTypeName($Value))";
                            } else {
                                Write-Debug -Message "  Returning $Value";
                            }
                        }
                        $Value | Write-Output;
                    }
                } else {
                    Write-Debug -Message '  Returning nothing (unknown column)';
                }
            } else {
                Write-Debug -Message '  Returning nothing (unknown table)';
            }
            break;
        }
    }
}

Function Test-TableSchema {
    Param(
        [Parameter(Mandatory = $true)]
        [Alias('Name')]
        [string]$TableName,
        
        [Parameter(Mandatory = $true, Position = 0)]
        [System.Data.DataTable]$DataTable,

        [switch]$EmitWarning
    )
    
    Write-Debug -Message "Invoking Test-TableSchema -TableName '$TableName' -DataTable {$DataTable}";

    if ($DataTable.TableName -ine $TableName -or $null -eq $DataTable.DataSet -or $DataTable.DataSet.DataSetName -ine (Get-FileInfoCatalogSchemaInfo -DataSetName)) {
        if ($EmitWarning) {
            if ($DataTable.TableName -ine $TableName) {
                Write-Warning -Message "Expected table name: '$TableName'; Actual: '$($DataTable.TableName)'";
            } else {
                if ($null -eq $DataTable.DataSet) {
                    Write-Warning -Message 'Table does not belong to a data set';
                } else {
                    Write-Warning -Message "Expected parent data set name: '$(Get-FileInfoCatalogSchemaInfo -DataSetName)'; Actual: '$($DataTable.DataSet.DataSetName)'";
                }
            }
        } else {
            Write-Debug -Message 'Failing due to invalid table name or DataSet';
        }
        $false | Write-Output;
    } else {
        $OrderedNames = @(Get-FileInfoCatalogSchemaInfo -Table $TableName -Ordered);
        if ($OrderedNames.Count -eq 0) {
            if ($EmitWarning) {
                Write-Warning -Message 'Unknown table name';
            } else {
                Write-Debug -Message 'Failing due to unknown table name';
            }
            $false | Write-Output;
        } else {
            $Success = $true;
            foreach ($ColName in $OrderedNames) {
                Write-Debug -Message "  Validating column '$ColName'";
                if ($DataTable.Columns.Contains($ColName)) {
                    $DataColumn = $DataTable.Columns[$ColName];
                    $Caption = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColName -Caption;
                    if ($null -eq $DataColumn.Caption -or $DataColumn.Caption -ine $Expected) {
                        if ($EmitWarning) {
                            Write-Warning -Message "Caption for column '$ColName' was not equal to '$Caption'";
                        } else {
                            Write-Debug -Message "Failing because Caption for column '$ColName' was not equal to '$Caption'";
                        }
                        $Success = $false;
                        break;
                    }
                    $DataType = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColName -DataType;
                    if ($null -eq $DataColumn.DataType -or $DataColumn.DataType -ne $DataType) {
                        if ($EmitWarning) {
                            Write-Warning -Message "DataType for column '$ColName' was not equal to '$DataType'";
                        } else {
                            Write-Debug -Message "Failing because DataType for column '$ColName' was not equal to '$DataType'";
                        }
                        $Success = $false;
                        break;
                    }
                    $AllowNull = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColName -AllowNull;
                    if ($DataColumn.AllowNull -ne $AllowNull) {
                        if ($EmitWarning) {
                            Write-Warning -Message "AllowNull for column '$ColName' was not $AllowNull";
                        } else {
                            Write-Debug -Message "Failing because AllowNull for column '$ColName' was not $AllowNull";
                        }
                        $Success = $false;
                        break;
                    }
                    $Order = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColName -Order;
                    if ($DataColumn.Ordinal -ne $Order) {
                        if ($EmitWarning) {
                            Write-Warning -Message "Failing because Ordinal for column '$ColName' was not $Order";
                        } else {
                            Write-Debug -Message "Ordinal for column '$ColName' was not $Order";
                        }
                        $Success = $false;
                        break;
                    }
                } else {
                    if ($EmitWarning) {
                        Write-Warning -Message "Column named '$ColName' not found";
                    } else {
                        Write-Debug -Message "Failing because column named '$ColName' not found";
                    }
                    $Success = $false;
                    break;
                }
            }
            if ($Success) {
                $PKConstraintName = Get-FileInfoCatalogSchemaInfo -Table $TableName -PKConstraintName;
                Write-Debug -Message "  Validating constraint '$PKConstraintName'";
                if ($DataTable.Constraints.Contains($PKConstraintName)) {
                    $PKCols = @(Get-FileInfoCatalogSchemaInfo -Table $TableName -PKColName);
                    $NotFound = @($PKCols | Where-Object {
                        $cn = $_;
                        Write-Debug -Message "  Validating primary key column ''";
                        @($DataTable.PrimaryKey | Where-Object { $_.ColumnName -ceq $cn }).Count -eq 0;
                    });
                    $Success = $NotFound.Count -eq 0;
                    if (-not $Success) {
                        if ($EmitWarning) {
                            Write-Warning -Message "Primary key column '$($NotFound -join "', '")' not found";
                        } else {
                            Write-Debug -Message "Failing because primary key column '$($NotFound -join "', '")' not found";
                        }
                        $Success = $false;
                    }
                } else {
                    if ($EmitWarning) {
                        Write-Debug -Message "Failing because primary key '$PKConstraintName' not found";
                    } else {
                        Write-Debug -Message "Primary key '$PKConstraintName' not found";
                    }
                    $Success = $false;
                }
            }
            $Success | Write-Output;
        }
    }
}

Function Test-ObjectSchema {
    [OutputType([bool])]
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [ValidateScript({
            if ($null -ne $_.PSBase) { return $false }
            $t = $_.PSBase.GetType();
            return ([System.Management.Automation.PSObject].IsAssignableFrom($t) -or [System.Management.Automation.PSCustomObject].IsAssignableFrom($t));
        })]
        [AllowNull()]
        [PSObject[]]$InputObject,
        
        [Parameter(Mandatory = $true)]
        [Alias('Name')]
        [string]$TableName,
        
        [switch]$EmitWarning,

        [switch]$IgnoreParent
    )
    
    Begin {
        $PropertyNames = @(Get-FileInfoCatalogSchemaInfo -Table $TableName);
    }

    Process {
        foreach ($PSObj in $InputObject) {
            if ($PropertyNames.Count -eq 0) {
                if ($EmitWarning) {
                    Write-Warning -Message 'Unknown table name';
                } else {
                    Write-Debug -Message 'Failing due to unknown table name';
                }
                $false | Write-Output;
                continue;
            }
            $Success = $true;
            foreach ($ColName in $PropertyNames) {
                $Value = $PSObj.$($ColName);
                if ($null -eq $Value) {
                    if (-not (Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColName -AllowNull)) {
                        $ParentRowName = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColName -ParentRowName;
                        if ($ParentRowName -eq $null) {
                            if ($EmitWarning) {
                                Write-Warning -Message "Property '$ColName' was null";
                            } else {
                                Write-Debug -Message "Failing due to null '$ColName' property value";
                            }
                            $Success = $false;
                            break;
                        }
                        if ($null -eq $PSObj.$($ParentRowName)) {
                            $ParentObjectName = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColName -ParentObjectName;
                            if ($null -eq $PSObj.$($ParentObjectName)) {
                                if ($EmitWarning) {
                                    Write-Warning -Message "Property '$ColName', '$ParentRowName' and '$ParentObjectName' was null";
                                } else {
                                    Write-Debug -Message "Failing due to null '$ColName', '$ParentRowName' and '$ParentObjectName' property values";
                                }
                                $Success = $false;
                                break;
                            }
                        }
                    }
                } else {
                    $DataType = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColName -DataType;
                    if ($Value -isnot $DataType) {
                        if ($EmitWarning) {
                            Write-Warning -Message "Property '$ColName' was not a $DataType value";
                        } else {
                            Write-Debug -Message "Failing because property '$ColName' was not a $DataType value";
                        }
                        $Success = $false;
                        break;
                    }
                }
                if (-not $IgnoreParent) {
                    $ParentName = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColName -ParentObjectName;
                    if ($ParentName -ne $null) {
                        $Value = $PSObj.$($ParentName);
                        if ($null -ne $Value -and -not [Object]::ReferenceEquals($Value, $PSObj)) {
                            if ($EmitWarning) {
                                $Success = Test-ObjectSchema -InputObject $Value -TableName (Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColName -ParentTable) -IgnoreParent -EmitWarning;
                            } else {
                                $Success = Test-ObjectSchema -InputObject $Value -TableName (Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColName -ParentTable) -IgnoreParent;
                            }
                            if (-not $Success) {
                                if ($EmitWarning) {
                                    Write-Warning -Message "Property '$ParentName' was not valid";
                                } else {
                                    Write-Debug -Message "Failing because property '$ParentName' was not valid";
                                }
                                break;
                            }
                        }
                        $ParentName = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColName -ParentRowName;
                        $Value = $PSObj.$($ParentName);
                        if ($null -ne $Value) {
                            if ($Value -isnot [System.Data.DataRow]) {
                                if ($EmitWarning) {
                                    Write-Warning -Message "Property '$ParentName' is not a DataRow object";
                                } else {
                                    Write-Debug -Message "Failing because property '$ParentName' is not a DataRow object";
                                }
                                $Success = $false;
                                break;
                            }
                            if ($null -eq $Value.Table) {
                                if ($EmitWarning) {
                                    Write-Warning -Message "Property '$ParentName' does not belong to a table";
                                } else {
                                    Write-Debug -Message "Failing because property '$ParentName' does not belong to a table";
                                }
                                $Success = $false;
                                break;
                            }
                            if ($EmitWarning) {
                                $Success = Test-TableSchema -TableName (Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColName -ParentTable) -DataTable $Value.Table -EmitWarning;
                            } else {
                                $Success = Test-TableSchema -TableName (Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColName -ParentTable) -DataTable $Value.Table;
                            }
                            if (-not $Success) {
                                if ($EmitWarning) {
                                    Write-Warning -Message "Property '$ParentName' was not valid";
                                } else {
                                    Write-Debug -Message "Failing because property '$ParentName' was not valid";
                                }
                                break;
                            }
                        }
                    }
                }
            }
            $Success | Write-Output;
        }
    }
}

Function Test-ContentDataTable {
    [OutputType([bool])]
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true, Position = 0)]
        [System.Data.DataTable]$DataTable,

        [switch]$EmitWarning
    )
    if ($EmitWarning) {
        Test-TableSchema -DataTable $DataTable -TableName 'Content' -EmitWarning;
    } else {
        Test-TableSchema -DataTable $DataTable -TableName 'Content';
    }
}

Function Test-ContentObject {
    [OutputType([bool])]
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [Alias('Content')]
        [ValidateScript({
            if ($null -ne $_.PSBase) { return $false }
            $t = $_.PSBase.GetType();
            return ([System.Management.Automation.PSObject].IsAssignableFrom($t) -or [System.Management.Automation.PSCustomObject].IsAssignableFrom($t));
        })]
        [AllowNull()]
        [PSObject[]]$InputObject,

        [switch]$EmitWarning
    )
    Process {
        if ($null -eq $InputObject) {
            if ($EmitWarning) {
                Write-Warning -Message 'Input object was null';
            } else {
                Write-Debug -Message 'Failing because input object was null';
            }
            $false | Write-Output;
        } else {
            if ($EmitWarning) {
                $InputObject | Test-ObjectSchema -TableName 'Content' -IgnoreParent -EmitWarning;
            } else {
                $InputObject | Test-ObjectSchema -TableName 'Content' -IgnoreParent;
            }
        }
    }
}

Function Test-LocationDataTable {
    [OutputType([bool])]
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true, Position = 0)]
        [System.Data.DataTable]$DataTable,

        [switch]$EmitWarning
    )
    if ($EmitWarning) {
        Test-TableSchema -DataTable $DataTable -TableName 'Location' -EmitWarning;
    } else {
        Test-TableSchema -DataTable $DataTable -TableName 'Location';
    }
}

Function Test-LocationObject {
    [OutputType([bool])]
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [Alias('Location', 'File', 'Directory', 'FileSystemInfo', 'FileInfo', 'DirectoryInfo', 'FileSystemInfoEx', 'FileInfoEx', 'DirectoryInfoEx')]
        [ValidateScript({
            if ($null -ne $_.PSBase) { return $false }
            $t = $_.PSBase.GetType();
            return ([System.Management.Automation.PSObject].IsAssignableFrom($t) -or [System.Management.Automation.PSCustomObject].IsAssignableFrom($t));
        })]
        [AllowNull()]
        [PSObject[]]$InputObject,

        [switch]$EmitWarning,

        [switch]$DoNotCheckParent
    )
    Process {
        if ($null -eq $InputObject) {
            if ($EmitWarning) {
                Write-Warning -Message 'Input object was null';
            } else {
                Write-Debug -Message 'Failing because input object was null';
            }
            $false | Write-Output;
        } else {
            if ($EmitWarning) {
                $InputObject | Test-ObjectSchema -TableName 'Location' -IgnoreParent -EmitWarning;
            } else {
                $InputObject | Test-ObjectSchema -TableName 'Location' -IgnoreParent;
            }
        }
    }
}

Function Test-DataSetRelationship {
    [OutputType([bool])]
    [CmdletBinding()]
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
    
    Write-Debug -Message "Invoking Test-FileInfoCatalog -DataSet {$DataSet} -Name '$Name' -ParentTable '$ParentTable' -ParentColumn @('$($ParentColumn -join "', '")') -ChildTable '$ChildTable' -ChildColumn @('$($ChildColumn -join "', '")')";

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
    [OutputType([bool])]
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true, Position = 0)]
        [System.Data.DataSet]$DataSet,

        [switch]$EmitWarning
    )
    
    Write-Debug -Message "Invoking Test-FileInfoCatalog -DataSet {$DataSet}";

    if ($DataSet.Namespace -eq '' -and $DataSet.DataSetName -ceq (Get-FileInfoCatalogSchemaInfo -DataSetName)) {
        if ($DataSet.ExtendedProperties.ContainsKey('Path') -and $null -ne $DataSet.ExtendedProperties['Path'] -and $DataSet.ExtendedProperties['Path'].Length -gt 0) {
            $Success = $true;
            foreach ($TableName in @(Get-FileInfoCatalogSchemaInfo -TableNames)) {
                if (-not $DataSet.Tables.Contains($TableName)) {
                    if ($EmitWarning) {
                        Write-Warning -Message "Data set does not contain table named '$TableName'";
                    } else {
                        Write-Debug  -Message "Failing because data set does not contain table named '$TableName'";
                    }
                    $Success = $false;
                    break;
                }
                if ($EmitWarning) {
                    $Success = Test-TableSchema -TableName $TableName -DataTable $DataTable -EmitWarning;
                } else {
                    $Success = Test-TableSchema -TableName $TableName -DataTable $DataTable;
                }
                if (-not $Success) { break; }

            }
            foreach ($RelationshipName in @(Get-FileInfoCatalogSchemaInfo -RelationshipNames)) {
                if (-not $DataSet.Relations.Contains($RelationshipName)) {
                    if ($EmitWarning) {
                        Write-Warning -Message "Data set does not contain relationship named '$RelationshipName'";
                    } else {
                        Write-Debug  -Message "Failing because data set does not contain relationship named '$RelationshipName'";
                    }
                    $Success = $false;
                    break;
                }
                $Relationship = $DataSet.Relations[$RelationshipName];
                if ($EmitWarning) {
                    if (Get-FileInfoCatalogSchemaInfo -Relationship -IsNested) {
                        $Success = Test-DataSetRelationship -DataSet $DataSet -Name $RelationshipName -ParentTable (Get-FileInfoCatalogSchemaInfo -Relationship -ParentTable) -ParentColumn (Get-FileInfoCatalogSchemaInfo -Relationship -ParentColumn) -ChildTable (Get-FileInfoCatalogSchemaInfo -Relationship -ChildTable) -ChildColumn (Get-FileInfoCatalogSchemaInfo -Relationship -ChildColumn) -EmitWarning -Nested;
                    } else {
                        $Success = Test-DataSetRelationship -DataSet $DataSet -Name $RelationshipName -ParentTable (Get-FileInfoCatalogSchemaInfo -Relationship -ParentTable) -ParentColumn (Get-FileInfoCatalogSchemaInfo -Relationship -ParentColumn) -ChildTable (Get-FileInfoCatalogSchemaInfo -Relationship -ChildTable) -ChildColumn (Get-FileInfoCatalogSchemaInfo -Relationship -ChildColumn) -EmitWarning;
                    }
                } else {
                    if (Get-FileInfoCatalogSchemaInfo -Relationship -IsNested) {
                        $Success = Test-DataSetRelationship -DataSet $DataSet -Name $RelationshipName -ParentTable (Get-FileInfoCatalogSchemaInfo -Relationship -ParentTable) -ParentColumn (Get-FileInfoCatalogSchemaInfo -Relationship -ParentColumn) -ChildTable (Get-FileInfoCatalogSchemaInfo -Relationship -ChildTable) -ChildColumn (Get-FileInfoCatalogSchemaInfo -Relationship -ChildColumn) -Nested;
                    } else {
                        $Success = Test-DataSetRelationship -DataSet $DataSet -Name $RelationshipName -ParentTable (Get-FileInfoCatalogSchemaInfo -Relationship -ParentTable) -ParentColumn (Get-FileInfoCatalogSchemaInfo -Relationship -ParentColumn) -ChildTable (Get-FileInfoCatalogSchemaInfo -Relationship -ChildTable) -ChildColumn (Get-FileInfoCatalogSchemaInfo -Relationship -ChildColumn);
                    }
                }
                if (-not $Success) { break }
            }
        } else {
            if ($EmitWarning) {
                Write-Warning -Message 'Data set does not contain a "Path" extended property';
            } else {
                Write-Debug  -Message 'Failing because data set does not contain a "Path" extended property';
            }
        }
    } else {
        if ($EmitWarning) {
            Write-Warning -Message 'Data set name mismatch';
        } else {
            Write-Debug  -Message 'Failing due to data set name mismatch';
        }
    }
}

Function Get-RowValue {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true)]
        [ValidateScript({ $null -ne $_.Table })]
        [System.Data.DataRow]$DataRow,
        
        [Parameter(Mandatory = $true)]
        [Alias('Name')]
        [string]$TableName,
        
        [Parameter(ValueFromPipeline = $true)]
        [ValidateScript({
            @(@($_) | Where-Object {
                $_ -isnot [string] -and ($_ -isnot [Hashtable] -or $null -eq $_['Field'] -or $_['Field'] -isnot [string] -or $_['Field'].Trim().Length -eq 0 -or $null -eq $_['Properties'] -or @(@($_['Properties']) | Where-Object { $_ -isnot [string] -or $_.Trim().Length -eq 0 }).Count -eq 0);
            }).Count -eq 0;
        })]
        [object[]]$Field,
        
        [switch]$AsObject
    )
    
    Begin {
        $AllPropertyInfo = @{ };
        (Get-FileInfoCatalogSchemaInfo -Table $TableName -All) | ForEach-Object { $AllPropertyInfo[$_] = @{ } }
        $Properties = $null;
        if ($AsObject) { $Properties = @{ } }
    }

    Process {
        if (-not $PSBoundParameters.ContainsKey('Field')) { $Field = (Get-FileInfoCatalogSchemaInfo -Table $TableName -Ordered) }
        if ($AsObject) {
            $Field | ForEach-Object {
                $FieldName = '';
                if ($_ -is [string]) {
                    $FieldName = $_;
                } else {
                    $FieldName = $_.Field;
                }
                if (-not $AllPropertyInfo.ContainsKey($FieldName)) {
                    $DataType = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $FieldName -DataType;
                    if ($DataType -eq $null) {
                        $AllPropertyInfo[$FieldName] = $null;
                    } else {
                        $AllPropertyInfo[$FieldName] = @{
                            DataType = $DataType;
                            Source = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column -Source;
                        };
                    }
                }
                if (-not ($null -ne $AllPropertyInfo[$FieldName] -and $Properties.ContainsKey($FieldName))) {
                    if ($null -ne $AllPropertyInfo[$FieldName]['Source']) {
                        if ($DataRow.IsNull($AllPropertyInfo[$FieldName]['Source'])) {
                            $Properties[$FieldName] = $null;
                        } else {
                            if (-not $AllPropertyInfo[$FieldName].ContainsKey('RelationshipName')) {
                                $AllPropertyInfo[$FieldName]['RelationshipName'] = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $FieldName -Relation;
                                $AllPropertyInfo[$FieldName]['ParentTable'] = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $FieldName -ParentTable;
                            }
                            $ParentRow = $DataRow.GetParentRow($AllPropertyInfo[$FieldName]['RelationshipName']);
                            if ($AsObject) {
                                if ($_ -isnot [string]) {
                                    $Properties[$FieldName] = Get-RowValue -DataRow $ParentRow -TableName $AllPropertyInfo[$FieldName]['ParentTable'] -Field $_['Properties'];
                                } else {
                                    $Properties[$FieldName] = Get-RowValue -DataRow $ParentRow -TableName $AllPropertyInfo[$FieldName]['ParentTable'];
                                }
                            } else {
                                $Properties[$FieldName] = $ParentRow;
                            }
                        }
                    } else {
                        if ($DataRow.IsNull($FieldName)) {
                            $Properties[$FieldName] = $null;
                        } else {
                            $Value = $DataRow[$FieldName];
                            if ($Value -is [System.DateTime]) {
                                if ($Value.Kind -eq [System.DateTimeKind]::Unspecified) {
                                    $Properties[$FieldName] = [System.DateTime]::SpecifyKind($Value, [System.DateTimeKind]::Utc);
                                } else {
                                    if ($Value.Kind -ne [System.DateTimeKind]::Local) { $Properties[$FieldName] = $Value.ToLocalTime() } else { $Properties[$FieldName] = $Value }
                                }
                            } else {
                                $Properties[$FieldName] = $Value;
                            }
                        }
                    }
                }
            }
        } else {
            $Field | ForEach-Object {
                $FieldName = '';
                if ($_ -is [string]) {
                    $FieldName = $_;
                } else {
                    $FieldName = $_.Field;
                }
                if (-not $AllPropertyInfo.ContainsKey($FieldName)) {
                    $DataType = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $FieldName -DataType;
                    if ($DataType -eq $null) {
                        $AllPropertyInfo[$FieldName] = $null;
                    } else {
                        $AllPropertyInfo[$FieldName] = @{
                            DataType = $DataType;
                            Source = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column -Source;
                        };
                    }
                }
                if (-not ($null -ne $AllPropertyInfo[$FieldName] -and $Properties.ContainsKey($FieldName))) {
                    if ($null -ne $AllPropertyInfo[$FieldName]['Source']) {
                        if ($DataRow.IsNull($AllPropertyInfo[$FieldName]['Source'])) {
                            $null | Write-Output;
                        } else {
                            if (-not $AllPropertyInfo[$FieldName].ContainsKey('RelationshipName')) {
                                $AllPropertyInfo[$FieldName]['RelationshipName'] = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $FieldName -Relation;
                                $AllPropertyInfo[$FieldName]['ParentTable'] = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $FieldName -ParentTable;
                            }
                            $ParentRow = $DataRow.GetParentRow($AllPropertyInfo[$FieldName]['RelationshipName']);
                            if ($AsObject) {
                                if ($_ -isnot [string]) {
                                    (Get-RowValue -DataRow $ParentRow -TableName $AllPropertyInfo[$FieldName]['ParentTable'] -Field $_['Properties']) | Write-Output;
                                } else {
                                    (Get-RowValue -DataRow $ParentRow -TableName $AllPropertyInfo[$FieldName]['ParentTable']) | Write-Output;
                                }
                            } else {
                                (,$ParentRow) | Write-Output;
                            }
                        }
                    } else {
                        if ($DataRow.IsNull($FieldName)) {
                            $null | Write-Output;
                        } else {
                            $Value = $DataRow[$FieldName];
                            if ($Value -is [System.DateTime]) {
                                if ($Value.Kind -eq [System.DateTimeKind]::Unspecified) {
                                    [System.DateTime]::SpecifyKind($Value, [System.DateTimeKind]::Utc) | Write-Output;
                                } else {
                                    if ($Value.Kind -ne [System.DateTimeKind]::Local) { $Value.ToLocalTime() | Write-Output } else { $Value | Write-Output }
                                }
                            } else {
                                $Value | Write-Output;
                            }
                        }
                    }
                }
            }
        }
    }

    End {
        if ($AsObject) { (New-Object -TypeName 'System.Management.Automation.PSObject' -Property $Properties) | Write-Output }
    }
}

Function Get-ContentValue {
    [OutputType([System.Guid], [long], [string], [System.DateTime], [PSObject])]
    [CmdletBinding(DefaultParameterSetName = 'ByName')]
    Param(
        [Parameter(Mandatory = $true)]
        [ValidateScript({ $null -ne $_.Table -and (Test-ContentDataTable -DataTable $_.Table) })]
        [System.Data.DataRow]$DataRow,

        [Parameter(ValueFromPipeline = $true, ParameterSetName = 'ByName')]
        [ValidateSet('ID', 'Length', 'MD5Checksum', 'CalculatedOn')]
        [string[]]$Field,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'ID')]
        [switch]$ID,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Length')]
        [switch]$Length,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'MD5Checksum')]
        [switch]$MD5Checksum,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'CalculatedOn')]
        [switch]$CalculatedOn,
        
        [switch]$AsObject
    )
    
    Process {
        if ($PSBoundParameters.ContainsKey('Field')) {
            if ($AsObject) {
                (Get-RowValue -DataRow $DataRow -TableName 'Content' -Field $Field -AsObject) | Write-Output;
            } else {
                (Get-RowValue -DataRow $DataRow -TableName 'Content' -Field $Field) | Write-Output;
            }
        } else {
            if ($PSCmdlet.ParameterSetName -eq 'ByName') {
                if ($AsObject) {
                    (Get-RowValue -DataRow $DataRow -TableName 'Content' -AsObject) | Write-Output;
                } else {
                    (Get-RowValue -DataRow $DataRow -TableName 'Content') | Write-Output;
                }
            } else {
                if ($AsObject) {
                    (Get-RowValue -DataRow $DataRow -TableName 'Content' -Field @($PSCmdlet.ParameterSetName) -AsObject) | Write-Output;
                } else {
                    (Get-RowValue -DataRow $DataRow -TableName 'Content' -Field @($PSCmdlet.ParameterSetName)) | Write-Output;
                }
            }
        }
    }
}

Function Set-ContentValue {
    [OutputType([bool])]
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true)]
        [ValidateScript({ $null -ne $_.Table -and (Test-ContentDataTable -DataTable $_.Table) })]
        [System.Data.DataRow]$DataRow,

        [ValidateRange([long]0, [long]::MaxValue)]
        [long]$Length,
       
        [ValidateScript({ [string]::IsNullOrEmpty($_) -or $_ | Test-IsValidMD5ChecksumString })]
        [AllowNull()]
        [AllowEmptyString()]
        [string]$MD5Checksum,
        
        [System.DateTime]$CalculatedOn,

        [switch]$AcceptChanges
    )
    
    $WasChanged = $false;
    try {
        if ($PSBoundParameters.ContainsKey('Length') -and $Length -ne $DataRow['Length']) {
            $WasChanged = $true;
            $DataRow.BeginEdit();
            $DataRow['Length'] = $Length;
        }
        if ($PSBoundParameters.ContainsKey('MD5Checksum')) {
            if ($null -eq $MD5Checksum -and -not $DataRow.IsNull('MD5Checksum')) {
                if (-not $WasChanged) { $DataRow.BeginEdit(); $WasChanged = $true; }
                $DataRow['MD5Checksum'] = [System.DBNull]::Value;
                if (-not $DataRow.IsNull('CalculatedOn')) { $DataRow['CalculatedOn'] = [System.DBNull]::Value }
            } else {
                if (-not $WasChanged) { $DataRow.BeginEdit(); $WasChanged = $true; }
                $DataRow['MD5Checksum'] = $MD5Checksum;
                if (-not $PSBoundParameters.ContainsKey('CalculatedOn')) { $DataRow['CalculatedOn'] = [System.DateTime]::UtcNow }
            }
        }
        if ($PSBoundParameters.ContainsKey('CalculatedOn') -and (-not $DataRow.IsNull('MD5Checksum')) -and ($DataRow.IsNull('CalculatedOn') -or $CalculatedOn -ne $DataRow['CalculatedOn'])) {
            $WasChanged = $true;
            if (-not $WasChanged) { $DataRow.BeginEdit(); $WasChanged = $true; }
            if ($CalculatedOn.Kind -eq [System.DateTimeKind]::Unspecified) {
                $DataRow['CalculatedOn'] = [System.DateTime]::SpecifyKind($CalculatedOn, [System.DateTimeKind]::Utc);
            } else {
                if ($CalculatedOn.Kind -eq [System.DateTimeKind]::Utc) {
                    $DataRow['CalculatedOn'] = $CalculatedOn;
                } else {
                    $DataRow['CalculatedOn'] = $CalculatedOn.ToUniversalTime();
                }
            }
            $DataRow['Length'] = $Length;
        }
        if ($AcceptChanges -and $WasChanged) { $DataRow.AcceptChanges() }
    } finally {
        if ($WasChanged) { $DataRow.EndEdit() }
    }
    $WasChanged | Write-Output;
}

Function Get-LocationValue {
    [OutputType([System.Guid], [long], [bool], [string], [System.DateTime], [System.Data.DatRow], [PSObject])]
    [CmdletBinding(DefaultParameterSetName = 'ByName')]
    Param(
        [Parameter(Mandatory = $true)]
        [ValidateScript({ $null -ne $_.Table -and (Test-LocationDataTable -DataTable $_.Table) })]
        [System.Data.DataRow]$DataRow,

        [Parameter(ValueFromPipeline = $true, ParameterSetName = 'ByName')]
        [ValidateSet('ID', 'ParentID', 'Parent', 'ParentRow', 'ContentID', 'Content', 'ContentRow', 'BaseName', 'Extension', 'Name', 'DirName', 'FullName', 'Created', 'Modified', 'Accessed', 'Exists', 'ReadOnly', 'LinkType', 'Length', 'MD5Checksum', 'CalculatedOn')]
        [string[]]$Field,

        [Parameter(Mandatory = $true, ParameterSetName = 'ID')]
        [switch]$ID,

        [Parameter(Mandatory = $true, ParameterSetName = 'ParentID')]
        [switch]$ParentID,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Parent')]
        [switch]$Parent,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'ParentRow')]
        [switch]$ParentRow,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'ContentID')]
        [switch]$ContentID,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Content')]
        [switch]$Content,

        [Parameter(Mandatory = $true, ParameterSetName = 'ContentRow')]
        [switch]$ContentRow,

        [Parameter(Mandatory = $true, ParameterSetName = 'BaseName')]
        [switch]$BaseName,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Extension')]
        [switch]$Extension,

        [Parameter(Mandatory = $true, ParameterSetName = 'Extension')]
        [switch]$Name,

        [Parameter(Mandatory = $true, ParameterSetName = 'Extension')]
        [switch]$DirName,

        [Parameter(Mandatory = $true, ParameterSetName = 'Extension')]
        [switch]$FullName,

        [Parameter(Mandatory = $true, ParameterSetName = 'Created')]
        [switch]$Created,

        [Parameter(Mandatory = $true, ParameterSetName = 'Modified')]
        [switch]$Modified,

        [Parameter(Mandatory = $true, ParameterSetName = 'Accessed')]
        [switch]$Accessed,

        [Parameter(Mandatory = $true, ParameterSetName = 'Exists')]
        [switch]$Exists,

        [Parameter(Mandatory = $true, ParameterSetName = 'ReadOnly')]
        [switch]$ReadOnly,

        [Parameter(Mandatory = $true, ParameterSetName = 'LinkType')]
        [switch]$LinkType,

        [Parameter(Mandatory = $true, ParameterSetName = 'Length')]
        [switch]$Length,

        [Parameter(Mandatory = $true, ParameterSetName = 'MD5Checksum')]
        [switch]$MD5Checksum,

        [Parameter(Mandatory = $true, ParameterSetName = 'CalculatedOn')]
        [switch]$CalculatedOn,
        
        [switch]$AsObject
    )
    
    Begin {
        $ContentColumns = @('Length', 'MD5Checksum', 'CalculatedOn');
        $DateColumns = @('Created', 'Modified', 'Accessed');
        $ValueHash = @{ };
        $Properties = $null;
        if ($AsObject) { $Properties = @{ } }
    }
    
    Process {
        if ($PSBoundParameters.ContainsKey('Field')) {
            if ($AsObject) {
                (Get-RowValue -DataRow $DataRow -TableName 'Location' -Field $Field -AsObject) | Write-Output;
            } else {
                (Get-RowValue -DataRow $DataRow -TableName 'Location' -Field $Field) | Write-Output;
            }
        } else {
            if ($PSCmdlet.ParameterSetName -eq 'ByName') {
                if ($AsObject) {
                    (Get-RowValue -DataRow $DataRow -TableName 'Location' -AsObject) | Write-Output;
                } else {
                    (Get-RowValue -DataRow $DataRow -TableName 'Location') | Write-Output;
                }
            } else {
                if ($AsObject) {
                    (Get-RowValue -DataRow $DataRow -TableName 'Location' -Field @($PSCmdlet.ParameterSetName) -AsObject) | Write-Output;
                } else {
                    (Get-RowValue -DataRow $DataRow -TableName 'Location' -Field @($PSCmdlet.ParameterSetName)) | Write-Output;
                }
            }
        }
    }
}

Function Set-LocationValue {
    [OutputType([bool])]
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true)]
        [ValidateScript({ $null -ne $_.Table -and (Test-LocationDataTable -DataTable $_.Table) })]
        [System.Data.DataRow]$DataRow,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'ParentID')]
        [switch]$ParentID,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Parent')]
        [ValidateScript({ $_ -is [System.Guid] -or ($_ -is [System.Data.DataRow] -and (Test-LocationDataTable -DataTable $_.Table)) })]
        [object]$Parent,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'ParentRow')]
        [switch]$ParentRow,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'ContentID')]
        [switch]$ContentID,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Content')]
        [switch]$Content,

        [Parameter(Mandatory = $true, ParameterSetName = 'ContentRow')]
        [switch]$ContentRow,

        [Parameter(Mandatory = $true, ParameterSetName = 'BaseName')]
        [switch]$BaseName,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Extension')]
        [switch]$Extension,

        [Parameter(Mandatory = $true, ParameterSetName = 'Extension')]
        [switch]$Name,

        [Parameter(Mandatory = $true, ParameterSetName = 'Extension')]
        [switch]$DirName,

        [Parameter(Mandatory = $true, ParameterSetName = 'Extension')]
        [switch]$FullName,

        [Parameter(Mandatory = $true, ParameterSetName = 'Created')]
        [switch]$Created,

        [Parameter(Mandatory = $true, ParameterSetName = 'Modified')]
        [switch]$Modified,

        [Parameter(Mandatory = $true, ParameterSetName = 'Accessed')]
        [switch]$Accessed,

        [Parameter(Mandatory = $true, ParameterSetName = 'Exists')]
        [switch]$Exists,

        [Parameter(Mandatory = $true, ParameterSetName = 'ReadOnly')]
        [switch]$ReadOnly,

        [Parameter(Mandatory = $true, ParameterSetName = 'LinkType')]
        [switch]$LinkType,

        [ValidateRange([long]0, [long]::MaxValue)]
        [long]$Length,
       
        [ValidateScript({ [string]::IsNullOrEmpty($_) -or $_ | Test-IsValidMD5ChecksumString })]
        [AllowNull()]
        [AllowEmptyString()]
        [string]$MD5Checksum,
        
        [System.DateTime]$CalculatedOn,

        [switch]$AcceptChanges
    )
    
    $WasChanged = $false;
    try {
        if ($PSBoundParameters.ContainsKey('Length') -and $Length -ne $DataRow['Length']) {
            $WasChanged = $true;
            $DataRow.BeginEdit();
            $DataRow['Length'] = $Length;
        }
        if ($PSBoundParameters.ContainsKey('MD5Checksum')) {
            if ($null -eq $MD5Checksum -and -not $DataRow.IsNull('MD5Checksum')) {
                if (-not $WasChanged) { $DataRow.BeginEdit(); $WasChanged = $true; }
                $DataRow['MD5Checksum'] = [System.DBNull]::Value;
                if (-not $DataRow.IsNull('CalculatedOn')) { $DataRow['CalculatedOn'] = [System.DBNull]::Value }
            } else {
                if (-not $WasChanged) { $DataRow.BeginEdit(); $WasChanged = $true; }
                $DataRow['MD5Checksum'] = $MD5Checksum;
                if (-not $PSBoundParameters.ContainsKey('CalculatedOn')) { $DataRow['CalculatedOn'] = [System.DateTime]::UtcNow }
            }
        }
        if ($PSBoundParameters.ContainsKey('CalculatedOn') -and (-not $DataRow.IsNull('MD5Checksum')) -and ($DataRow.IsNull('CalculatedOn') -or $CalculatedOn -ne $DataRow['CalculatedOn'])) {
            $WasChanged = $true;
            if (-not $WasChanged) { $DataRow.BeginEdit(); $WasChanged = $true; }
            if ($CalculatedOn.Kind -eq [System.DateTimeKind]::Unspecified) {
                $DataRow['CalculatedOn'] = [System.DateTime]::SpecifyKind($CalculatedOn, [System.DateTimeKind]::Utc);
            } else {
                if ($CalculatedOn.Kind -eq [System.DateTimeKind]::Utc) {
                    $DataRow['CalculatedOn'] = $CalculatedOn;
                } else {
                    $DataRow['CalculatedOn'] = $CalculatedOn.ToUniversalTime();
                }
            }
            $DataRow['Length'] = $Length;
        }
        if ($AcceptChanges -and $WasChanged) { $DataRow.AcceptChanges() }
    } finally {
        if ($WasChanged) { $DataRow.EndEdit() }
    }
    $WasChanged | Write-Output;
}

Function Open-FileInfoCatalog {
    [OutputType([System.Data.DataSet])]
    Param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )
    
    [System.Data.DataSet]$FileInfoCatalog = New-Object -TypeName 'System.Data.DataSet' -ArgumentList (Get-FileInfoCatalogSchemaInfo -DataSetName);
    Write-Debug -Message "Created DataSet (DataSetName = '$($FileInfoCatalog.DataSetName)')";
    $PrimaryKeys = @{ };
    foreach ($TableName in @(Get-FileInfoCatalogSchemaInfo -TableNames)) {
        $DataTable = $FileInfoCatalog.Tables.Add($TableName);
        foreach ($ColumName in @(Get-FileInfoCatalogSchemaInfo -Table $TableName -Ordered)) {
            $DataType = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColumName -DataType;
            $DataColumn = $DataTable.Columns.Add($ColumName, $DataType);
            $Caption = Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColumName -Caption;
            if ($Caption -cne $ColumnName) { $DataColumn.Caption = $Caption }
            if (Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColumName -IsPrimaryKey) {
                $PrimaryKeys[$TableName] = $DataColumn;
                $DataColumn.AllowDBNull = $false;
                $DataColumn.ReadOnly = $true;
                $DataTable.Constraints.Add((Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColumName -Relation), $DataColumn, $true) | Out-Null;
            } else {
                if ($DataType -eq [System.DateTime]) { $DataColumn.DateTimeMode = [System.Data.DataSetDateTime]::Utc }
                if (Get-FileInfoCatalogSchemaInfo -Table $TableName -Column $ColumName -AllowNull) { $DataColumn.AllowDBNull = $true }
            }
        }
    }
    foreach ($RelationshipName in @(Get-FileInfoCatalogSchemaInfo -RelationshipNames)) {
        $ChildTableName = Get-FileInfoCatalogSchemaInfo -Relationship $RelationshipName -ChildTable;
        $ParentTableName = Get-FileInfoCatalogSchemaInfo -Relationship $RelationshipName -ParentTable;
        [System.Data.DataRelation]$DataRelation = $FileInfoCatalog.Relations.Add($RelationshipName,
            ($FileInfoCatalog.Tables[$ParentTableName, ''].Columns[(Get-FileInfoCatalogSchemaInfo -Relationship $RelationshipName -ParentColumn)]),
            ($FileInfoCatalog.Tables[$ChildTableName, ''].Columns[(Get-FileInfoCatalogSchemaInfo -Relationship $RelationshipName -ChildColumn)]));
        if ($ParentTableName -eq $ChildTableName) { $DataRelation.Nested = $true }
        $DataRelation.ChildKeyConstraint.AcceptRejectRule = [System.Data.AcceptRejectRule]::Cascade;
        $DataRelation.ChildKeyConstraint.DeleteRule = [System.Data.Rule]::None;
        $DataRelation.ChildKeyConstraint.UpdateRule = [System.Data.Rule]::None;
    }
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
        Write-Debug -Message "Saving to '$Path'";
        $DataSet.WriteXml($Path, [System.Data.XmlWriteMode]::IgnoreSchema);
    } catch {
        Write-Debug -Message "Save-FileInfoCatalog Failed with $_";
        $FailErr = $_;
    } finally {
        $ErrorActionPreference = $old_ErrorActionPreference;
    }
    if ($null -ne $FailErr) {
        if ($FailErr -is [System.Management.Automation.ErrorRecord]) {
            $TargetObject = $FailErr.TargetObject;
            if ($null -eq $TargetObject -or $TargetObject -isnot [string] -or ($TargetObject -ne $DirName -and $TargetObject -ne $Path)) {
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
            if ($null -eq $Extension) { $Extension = '' } else { if ($Extension.Length -gt 1 -and $Extension.StartsWith('.')) { $Extension = $Extension.Substring(1) } }
            $DataRow = $null;
            if ($fsi -is [System.IO.DirectoryInfo]) {
                if ($null -eq $fsi.Parent) {
                    $DataRow = @($DataSet.Tables['Location'].Select("[BaseName]='$BaseName' AND [Extension]='$Extension' AND [ParentID] IS NULL AND [Length] IS NULL")) | Select-Object -First 1;
                } else {
                    $ParentRow = Get-FileSystemInfoRow -FileSystemInfo $fsi.Parent -DataSet $DataSet;
                    if ($null -ne $ParentRow) {
                        $DataRow = @($DataSet.Tables['Location'].Select("[BaseName]='$BaseName' AND [Extension]='$Extension' AND [ParentID]='$($ParentRow['ID'].ToString())' AND [Length] IS NULL")) | Select-Object -First 1;
                    }
                }
            } else {
                $ParentRow = Get-FileSystemInfoRow -FileSystemInfo $fsi.Directory -DataSet $DataSet;
                if ($null -ne $ParentRow) {
                    $DataRow = @($DataSet.Tables['Location'].Select("[BaseName]='$BaseName' AND [Extension]='$Extension' AND [ParentID]='$($ParentRow['ID'].ToString())' AND [Length] IS NOT NULL")) | Select-Object -First 1;
                }
            }
            if ($null -ne $DataRow) { (,$DataRow) | Write-Output }
        }
    }
}

Function Test-IsFileRow {
    [OutputType([bool], [System.Data.DataRow])]
    Param(
        [Parameter(Mandatory = $true, Position = 0)]
        [AllowEmptyCollection()]
        [System.Data.DataRow[]]$Row,

        [switch]$Filter
    )

    Begin { $HadRow = $Filter.IsPresent }
    Process {
        if ($Row.Length -gt 0) {
            if ($Filter) {
                $Row | Where-Object { } | Write-Output;
            } else {
                $HadRow = $true;
                $Row | ForEach-Object { $Row[0].IsNull('') };
            }
        }
    }
    End { if (-not $HadRow) { $HadRow | Write-Output } }
}

Function Get-FileRowFromContentID {
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
            if ($null -ne $LinkType -and $LinkType.Trim().Length -eq 0) { $LinkType = $null }
            $Extension = $fsi.Extension;
            if ($null -eq $Extension) { $Extension = '' } else { if ($Extension.Length -gt 1 -and $Extension.StartsWith('.')) { $Extension = $Extension.Substring(1) } }
            [System.Data.DataRow]$ParentRow = $null;
            [System.Data.DataRow]$DataRow = $null;
            if ($fsi -is [System.IO.DirectoryInfo]) {
                if ($null -eq $fsi.Parent) {
                    $DataRow = @($DataSet.Tables['Location'].Select("[BaseName]='$($BaseName.Replace("'", "''"))' AND [Extension]='$($Extension.Replace("'", "''"))' AND [ParentID] IS NULL AND [Length] IS NULL")) | Select-Object -First 1;
                } else {
                    $ParentRow = Import-FileSystemInfoRow -FileSystemInfo $fsi.Parent -DataSet $DataSet;
                    $DataRow = @($DataSet.Tables['Location'].Select("[BaseName]='$($BaseName.Replace("'", "''"))' AND [Extension]='$($Extension.Replace("'", "''"))' AND [ParentID]='$($ParentRow['ID'].ToString())' AND [Length] IS NULL")) | Select-Object -First 1;
                }
            } else {
                $ParentRow = Import-FileSystemInfoRow -FileSystemInfo $fsi.Directory -DataSet $DataSet;
                $DataRow = @($DataSet.Tables['Location'].Select("[BaseName]='$($BaseName.Replace("'", "''"))' AND [Extension]='$($Extension.Replace("'", "''"))' AND [ParentID]='$($ParentRow['ID'].ToString())' AND [Length] IS NOT NULL")) | Select-Object -First 1;
            }
            if ($null -ne $DataRow) {
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
                    if ($null -ne $LinkType) {
                        if (-not $HasChanges) { $DataRow.BeginEdit(); $HasChanges = $true; }
                        $DataRow['LinkType'] = $LinkType;
                        $UnlinkContent = $true;
                    }
                } else {
                    if ($null -eq $LinkType) {
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
                if ($null -ne $ParentRow) {
                    $DataRow.SetParentRow($ParentRow, $FileInfoCatalog.Relations['FK_ParentLocation']);
                }
            }
            (,$DataRow) | Write-Output;
        }
    }
}
$DebugPreference = [System.Management.Automation.ActionPreference]::Continue;
$FileInfoCatalog = Open-FileInfoCatalog -Path ($PSScriptRoot | Join-Path -ChildPath 'FileInfoCatalog.xml') -ErrorAction Stop;
Test-FileInfoCatalog -DataSet $FileInfoCatalog -ErrorAction Stop;
Save-FileInfoCatalog -DataSet $FileInfoCatalog -ErrorAction Stop;