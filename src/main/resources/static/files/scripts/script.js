let vnData = [];
let woData = [];
let vnSortDirection = {}; // Obiekt do przechowywania kierunku sortowania dla VN
let woSortDirection = {}; // Obiekt do przechowywania kierunku sortowania dla WO

// Funkcje do pobierania danych z API
fetch('/vn')
    .then(response => response.json())
    .then(fetchedData => {
        vnData = fetchedData;
        renderTable('vn', vnData);
    })
    .catch(error => console.error('Error fetching VN data:', error));

fetch('/wo')
    .then(response => response.json())
    .then(fetchedData => {
        woData = fetchedData;
        renderTable('wo', woData);
    })
    .catch(error => console.error('Error fetching WO data:', error));

// Funkcja do renderowania tabeli
function renderTable(type, data) {
    const tableBodyId = type === 'vn' ? 'vn-table-body' : 'wo-table-body';
    const tableBody = document.getElementById(tableBodyId);
    tableBody.innerHTML = ''; // Czyści istniejące wiersze

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.typ}</td>
            <td>${item.x}</td>
            <td>${item.y}</td>
            <td>${item.name}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Funkcja do sortowania tabeli
function sortTable(type, column) {
    const data = type === 'vn' ? vnData : woData;
    const direction = type === 'vn' ? vnSortDirection : woSortDirection;

    direction[column] = direction[column] === 'asc' ? 'desc' : 'asc';
    
    data.sort((a, b) => {
        if (a[column] < b[column]) return direction[column] === 'asc' ? -1 : 1;
        if (a[column] > b[column]) return direction[column] === 'asc' ? 1 : -1;
        return 0;
    });

    renderTable(type, data);
}
