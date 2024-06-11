import { createSmallMapLayer } from './small-map.js';
import { createMediumMapLayer } from './medium-map.js';
import { createLargeMapLayer } from './large-map.js';

document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('mapid', {
        zoomControl: false,
        fullscreenControl: true
    }).setView([51.505, -0.09], 13);

    L.control.zoom({
        position: 'bottomright',
        zoomInTitle: 'Przybliż',
        zoomOutTitle: 'Oddal'
    }).addTo(map);
    
    L.control
        .fullscreen({
            position: 'bottomright', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
            title: 'Pełny ekran', // change the title of the button, default Full Screen
            titleCancel: 'Wyjdź z pełnego ekranu', // change the title of the button when fullscreen is on, default Exit Full Screen
            content: null, // change the content of the button, can be HTML, default null
            forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
            forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
            fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
        }).addTo(map);

    map.on('click', function (e) {
        var coords = e.latlng; // Pobranie koordynatów z obiektu zdarzenia
        var lat = coords.lat.toFixed(5); // Zaokrąglenie szerokości geograficznej
        var lng = coords.lng.toFixed(5); // Zaokrąglenie długości geograficznej
        L.popup()
            .setLatLng(coords)
            .setContent("Koordynaty: " + lat + ", " + lng)
            .openOn(map);
    });

    var smallLayer = createSmallMapLayer(map);
    var mediumLayer = createMediumMapLayer(map);
    var largeLayer = createLargeMapLayer(map);

    // Funkcja zarządzająca warstwami
    function manageLayers(zoomLevel) {
        map.eachLayer(function(layer) { map.removeLayer(layer); }); // Usuń wszystkie warstwy
        if (zoomLevel <= 12) {
            map.addLayer(smallLayer);
        } else if (zoomLevel > 12 && zoomLevel <= 14) {
            map.addLayer(mediumLayer);
        } else {
            map.addLayer(largeLayer);
        }
    }

    // Początkowe dodanie średniej warstwy
    map.addLayer(mediumLayer);

    // Listener dla zoomu
    map.on('zoomend', function() {
        manageLayers(map.getZoom());
    });

    

});