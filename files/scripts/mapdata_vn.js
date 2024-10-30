window.mapdata_vn = {
    sWest: L.latLng(-85, -180),
    nEast: L.latLng(85, 180),
    map_center: [0.000, 0.000],
    min_zoom: 1,
    max_zoom: 6,
    map_zoom: 2.5,
    map_path: '../files/maps/hos_velen/{z}/{x}/{y}'
};

fetch('/vn')  // Endpoint do pobrania danych
    .then(response => response.json())
    .then(data => {
        // Przekazanie pobranych danych do shared.js
        window.mapdata_vn.data = data;  // Dodanie pobranych danych do mapdata_wo
        window.loadMapWithData(window.mapdata_vn);  // Wywołanie funkcji z shared.js
    })
    .catch(error => console.error('Błąd podczas pobierania danych:', error));