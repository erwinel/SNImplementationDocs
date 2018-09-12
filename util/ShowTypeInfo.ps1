Add-Type -TypeDefinition @'
namespace Examples2 {
    using System;
    public class Generic1<T1, T2, T3, T4, T5>
        where T1: T2
        where T2: IConvertible
        where T3: struct
        where T4: class, new()
    {
        public readonly T1 Value1;
        public T2 Value2 { get; set; }
        public T3 Value3 { get; set; }
        public T4 Value4 { get; set; }
        public Generic1(T1 arg1, T3 arg2, T4 arg3 = default(T4)) {
            Value1 = arg1;
            Value2 = arg1;
            Value3 = arg2;
            Value4 = arg3;
        }
    }
    public static class Util {
        public static Type GetGenericType(Type t1, Type t2, Type t3, Type t4, Type t5) {
            Type t = typeof(Generic1<,,,,>);
            return t.MakeGenericType(t1, t2, t3, t4, t5);
        }
    }
}
'@;

Function ConvertTo-CodeTypeName {
    [CmdletBinding(DefaultParameterSetName = 'CS')]
    [OutputType([string])]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true, Position = 0)]
        [System.Type[]]$InputType,
        
        [Parameter(ParameterSetName = 'CS')]
        [switch]$IncludeConstraints,
        
        [Parameter(ParameterSetName = 'CS')]
        [switch]$OmitNamespace,
        
        [Parameter(ParameterSetName = 'NameOnly')]
        [switch]$NameOnly,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'PS')]
        [switch]$PS
    )

    Process {
        foreach ($Type in $InputType) {
            if ($Type.IsArray) {
                $ArrayRank = $Type.GetArrayRank();
                if ($ArrayRank -eq 2) {
                    if ($NameOnly) {
                        "$(ConvertTo-CodeTypeName $Type.GetElementType() -NameOnly)[,]" | Write-Output;
                    } else {
                        if ($PS) {
                            "$(ConvertTo-CodeTypeName $Type.GetElementType() -PS)[,]" | Write-Output;
                        } else {
                            if ($IncludeConstraints) {
                                if ($OmitNamespace) {
                                    "$(ConvertTo-CodeTypeName $Type.GetElementType() -IncludeConstraints -OmitNamespace)[,]" | Write-Output;
                                } else {
                                    "$(ConvertTo-CodeTypeName $Type.GetElementType() -IncludeConstraints)[,]" | Write-Output;
                                }
                            } else {
                                if ($OmitNamespace) {
                                    "$(ConvertTo-CodeTypeName $Type.GetElementType() -OmitNamespace)[,]" | Write-Output;
                                } else {
                                    "$(ConvertTo-CodeTypeName $Type.GetElementType())[,]" | Write-Output;
                                }
                            }
                        }
                    }
                } else {
                    if ($ArrayRank -gt 2) {
                        if ($NameOnly) {
                            "$(ConvertTo-CodeTypeName $Type.GetElementType() -NameOnly)[$(New-Object -TypeName 'System.String' -ArgumentList ([char]','), $ArrayRank - 1)]" | Write-Output;
                        } else {
                            if ($PS) {
                                "$(ConvertTo-CodeTypeName $Type.GetElementType() -PS)[$(New-Object -TypeName 'System.String' -ArgumentList ([char]','), $ArrayRank - 1)]" | Write-Output;
                            } else {
                                if ($IncludeConstraints) {
                                    if ($OmitNamespace) {
                                        "$(ConvertTo-CodeTypeName $Type.GetElementType() -IncludeConstraints -OmitNamespace)[$(New-Object -TypeName 'System.String' -ArgumentList ([char]','), $ArrayRank - 1)]" | Write-Output;
                                    } else {
                                        "$(ConvertTo-CodeTypeName $Type.GetElementType() -IncludeConstraints)[$(New-Object -TypeName 'System.String' -ArgumentList ([char]','), $ArrayRank - 1)]" | Write-Output;
                                    }
                                } else {
                                    if ($OmitNamespace) {
                                        "$(ConvertTo-CodeTypeName $Type.GetElementType() -OmitNamespace)[$(New-Object -TypeName 'System.String' -ArgumentList ([char]','), $ArrayRank - 1)]" | Write-Output;
                                    } else {
                                        "$(ConvertTo-CodeTypeName $Type.GetElementType())[$(New-Object -TypeName 'System.String' -ArgumentList ([char]','), $ArrayRank - 1)]" | Write-Output;
                                    }
                                }
                            }
                        }
                    } else {
                        if ($NameOnly) {
                            "$(ConvertTo-CodeTypeName $Type.GetElementType() -NameOnly)[]" | Write-Output;
                        } else {
                            if ($PS) {
                                "$(ConvertTo-CodeTypeName $Type.GetElementType() -PS)[]" | Write-Output;
                            } else {
                                if ($IncludeConstraints) {
                                    if ($OmitNamespace) {
                                        "$(ConvertTo-CodeTypeName $Type.GetElementType() -IncludeConstraints -OmitNamespace)[]" | Write-Output;
                                    } else {
                                        "$(ConvertTo-CodeTypeName $Type.GetElementType() -IncludeConstraints)[]" | Write-Output;
                                    }
                                } else {
                                    if ($OmitNamespace) {
                                        "$(ConvertTo-CodeTypeName $Type.GetElementType() -OmitNamespace)[]" | Write-Output;
                                    } else {
                                        "$(ConvertTo-CodeTypeName $Type.GetElementType())[]" | Write-Output;
                                    }
                                }
                            }
                        }
                    }
                }
                continue;
            }
            if ($Type.IsByRef) {
                if ($NameOnly) {
                    "$(ConvertTo-CodeTypeName $Type.GetElementType() -NameOnly)&" | Write-Output;
                } else {
                    if ($PS) {
                        "$(ConvertTo-CodeTypeName $Type.GetElementType() -PS)&" | Write-Output;
                    } else {
                        if ($IncludeConstraints) {
                            if ($OmitNamespace) {
                                "$(ConvertTo-CodeTypeName $Type.GetElementType() -IncludeConstraints -OmitNamespace)&" | Write-Output;
                            } else {
                                "$(ConvertTo-CodeTypeName $Type.GetElementType() -IncludeConstraints)&" | Write-Output;
                            }
                        } else {
                            if ($OmitNamespace) {
                                "$(ConvertTo-CodeTypeName $Type.GetElementType() -OmitNamespace)&" | Write-Output;
                            } else {
                                "$(ConvertTo-CodeTypeName $Type.GetElementType())&" | Write-Output;
                            }
                        }
                    }
                }
                continue;
            }
            
            $FullName = $Type.Name;
            if ($NameOnly) {
                if ($Type.IsGenericType) {
                    ($FullName -replace '`\d+$', '') | Write-Output;
                } else {
                    $FullName | Write-Output;
                }
                continue;
            }
            if ($Type.IsNested) {
                if ($PS) {
                    $FullName = "$($Type.DeclaringType | ConvertTo-CodeTypeName -PS).$FullName";
                } else {
                    if (-not $OmitNamespace ) {
                        $FullName = "$($Type.DeclaringType | ConvertTo-CodeTypeName).$FullName";
                    }
                }
            } else {
                if (-not ($OmitNamespace -or [string]::IsNullOrEmpty($Type.Namespace))) {
                    $FullName = "$($Type.Namespace).$FullName";
                }
            }
            if ($Type.IsGenericTypeDefinition) {
                $GenericArguments = $Type.GetGenericArguments();
                if ($PS) {
                    "$($FullName -replace '`\d+$', '')<$(($GenericArguments | ForEach-Object { $_.Name }) -join ',')>" | Write-Output;
                } else {
                    "$($FullName -replace '`\d+$', '')[$(($GenericArguments | ForEach-Object { $_.Name }) -join ',')]" | Write-Output;
                }
                if ($IncludeConstraints) {
                    $GenericArguments | ForEach-Object {
                        $Constraints = $_.GetGenericParameterConstraints();
                        $ArgName = $_.Name;
                        $WhereElements = @();
                        if ($Constraints.Length -gt 0) {
                            if ($PS) {
                                $WhereElements = @($Constraints | ConvertTo-CodeTypeName -PS);
                            } else {
                                $WhereElements = @($Constraints | ConvertTo-CodeTypeName);
                            }
                        }
                        if (([System.Reflection.GenericParameterAttributes]::NotNullableValueTypeConstraint -band $_.GenericParameterAttributes) -ne [System.Reflection.GenericParameterAttributes]::None) {
                            $WhereElements += @('struct');
                        } else {
                            if (([System.Reflection.GenericParameterAttributes]::ReferenceTypeConstraint -band $_.GenericParameterAttributes) -ne [System.Reflection.GenericParameterAttributes]::None) {
                                $WhereElements += @('class');
                            }
                            if (([System.Reflection.GenericParameterAttributes]::DefaultConstructorConstraint -band $_.GenericParameterAttributes) -ne [System.Reflection.GenericParameterAttributes]::None) {
                                $WhereElements += @('new()');
                            }
                        }
                        if ($WhereElements.Count -gt 0) {
                            "`twhere $ArgName : $($WhereElements -join ', ')";
                        }
                    }
                }
                continue;
            }
            if ($Type.IsGenericType) {
                if ($PS) {
                    "$($FullName -replace '`\d+$', '')[$(($Type.GetGenericArguments() | ConvertTo-CodeTypeName -PS) -join ',')]" | Write-Output;
                } else {
                    $GenericArguments = $Type.GetGenericArguments();
                    if ($GenericArguments.Count -eq 1 -and $Type.GetGenericTypeDefinition().AssemblyQualifiedName -eq [System.Nullable`1].AssemblyQualifiedName) {
                        "$($FullName -replace '`\d+$', '')?" | Write-Output;
                    } else {
                        "$($FullName -replace '`\d+$', '')<$(($Type.GetGenericArguments() | ConvertTo-CodeTypeName) -join ',')>" | Write-Output;
                    }
                }
            } else {
                if ($PS) {
                    $FullName = [System.Management.Automation.LanguagePrimitives]::ConvertTypeNameToPSTypeName($FullName);
                    $FullName.Substring(1, $FullName.Length - 2) | Write-Output;
                } else {
                    switch ($FullName) {
                        'System.String' { 'string' | Write-Output; break; }
                        'System.Byte' { 'byte' | Write-Output; break; }
                        'System.SByte' { 'sbyte' | Write-Output; break; }
                        'System.Int16' { 'short' | Write-Output; break; }
                        'System.Int32' { 'int' | Write-Output; break; }
                        'System.Int64' { 'long' | Write-Output; break; }
                        'System.UInt16' { 'ushort' | Write-Output; break; }
                        'System.UInt32' { 'uint' | Write-Output; break; }
                        'System.UInt64' { 'ulong' | Write-Output; break; }
                        'System.Single' { 'float' | Write-Output; break; }
                        'System.Double' { 'double' | Write-Output; break; }
                        'System.Decimal' { 'decimal' | Write-Output; break; }
                        'System.Char' { 'char' | Write-Output; break; }
                        'System.Object' { 'object' | Write-Output; break; }
                        'System.Void' { 'void' | Write-Output; break; }
                        'System.ValueType' { 'struct' | Write-Output; break; }
                        default { $FullName | Write-Output; break; }
                    }
                }
            }
        }
    }
}

