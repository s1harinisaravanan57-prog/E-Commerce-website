param(
    [string]$SenderEmail = 's1harinisaravanan@gmail.com',
    [string]$OwnerEmail = 's1harinisaravanan@gmail.com'
)

$securePassword = Read-Host "Enter the Gmail app password for $SenderEmail" -AsSecureString
$pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)

try {
    $env:OWNER_NOTIFICATION_ENABLED = 'true'
    $env:OWNER_NOTIFICATION_EMAIL = $OwnerEmail
    $env:SMTP_HOST = 'smtp.gmail.com'
    $env:SMTP_PORT = '587'
    $env:SMTP_USERNAME = $SenderEmail
    $env:SMTP_PASSWORD = ([Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer) -replace '\s', '')
    $env:MAIL_FROM = $SenderEmail

    Write-Host "Starting the backend. Contact and order notifications will be sent to $OwnerEmail."
    mvn spring-boot:run
}
finally {
    if ($pointer -ne [IntPtr]::Zero) {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
    }
    Remove-Item Env:SMTP_PASSWORD -ErrorAction SilentlyContinue
}
