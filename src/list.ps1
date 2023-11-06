$previousFolder = ""
Get-ChildItem -Path . -Recurse -Filter *.test.js | ForEach-Object {
    $parentFolder = Split-Path $_.Directory -Leaf
    if ($parentFolder -ne $previousFolder) {
        Write-Host $parentFolder
        $previousFolder = $parentFolder
    }
    
    $file = $_.Name
    Write-Host "  $file"
    
    Get-Content $_.FullName | ForEach-Object {
        if ($_ -match 'it\(["*]([^"*]+)["*],' -or $_ -match "it\(['*]([^'*]+)['*],") {
            $match = $matches[1]
            Write-Host "    - $match"
        }
    }
}
