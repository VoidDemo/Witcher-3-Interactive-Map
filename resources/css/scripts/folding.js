document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const button = document.getElementById('toggleButton');
    const image = document.getElementById('toggleImage');

        button.addEventListener('click', () => {
            const isCollapsed = container.classList.contains('collapsed');
            if (isCollapsed) {
                container.classList.remove('collapsed');
                image.src='/resources/images/cc_greaterthan-right.png';
            } else {
                container.classList.add('collapsed');
                image.src='/resources/images/cc_greaterthan-left.png';//left
            }
        });
    });

    function showCategory(category) {
    const categories = document.querySelectorAll('.text-box');
        categories.forEach((cat) => {
            if (category === 'all') {
                cat.style.display = 'block';
            } else {
                if (cat.id === category) {
                    cat.style.display = 'block';
                } else {
                    cat.style.display = 'none';
                }
            }
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