param(
  [string]$Path = ".",
  [string]$Out  = "project-tree.txt",
  [int]$MaxDepth = 8,
  [switch]$AllFiles,
  [string[]]$ExcludeDirs = @(
    ".git","node_modules","dist","build",".next",".vercel",".cache",
    "__pycache__","bin","obj","coverage",".idea",".vscode","logs","tmp",".husky"
  ),
  [string[]]$ExcludeFiles = @("*.log","*.tmp","*.zip","*.7z","*.tar.gz","*.lock"),
  [string[]]$CodeFilePatterns = @(
    "*.cs","*.csproj","*.sln","*.js","*.jsx","*.ts","*.tsx",
    "*.json","*.yml","*.yaml","*.md","*.html","*.css","*.scss",
    "*.py","*.java","*.rb","*.go","*.php","*.rs","*.sql","*.xml",
    "*.sh","*.ps1","*.bat","*.ini","*.toml","Dockerfile",".env*"
  )
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "SilentlyContinue"

function Test-MatchAny {
  param([string]$Name, [string[]]$Patterns)
  foreach ($p in $Patterns) { if ($Name -like $p) { return $true } }
  return $false
}

function Get-Entries {
  param(
    [System.IO.DirectoryInfo]$Dir,
    [switch]$AllFiles
  )

  $entries = Get-ChildItem -LiteralPath $Dir.FullName -Force -ErrorAction SilentlyContinue

  $dirs = $entries | Where-Object {
    $_.PSIsContainer -and -not ($ExcludeDirs -contains $_.Name)
  } | Sort-Object Name

  if ($AllFiles) {
    $files = $entries | Where-Object {
      -not $_.PSIsContainer -and -not (Test-MatchAny -Name $_.Name -Patterns $ExcludeFiles)
    } | Sort-Object Name
  } else {
    $files = $entries | Where-Object {
      -not $_.PSIsContainer -and (Test-MatchAny -Name $_.Name -Patterns $CodeFilePatterns) -and
      -not (Test-MatchAny -Name $_.Name -Patterns $ExcludeFiles)
    } | Sort-Object Name
  }

  return @($dirs + $files)
}

$root = Get-Item -LiteralPath $Path
$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("$($root.Name)/")

function Build-Tree {
  param(
    [System.IO.DirectoryInfo]$Dir,
    [string]$Prefix = "",
    [int]$Depth = 0
  )

  if ($Depth -ge $MaxDepth) { return }

  $items = Get-Entries -Dir $Dir -AllFiles:$AllFiles
  for ($i = 0; $i -lt $items.Count; $i++) {
    $item = $items[$i]
    $isLast = ($i -eq $items.Count - 1)

    $connector = if ($isLast) { "`- " } else { "|- " }
    $displayName = if ($item.PSIsContainer) { "$($item.Name)/" } else { $item.Name }
    $lines.Add("$Prefix$connector$displayName")

    if ($item.PSIsContainer) {
      $newPrefix = $Prefix + (if ($isLast) { "   " } else { "|  " })
      Build-Tree -Dir $item -Prefix $newPrefix -Depth ($Depth + 1)
    }
  }
}

Build-Tree -Dir $root -Prefix "" -Depth 0

# Write pretty TXT (ASCII safe)
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines((Resolve-Path $Out), $lines, $utf8NoBom)

# Also write JSON (optional, handy later)
function Build-Json {
  param(
    [System.IO.DirectoryInfo]$Dir,
    [int]$Depth = 0
  )
  if ($Depth -ge $MaxDepth) { return @() }

  $children = @()
  $items = Get-Entries -Dir $Dir -AllFiles:$AllFiles
  foreach ($item in $items) {
    if ($item.PSIsContainer) {
      $children += [pscustomobject]@{
        name = $item.Name
        type = "dir"
        children = (Build-Json -Dir $item -Depth ($Depth + 1))
      }
    } else {
      $children += [pscustomobject]@{
        name = $item.Name
        type = "file"
      }
    }
  }
  return $children
}

$treeObj = [pscustomobject]@{
  name = $root.Name
  type = "dir"
  children = (Build-Json -Dir $root -Depth 0)
}
$jsonOut = [System.IO.Path]::ChangeExtension((Resolve-Path $Out), ".json")
$treeObj | ConvertTo-Json -Depth 100 | Out-File -FilePath $jsonOut -Encoding ascii

Write-Host "Done:"
Write-Host " - $Out"
Write-Host " - $([System.IO.Path]::GetFileName($jsonOut))"
