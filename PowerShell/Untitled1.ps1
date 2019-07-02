﻿@(
    @('administrative session', [bool], 0, $true, 'When connecting to the remote computer, use the administrative session'),
    @('allow desktop composition', [int], 0, $false),
    @('allow font smoothing', [int], 0, $false),
    @('alternate shell', [string], '', $false),
    @('alternate full address', [string], '', $true, 'Alternate name or IP address of the remote computer that you want to connect to'),
    @('audioCaptureMode', [bool], 0, $false, 'Capture audio from the local computer and send to the remote computer'),
    @('audioMode', [int], 0, $false, '0=Play on this computer;1=Play on remote computer;2=Do not play'),
    @('audioQualityMode', [int], 0, $true, '0=Dynamically adjust audio quality based on available bandwidth;1=Always use medium audio quality;2=Always use uncompressed audio quality'),
    @('authenticationLevel', [int], 0, $false),
    @('autoReconnection enabled', [bool], 0, $false),
    @('autoReconnect max retries', [int], 0, $true),#
    @('bandwidthAutoDetect', [int], 0, $false),
    @('bitmapCachePersistEnable', [bool], 0, $false),
    @('bitmapCacheSize', [int], 0, $false),
    @('compression', [bool], 0, $false),
    @('connection type', [int], 0, $false),
    @('connectToConsole', [bool], 0, $false),
    ####@('connect to console', [int], 0, $false),
    @('desktopHeight', [int], 0, $false),#
    #@('desktopSizeId', [int], 0, $true),
    @('desktopWidth', [int], 0, $false),#
    @('devicesToRedirect', [string[]], ([string[]]@()), $false),
    @('disable cursor setting', [bool], 0, $false),
    @('disable full window drag', [bool], 0, $false),
    @('disable menu anims', [bool], 0, $false),
    @('disable themes', [bool], 0, $false),
    @('disable wallpaper', [bool], 0, $false),
    @('disableClipboardRedirection', [bool], 0, $true),
    #@('disableConnectionSharing', [int], 0, $true),
    @('disable ctrl+alt+del', [bool], 0, $true),#
    @('disablePrinterRedirection', [bool], 0, $true),
    #@('disableRemoteAppCapsCheck', [int], 0, $true),
    @('displayConnectionBar', [bool], 0, $false),
    @('domain', [string], '', $true),
    #@('drivesToRedirect', [string], '', $true),
    @('enableCredSSPSupport', [bool], 0, $true),
    #@('enableSuperSpan', [int], 0, $true),
    #@('enableWorkspaceReconnect', [int], 0, $false),
    @('full address', [string], '', $false),
    #@('gatewayAccessToken', [string], '', $true),
    @('gatewayBrokeringType', [int], 4, $false),
    @('gatewayCredentialsSource', [int], 0, $false),
    @('gatewayHostname', [string], '', $false),
    @('gatewayProfileUsageMethod', [int], 0, $false),
    @('gatewayUsageMethod', [int], 0, $false),
    @('kdcProxyName', [string], '', $false),
    @('keyboardHook', [int], 0, $false),
    @('load balance info', [string], '', $true),
    @('negotiate security layer', [bool], 0, $false),
    @('networkAutoDetect', [int], 0, $false),
    #@('password', [string], '', $true),
    #@('password51', [byte[]], ([byte[]]@()), $true),
    @('pinConnectionBar', [bool], 0, $true),
    #@('preconnectionBlob', [string], '', $true),
    @('prompt for credentials', [bool], 0, $false),
    @('prompt for credentials on client', [bool], 0, $true),
    @('promptCredentialOnce', [int], 0, $false),
    @('promptForCredentialsOnce', [int], 0, $true),
    #@('publicMode', [int], 0, $true),
    @('rdgIsKdcProxy', [int], 0, $false),
    @('redirectClipboard', [bool], 0, $false),
    @('redirectComPorts', [bool], 0, $false),
    @('redirectDirectX', [int], 0, $true),
    @('redirectDrives', [bool], 0, $true),
    @('redirectPosDevices', [int], 0, $false),
    @('redirectPrinters', [bool], 0, $false),
    @('redirectSmartCards', [bool], 0, $false),
    #@('remoteApplicationCmdLine', [string], '', $true),
    #@('remoteApplicationExpandCmdLine', [int], 0, $true),
    #@('remoteApplicationExpandWorkingDir', [int], 0, $true),
    #@('remoteApplicationFile', [string], '', $true),
    #@('remoteApplicationGuid', [string], '', $true),
    #@('remoteApplicationIcon', [string], '', $true),
    #@('remoteApplicationMode', [int], 0, $true),
    #@('remoteApplicationName', [string], '', $true),
    #@('remoteApplicationProgram', [string], '', $true),
    @('screen mode id', [int], 0, $false),
    @('server port', [int], 0, $true),
    @('session bpp', [int], 0, $false),
    @('shell working directory', [string], '', $false),
    @('smart sizing', [bool], 0, $true),
    @('span monitors', [bool], 0, $true),
    #@('superSpanAccelerationFactor', [int], 0, $true),
    @('usbDevicesToRedirect', [string[]], ([string[]]@()), $true),
    @('use multiMon', [bool], 0, $false),
    @('use redirection server name', [int], 0, $false),
    @('username', [string], '', $false),
    @('videoPlaybackMode', [bool], 0, $false, 'Use RDP efficient multimedia streaming for video playback when possible'),
    @('winPosStr', [string], '', $false),
    @('workspace id', [string], 0, $true)
);