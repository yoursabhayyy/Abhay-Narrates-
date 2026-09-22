$port = 8765
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$port/")
$listener.Start()
Write-Host "Server listening on http://127.0.0.1:$port/"

$videoPath = "c:\Users\Abhay Singh\Downloads\Website Design\idea 2\assets\video\project-1.mp4"
$videoBytes = [System.IO.File]::ReadAllBytes($videoPath)
$videoLen = $videoBytes.Length

$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
Start-Process -FilePath $chrome -ArgumentList "--autoplay-policy=no-user-gesture-required", "--disable-web-security", "http://127.0.0.1:$port/extract.html"

$running = $true
while ($running -and $listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response
    $path = $req.Url.AbsolutePath
    
    if ($path -eq '/extract.html') {
        $html = Get-Content "c:\Users\Abhay Singh\Downloads\Website Design\idea 2\assets\video\extract.html" -Raw
        $b = [System.Text.Encoding]::UTF8.GetBytes($html)
        $res.ContentType = "text/html; charset=utf-8"
        $res.ContentLength64 = $b.Length
        $res.OutputStream.Write($b, 0, $b.Length)
        $res.Close()
    } elseif ($path -eq '/project-1.mp4') {
        $range = $req.Headers["Range"]
        $res.ContentType = "video/mp4"
        $res.AddHeader("Accept-Ranges", "bytes")
        
        if ($range -and $range -match 'bytes=(\d+)-(\d*)') {
            $start = [int64]$matches[1]
            $end = if ($matches[2]) { [int64]$matches[2] } else { $videoLen - 1 }
            if ($end -ge $videoLen) { $end = $videoLen - 1 }
            $len = $end - $start + 1
            $res.StatusCode = 206
            $res.AddHeader("Content-Range", "bytes $start-$end/$videoLen")
            $res.ContentLength64 = $len
            try { $res.OutputStream.Write($videoBytes, $start, $len) } catch {}
            $res.Close()
        } else {
            $res.StatusCode = 200
            $res.ContentLength64 = $videoLen
            try { $res.OutputStream.Write($videoBytes, 0, $videoLen) } catch {}
            $res.Close()
        }
    } elseif ($path -eq '/save-frame') {
        $t = $req.QueryString["t"]
        $reader = New-Object System.IO.StreamReader($req.InputStream)
        $dataUrl = $reader.ReadToEnd()
        $reader.Close()
        
        $base64 = $dataUrl.Substring($dataUrl.IndexOf(',') + 1)
        $imgBytes = [System.Convert]::FromBase64String($base64)
        $outPath = "c:\Users\Abhay Singh\Downloads\Website Design\idea 2\assets\images\frame_$t.jpg"
        [System.IO.File]::WriteAllBytes($outPath, $imgBytes)
        
        Write-Host "Captured clean raw frame at $t s -> $outPath ( bytes)"
        
        $b = [System.Text.Encoding]::UTF8.GetBytes("OK")
        $res.ContentLength64 = $b.Length
        $res.OutputStream.Write($b, 0, $b.Length)
        $res.Close()
    } elseif ($path -eq '/done') {
        $b = [System.Text.Encoding]::UTF8.GetBytes("DONE")
        $res.ContentLength64 = $b.Length
        $res.OutputStream.Write($b, 0, $b.Length)
        $res.Close()
        Write-Host "All frames completed!"
        $running = $false
    } else {
        $res.StatusCode = 404
        $res.Close()
    }
}
$listener.Stop()
