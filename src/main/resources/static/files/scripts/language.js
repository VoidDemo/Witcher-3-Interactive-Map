document.addEventListener('DOMContentLoaded', function () {
    const languageSelector = document.querySelector('.custom-select');
    const options = document.querySelectorAll('.option');
    const selectedLanguage = localStorage.getItem('language') || 'pl';

    // Ustaw wybrany język przy pierwszym załadowaniu
    setLanguage(selectedLanguage);
    updateLogoImage(selectedLanguage); // Dodane: Aktualizacja obrazu przy pierwszym załadowaniu

    // Ustaw widoczność flagi na podstawie wybranego języka
    updateFlagDisplay(selectedLanguage);

    // Obsługa wyboru języka
    options.forEach(option => {
        option.addEventListener('click', function () {
            const selectedLang = option.getAttribute('data-value');
            localStorage.setItem('language', selectedLang);
            setLanguage(selectedLang);
            updateFlagDisplay(selectedLang);
            updateLogoImage(selectedLang); // Dodane: Aktualizacja obrazu przy zmianie języka
            location.reload();
        });
    });
});

// Funkcja do ustawienia języka
function setLanguage(language) {
    const filePath = `../files/languages/lang_${language}.json`;
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Błąd pobierania tłumaczeń z ${filePath}`);
            return response.json();
        })
        .then(translations => {
            applyTranslations(translations);
            console.log(`Język ustawiony na: ${language}`);
        })
        .catch(error => console.error(error.message));
}

function updateLogoImage(language) {
    const logoImage = document.getElementById('image1');
    if (logoImage) {
        console.log("Aktualizacja obrazu na podstawie języka:", language); // Debug: sprawdzenie języka
        logoImage.src = language === 'pl' ? "../files/images/witcher-icon-pl.png" : "../files/images/witcher-icon-en.png";
    } else {
        console.error("Nie znaleziono elementu obrazu z id 'image1'"); // Debug: brak elementu
    }
}
// Funkcja do zastosowania tłumaczeń
function applyTranslations(translations) {
    Object.keys(translations).forEach(key => {
        const elements = document.querySelectorAll(`[data-i18n="${key}"]`);
        elements.forEach(element => {
            element.textContent = translations[key];
        });

        const placeholderElement = document.querySelector(`[data-i18n-placeholder="${key}"]`);
        if (placeholderElement) {
            placeholderElement.placeholder = translations[key];
        }
    });
}


// Funkcja do aktualizacji flagi
function updateFlagDisplay(language) {
    const selectedOption = document.querySelector('.selected-option');
    const langText = language === 'pl' ? 'Polski' : 'English';

    selectedOption.innerHTML = `<img src="../files/images/flags/${language}.png" class="flag-icon"> ${langText}`;
}