Function Test-MemberOverridable {
    [CmdletBinding(DefaultParameterSetName = 'Any')]
    [OutputType([string])]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [System.Reflection.MemberInfo[]]$InputMember,

        [Parameter(ParameterSetName = 'Any')]
        [switch]$Abstract,
        
        [Parameter(ParameterSetName = 'Any')]
        [switch]$Virtual,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'None')]
        [switch]$None
    )
    $InputMethod = @($InputMember | ForEach-Object {
        if ($_ -is [System.Reflection.PropertyInfo]) {
            [System.Reflection.PropertyInfo]$Property = $_;
            $m = $Property.GetGetMethod();
            if ($null -eq $m) { $_.GetSetMethod() } else { $m }
        } else {
            if ($_ -is [System.Reflection.EventInfo]) {
                [System.Reflection.EventInfo]$EventInfo = $_;
                $m = $_.GetAddMethod();
                if ($null -eq $m) { $_.GetAddMethod($true) } else { $m }
            } else {
                if ($_ -is [System.Reflection.MethodInfo]) {
                    $_ | Write-Output;
                } else {
                    $null | Write-Output;
                }
            }
        }
    });

    if ($None) {
        $InputMethod | ForEach-Object { $null -eq $_ -or -not ($_.IsAbstract -or $_.IsVirtual) }
    } else {
        if ($Virtual) {
            if ($Abstract) {
                $InputMethod | ForEach-Object { $null -ne $_ -and ($_.IsAbstract -or $_.IsVirtual) }
            } else {
                $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsVirtual }
            }
        } else {
            if ($Abstract) {
                $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsAbstract  }
            } else {
                $InputMethod | ForEach-Object { $null -ne $_ -and ($_.IsAbstract -or $_.IsVirtual) }
            }
        }
    }
}

