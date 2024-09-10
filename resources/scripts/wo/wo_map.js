export function createWhiteOrchardMapLayer(map) {
    function getZoomLevels(z) {
        switch (z) {
            case 2:
                return { minZoom: 10, maxZoom: 12 };
            case 3:
                return { minZoom: 13, maxZoom: 15 };
            case 4:
                return { minZoom: 16, maxZoom: 18 };
            case 5:
                return { minZoom: 19, maxZoom: 22 }; // Maksymalny zoom może być wyższy niż 18, jeśli mapa to wspiera
            default:
                return { minZoom: 10, maxZoom: 22 };
        }
    }

    // Tworzenie TileLayer z odpowiednimi parametrami
    return L.tileLayer(function (coords) {
        const zoomLevels = getZoomLevels(coords.z);
        
        // Ustawienie odpowiedniego rozszerzenia pliku
        let extension = (coords.z == 2 && coords.x == 2) ? 'png' : 'jpg';
        
        // Zwrócenie ścieżki do kafelka
        return `/resources/maps/white_orchard/${coords.z}/${coords.x}/${coords.y}.${extension}`;
    }, {
        tileSize: 256,
        tms: true,  // Odwrócenie numeracji Y
        minZoom: 10,
        maxZoom: 22,  // Ustawione ogólnie, ale zarządzane dynamicznie
        bounds: L.latLngBounds(
            [51.53, -0.12],   // Górny lewy róg (Północny Zachód)
            [51.51, -0.09]    // Dolny prawy róg (Południowy Wschód)
        ),
        attribution: 'Mapa White Orchard'
    }).on('tileloadstart', function (e) {
        const z = e.tile.coords.z;
        const zoomLevels = getZoomLevels(z);
        map.options.minZoom = zoomLevels.minZoom;
        map.options.maxZoom = zoomLevels.maxZoom;
    });
}
