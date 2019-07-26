Param(
    [string[]]$LibDirs = @('lib'),
    [string[]]$AppDirs = @('App'),
    [string]$BinDir = @('bin'),
    [string]$PublishDir = @('gh-pages')
)

Function Optimize-RelativePath {
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [AllowNull()]
        [AllowEmptyString()]
        [AllowEmptyCollection()]
        [string[]]$Path
    )

    Process {
        if ($null -ne $Path -and $Path.Count -gt 0) {
            foreach ($ParentPath in $Path) {
                $RelativePath = '';
                do {
                    $RelativePath = $ParentPath | Split-Path -Leaf;
                    $ParentPath = $ParentPath | Split-Path -Parent;
                    if ([string]::IsNullOrEmpty($ParentPath)) { break }
                } while ([string]::IsNullOrEmpty($RelativePath));
                while (-not [string]::IsNullOrEmpty($ParentPath)) {
                    $p = $ParentPath | Split-Path -Leaf;
                    if (-not [string]::IsNullOrEmpty($p)) { $RelativePath = $p | Join-Path -ChildPath $RelativePath }
                    $ParentPath = $ParentPath | Split-Path -Parent;
                }
                if (-not [string]::IsNullOrEmpty($RelativePath)) { $RelativePath | Write-Output }
            }
        }
    }
}

Function Test-PathContainedByAny {
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [AllowNull()]
        [AllowEmptyString()]
        [AllowEmptyCollection()]
        [string[]]$ParentPath,

        [Parameter(Mandatory = $true)]
        [string]$TargetPath,

        [switch]$NoOptimize
    )

    Begin {
        $NotContainedByAny = $true;
        $OptimizedTargetPath = $TargetPath;
        if (-not $NoOptimize.IsPresent) { $OptimizedTargetPath = $OptimizedTargetPath | Optimize-RelativePath }
    }

    Process {
        if ($NotContainedByAny -and $null -ne $ParentPath -and $ParentPath.Count -gt 0) {
            $OptimizedPaths = @($ParentPath);
            if (-not $NoOptimize.IsPresent) { $OptimizedPaths = @($ParentPath | Optimize-RelativePath) }
            if ($OptimizedPaths.Count -gt 0) {
                foreach ($Path in $OptimizedPaths) {
                    if ($Path -ieq $OptimizedTargetPath) {
                        $NotContainedByAny = $false;
                        break;
                    }
                    if ($Path.Length -lt $OptimizedTargetPath.Length -and $OptimizedTargetPath.Substring(0, $Path.Length) -ieq $Path) {
                        $p = $OptimizedTargetPath;
                        while ($p.Length -gt $Path.Length) {
                            $p = $p | Split-Path -Parent;
                            if ($null -eq $p) { $p = ''; break; }
                        }
                        if ($Path -ieq $p) {
                            $NotContainedByAny = $false;
                            break;
                        }
                    }
                }
            }
        }
    }

    End { (-not $NotContainedByAny) | Write-Output }
}