Function Test-MemberAccess {
    [CmdletBinding(DefaultParameterSetName = 'Any')]
    [OutputType([string])]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [System.Reflection.MemberInfo[]]$InputMember,

        [Parameter(ParameterSetName = 'Access')]
        [switch]$Public,
        
        [Parameter(ParameterSetName = 'Access')]
        [switch]$Protected,
        
        [Parameter(ParameterSetName = 'Access')]
        [switch]$Internal,
        
        [Parameter(ParameterSetName = 'Access')]
        [switch]$ProtectedInternal,
        
        [Parameter(ParameterSetName = 'Access')]
        [switch]$Private
    )

    Process {
        $InputMethod = @($InputMember | ForEach-Object {
            if ($_ -is [System.Reflection.PropertyInfo]) {
                [System.Reflection.PropertyInfo]$Property = $_;
                $m = $Property.GetGetMethod();
                if ($null -eq $m) { $_.GetSetMethod() } else { $m }
            } else {
                if ($_ -is [System.Reflection.EventInfo]) {
                    [System.Reflection.EventInfo]$EventInfo = $_;
                    $m = $_.GetAddMethod();
                    if ($null -eq $m) { $_.GetAddMethod($true) } else { $m }
                } else {
                    if ($_ -is [System.Reflection.MethodBase] -or $_ -is [System.Reflection.FieldInfo] -or $_ -is [System.Reflection.Type]) {
                        $_ | Write-Output;
                    } else {
                        $null | Write-Output;
                    }
                }
            }
        });
        if ($Public) {
            if ($Protected) {
                if ($Internal) {
                    if ($ProtectedInternal) {
                        if ($Private) {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsPublic -or $_.IsFamily -or $_.IsAssembly -or $_.IsFamilyAndAssembly -or $_.IsPrivate }
                        } else {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsPublic -or $_.IsFamily -or $_.IsAssembly -or $_.IsFamilyAndAssembly }
                        }
                    } else {
                        if ($Private) {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsPublic -or $_.IsFamily -or $_.IsAssembly -or $_.IsPrivate }
                        } else {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsPublic -or $_.IsFamily -or $_.IsAssembly }
                        }
                    }
                } else {
                    if ($ProtectedInternal) {
                        if ($Private) {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsPublic -or $_.IsFamily -or $_.IsFamilyAndAssembly -or $_.IsPrivate }
                        } else {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsPublic -or $_.IsFamily -or $_.IsFamilyAndAssembly }
                        }
                    } else {
                        if ($Private) {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsPublic -or $_.IsFamily -or $_.IsPrivate }
                        } else {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsPublic -or $_.IsFamily }
                        }
                    }
                }
            } else {
                if ($Internal) {
                    if ($ProtectedInternal) {
                        if ($Private) {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsPublic -or $_.IsAssembly -or $_.IsFamilyAndAssembly -or $_.IsPrivate }
                        } else {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsPublic -or $_.IsAssembly -or $_.IsFamilyAndAssembly }
                        }
                    } else {
                        if ($Private) {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsPublic -or $_.IsAssembly -or $_.IsPrivate }
                        } else {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsPublic -or $_.IsAssembly }
                        }
                    }
                } else {
                    if ($ProtectedInternal) {
                        if ($Private) {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsPublic -or $_.IsFamilyAndAssembly -or $_.IsPrivate }
                        } else {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsPublic -or $_.IsFamilyAndAssembly }
                        }
                    } else {
                        if ($Private) {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsPublic -or $_.IsPrivate }
                        } else {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsPublic }
                        }
                    }
                }
            }
        } else {
            if ($Protected) {
                if ($Internal) {
                    if ($ProtectedInternal) {
                        if ($Private) {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsFamily -or $_.IsAssembly -or $_.IsFamilyAndAssembly -or $_.IsPrivate }
                        } else {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsFamily -or $_.IsAssembly -or $_.IsFamilyAndAssembly }
                        }
                    } else {
                        if ($Private) {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsFamily -or $_.IsAssembly -or $_.IsPrivate }
                        } else {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsFamily -or $_.IsAssembly }
                        }
                    }
                } else {
                    if ($ProtectedInternal) {
                        if ($Private) {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsFamily -or $_.IsFamilyAndAssembly -or $_.IsPrivate }
                        } else {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsFamily -or $_.IsFamilyAndAssembly }
                        }
                    } else {
                        if ($Private) {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsFamily -or $_.IsPrivate }
                        } else {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsFamily }
                        }
                    }
                }
            } else {
                if ($Internal) {
                    if ($ProtectedInternal) {
                        if ($Private) {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsAssembly -or $_.IsFamilyAndAssembly -or $_.IsPrivate }
                        } else {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsAssembly -or $_.IsFamilyAndAssembly }
                        }
                    } else {
                        if ($Private) {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsAssembly -or $_.IsPrivate }
                        } else {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsAssembly }
                        }
                    }
                } else {
                    if ($ProtectedInternal) {
                        if ($Private) {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsFamilyAndAssembly -or $_.IsPrivate }
                        } else {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsFamilyAndAssembly }
                        }
                    } else {
                        if ($Private) {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsPrivate }
                        } else {
                            $InputMethod | ForEach-Object { $null -ne $_ -and $_.IsPublic -or $_.IsFamily }
                        }
                    }
                }
            }
        }
    }
}

