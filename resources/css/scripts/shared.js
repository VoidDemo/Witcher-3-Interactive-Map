document.addEventListener('DOMContentLoaded', async function() {
    // Funkcja do dynamicznego importowania modułów mapy
    async function loadMapModules(path) {
        const { createSmallMapLayer } = await import(`${path}/small-map.js`);
        const { createMediumMapLayer } = await import(`${path}/medium-map.js`);
        const { createLargeMapLayer } = await import(`${path}/large-map.js`);
        return { createSmallMapLayer, createMediumMapLayer, createLargeMapLayer };
    }

    // Wykrywanie odpowiedniej ścieżki
    let mapPath;
    if (window.location.pathname.includes('/skellige/')) {
        mapPath = '/resources/scripts/sk';
    } else if (window.location.pathname.includes('/white_orchard/')) {
        mapPath = '/resources/scripts/wo';
    } else if (window.location.pathname.includes('/velen_novigrad/')) {
        mapPath = '/resources/scripts/vn';
    } else {
        console.error('Unknown map type');
        return;
    }

    // Załadowanie odpowiednich modułów mapy
    const { createSmallMapLayer, createMediumMapLayer, createLargeMapLayer } = await loadMapModules(mapPath);

    var map = L.map('mapid', {
        zoomControl: false,
        fullscreenControl: true,
        zoomSnap: 0.5,  // Pozwala na zoomowanie w krokach co 0.5
        zoomDelta: 0.5  // Określa krok zoomu na 0.5
    }).setView([51.505, -0.09], 13.5);

    // Dodanie kontrolek zoomu w prawym dolnym rogu
    L.control.zoom({
        position: 'bottomright',
        zoomInTitle: 'Przybliż',
        zoomOutTitle: 'Oddal'
    }).addTo(map);

    // Dodanie przycisku pełnego ekranu w prawym dolnym rogu
    L.control.fullscreen({
        position: 'bottomright',
        title: 'Pełny ekran',
        titleCancel: 'Wyjdź z pełnego ekranu',
        content: null,
        forceSeparateButton: true,
        forcePseudoFullscreen: true,
        fullscreenElement: false
    }).addTo(map);

    // Dodanie popupu z koordynatami po kliknięciu na mapie
    map.on('click', function (e) {
        var coords = e.latlng;
        var lat = coords.lat.toFixed(5);
        var lng = coords.lng.toFixed(5);
        L.popup()
            .setLatLng(coords)
            .setContent("Koordynaty: " + lat + ", " + lng)
            .openOn(map);
    });

    // Tworzenie warstw mapy
    var smallLayer = createSmallMapLayer(map);
    var mediumLayer = createMediumMapLayer(map);
    var largeLayer = createLargeMapLayer(map);

    // Funkcja zarządzająca warstwami
    function manageLayers(zoomLevel) {
        map.eachLayer(function(layer) { map.removeLayer(layer); }); // Usuń wszystkie warstwy
        if (zoomLevel <= 12) {
            smallLayer.addTo(map);
        } else if (zoomLevel > 12 && zoomLevel <= 14) {
            mediumLayer.addTo(map);
        } else {
            largeLayer.addTo(map);
        }
    }

    // Początkowe dodanie średniej warstwy
    mediumLayer.addTo(map);

    // Listener dla zoomu
    map.on('zoomend', function() {
        manageLayers(map.getZoom());
    });
});
