// Definicja danych mapy (bez danych z bazy)
window.mapdata_wo = {
    sWest: L.latLng(-85, -180),
    nEast: L.latLng(0, 45),
    map_center: [-65.000, -65.000],
    min_zoom: 2,
    max_zoom: 5,
    map_zoom: 3.5,
    map_path: '../files/maps/white_orchard/{z}/{x}/{y}'
};

// Pobieranie danych z bazy danych i przekazanie do shared.js
fetch('/wo')  // Endpoint do pobrania danych
    .then(response => response.json())
    .then(data => {
        // Przekazanie pobranych danych do shared.js
        window.mapdata_wo.data = data;  // Dodanie pobranych danych do mapdata_wo
        window.loadMapWithData(window.mapdata_wo);  // Wywołanie funkcji z shared.js
    })
    .catch(error => console.error('Błąd podczas pobierania danych:', error));