Function Get-MethodOverrideCode {
    [CmdletBinding(DefaultParameterSetName = 'Type')]
    [OutputType([string])]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true, ParameterSetName = 'Type')]
        [System.Type]$Type,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'MethodInfo')]
        [ValidateScript({ $_ | Test-MemberAccess })]
        [System.Reflection.MethodInfo]$MethodInfo
    )
    
    Process {
        if ($PSCmdlet.ParameterSetName -eq 'Type') {
            ($Type.GetMethods(([System.Reflection.BindingFlags]([System.Reflection.BindingFlags]::NonPublic -bor [System.Reflection.BindingFlags]::Public -bor [System.Reflection.BindingFlags]::Instance))) | Where-Object {
                (-not $_.IsSpecialName) -and $_ | Test-MemberAccess
            } | Sort-Object -Property 'Name') | ForEach-Object {
                Get-MethodOverrideCode -MethodInfo $_;
            }
        } else {
            $Accessor = $null;
            if ($MethodInfo.IsPublic) {
                $Accessor = 'public';
            } else {
                if ($MethodInfo.IsFamily) { $Accessor = 'protected' }
            }
            if ($null -ne $Accessor) {
                $argParamText = '';
                $argNameText = '';
                $Parameters = $MethodInfo.GetParameters();
                if ($Parameters.Length -gt 0) {
                    $argNameText = ($Parameters | ForEach-Object { $_.Name }) -join ', ';
                    $argParamText = ($Parameters | ForEach-Object {
                        if ($_.IsOut) {
                            "[out]$($_.ParameterType | ConvertTo-CodeTypeName) $($_.Name)";
                        } else {
                            if ($_.IsIn) {
                                "[in]$($_.ParameterType | ConvertTo-CodeTypeName) $($_.Name)";
                            } else {
                                if ($_.ParameterType.IsByRef) {
                                    "[ref]$($_.ParameterType.GetElementType() | ConvertTo-CodeTypeName) $($_.Name)";
                                } else {
                                    if ($_.IsOptional) {
                                        "$($_.ParameterType | ConvertTo-CodeTypeName) $($_.Name)?";
                                    } else {
                                        "$($_.ParameterType | ConvertTo-CodeTypeName) $($_.Name)";
                                    }
                                }
                            }
                        }
                    }) -join ', ';
                }
                $ReturnType = $MethodInfo.ReturnType | ConvertTo-CodeTypeName;
                $ConstraintLines = @();
                $MethodName = $MethodInfo.Name;
                if ($MethodInfo.IsGenericMethod) { $MethodName = $MethodName -replace '`\d+$', '' }
                $MethodInvoke = $MethodName;
                if ($MethodInfo.IsGenericMethodDefinition) {
                    $GenericArguments = $MethodInfo.GetGenericArguments();
                    $MethodName = "$MethodName<$(($GenericArguments | ForEach-Object { $_.Name }) -join ',')>"
                    $ConstraintLines = @($GenericArguments | ForEach-Object {
                        $Constraints = $_.GetGenericParameterConstraints();
                        $ArgName = $_.Name;
                        $WhereElements = @();
                        if ($Constraints.Length -gt 0) {
                            if ($PS) {
                                $WhereElements = @($Constraints | ConvertTo-CodeTypeName -PS);
                            } else {
                                $WhereElements = @($Constraints | ConvertTo-CodeTypeName);
                            }
                        }
                        if (([System.Reflection.GenericParameterAttributes]::NotNullableValueTypeConstraint -band $_.GenericParameterAttributes) -ne [System.Reflection.GenericParameterAttributes]::None) {
                            $WhereElements += @('struct');
                        } else {
                            if (([System.Reflection.GenericParameterAttributes]::ReferenceTypeConstraint -band $_.GenericParameterAttributes) -ne [System.Reflection.GenericParameterAttributes]::None) {
                                $WhereElements += @('class');
                            }
                            if (([System.Reflection.GenericParameterAttributes]::DefaultConstructorConstraint -band $_.GenericParameterAttributes) -ne [System.Reflection.GenericParameterAttributes]::None) {
                                $WhereElements += @('new()');
                            }
                        }
                        if ($WhereElements.Count -gt 0) { "where $ArgName : $($WhereElements -join ', ')" }
                    });
                }
                $overrideCode = 'new';
                if ($MethodInfo.IsAbstract -or $MethodInfo.IsVirtual) { $overrideCode = 'override' }
                "$Accessor $overrideCode $ReturnType $MethodName($argParamText)";
                $ConstraintLines | ForEach-Object { "`t$_" }
                '{';
                if ($ReturnType -eq 'void') {
                    "`tbase.$MethodInvoke($argNameText);";
                } else {
                    "`treturn base.$MethodInvoke($argNameText);";
                }
                '}';
            }
        }
    }
}

