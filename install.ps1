# dsh-ds-balance installer for Windows (PowerShell).
# Usage:
#   .\install.ps1                        # install to default location (%USERPROFILE%\.dsh, web profile)
#   .\install.ps1 -DshHome C:\path\.dsh -Profile web
# Requires PowerShell 5.1+ (ships with Windows 10/11); no admin rights needed.
# After install: restart `dsh web` (Ctrl+C, then run `dsh web` again) and refresh the browser.
param(
    [string]$DshHome = "",
    [string]$Profile = "web"
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrEmpty($DshHome)) {
    $DshHome = Join-Path $HOME ".dsh"
}

$ProfileDir = Join-Path $DshHome "profiles\$Profile"
$DestDir = Join-Path $ProfileDir "node_modules\dsh-ds-balance"
$SrcDir = Split-Path -Parent $MyInvocation.MyCommand.Path

if (-not (Test-Path (Join-Path $SrcDir "package.json"))) {
    Write-Error "plugin sources not found next to this script (package.json missing)"
    exit 1
}

Write-Host "==> Installing dsh-ds-balance to $ProfileDir"

# 0. Profile check: DSH initializes the profile itself on first launch;
#    we must not fabricate package.json (that would break DSH's init flow).
if (-not (Test-Path (Join-Path $ProfileDir "package.json"))) {
    Write-Host "    Note: profile not initialized yet. Run once: dsh --profile $Profile web"
    Write-Host "    then re-run this script. Creating the directory structure now."
    New-Item -ItemType Directory -Force -Path $ProfileDir | Out-Null
}

# 1. Copy plugin files (bundle + verify script).
New-Item -ItemType Directory -Force -Path $DestDir | Out-Null
foreach ($file in @("package.json", "index.js", "client.js", "verify-client.mjs")) {
    Copy-Item (Join-Path $SrcDir $file) (Join-Path $DestDir $file) -Force
}
Write-Host "    copied plugin files to $DestDir"

# 2. Register in cordis.patch.yml (idempotent).
$Patch = Join-Path $ProfileDir "cordis.patch.yml"
if (-not (Test-Path $Patch)) {
    Set-Content -Path $Patch -Value "[]" -Encoding ASCII
}
$content = [System.IO.File]::ReadAllText($Patch)
if ($content -match "name: 'dsh-ds-balance'") {
    Write-Host "    cordis.patch.yml already registers this plugin, skipped"
} else {
    $insert = "- insert:`n    - id: ds-balance`n      name: 'dsh-ds-balance'"
    if ($content -match "(?m)^\[\]\s*$") {
        $content = $content -replace "(?m)^\[\]\s*$", $insert
    } else {
        $content = $content.TrimEnd() + "`n`n" + $insert + "`n"
    }
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($Patch, $content, $utf8NoBom)
    Write-Host "    registered plugin in cordis.patch.yml"
}

# 3. Credential hint (never read the value).
$CredFile = Join-Path $DshHome ".credentials.yaml"
if ((Test-Path $CredFile) -and ([System.IO.File]::ReadAllText($CredFile) -match "(?m)^DEEPSEEK_API_KEY:")) {
    Write-Host "    DEEPSEEK_API_KEY configured ($CredFile)"
} else {
    Write-Host "    Note: configure DEEPSEEK_API_KEY in $CredFile or the balance endpoint returns 503"
}

Write-Host "==> Done. Restart dsh web (Ctrl+C, then run dsh web) and refresh the browser."
