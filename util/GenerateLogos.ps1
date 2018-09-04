# Use this script to build the downloadable logo images.

# These colors should be the same as the definitions for the css.$navpage-header-bg defined in the "Initial Army Config" fix script
# included in the "Initial Update Set" update set.
$ColorBackgrounds = @(
    @{ Suffix = 'sb'; BG = '9681d5'},
    @{ Suffix = 'dev'; BG = '2a5b1a'},
    @{ Suffix = 'test'; BG = '1a2a5b' },
    @{ Suffix = 'uat'; BG = '1a2a5b' },
    @{ Suffix = 'prod'; BG = '5b1a1a' }
);
$RelativeOutputPath = '..\src\assets\downloads\Logo';

$OutputFolder = $PSScriptRoot | Join-Path -ChildPath $RelativeOutputPath;

$SNImage = [System.Drawing.Image]::FromFile(($PSScriptRoot | Join-Path -ChildPath 'snc-logo-reverse.png'));
$OutputHeight = ($SNImage.Height + 10) * 2;
$OutputWidth = ($SNImage.Width + $OutputHeight - 10) * 2;
$ResizedClaymoreBitmap = [System.Drawing.Bitmap]::new($OutputHeight, $OutputHeight, $SNImage.PixelFormat);
$ClaymoreImage = [System.Drawing.Image]::FromFile(($PSScriptRoot | Join-Path -ChildPath 'CLAYMORE LOGO.jpg'));
$Graphics = [System.Drawing.Graphics]::FromImage($ResizedClaymoreBitmap);
$Graphics.DrawImage($ClaymoreImage, [System.Drawing.Rectangle]::new(0, 0, $OutputHeight, $OutputHeight), [System.Drawing.Rectangle]::new(0, 0, $ClaymoreImage.Width - 10, $ClaymoreImage.Height - 10), [System.Drawing.GraphicsUnit]::Pixel);
$Graphics.Flush();
$ClaymoreImage.Dispose();
$Graphics.Dispose();
$ColorBackgrounds | ForEach-Object {
    $BgColor = [System.Drawing.Color]::FromArgb([int]::Parse($_.BG.Substring(0, 2), [System.Globalization.NumberStyles]::HexNumber), [int]::Parse($_.BG.Substring(2, 2), [System.Globalization.NumberStyles]::HexNumber), [int]::Parse($_.BG.Substring(4, 2), [System.Globalization.NumberStyles]::HexNumber));
    $Brush = [System.Drawing.SolidBrush]::new($BgColor);
    $DoubleSizeBitmap = [System.Drawing.Bitmap]::new($OutputWidth, $OutputHeight, $SNImage.PixelFormat);
    $Graphics = [System.Drawing.Graphics]::FromImage($DoubleSizeBitmap);
    $Graphics.FillRectangle($Brush, 0, 0, $OutputWidth, $OutputHeight);
    $TextureBrush = [System.Drawing.TextureBrush]::new($ResizedClaymoreBitmap, [System.Drawing.Drawing2D.WrapMode]::Clamp);
    $Graphics.FillEllipse($TextureBrush, 0, 0, $OutputHeight, $OutputHeight);
    $Graphics.Flush();
    $Graphics.Dispose();
    $NormalSizeBitmap = [System.Drawing.Bitmap]::new($OutputWidth / 2, $OutputHeight / 2, $SNImage.PixelFormat);
    $Graphics = [System.Drawing.Graphics]::FromImage($NormalSizeBitmap);
    $Graphics.DrawImage($DoubleSizeBitmap, [System.Drawing.Rectangle]::new(0, 0, $OutputWidth / 2, $OutputHeight / 2), [System.Drawing.Rectangle]::new(0, 0, $OutputWidth, $OutputHeight), [System.Drawing.GraphicsUnit]::Pixel);
    $Graphics.DrawImage($SNImage, [System.Drawing.Rectangle]::new(($OutputHeight / 2) + 10, 5, $SNImage.Width, $SNImage.Height), [System.Drawing.Rectangle]::new(0, 0, $SNImage.Width, $SNImage.Height), [System.Drawing.GraphicsUnit]::Pixel);
    $Graphics.Flush();
    $Graphics.Dispose();
    $DoubleSizeBitmap.Dispose();
    $NormalSizeBitmap.Save(($OutputFolder | Join-Path -ChildPath "logo_army_$($_.Suffix).png"), [System.Drawing.Imaging.ImageFormat]::Png);
    $NormalSizeBitmap.Dispose();
}
$ResizedClaymoreBitmap.Dispose();