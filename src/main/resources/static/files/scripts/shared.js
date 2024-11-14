function setupMap() {
    var mapData; // Zmienna do przechowywania danych mapy
    var idPrefix; // Zmienna do przechowywania prefiksu dla identyfikatorów w HTML
    var markersLayerGroup = new L.LayerGroup();
    const searchItems = [];
    const currentPath = window.location.pathname;
    const selectedLanguage = localStorage.getItem('language') || 'pl';

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
    const savedZoom = localStorage.getItem('zoomLevel') || mapData.map_zoom;
    const savedCenter = JSON.parse(localStorage.getItem('mapCenter')) || mapData.map_center;
    // Inicjalizacja mapy
    var map = L.map('mapid', {
        zoomControl: false,
        center: savedCenter,
        zoom: savedZoom,
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

    map.on('zoomend', () => {
        localStorage.setItem('zoomLevel', map.getZoom());
    });

    map.on('moveend', () => {
        localStorage.setItem('mapCenter', JSON.stringify(map.getCenter()));
    });

    function addBoundaryLine() {
        var corners = [
            [mapData.sWest.lat, mapData.sWest.lng],
            [mapData.nEast.lat, mapData.sWest.lng],
            [mapData.nEast.lat, mapData.nEast.lng],
            [mapData.sWest.lat, mapData.nEast.lng],
            [mapData.sWest.lat, mapData.sWest.lng]
        ];

        var innerBoundary = L.polyline(corners, {
            color: 'gray',
            weight: 4,
            opacity: 0.7
        }).addTo(map);
        
        var middleBoundary = L.polyline(corners, {
            color: 'dimgray',
            weight: 6,
            opacity: 0.5
        }).addTo(map);
        
        var outerBoundary = L.polyline(corners, {
            color: 'black',
            weight: 8,
            opacity: 0.3
        }).addTo(map);
    }

    // Wywołanie funkcji po załadowaniu mapy
    addBoundaryLine();

    // Dodanie kontrolek zoomu
    const zoomInTitle = selectedLanguage === 'pl' ? 'Przybliż' : 'Zoom In';
    const zoomOutTitle = selectedLanguage === 'pl' ? 'Oddal' : 'Zoom Out';
    
    L.control.zoom({
        position: 'bottomright',
        zoomInTitle: zoomInTitle,
        zoomOutTitle: zoomOutTitle
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

    var greyedMarkers = JSON.parse(localStorage.getItem('greyedMarkers')) || {};
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

            var displayText = selectedLanguage === 'pl' ? item.namePL : item.nameEN;
            var zIndex = item.typ === 'signpost' ? 10 : 0;
            // Dodanie znacznika
            var marker = L.marker([item.x, item.y], { 
                icon: icon, 
                zIndexOffset: zIndex,
                name: item.namePL
            })
                .addTo(map)
                .bindTooltip(`<strong>${displayText}</strong>`, {
                    permanent: false, // Dymek pojawi się tylko po najechaniu
                    direction: 'top', // Dymek pojawi się nad markerem
                    offset: [0, -10], // Delikatne przesunięcie dymka
                });

            markersByType[item.typ].push(marker);    
            markersLayerGroup.addLayer(marker);

            if (greyedMarkers[item.id]) {
                marker._icon.style.opacity = '0.5';
            }

            marker.on('contextmenu', function (e) {
                var markerIcon = marker._icon;
                if (markerIcon) {
                    if (markerIcon.style.opacity === "0.5") {
                        markerIcon.style.opacity = "1";
                        delete greyedMarkers[item.id];
                    } else {   
                        markerIcon.style.opacity = "0.5";
                        greyedMarkers[item.id] = true;
                    }
                    localStorage.setItem('greyedMarkers', JSON.stringify(greyedMarkers));
                }
            });
            
            searchItems.push({ title: displayText, loc: [item.x, item.y], marker });
        });
    }

    const search = selectedLanguage === 'pl' ? 'Szukaj...' : 'Search...';
    var searchControl = new L.Control.Search({
        layer: markersLayerGroup,
        propertyName: 'name',
        marker: false,
        moveToLocation: function(latlng, title, map) {
            map.setView(latlng, map.getZoom());
            searchItems.find(item => item.title === title).marker.openTooltip();
        },
        textPlaceholder: search,
        position: 'bottomright'
    });

    map.addControl(searchControl);
    searchControl.on('search:locationfound', function(e) {
        if (e.layer._popup) e.layer.openPopup();
    });
    
    searchControl.searchLayer = L.layerGroup(searchItems.map(item => item.marker));

    var hiddenMarkers = JSON.parse(localStorage.getItem('hiddenMarkers')) || {};
    for (const [type, markers] of Object.entries(markersByType)) {
        const element = document.getElementById(`${idPrefix}-${type}-count`);
        const listItem = element?.parentNode;
        if (element && listItem) {
            element.textContent = markers.length;
            if (hiddenMarkers[type]) {
                listItem.classList.add('hidden-markers');
                markers.forEach(marker => marker.remove());
            }
            listItem.addEventListener('click', function () {
                const isHidden = listItem.classList.contains('hidden-markers');
                if (isHidden) {
                    listItem.classList.remove('hidden-markers');
                    markers.forEach(marker => marker.addTo(map));
                    hiddenMarkers[type] = false;
                } else {
                    listItem.classList.add('hidden-markers');
                    markers.forEach(marker => marker.remove());
                    hiddenMarkers[type] = true;
                }
                localStorage.setItem('hiddenMarkers', JSON.stringify(hiddenMarkers));
            });
        }
    }

    // Dodanie obsługi przycisku do ukrywania/pokazywania wszystkich markerów
    const toggleMarkersButton = document.getElementById('toggle-markers-btn');
    toggleMarkersButton.addEventListener('click', function () {
        const allListItems = document.querySelectorAll('.content li');
        if (map.hasLayer(markersLayerGroup)) {
            map.removeLayer(markersLayerGroup);
            toggleMarkersButton.innerHTML = '<img src="../files/images/icons/show.png" alt="Pokaż wszystko"> Pokaż wszystko';
            allListItems.forEach(listItem => listItem.classList.add('hidden-markers'));           
        } else {
            map.addLayer(markersLayerGroup);
            toggleMarkersButton.innerHTML = '<img src="../files/images/icons/hide.png" alt="Ukryj wszystko"> Ukryj wszystko';
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
    setupMap(mapData);  
};
