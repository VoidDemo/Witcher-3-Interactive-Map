document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const button = document.getElementById('toggleButton');
    const image = document.getElementById('toggleImage');
    const hideableDiv = document.getElementById('hideableDiv');

    button.addEventListener('click', () => {
        const isHidden = hideableDiv.style.display === 'none';
        if (isHidden) {
            hideableDiv.style.display = 'block'; // Pokazuje div
            image.src = '../images/cc_greaterthan-left.png'; // Zmienia obrazek
        } else {
            hideableDiv.style.display = 'none'; // Ukrywa div
            image.src = '../images/cc_greaterthan-right.png';
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
        });
    });