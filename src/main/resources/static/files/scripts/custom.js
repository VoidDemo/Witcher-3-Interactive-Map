document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('toggleButton');
    const image = document.getElementById('toggleImage');
    const hideableDiv = document.getElementById('hideableDiv');
    const credits = document.getElementById('credits');
    const creditsButton = document.getElementById('credits');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');
    const isPanelHidden = JSON.parse(localStorage.getItem('panelHidden')) || false;

    if (isPanelHidden) {
        hideableDiv.style.display = 'none';
        image.src = '../files/images/cc_greaterthan-right.png';
    }

    button.addEventListener('click', () => {
        const isHidden = hideableDiv.style.display === 'none';
        if (isHidden) {
            hideableDiv.style.display = 'flex'; // Pokazuje div
            credits.style.display = '';
            image.src = '../files/images/cc_greaterthan-left.png'; // Zmienia obrazek
        } else {
            hideableDiv.style.display = 'none'; // Ukrywa div
            credits.style.display = 'none';
            image.src = '../files/images/cc_greaterthan-right.png';
        }
        localStorage.setItem('panelHidden', !isHidden);
    });

    creditsButton.addEventListener('click', () => {
        popup.style.display = 'block';
    });

    // Zamykanie popupu po kliknięciu „X”
    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Zamykanie popupu po kliknięciu poza oknem popupu
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

});

function showCategory(category) {
    document.querySelectorAll('.text-box').forEach((cat) => {
        cat.style.display = (category === 'all' || cat.id === category) ? 'block' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const rightToggleButton = document.getElementById('rightToggleButton');
    const rightContent = document.getElementById('rightContent');
    const secondRightToggleButton = document.getElementById('secondRightToggleButton');
    const secondRightContent = document.getElementById('secondRightContent');

    rightToggleButton.addEventListener('click', () => {
        const buttonRect = rightToggleButton.getBoundingClientRect();
        rightContent.style.top = (buttonRect.top - 10) + 'px';
        rightContent.style.display = rightContent.style.display === 'none' ? 'block' : 'none';
        secondRightContent.style.display = 'none'; // Ukryj drugie okienko
    });

    secondRightToggleButton.addEventListener('click', () => {
        const buttonRect = secondRightToggleButton.getBoundingClientRect();
        secondRightContent.style.top = (buttonRect.top - 10) + 'px';
        secondRightContent.style.display = secondRightContent.style.display === 'none' ? 'block' : 'none';
        rightContent.style.display = 'none'; // Ukryj pierwsze okienko
        thirdRightContent.style.display = 'none';
    });
    thirdRightToggleButton.addEventListener('click', () => {
        const buttonRect = thirdRightToggleButton.getBoundingClientRect();
        thirdRightContent.style.top = (buttonRect.top - 10) + 'px';
        thirdRightContent.style.display = thirdRightContent.style.display === 'none' ? 'block' : 'none';
        rightContent.style.display = 'none'; // Ukryj pierwsze okienko
        secondRightContent.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('clear-storage-btn').addEventListener('click', () => {
        localStorage.clear();
        alert('Dane zostały wyczyszczone. Odśwież stronę, aby zobaczyć efekty.');
        location.reload(); // Odświeżenie strony, aby przywrócić domyślne ustawienia
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const customSelect = document.querySelector('.custom-select');
    const selectedOption = customSelect.querySelector('.selected-option');
    const optionsContainer = customSelect.querySelector('.options');
    const languageSelector = document.getElementById('languageSelector');

    selectedOption.addEventListener('click', () => {
        const isExpanded = optionsContainer.style.display === 'block';
        optionsContainer.style.display = isExpanded ? 'none' : 'block';
        selectedOption.classList.toggle('arrow-up', !isExpanded);
    });

    customSelect.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => {
            const value = option.getAttribute('data-value');
            const flagIcon = option.querySelector('img').src;
            const text = option.textContent.trim();
            selectedOption.innerHTML = `<img src="${flagIcon}" class="flag-icon"> ${text}`;
            optionsContainer.style.display = 'none';
            languageSelector.value = value;
            // Możesz tutaj wywołać funkcję zmiany języka
        });
    });

    document.addEventListener('click', (event) => {
        if (!customSelect.contains(event.target)) {
            optionsContainer.style.display = 'none';
            selectedOption.classList.remove('arrow-up');
        }
    });
});