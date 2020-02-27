$InputPath = 'C:\Users\lerwi\Downloads\temp.rtf';
$OutputPath = 'C:\Users\lerwi\Downloads\temp.html';
if ([System.Windows.Clipboard]::ContainsText([System.Windows.TextDataFormat]::Rtf)) {
    $RtfText = [System.Windows.Clipboard]::GetText([System.Windows.TextDataFormat]::Rtf);
    [System.IO.File]::WriteAllText($InputPath, $RtfText);
    $wrd = new-object -com word.application 
 
    # Make Word Visible 
    $wrd.visible = $true 
 
    # Open a document  
    $doc = $wrd.documents.open($InputPath) ;

    $opt = [Microsoft.Office.Interop.Word.WdSaveFormat]::wdFormatHTML;
    $wrd.ActiveDocument.Saveas([ref]$OutputPath,[ref]$opt)

    # Close and go home
    $wrd.Quit()
} else {
    if ([System.Windows.Clipboard]::ContainsText([System.Windows.TextDataFormat]::Html)) {
        $HtmlText = [System.Windows.Clipboard]::GetText([System.Windows.TextDataFormat]::Rtf);
    } else {
    }
}