Function Copy-ToPublishLocation {
    [CmdletBinding(DefaultParameterSetName = 'Any')]
    Param(
        [Parameter(ValueFromPipeline = $true)]
        [string[]]$Names,

        [Parameter(Mandatory = $true)]
        [string]$SourceDir,

        [Parameter(Mandatory = $true)]
        [string]$TargetDir,

        [Parameter(Mandatory = $true)]
        [string[]]$AllowedSubdirs,

        [int]$ParentProgressId
    )

    Write-Progress -Activity 'Copying to publish location' -Status 'Checking target' -CurrentOperation $TargetDir;
    if ($TargetDir | Test-Path -PathType Container) {
        @((Get-ChildItem -LiteralPath $TargetDir -Directory) | Where-Object { $AllowedSubdirs -inotcontains $_.FullName -and -not $_.Name.StartsWith('.') }) | ForEach-Object {
            Remove-Item -LiteralPath $_.FullName -Force -Recurse -ErrorAction Stop;
        }

        @((Get-ChildItem -LiteralPath $TargetDir -File) | Where-Object { $Names -inotcontains $_.Name -and -not $_.Name.StartsWith('.') }) | ForEach-Object {
            Remove-Item -LiteralPath $_.FullName -Force -ErrorAction Stop;
        }
    } else {
        $ParentDir = $TargetDir | Split-Path -Parent;
        $Name = $TargetDir | Split-Path -Leaf;
        if ([string]::IsNullOrEmpty($ParentDir) -or [string]::IsNullOrEmpty($Name) -or -not ($ParentDir | Test-Path -PathType Container)) {
            Write-Error -Message "Unable to find parent directory of $TargetDir." -Category ObjectNotFound -ErrorAction Stop;
        }
        if ($TargetDir | Test-Path) { Remove-Item -LiteralPath $TargetDir -Filter -Recurse -ErrorAction Stop }
        (New-Item -Path $ParentDir -ItemType Directory -Name $Name -Force -ErrorAction Stop) | Out-Null;
    }
    $Names | ForEach-Object {
        $SourcePath = $SourceDir | Join-Path -ChildPath $_;
        $TargetPath = $TargetDir | Join-Path -ChildPath $_;
        if ($TargetPath | Test-Path -PathType Leaf) {
            $IsChanged = [System.IO.FileInfo]::new($SourcePath).Length -ne [System.IO.FileInfo]::new($TargetPath).Length;
            if (-not $IsChanged) {
                Write-Progress -Activity 'Copying to publish location' -Status 'Comparing Files' -CurrentOperation "Read $SourcePath";
                $SourceContent = [System.IO.File]::ReadAllBytes($SourcePath);
                Write-Progress -Activity 'Copying to publish location' -Status 'Comparing Files' -CurrentOperation "Read $TargetPath";
                $TargetContent = [System.IO.File]::ReadAllBytes($TargetPath);
                Write-Progress -Activity 'Copying to publish location' -Status 'Comparing Files' -CurrentOperation "Compare $TargetPath";
                $IsChanged = -not [System.Linq.Enumerable]::SequenceEqual($SourceContent, $TargetContent);
            }
            if ($IsChanged) {
                Write-Progress -Activity 'Copying to publish location' -Status 'Copying file' -CurrentOperation "$SourcePath -> $TargetPath";
                Copy-Item -LiteralPath $SourcePath -Destination $TargetPath -Force -ErrorAction Stop;
            }
        } else {
            Write-Progress -Activity 'Copying to publish location' -Status 'Copying file' -CurrentOperation "$SourcePath -> $TargetPath";
            if ($TargetPath | Test-Path) { Remove-Item -LiteralPath $TargetPath -Force -Recurse -ErrorAction Stop }
            Copy-Item -LiteralPath $SourcePath -Destination $TargetPath -Force -ErrorAction Stop;
        }
    }
}

Function Get-PublishInfo {
    [CmdletBinding(DefaultParameterSetName = 'Any')]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [string]$RelativePath,

        [Parameter(Mandatory = $true)]
        $SourceDir,

        [Parameter(Mandatory = $true)]
        $TargetDir,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'Recurse')]
        [switch]$Recurse,

        [Parameter(ParameterSetName = 'Recurse')]
        [string[]]$Filter
    )

    Process {
        $SourcePath = $SourceDir | Join-Path -ChildPath $RelativePath;
        if ($SourcePath | Test-Path -PathType Leaf) {
            $Properties = @{ SourceDir = $SourceDir; TargetDir = $TargetDir; Name = $RelativePath };
            $p = $RelativePath | Split-Path -Parent;
            $n = $RelativePath | Split-Path -Leaf;
            if (-not ([string]::IsNullOrEmpty($p) -or [string]::IsNullOrEmpty($n))) {
                $Properties['Name'] = $n;
                $Properties['SourceDir'] = $Properties['SourceDir'] | Join-Path -ChildPath $p;
                $Properties['TargetDir'] = $Properties['TargetDir'] | Join-Path -ChildPath $p;
            }
            New-Object -TypeName 'System.Management.Automation.PSObject' -Property $Properties;
        } else {
            if ($Recurse.IsPresent -and ($SourcePath | Test-Path)) {
                $TargetPath = $TargetDir | Join-Path -ChildPath $RelativePath;
                if ($PSBoundParameters.ContainsKey('Filter')) {
                    (Get-ChildItem -LiteralPath $SourcePath -Directory) | ForEach-Object { $_.Name } | Get-PublishInfo -SourceDir $SourcePath -TargetDir $TargetPath -Filter $Filter -Recurse;
                    $Filter | ForEach-Object {
                        (Get-ChildItem -LiteralPath $SourcePath -Filter $_ -File) | ForEach-Object { $_.Name } | Get-PublishInfo -SourceDir $SourcePath -TargetDir $TargetPath;
                    }
                } else {
                    (Get-ChildItem -LiteralPath $SourcePath -Directory) | ForEach-Object { $_.Name } | Get-PublishInfo -SourceDir $SourcePath -TargetDir $TargetPath -Recurse;
                    (Get-ChildItem -LiteralPath $SourcePath -File) | ForEach-Object { $_.Name } | Get-PublishInfo -SourceDir $SourcePath -TargetDir $TargetPath;
                }
            }
        }
    }
}

