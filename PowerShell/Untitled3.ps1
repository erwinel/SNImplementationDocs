[Uri]$Uri = $null;
if ([Uri]::TryCreate([System.Windows.Clipboard]::GetText(), [UriKind]::Absolute, [ref]$Uri)) {
    $UriBuilder = [UriBuilder]::new($Uri);
    [string]$Path = [Uri]::UnescapeDataString((($UriBuilder.Query -replace '^\?', '').Split('&') | Where-Object { $_.StartsWith('uri=') }).Substring(4));
    $i = $Path.IndexOf('#');
    $Fragment = $Query = '';
    if ($i -ge 0) {
        $Fragment = $Path.Substring($i + 1);
        $Path = $Path.Substring(0, $i);
    }
    $i = $Path.IndexOf('?');
    if ($i -ge 0) {
        $Query = $Path.Substring($i + 1);
        $Path = $Path.Substring(0, $i);
    }
    $UriBuilder.Fragment = $Fragment;
    $UriBuilder.Query = $Query;
    $UriBuilder.Path = $Path;
    $UriBuilder.Uri.ToString();
    $PathQueryAndFragment = $UriBuilder.Uri.GetComponents(([System.UriComponents]([System.UriComponents]::PathAndQuery -bor [System.UriComponents]::Fragment)), [System.UriFormat]::UriEscaped);
    $UriBuilder.Fragment = $UriBuilder.Query = '';
    @"
             Path: $Path
            Query: $Query
"@;
    if ($Query.Length -gt 0) {
        $i = 0;
        $Query.Split('&') | ForEach-Object { "                   $_" }
    }
    @"
         Fragment: $Fragment
    Base and Path: $($UriBuilder.Uri.ToString())
"@;
    $UriBuilder.Path = '';
    @"
         Base URI: $($UriBuilder.Uri.ToString())
         Nav Link: <sn-nav-link path-nodes="" href="$Path" to-nav="true"></sn-nav-link>
                   <sn-nav-link path-nodes="" href="$PathQueryAndFragment" to-nav="true"></sn-nav-link>
         Cfg Link: <a:config-link base="sn" href="$Path" to-nav="true"><var class="targetName"></var></a:config-link>
                   <a:config-link base="sn" href="$PathQueryAndFragment" to-nav="true"><var class="targetName"></var></a:config-link>
"@;
} else {
    Write-Warning -Message 'Clipboard did not contain a valid absolute URI';
}