Function Get-PropertyOverrideCode {
    [CmdletBinding(DefaultParameterSetName = 'Type')]
    [OutputType([string])]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true, ParameterSetName = 'Type')]
        [System.Type]$Type,
        
        [Parameter(Mandatory = $true, ParameterSetName = 'PropertyInfo')]
        [ValidateScript({ $_ | Test-MemberAccess })]
        [System.Reflection.PropertyInfo]$PropertyInfo
    )
    
    Process {
        if ($PSCmdlet.ParameterSetName -eq 'Type') {
            ($Type.GetProperties(([System.Reflection.BindingFlags]([System.Reflection.BindingFlags]::NonPublic -bor [System.Reflection.BindingFlags]::Public -bor [System.Reflection.BindingFlags]::Instance))) | Where-Object {
                $_ | Test-MemberAccess
            } | Sort-Object -Property 'Name') | ForEach-Object {
                Get-PropertyOverrideCode -PropertyInfo $_;
            }
        } else {
            [System.Reflection.MethodInfo]$GetMethod = $PropertyInfo.GetGetMethod();
            [System.Reflection.MethodInfo]$SetMethod = $PropertyInfo.GetSetMethod();
            $PropertyAccessor = $null;
            $GetterAccess = $null;
            $SetterAccess = $null;
            if ($GetMethod -ne $null) {
                if ($GetMethod.IsPublic) {
                    $GetterAccess = 'public ';
                } else {
                    if ($GetMethod.IsFamily) {
                        $GetterAccess = 'protected ';
                    }
                }
            } else {
                $GetMethod = $SetMethod;
            }
            if ($SetMethod -ne $null) {
                if ($SetMethod.IsPublic) {
                    $SetterAccess = 'public ';
                } else {
                    if ($SetMethod.IsFamily) {
                        $SetterAccess = 'protected ';
                    }
                }
            }
            if ($null -ne $SetterAccess) {
                if ($null -ne $GetterAccess) {
                    if ($GetterAccess -eq $SetterAccess) {
                        $PropertyAccessor = $GetterAccess;
                        $GetterAccess = '';
                        $SetterAccess = '';
                    } else {
                        if ($GetterAccess -eq 'public ') {
                            $PropertyAccessor = $GetterAccess;
                            $GetterAccess = '';
                        } else {
                            $PropertyAccessor = $SetterAccess;
                            $SetterAccess = '';
                        }
                    }
                } else {
                    $PropertyAccessor = $SetterAccess;
                    $SetterAccess = '';
                }
            } else {
                if ($null -ne $GetterAccess) {
                    $PropertyAccessor = $GetterAccess;
                    $GetterAccess = '';
                }
            }
            $OverrideAccess = 'new';
            if ($GetMethod.IsAbstract -or $GetMethod.IsVirtual) { $OverrideAccess = 'override' }
            if ($null -ne $PropertyAccessor) {
                "$($PropertyAccessor)$OverrideAccess $($PropertyInfo.PropertyType | ConvertTo-CodeTypeName) $($PropertyInfo.Name)";
                '{';
                if ($null -ne $GetterAccess) {
                    "`t$($GetterAccess)get { return base.$($PropertyInfo.Name); }";
                }
                if ($null -ne $SetterAccess) {
                    "`t$($SetterAccess)set { base.$($PropertyInfo.Name) = value; }";
                }
                '}';
            }
        }
    }
}

