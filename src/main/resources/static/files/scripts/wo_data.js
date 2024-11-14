let woData = [];
let visibleWoPoints = {}; // Obiekt do przechowywania widoczności punktów

// Funkcja do pobierania danych z API
fetch('/wo')
    .then(response => response.json())
    .then(fetchedData => {
        woData = fetchedData;
        updateWoCounters(); // Aktualizacja liczników
        renderWoTable(woData);
    })
    .catch(error => console.error('Error fetching WO data:', error));

function updateWoCounters() {
    const typesCount = woData.reduce((acc, item) => {
        acc[item.typ] = (acc[item.typ] || 0) + 1;
        return acc;
    }, {});

    // Aktualizacja liczników przy typach
    Object.keys(typesCount).forEach(type => {
        const countElement = document.getElementById(`wo-${type}-count`);
        if (countElement) {
            countElement.textContent = typesCount[type];
        }

        // Inicjalizacja widoczności punktów
        if (!visibleWoPoints[type]) {
            visibleWoPoints[type] = true;
        }
    });
}

function renderWoTable(data) {
    const gridContainer = document.querySelector('#wo-grid .grid-container');
    gridContainer.innerHTML = ''; // Czyści istniejące punkty

    data.forEach(item => {
        const point = document.createElement('div');
        point.className = 'grid-point';
        point.dataset.type = item.typ; // Dodanie typu do atrybutu data
        point.style.left = `${((item.x + 180) / 85) * 400}px`;
        point.style.bottom = `${((item.y + 45) / 45) * 300}px`;

        const label = document.createElement('div');
        label.className = 'grid-label';
        label.innerText = `(${item.x}, ${item.y}, ${item.typ})`;
        point.appendChild(label);

        gridContainer.appendChild(point);

        if (!visibleWoPoints[item.typ]) {
            point.style.display = 'none'; // Ukrywanie punktów, jeśli niewidoczne
        }
    });
}

function togglePoints(type, pointType) {
    visibleWoPoints[pointType] = !visibleWoPoints[pointType]; // Zmiana widoczności

    const points = document.querySelectorAll('#wo-grid .grid-point');
    points.forEach(point => {
        if (point.dataset.type === pointType) {
            point.style.display = visibleWoPoints[pointType] ? 'block' : 'none';
        }
    });

    // Zmiana stylu przycisku
    const button = document.querySelector(`button[onclick="togglePoints('wo', '${pointType}')"]`);
    button.classList.toggle('disabled', !visibleWoPoints[pointType]);
}
