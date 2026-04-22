$ErrorActionPreference = 'Stop'
$filesChanged = New-Object System.Collections.Generic.HashSet[string]

$membershipPattern = '(?m)^(?<i>[ \t]*)<li><a href="membership\.html" class="active">Membership</a></li>\r?\n\k<i><li><a href="sponsorship\.html">Sponsorship</a></li>'
$membershipReplacement = '${i}<li class="has-dropdown">`r`n${i}    <a href="#" class="active">Engage with Us <span class="dropdown-arrow">&#9662;</span></a>`r`n${i}    <ul class="dropdown">`r`n${i}        <li><a href="membership.html" class="active">Membership</a></li>`r`n${i}        <li><a href="sponsorship.html">Sponsorship</a></li>`r`n${i}    </ul>`r`n${i}</li>'

$sponsorshipPattern = '(?m)^(?<i>[ \t]*)<li><a href="membership\.html">Membership</a></li>\r?\n\k<i><li><a href="sponsorship\.html" class="active">Sponsorship</a></li>'
$sponsorshipReplacement = '${i}<li class="has-dropdown">`r`n${i}    <a href="#" class="active">Engage with Us <span class="dropdown-arrow">&#9662;</span></a>`r`n${i}    <ul class="dropdown">`r`n${i}        <li><a href="membership.html">Membership</a></li>`r`n${i}        <li><a href="sponsorship.html" class="active">Sponsorship</a></li>`r`n${i}    </ul>`r`n${i}</li>'

$resourcesSinglePattern = '(?m)^(?<i>[ \t]*)<li><a href="membership\.html">Membership</a></li>'
$resourcesSingleReplacement = '${i}<li class="has-dropdown">`r`n${i}    <a href="#">Engage with Us <span class="dropdown-arrow">&#9662;</span></a>`r`n${i}    <ul class="dropdown">`r`n${i}        <li><a href="membership.html">Membership</a></li>`r`n${i}        <li><a href="sponsorship.html">Sponsorship</a></li>`r`n${i}    </ul>`r`n${i}</li>'

$defaultPattern = '(?m)^(?<i>[ \t]*)<li><a href="membership\.html">Membership</a></li>\r?\n\k<i><li><a href="sponsorship\.html">Sponsorship</a></li>'
$defaultReplacement = '${i}<li class="has-dropdown">`r`n${i}    <a href="#">Engage with Us <span class="dropdown-arrow">&#9662;</span></a>`r`n${i}    <ul class="dropdown">`r`n${i}        <li><a href="membership.html">Membership</a></li>`r`n${i}        <li><a href="sponsorship.html">Sponsorship</a></li>`r`n${i}    </ul>`r`n${i}</li>'

Get-ChildItem -Path . -Filter *.html -File | ForEach-Object {
    $path = $_.FullName
    $content = Get-Content -Path $path -Raw -Encoding UTF8
    $original = $content

    if ($_.Name -ieq 'membership.html') {
        $content = [regex]::Replace($content, $membershipPattern, $membershipReplacement)
    }

    if ($_.Name -ieq 'sponsorship.html') {
        $content = [regex]::Replace($content, $sponsorshipPattern, $sponsorshipReplacement)
    }

    if ($_.Name -ieq 'resources.html') {
        $content = [regex]::Replace($content, $resourcesSinglePattern, $resourcesSingleReplacement, 1)
    }

    $content = [regex]::Replace($content, $defaultPattern, $defaultReplacement)

    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($path, $content, [System.Text.UTF8Encoding]::new($false))
        $null = $filesChanged.Add($_.Name)
    }
}

"Files changed:";
$filesChanged | Sort-Object | ForEach-Object { " - $_" }

"`nVerification: occurrences of 'Engage with Us'";
Get-ChildItem -Path . -Filter *.html -File | Sort-Object Name | ForEach-Object {
    Select-String -Path $_.FullName -Pattern 'Engage with Us' | ForEach-Object { "{0}:{1}:{2}" -f $_.Path.Replace((Get-Location).Path + '\\',''), $_.LineNumber, $_.Line.Trim() }
}

"`nVerification: standalone membership/sponsorship li anchors (old nav patterns)";
$patterns = @(
    '<li><a href="membership.html">Membership</a></li>',
    '<li><a href="membership.html" class="active">Membership</a></li>',
    '<li><a href="sponsorship.html">Sponsorship</a></li>',
    '<li><a href="sponsorship.html" class="active">Sponsorship</a></li>'
)
foreach ($p in $patterns) {
    "Pattern: $p"
    $hits = Select-String -Path (Get-ChildItem -Path . -Filter *.html -File).FullName -Pattern ([regex]::Escape($p))
    if ($hits) {
        $hits | ForEach-Object { "  {0}:{1}:{2}" -f $_.Path.Replace((Get-Location).Path + '\\',''), $_.LineNumber, $_.Line.Trim() }
    } else {
        '  (no matches)'
    }
}