Function Get-ConstructorCode {
    [CmdletBinding()]
    [OutputType([string])]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [System.Type]$Type,

        [string]$ConstructorName
    )
    
    Process {
        if (-not $PSBoundParameters.ContainsKey('ConstructorName')) {
            $ConstructorName = $Type | ConvertTo-CodeTypeName -NameOnly;
        }
        ($Type.GetConstructors(([System.Reflection.BindingFlags]([System.Reflection.BindingFlags]::NonPublic -bor [System.Reflection.BindingFlags]::Public -bor [System.Reflection.BindingFlags]::Instance))) | Where-Object {
            $_.IsFamily -or $_.IsPublic
        } | Sort-Object -Property 'Name') | ForEach-Object {
            $accessor = $null;
            if ($_.IsPublic) {
                $accessor = 'public';
            } else {
                if ($_.IsFamily) { $accessor = 'protected' }
            }
            if ($null -ne $accessor) {
                $Parameters = $_.GetParameters();
                if ($Parameters.Length -eq 0) {
                    "$accessor $ConstructorName() { }";
                } else {
                    "$accessor $ConstructorName($(($Parameters | ForEach-Object {
                        if ($_.IsOut) {
                            "[out]$($_.ParameterType | ConvertTo-CodeTypeName) $($_.Name)";
                        } else {
                            if ($_.IsIn) {
                                "[in]$($_.ParameterType | ConvertTo-CodeTypeName) $($_.Name)";
                            } else {
                                if ($_.ParameterType.IsByRef) {
                                    "[ref]$($_.ParameterType.GetElementType() | ConvertTo-CodeTypeName) $($_.Name)";
                                } else {
                                    if ($_.IsOptional) {
                                        "$($_.ParameterType | ConvertTo-CodeTypeName) $($_.Name)?";
                                    } else {
                                        "$($_.ParameterType | ConvertTo-CodeTypeName) $($_.Name)";
                                    }
                                }
                            }
                        }
                    }) -join ', '))";
                    "`t: base($(($Parameters | ForEach-Object { $_.Name }) -join ', '))";
                    '{';
                    '}';
                }
            }
        }
    }
}

