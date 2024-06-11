function openLoginWindow(page) {
    var url = page === 'login' ? '/pages/login.html' : '/pages/register.html'; // Przykładowe strony
    window.open(url, 'LoginWindow', 'width=800,height=600,left=200,top=200');
}

function closeWindowAndReload() {
    window.opener.location.reload(); // Przeładowanie strony głównej
    window.close(); // Zamknięcie obecnego okna
}