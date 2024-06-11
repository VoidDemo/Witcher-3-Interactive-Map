import { createSmallMapLayer } from './small-map.js';
import { createMediumMapLayer } from './medium-map.js';
import { createLargeMapLayer } from './large-map.js';

document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('mapid', {
        zoomControl: false,
        fullscreenControl: true,
        zoomSnap: 0.5,  // Pozwala na zoomowanie w krokach co 0.5
        zoomDelta: 0.5  // Określa krok zoomu na 0.5
    }).setView([51.505, -0.09], 13.5);

    L.control.zoom({
        position: 'bottomright',
        zoomInTitle: 'Przybliż',
        zoomOutTitle: 'Oddal'
    }).addTo(map);
    
    L.control
        .fullscreen({
            position: 'bottomright', 
            title: 'Pełny ekran', 
            titleCancel: 'Wyjdź z pełnego ekranu', 
            content: null, 
            forceSeparateButton: true, 
            forcePseudoFullscreen: true, 
            fullscreenElement: false 
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
        } else if (zoomLevel > 12 && zoomLevel <= 15) {
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