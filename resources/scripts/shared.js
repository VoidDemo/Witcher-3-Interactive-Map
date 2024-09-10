// Funkcja do ustawiania odpowiedniej mapy na podstawie ścieżki
function setupMap() {
    let mapPath;
    let minZoom;
    let maxZoom;
    let defaultZoom;
    
    // Pobranie bieżącej ścieżki URL
    const currentPath = window.location.pathname;

    // Sprawdzenie ścieżki i ustawienie odpowiednich wartości
    if (currentPath.includes('/white_orchard/index.html')) {
        mapPath = '/resources/maps/white_orchard/{z}/{x}/{y}.jpg';
        minZoom = 2;
        maxZoom = 5;
        defaultZoom = 3;
    } else if (currentPath.includes('/velen_novigrad/index.html')) {
        mapPath = '/resources/maps/hos_velen/{z}/{x}/{y}.jpg';
        minZoom = 1;
        maxZoom = 6;
        defaultZoom = 2;
    } else {
        console.error('Nieznana ścieżka mapy');
        return;
    }


    // Inicjalizacja mapy z określonym środkiem i zoomem
    var map = L.map('mapid', {
        zoomControl: false,
        fullscreenControl: true,
        worldCopyJump: false,
        zoomSnap: 0.5,
        zoomDelta: 0.5
    }).setView([51.505, -0.09], defaultZoom); // Ustawienie środka mapy

    // Dodanie kontrolek zoomu
    L.control.zoom({
        position: 'bottomright',
        zoomInTitle: 'Przybliż',
        zoomOutTitle: 'Oddal'
    }).addTo(map);

    // Okienko z koordynatami
    map.on('click', function (e) {
        var coords = e.latlng;
        var lat = coords.lat.toFixed(5);
        var lng = coords.lng.toFixed(5);
        console.log('Map clicked at:', lat, lng);
        L.popup()
            .setLatLng(coords)
            .setContent("Koordynaty: " + lat + ", " + lng)
            .openOn(map);
    });

    const bounds = [[51.51, -0.12], [51.53, -0.09]];
    L.rectangle(bounds, {
        color: "#ff0000", // Czerwony kolor obramowania
        weight: 2,        // Grubość obramowania
        fillOpacity: 0    // Przezroczystość wypełnienia
    }).addTo(map);

    // Dodanie warstwy kafelków z opcją TMS
    L.tileLayer(mapPath, {
        minZoom: minZoom,
        maxZoom: maxZoom,
        tms: true, // Ustawienie odwrotnej numeracji kafelków
        noWrap: true
    }).addTo(map);


    document.getElementById('search-button').addEventListener('click', function () {
        const input = document.getElementById('coordinate-input').value;
        const coords = input.split(',').map(coord => parseFloat(coord.trim()));

        if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
            const lat = coords[0];
            const lng = coords[1];

            // Przesunięcie mapy na nowe współrzędne
            map.setView([lat, lng], defaultZoom);

            // Wyświetlenie dymka na mapie
            L.popup()
                .setLatLng([lat, lng])
                .setContent("Koordynaty: " + lat + ", " + lng)
                .openOn(map);
        } else {
            alert("Wpisz poprawne współrzędne w formacie 'lat,lng'");
        }
    });

}

// Wywołanie funkcji po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function() {
    setupMap();
});
