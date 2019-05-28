Add-Type -AssemblyName 'System.Web.Extensions' -ErrorAction Stop;
@('PageManager.dll', 'HtmlAgilityPack.dll') | ForEach-Object { Add-Type -Path (($PSScriptRoot | Join-Path -ChildPath 'PageManager\bin\Debug') | Join-Path -ChildPath $_) -ErrorAction Stop }

$Script:WebsiteRoot = (($PSScriptRoot | Join-Path -ChildPath 'gh-pages') | Resolve-Path).Path;



[PageManager.AppConfigData]$AppConfigData = $null;
$ConfigPath = $Script:WebsiteRoot | Join-Path -ChildPath 'appConfigData.json';
$ConfigPath;
if ($ConfigPath | Test-Path) {
    $AppConfigData = [PageManager.AppConfigData]::Load($ConfigPath);
} else {
    $AppConfigData = [PageManager.AppConfigData]::new();
}
if ($null -ne $AppConfigData) {
    ($Script:WebsiteRoot | Get-ChildItem -Exclude 'downloads', 'images', 'lib', 'Template' -Directory);

}

if (-not ($ConfigPath | Test-Path)) { $AppConfigData.Save($ConfigPath) }
