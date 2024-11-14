let vnData = [];
let vnSortDirection = {};

// Funkcja do pobierania danych z API
fetch('/vn')
    .then(response => response.json())
    .then(fetchedData => {
        vnData = fetchedData;
        renderVnTable(vnData);
    })
    .catch(error => console.error('Error fetching VN data:', error));

// Funkcja do renderowania tabeli VN
function renderVnTable(data) {
    const tableBody = document.getElementById('vn-table-body');
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

// Funkcja do sortowania tabeli VN
function sortVnTable(column) {
    vnSortDirection[column] = vnSortDirection[column] === 'asc' ? 'desc' : 'asc';

    vnData.sort((a, b) => {
        if (a[column] < b[column]) return vnSortDirection[column] === 'asc' ? -1 : 1;
        if (a[column] > b[column]) return vnSortDirection[column] === 'asc' ? 1 : -1;
        return 0;
    });

    renderVnTable(vnData);
}