Function Get-MethodUsageCode {
    [CmdletBinding()]
    [OutputType([string])]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [System.Reflection.MethodInfo[]]$InputMethods,
        
        [AllowEmptyString()]
        [string]$VarName,
        
        [string]$ClassName,
        
        [switch]$PS
    )
    
    Process {
        foreach ($__MethodInfo in $InputMethods) {
            [System.Reflection.MethodInfo]$MethodInfo = $__MethodInfo;
            if (-not $PSBoundParameters.ContainsKey('VarName')) {
                $VarName = $MethodInfo.DeclaringType | ConvertTo-CodeTypeName -NameOnly;
                if ($PS) { $VarName = "`$$VarName" }
            } else {
                if ($PS -and $VarName.Length -eq 0) { $VarName = "`$$($MethodInfo.DeclaringType | ConvertTo-CodeTypeName -NameOnly)" }
            }
            if (-not $PSBoundParameters.ContainsKey('ClassName')) {
                if ($PS) {
                    $ClassName = "[$($MethodInfo.DeclaringType | ConvertTo-CodeTypeName -PS)]";
                } else {
                    $ClassName = $MethodInfo.DeclaringType | ConvertTo-CodeTypeName;
                }
            }
            $Parameters = $MethodInfo.GetParameters() | ForEach-Object {
                $p = @{ Name = $_.Name; IsOptional = $_.IsOptional };
                if ($PS) {
                    $p['Type'] = $_.ParameterType | ConvertTo-CodeTypeName -PS;
                } else {
                    $p['Type'] = $_.ParameterType | ConvertTo-CodeTypeName;
                }
                if ($_.IsOut) {
                    $p['Decorator'] = '[out]';
                } else {
                    if ($_.IsIn) {
                        if ($PS) { $p['Decorator'] = '[out]' } else { $p['decorator'] = '[in]' };
                    } else {
                        if ($_.ParameterType.IsByRef) {
                            if ($PS) { $p['Decorator'] = '[out]' } else { $p['decorator'] = '[ref]' };
                        }
                    }
                }
                New-Object -TypeName 'System.Management.Automation.PSObject' -Property $p;
            }
            if ($PS) {
                $Parameters | ForEach-Object {
                    "[$($_.Type)]`$$($_.Name);";
                }
            } else {
                $Parameters | ForEach-Object {
                    "$($_.Type) $($_.Name);";
                }
            }
            $ReturnType = 'void';
            $ReturnCode = $MethodInfo.ReturnType | ConvertTo-CodeTypeName -NameOnly;
            if ($PS) {
                $ReturnType = $MethodInfo.ReturnType | ConvertTo-CodeTypeName;
            } else {
                $ReturnType = $MethodInfo.ReturnType | ConvertTo-CodeTypeName -PS;
            }
            if ($ReturnType -ne 'void') {
                if ($PS) {
                    $ReturnCode = "[$ReturnType]$`$$ReturnVar";
                } else {
                    $ReturnCode = "$ReturnType $ReturnVar";
                }
            } else {
                $ReturnCode = '';
            }
            $RefCode = '';
            if ($MethodInfo.IsStatic) {
                if ($PS) {
                    $RefCode = "$ClassName`::";
                } else {
                    $RefCode = "$ClassName.";
                }
            } else {
                if ($VarName.Length -gt 0) { $RefCode = "$VarName." }
            }
            if ($ReturnCode.Length -gt 0) { $RefCode = "$ReturnCode = $RefCode$($MethodInfo.Name)" } else { $RefCode = "$RefCode$($MethodInfo.Name)" }

            if ($MethodInfo.IsGenericMethodDefinition) {
                $RefCode = $RefCode -replace '`\d+$', '';
                $GenericArguments = $MethodInfo.GetGenericArguments();
                $ConstraintLines = @($GenericArguments | ForEach-Object {
                    $Constraints = $_.GetGenericParameterConstraints();
                    $ArgName = $_.Name;
                    $WhereElements = @();
                    if ($Constraints.Length -gt 0) {
                        if ($PS) {
                            $WhereElements = @($Constraints | ConvertTo-CodeTypeName -PS);
                        } else {
                            $WhereElements = @($Constraints | ConvertTo-CodeTypeName);
                        }
                    }
                    if (([System.Reflection.GenericParameterAttributes]::NotNullableValueTypeConstraint -band $_.GenericParameterAttributes) -ne [System.Reflection.GenericParameterAttributes]::None) {
                        $WhereElements += @('struct');
                    } else {
                        if (([System.Reflection.GenericParameterAttributes]::ReferenceTypeConstraint -band $_.GenericParameterAttributes) -ne [System.Reflection.GenericParameterAttributes]::None) {
                            $WhereElements += @('class');
                        }
                        if (([System.Reflection.GenericParameterAttributes]::DefaultConstructorConstraint -band $_.GenericParameterAttributes) -ne [System.Reflection.GenericParameterAttributes]::None) {
                            $WhereElements += @('new()');
                        }
                    }
                    if ($WhereElements.Count -gt 0) { "where $ArgName : $($WhereElements -join ', ')" }
                });
                if ($PS) {
                    $RefCode = "$RefCode[$(($GenericArguments | ForEach-Object { $_.Name }) -join ',')]";
                    $ConstraintLines | ForEach-Object { "# $_" }
                } else {
                    $RefCode = "$RefCode<$(($GenericArguments | ForEach-Object { $_.Name }) -join ',')>";
                    $ConstraintLines | ForEach-Object { "// $_" }
                }
            }
            if ($PS) {
                "$RefCode($(($Parameters | ForEach-Object { if ($null -eq $_.Decorator) { "`$$($_.Name)" } else { "$($_.Decorator)`$$($_.Name)" } }) -join ', '));";
            } else {
                "$RefCode($(($Parameters | ForEach-Object { if ($null -eq $_.Decorator) { $_.Name } else { "$($_.Decorator)$($_.Name)" } }) -join ', '));";
            }
        }
    }
}

