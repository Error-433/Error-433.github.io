function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'short'
    });
    document.getElementById('current-time').textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();

function openLink(url) {
    window.open(url, '_blank');
}

function searchSite() {
    const query = document.getElementById('search').value.trim();
    if (!query) return;
    
    if (query.includes('.') || query.startsWith('http')) {
        const url = query.startsWith('http') ? query : `https://${query}`;
        openLink(url);
    } else {
        openLink(`https://www.baidu.com/s?wd=${encodeURIComponent(query)}`);
    }
    
    document.getElementById('search').value = '';
}

function handleSearch(event) {
    if (event.key === 'Enter') {
        searchSite();
    }
}

function runScript(scriptName) {
    if (scriptName === 'system-cleanup') {
        const confirmed = confirm('Ready to download the system cleanup script.\n\nPlease run the downloaded batch file as Administrator.\n\nNote: Use system tools under professional guidance.');
        if (confirmed) {
            const scriptContent = `@echo off
chcp 65001 >nul
echo ===== System Maintenance Tool =====
echo Safe cleanup script - For educational use only
echo.

net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Please run this script as Administrator!
    pause
    exit /b
)

echo [1/5] Cleaning temporary files...
del /q /f /s "%temp%\\\\*.*" 2>nul
del /q /f /s "C:\\\\Windows\\\\Temp\\\\*.*" 2>nul
echo ✓ Temporary files cleaned

echo [2/5] Clearing system cache...
ipconfig /flushdns >nul
echo ✓ DNS cache cleared

echo [3/5] Cleaning browser cache...
del /q /f /s "%USERPROFILE%\\\\AppData\\\\Local\\\\Google\\\\Chrome\\\\User Data\\\\Default\\\\Cache\\\\*.*" 2>nul
del /q /f /s "%USERPROFILE%\\\\AppData\\\\Local\\\\Microsoft\\\\Edge\\\\User Data\\\\Default\\\\Cache\\\\*.*" 2>nul
echo ✓ Browser cache cleaned

echo [4/5] Checking system files...
sfc /scannow
echo ✓ System files checked

echo [5/5] Emptying recycle bin...
powershell -Command "Clear-RecycleBin -Force" 2>nul
echo ✓ Recycle bin emptied

echo.
echo ===== All operations completed! =====
echo Recommended to restart your computer
echo.
pause`;

            const blob = new Blob([scriptContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'SystemMaintenance.bat';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});
