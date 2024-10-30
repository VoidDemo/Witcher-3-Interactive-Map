function setupMap() {
    let mapData; // Zmienna do przechowywania danych mapy
    let idPrefix; // Zmienna do przechowywania prefiksu dla identyfikatorów w HTML
    let markersLayerGroup = new L.LayerGroup();
    // Pobranie bieżącej ścieżki URL
    const currentPath = window.location.pathname;

    // Sprawdzenie ścieżki i ustawienie odpowiednich wartości
    if (currentPath.includes('/white_orchard/index.html')) {
        mapData = mapdata_wo; // Użyj danych z mapdata_wo
        idPrefix = 'wo'; // Użyj prefiksu 'wo' dla elementów HTML
        console.log('Dane załadowane z White Orchard');
    } else if (currentPath.includes('/velen_novigrad/index.html')) {
        mapData = mapdata_vn; // Użyj danych z mapdata_vn
        idPrefix = 'vn'; // Użyj prefiksu 'vn' dla elementów HTML
        console.log('Dane załadowane z Velen/Novigrad');
    } else {
        console.error('Nieznana ścieżka mapy');
        return;
    }
    
    // Initialize the map using the provided mapData
    var bounds = L.latLngBounds(mapData.sWest, mapData.nEast);
    const typeCounts = {};
    const markersByType = {};
    // Inicjalizacja mapy
    var map = L.map('mapid', {
        zoomControl: false,
        center: mapData.map_center,
        zoom: mapData.map_zoom,
        maxZoom: mapData.max_zoom,
        minZoom: mapData.min_zoom,
        attributionControl: false,
        zoomSnap: 0.5,
        zoomDelta: 0.5,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
        fullscreenControl: true
    });

    map.addLayer(markersLayerGroup);

    function addBoundaryLine() {
        var corners = [
            [mapData.sWest.lat, mapData.sWest.lng],
            [mapData.nEast.lat, mapData.sWest.lng],
            [mapData.nEast.lat, mapData.nEast.lng],
            [mapData.sWest.lat, mapData.nEast.lng],
            [mapData.sWest.lat, mapData.sWest.lng]
        ];

        // Dodanie linii granicznej
        var boundaryLine = L.polyline(corners, {
            color: 'red',
            weight: 2,
            opacity: 1
        }).addTo(map);
    }

    // Wywołanie funkcji po załadowaniu mapy
    addBoundaryLine();

    // Dodanie kontrolek zoomu
    L.control.zoom({
        position: 'bottomright',
        zoomInTitle: 'Przybliż',
        zoomOutTitle: 'Oddal'
    }).addTo(map);

    var tileLayerOptions = {
        tms: true,
        noWrap: true,
        bounds: bounds,
        maxZoom: mapData.max_zoom,
        minZoom: mapData.min_zoom,
        detectRetina: false
    };
    
    L.tileLayer(mapData.map_path + '.jpg',tileLayerOptions).addTo(map);
    L.tileLayer(mapData.map_path + '.png',tileLayerOptions).addTo(map);

    // Dodanie znaczników na podstawie pobranych danych
    if (mapData.data) {
        mapData.data.forEach(item => {
            var iconUrl = `../files/images/icons/${item.typ}.png`;
            
            if (!markersByType[item.typ]) {
                markersByType[item.typ] = [];
            }

            var icon = L.icon({
                iconUrl: iconUrl,
                iconSize: [26, 26],
                iconAnchor: [12, 12],
                popupAnchor: [0, -12]
            });

            if (typeCounts[item.typ]) {
                typeCounts[item.typ]++;
            } else {
                // Jeśli typ nie istnieje, dodaj go i ustaw na 1
                typeCounts[item.typ] = 1;
            }

            var displayText = item.name ? item.name+" "+item.id : item.typ+" "+item.id;
            var zIndex = item.typ === 'signpost' ? 10 : 0;
            // Dodanie znacznika
            var marker = L.marker([item.x, item.y], { 
                icon: icon, 
                zIndexOffset: zIndex
            })
                .addTo(map)
                .bindTooltip(`<strong>${displayText}</strong>`, {
                    permanent: false, // Dymek pojawi się tylko po najechaniu
                    direction: 'top', // Dymek pojawi się nad markerem
                    offset: [0, -10], // Delikatne przesunięcie dymka
                });

            markersByType[item.typ].push(marker);    
            markersLayerGroup.addLayer(marker);

            marker.on('contextmenu', function (e) {
                // Znajdź element DOM odpowiedzialny za ikonkę i zmień jego styl
                var markerIcon = marker._icon;
                if (markerIcon) {
                    // Sprawdź aktualną przezroczystość ikony
                    if (markerIcon.style.opacity === "0.5") {
                        // Jeśli opacity to 0.5, przywróć oryginalną wartość 1
                        markerIcon.style.opacity = "1";
                    } else {
                        // Jeśli opacity nie jest 0.5, ustaw je na 0.5
                        markerIcon.style.opacity = "0.5";
                    }
                }
            });       
        });
    }

    //zliczanie po typie i ukrywanie pojedyńczych markerów
    for (const [type, markers] of Object.entries(markersByType)) {
        const element = document.getElementById(`${idPrefix}-${type}-count`);
        const listItem = element?.parentNode;

        if (element && listItem) {
            element.textContent = markers.length; // Ustawienie liczby markerów w liczniku

            // Funkcja przy kliknięciu na element listy (cały <li>)
            listItem.addEventListener('click', function () {
                // Sprawdź, czy elementy są już przekreślone
                const isStrikethrough = listItem.classList.contains('hidden-markers');

                if (isStrikethrough) {
                    // Jeśli są przekreślone, usuń przekreślenie i pokaż markery
                    listItem.classList.remove('hidden-markers');
                    markers.forEach(marker => marker.addTo(map));
                } else {
                    // Jeśli nie są przekreślone, dodaj przekreślenie i usuń markery z mapy
                    listItem.classList.add('hidden-markers');
                    markers.forEach(marker => marker.remove());
                }
            });
        } else {
            console.warn(`Element dla typu ${type} nie został znaleziony w HTML.`);
        }
    }

    // Dodanie obsługi przycisku do ukrywania/pokazywania wszystkich markerów
    const toggleMarkersButton = document.getElementById('toggle-markers-btn');
    toggleMarkersButton.addEventListener('click', function () {
        const allListItems = document.querySelectorAll('.content li');
    
        if (map.hasLayer(markersLayerGroup)) {
            // Ukryj wszystkie markery
            map.removeLayer(markersLayerGroup);
            toggleMarkersButton.innerHTML = '<img src="../files/images/icons/show.png" alt="Pokaż wszystko"> Pokaż wszystko';

            // Dodaj klasę 'hidden-markers' do wszystkich elementów <li>
            allListItems.forEach(listItem => listItem.classList.add('hidden-markers'));
        } else {
            // Pokaż wszystkie markery
            map.addLayer(markersLayerGroup);
            toggleMarkersButton.innerHTML = '<img src="../files/images/icons/hide.png" alt="Ukryj wszystko"> Ukryj wszystko';

            // Usuń klasę 'hidden-markers' ze wszystkich elementów <li>
            allListItems.forEach(listItem => listItem.classList.remove('hidden-markers'));
        }
    });

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
}

window.loadMapWithData = function(mapData) {
    setupMap(mapData);  // Wywołanie głównej funkcji z mapą
};