Function Get-TypeUsage {
    [CmdletBinding(DefaultParameterSetName = 'CS')]
    [OutputType([string])]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true, Position = 0)]
        [System.Type[]]$InputType,

        [Parameter(Mandatory = $true, ParameterSetName = 'PS')]
        [switch]$PS,
        
        [Parameter(ParameterSetName = 'CS')]
        [switch]$CS,
        
        [Parameter(ParameterSetName = 'CS')]
        [string]$InheritingClassName
    )

    foreach ($Type in $InputType) {
        if (-not $PS) {
            $FullName = $Type | ConvertTo-CodeTypeName;
            if ($PSBoundParameters.ContainsKey('InheritingClassName') -and -not $Type.IsSealed) {
                if ($Type.IsGenericTypeDefinition) {
                    "public class $InheritingClassName<$(($Type.GetGenericArguments() | ForEach-Object { $_.Name }) -join ',')> : $FullName"
                        ($Type.GetGenericTypeDefinition() | ConvertTo-CodeTypeName -IncludeConstraints) | Select-Object -Skip 1
                } else {
                    "public class $InheritingClassName : $FullName";
                }
                '{';
                
                ($Type.GetProperties(([System.Reflection.BindingFlags]([System.Reflection.BindingFlags]::NonPublic -bor [System.Reflection.BindingFlags]::Public -bor [System.Reflection.BindingFlags]::Instance))) | Sort-Object -Property 'Name') | ForEach-Object {
                    if ($_ | Test-MemberAccess) {
                        if ($_ | Test-MemberOverridable -Abstract) {
                            (Get-PropertyOverrideCode -PropertyInfo $_) | ForEach-Object { "`t$_" }
                        } else {
                            if ($_ | Test-MemberOverridable -Virtual) {
                                (Get-PropertyOverrideCode -PropertyInfo $_) | ForEach-Object { "`t// $_" }
                            }
                        }
                    }
                }

                ($Type | Get-ConstructorCode -ConstructorName $InheritingClassName) | ForEach-Object { "`t$_" }
                
                ($Type.GetMethods(([System.Reflection.BindingFlags]([System.Reflection.BindingFlags]::NonPublic -bor [System.Reflection.BindingFlags]::Public -bor [System.Reflection.BindingFlags]::Instance))) | Sort-Object -Property 'Name') | ForEach-Object {
                    if ((-not $_.IsSpecialName) -and ($_ | Test-MemberAccess)) {
                        if ($_ | Test-MemberOverridable -Abstract) {
                            (Get-MethodOverrideCode -MethodInfo $_) | ForEach-Object { "`t$_" }
                        } else {
                            if ($_ | Test-MemberOverridable -Virtual) {
                                (Get-MethodOverrideCode -MethodInfo $_) | ForEach-Object { "`t// $_" }
                            }
                        }
                    }
                }
                $Names = @();
                (@(@($Type.GetMethods(([System.Reflection.BindingFlags]([System.Reflection.BindingFlags]::NonPublic -bor [System.Reflection.BindingFlags]::Public -bor [System.Reflection.BindingFlags]::Instance)))) + @($Type.GetMethods(([System.Reflection.BindingFlags]([System.Reflection.BindingFlags]::NonPublic -bor [System.Reflection.BindingFlags]::Public -bor [System.Reflection.BindingFlags]::Static))))) | Sort-Object -Property 'Name') | Where-Object {
                    (-not $_.IsSpecialName) -and ($_ | Test-MemberAccess -Public -Protected);
                } | ForEach-Object {
                    $bn = "Example$($_.Name -replace '`\d+$', '')Invocation";
                    $n = $bn;
                    $i = 0;
                    while ($Names -ccontains $n) {
                        $i++;
                        $n = "$bn$i";
                    }
                    $Names += @($n);
                    "`t// void $n()";
                    "`t// {";
                    ($_ | Get-MethodUsageCode -VarName '' -ClassName $InheritingClassName) | ForEach-Object { "`t// `t$_" }
                    "`t// }";
                }
                '}';
            } else {
                if ($PS) {
                    ($Type.GetMethods() | Sort-Object -Property 'Name') | Get-MethodUsageCode -PS;
                } else {
                    ($Type.GetMethods() | Sort-Object -Property 'Name') | Get-MethodUsageCode;
                }
            }
        }
    }
}

$Type = [System.Data.DataRow];
$Type | Get-TypeUsage -InheritingClassName 'ProductDataRow';