$FullBinDir = $PSScriptRoot | Join-Path -ChildPath $BinDir;
$FullPublishDir = $PSScriptRoot | Join-Path -ChildPath $PublishDir;
$FullLibDirs = @($LibDirs | ForEach-Object { $PSScriptRoot | Join-Path -ChildPath $_ });
$FullAppDirs = @($AppDirs | ForEach-Object { $PSScriptRoot | Join-Path -ChildPath $_ });

$CsProjPath = $PSScriptRoot | Join-Path -ChildPath 'SNImplementationDocs.csproj';
Write-Progress -Activity 'Synchronizing publish location' -Status 'Reading project file' -CurrentOperation $CsProjPath;
$XmlDocument = [System.Xml.XmlDocument]::new();
$XmlDocument.Load($CsProjPath);
if ($null -ne $XmlDocument.DocumentElement) {
    $Nsmgr = [System.Xml.XmlNamespaceManager]::new($XmlDocument.NameTable);
    $Nsmgr.AddNamespace('msb', 'http://schemas.microsoft.com/developer/msbuild/2003');
    $IgnoreSubdirs = @($IgnoreSubdirs | Optimize-RelativePath);
    $IgnorePaths = @($IgnorePaths | Optimize-RelativePath);
    $RelativeSourcePaths = @(@($XmlDocument.SelectNodes('/msb:Project/msb:ItemGroup/msb:Content/@Include', $Nsmgr)) | ForEach-Object { $_.Value } | Get-PublishInfo -SourceDir $FullBinDir -TargetDir $FullPublishDir);
    $TargetPaths = $RelativeSourcePaths | ForEach-Object { $_.TargetDir | Join-Path -ChildPath $_.Name };
    $RelativeSourcePaths += @($LibDirs | ForEach-Object {
        Write-Progress -Activity 'Synchronizing publish location' -Status 'Reading library folder' -CurrentOperation ($PSScriptRoot | Join-Path -ChildPath $_);
        (Get-PublishInfo -SourceDir $PSScriptRoot -TargetDir $FullPublishDir -RelativePath $_ -Recurse) | Where-Object { $TargetPaths -inotcontains ($_.TargetDir | Join-Path -ChildPath $_.Name) }
    });
    $RelativeSourcePaths += @($AppDirs | ForEach-Object {
        Write-Progress -Activity 'Synchronizing publish location' -Status 'Reading App folder' -CurrentOperation ($PSScriptRoot | Join-Path -ChildPath $_);
        (Get-PublishInfo -SourceDir $PSScriptRoot -TargetDir $FullPublishDir -Filter '*.js', '*.d.ts' -RelativePath $_ -Recurse) | Where-Object { $TargetPaths -inotcontains ($_.TargetDir | Join-Path -ChildPath $_.Name) }
    });
    $RelativeSourcePaths += $OtherSourcePaths;
    $Grouped = @(($RelativeSourcePaths | Group-Object -Property 'TargetDir') | Sort-Object -Property 'Name');
    $AllowedSubdirs = @($FullPublishDir) + @(($Grouped | ForEach-Object {
        $_.Name | Write-Output;
        if ($_.Name -ine $FullPublishDir) {
            $p = $_.Name | Split-Path -Parent;
            while ($p -ine $FullPublishDir -and -not [string]::IsNullOrEmpty($p)) {
                $p | Write-Output;
                $p = $p | Split-Path -Parent;
            }
        }
    }) | Select-Object -Unique);
    $Grouped | ForEach-Object {
        Write-Progress -Activity 'Synchronizing publish location' -Status 'Checking target' -CurrentOperation $_.Name;
        Copy-ToPublishLocation -SourceDir $_.Group[0].SourceDir -TargetDir $_.Name -Names @($_.Group | ForEach-Object { $_.Name }) -AllowedSubdirs $AllowedSubdirs;
    }
}

Write-Progress -Activity 'Synchronizing publish location' -Status 'Finished' -Completed;

#EnvDTE80.DTE2 dte8Obj = (EnvDTE80.DTE2)obj;

#Solution2 soln = (Solution2)dte8Obj.Solution;