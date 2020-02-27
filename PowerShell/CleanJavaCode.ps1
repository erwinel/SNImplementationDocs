$Source = [System.Windows.Clipboard]::GetText();
<#
com.snc.undelete
com.snc.sc_catalog_manager?
#>
$MethodRegex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList (@'
^[\r\n\s]*
(?<n>[^(\r\n;={}@]+)
(?<f>\((?<a>[^)\r\n]+)?\))?
'@ -replace '[\r\n\s]+', '');
$m = $MethodRegex.Match('public abstract class Transaction implements ITransactionConstants, com.glide.util.IProperties, IJellyConstants, com.glide.util.ICancellable, IRunnableTransaction {'); $m.Success; $m.Groups['f'].Success; $m.Groups['n'].Success
$StartFoldRegex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList '([\r\n\s]+)?//\s+<editor-fold(\s+[^\s>]|\s*>)';
$EndFoldRegex = New-Object -TypeName 'System.Text.RegularExpressions.Regex' -ArgumentList '^[\r\n\s]*//\s+</editor-fold';
$FoldIndent = $null;
$InFunction = $False;
$IsPublic = $false;
$Result = New-Object -TypeName 'System.Text.StringBuilder';
$BlankLineEmitted = $false;
($Source -split '\r\n?|\n') | ForEach-Object {
    if ($null -eq $FoldIndent) {
        $m = $StartFoldRegex.Match($_);
        if ($m.Success) {
            if ($m.Groups[1].Success) {
                $FoldIndent = $m.Groups[1].Value;
            } else {
                $FoldIndent = '';
            }
        } else {
            if ($InFunction) {
                if ($_.Trim() -eq '}') {
                    $InFunction = $false;
                    if ($IsPublic) {
                        $Result.AppendLine($_) | Out-Null;
                        $BlankLineEmitted = $false;
                    }
                }
            } else {
                $m = $MethodRegex.Match($_);
                if ($m.Success) {
                    $InFunction = $m.Groups['f'].Success;
                    $a = @(($m.Groups['n'].Value.Trim() -split '\s+') | Select-Object -SkipLast 1);
                    $IsPublic = $a.Count -gt 0 -and ($a -ccontains 'import' -or $a -ccontains 'class' -or $a -ccontains 'enum' -or $a -ccontains 'interface' -or ($a -ccontains 'public' -and ($a -cnotcontains 'static' -or -not $InFunction)));
                    if ($IsPublic) {
                        $Result.AppendLine($_) | Out-Null;
                        $BlankLineEmitted = $false;
                    }
                } else {
                    if ($_.Trim().Length -gt 0) {
                        $Result.AppendLine($_) | Out-Null;
                        $BlankLineEmitted = $false;
                    } else {
                        if (-not $BlankLineEmitted) {
                            $Result.AppendLine($_) | Out-Null;
                            $BlankLineEmitted = $true;
                        }
                    }
                }
            }
        }
    } else {
        if ($EndFoldRegex.IsMatch($_)) {
            if ($InFunction) {
                if ($IsPublic) {
                    $Result.Append($FoldIndent).AppendLine('throw new UnsupportedOperationException();') | Out-Null;
                    $BlankLineEmitted = $false;
                }
            } else {
                if (-not $BlankLineEmitted) {
                    $Result.AppendLine() | Out-Null;
                    $BlankLineEmitted = $true;
                }
            }
            $FoldIndent = $null;
        }
    }
}
[System.Windows.Clipboard]::SetText($Result.ToString());
$Result.ToString()