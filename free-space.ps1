Stop-Process -Name node -Force -EA 0
Remove-Item "c:\Users\i5\Downloads\flexhaus\node_modules" -Recurse -Force -EA 0
Remove-Item "c:\Users\i5\Downloads\flexhaus\variant-1\.next" -Recurse -Force -EA 0
Remove-Item "c:\Users\i5\Downloads\flexhaus\variant-2\.next" -Recurse -Force -EA 0
Remove-Item "c:\Users\i5\Downloads\flexhaus\variant-3\.next" -Recurse -Force -EA 0
$f=(New-Object IO.DriveInfo('C')).AvailableFreeSpace
"$([math]::Round($f/1MB)) MB free" | Out-File "c:\Users\i5\Downloads\flexhaus\space.txt"
